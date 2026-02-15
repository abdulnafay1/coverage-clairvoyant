# CareClaim

CareClaim is an insurance assistant that helps you manage claims and fight back against claim denials.

It focuses on two core workflows:

1. **Filing a new claim**
2. **Appealing a denied claim**

The app analyzes your documents, explains insurance language in plain English, and helps you build a strong submission or appeal package.

---

## Core Features

### 1️⃣ File a Claim

CareClaim guides users through preparing and submitting a new claim.

**What it helps with**

- Organizing required documents (policy, invoices, medical reports, etc.)
- Checking for missing information before submission
- Explaining coverage requirements in simple terms
- Creating a structured claim summary you can submit to your insurer

**Goal:** Reduce the chance of denial by ensuring the claim is complete and aligned with policy requirements.

---

### 2️⃣ Appeal a Denied Claim

If your claim is rejected, CareClaim analyzes the denial and helps you build an appeal.

**What it helps with**

- Breaking down the denial reason
- Mapping your case to relevant policy clauses
- Identifying missing evidence
- Generating an appeal strategy
- Drafting a structured appeal letter

**Goal:** Increase your chances of overturning the denial with a clear, evidence-based appeal.

---

## Additional Capabilities

- Claim strength scoring
- Evidence checklist
- Policy clause matching
- Timeline and deadline awareness
- AI transparency panel (confidence + reasoning)
- Plain-English explanations of insurance terminology

---

## How It Works (High Level)

1. User uploads claim or denial documents.
2. Files are stored in Supabase Storage (`claim-documents` bucket).
3. The app calls the `analyze-claim` Supabase Edge Function.
4. The function sends documents to the Gemini API/Patriot AI.
5. The response returns structured JSON used to power the dashboard insights.

---

## Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS + shadcn-ui + Radix UI
- Supabase (Storage + Edge Functions)
- React Query
- Framer Motion
