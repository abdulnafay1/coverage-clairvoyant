# automation_server.py
# Selenium + FastAPI bridge to run prompts in Patriot AI and return the latest response.
#
# Uses an existing Chrome profile named "School".
# Mac default Chrome user data path is used.
#
# How to run:
# 1) pip install selenium fastapi uvicorn
# 2) uvicorn automation_server:app --host 127.0.0.1 --port 8787
# 3) POST http://127.0.0.1:8787/run  with JSON: {"prompt":"..."}
#
# IMPORTANT:
# You MUST fully close Chrome before running this (Chrome cannot share a profile).
# You MUST set PATRIOT_URL to the exact Patriot AI chat page you use.
# You may need to tweak CSS selectors in find_chat_input() and extract_latest_assistant_message().

import time
from typing import Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait


# ========= CONFIG =========
PATRIOT_URL = "https://ms.nebulaone.ai/public-chat/patriotai"  # TODO: replace with the real GMU Patriot AI URL
CHROME_USER_DATA_DIR = "/Users/YOUR_MAC_USERNAME/Library/Application Support/Google/Chrome"  # TODO: replace username
CHROME_PROFILE_DIR_NAME = "School"  # your Chrome profile name
VISIBLE_BROWSER = True  # keep True for demos and debugging
# ==========================


app = FastAPI()


class RunReq(BaseModel):
    prompt: str


def build_driver() -> webdriver.Chrome:
    opts = Options()

    # Use your main Chrome user data directory + the specific profile directory "School"
    opts.add_argument(f"--user-data-dir={CHROME_USER_DATA_DIR}")
    opts.add_argument(f"--profile-directory={CHROME_PROFILE_DIR_NAME}")

    # Keep browser visible for reliability
    if not VISIBLE_BROWSER:
        opts.add_argument("--headless=new")

    opts.add_argument("--disable-gpu")
    opts.add_argument("--window-size=1400,900")
    opts.add_argument("--no-first-run")
    opts.add_argument("--no-default-browser-check")

    # Selenium Manager (built-in) will handle chromedriver automatically
    driver = webdriver.Chrome(options=opts)
    return driver


def wait_for_dom_ready(driver: webdriver.Chrome, timeout: int = 30) -> None:
    WebDriverWait(driver, timeout).until(
        lambda d: d.execute_script("return document.readyState") == "complete"
    )


def find_chat_input(driver: webdriver.Chrome, timeout: int = 25):
    """
    Try multiple common selectors for chat inputs.
    You will likely need to replace these with the exact Patriot AI selector.
    """
    end = time.time() + timeout
    last_err: Optional[Exception] = None

    candidates = [
        (By.CSS_SELECTOR, "textarea"),
        (By.CSS_SELECTOR, "textarea[placeholder*='Message']"),
        (By.CSS_SELECTOR, "textarea[placeholder*='Ask']"),
        (By.CSS_SELECTOR, "textarea[aria-label*='message']"),
        (By.CSS_SELECTOR, "div[contenteditable='true']"),
        (By.CSS_SELECTOR, "[role='textbox']"),
    ]

    while time.time() < end:
        for by, sel in candidates:
            try:
                els = driver.find_elements(by, sel)
                for e in els:
                    if e.is_displayed() and e.is_enabled():
                        return e
            except Exception as e:
                last_err = e
        time.sleep(0.4)

    raise RuntimeError(f"Could not find chat input. Update selectors. Last error: {last_err}")


def click_send(driver: webdriver.Chrome):
    """
    Optional send button click fallback.
    If Enter does not send in your UI, inspect the send button and replace selector here.
    """
    possible_buttons = [
        "button[type='submit']",
        "button[aria-label*='Send']",
        "button[data-testid*='send']",
    ]
    for sel in possible_buttons:
        try:
            btns = driver.find_elements(By.CSS_SELECTOR, sel)
            for b in btns:
                if b.is_displayed() and b.is_enabled():
                    b.click()
                    return True
        except Exception:
            pass
    return False


def extract_latest_assistant_message(driver: webdriver.Chrome) -> str:
    """
    Attempt to grab the most recent assistant message bubble.
    You may need to adjust selectors to Patriot AI's DOM.
    """
    selectors = [
        "[data-message-author-role='assistant']",
        "[data-testid*='assistant']",
        "[data-testid*='message']",
        ".message",
        ".chat-message",
        "article",
    ]

    nodes = []
    for sel in selectors:
        try:
            found = driver.find_elements(By.CSS_SELECTOR, sel)
            if found:
                nodes = found
                break
        except Exception:
            continue

    if not nodes:
        return ""

    for node in reversed(nodes):
        txt = (node.text or "").strip()
        if len(txt) > 30:
            return txt

    return ""


def wait_for_assistant_response_done(driver: webdriver.Chrome, timeout: int = 90) -> str:
    """
    Wait until the assistant's latest message stops changing (simple stability check).
    Returns the stable message text.
    """
    end = time.time() + timeout
    last = ""
    stable_ticks = 0

    while time.time() < end:
        cur = extract_latest_assistant_message(driver)
        if cur and cur == last:
            stable_ticks += 1
        else:
            stable_ticks = 0
            last = cur or ""

        # stable for about 2 seconds
        if stable_ticks >= 4 and len(last) > 30:
            return last

        time.sleep(0.5)

    raise RuntimeError("Timed out waiting for response. Try increasing timeout or adjust selectors.")


def run_prompt_in_patriot(prompt: str) -> str:
    driver = build_driver()
    try:
        driver.get(PATRIOT_URL)
        wait_for_dom_ready(driver, timeout=40)

        # Give SPA apps a moment to hydrate
        time.sleep(2)

        # Find chat input
        inp = find_chat_input(driver, timeout=25)
        inp.click()
        time.sleep(0.2)

        # Clear input safely
        try:
            inp.clear()
        except Exception:
            # for contenteditable
            inp.send_keys(Keys.COMMAND, "a")
            inp.send_keys(Keys.BACKSPACE)

        # Type prompt
        inp.send_keys(prompt)

        # Try sending with Enter
        inp.send_keys(Keys.ENTER)

        # Some UIs need a button click; if no response appears soon, try clicking send
        time.sleep(1.0)
        if not extract_latest_assistant_message(driver):
            click_send(driver)

        # Wait for response to finish
        out = wait_for_assistant_response_done(driver, timeout=120)
        if not out:
            raise RuntimeError("No output extracted. Update message selectors.")
        return out

    finally:
        driver.quit()


@app.post("/run")
def run(req: RunReq):
    if not req.prompt or not req.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt is empty.")
    try:
        output = run_prompt_in_patriot(req.prompt.strip())
        return {"output": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
