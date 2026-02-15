import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { filePaths, denialType, form } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Download uploaded files and convert to base64 for Gemini
    const fileContents: { name: string; base64: string; mimeType: string }[] = [];
    for (const fp of filePaths || []) {
      const { data, error } = await supabase.storage.from("claim-documents").download(fp);
      if (!error && data) {
        const arrayBuffer = await data.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        fileContents.push({
          name: fp,
          base64,
          mimeType: data.type || "application/pdf",
        });
      }
    }

    const systemPrompt = `You are an expert insurance claim analyst AI for CareClaim. 
Analyze the uploaded insurance documents (denial letters, policy documents, medical reports) along with the patient information provided.

Return a JSON object with this EXACT structure (no markdown, no code fences, just pure JSON):
{
  "claimScore": {
    "overall": <number 0-100>,
    "label": "<string like 'Strong Appeal Potential' or 'Moderate Appeal Potential'>",
    "policyCoverageMatch": <number 0-100>,
    "documentationStrength": <number 0-100>,
    "medicalNecessity": <number 0-100>,
    "denialTechnicalityRisk": "<string: Low, Medium, or High>"
  },
  "denialBreakdown": {
    "clauses": [
      {
        "original": "<exact clause from denial>",
        "explanation": "<plain English explanation>",
        "highlight": "<key phrase to highlight>"
      }
    ]
  },
  "coverageMap": {
    "steps": [
      {
        "label": "<step label>",
        "value": "<description>",
        "status": "<complete|warning|missing>"
      }
    ]
  },
  "appealLetter": "<full formatted appeal letter text>",
  "evidenceChecklist": [
    {
      "label": "<document name>",
      "status": "<uploaded|missing>",
      "risk": "<risk description>"
    }
  ],
  "riskInsights": {
    "denialRiskBefore": <number 0-100>,
    "approvalProbAfter": <number 0-100>,
    "estimatedBill": "<string like $18,420>",
    "billDescription": "<description>",
    "comparisons": [
      { "label": "<metric>", "before": <number>, "after": <number> }
    ]
  },
  "timeline": {
    "daysRemaining": <number>,
    "events": [
      {
        "label": "<event name>",
        "date": "<date string>",
        "status": "<complete|current|upcoming>",
        "detail": "<description>"
      }
    ]
  },
  "transparency": {
    "confidenceLevel": "<High|Medium|Low>",
    "summary": "<paragraph explaining the analysis>",
    "sources": [
      { "label": "<source name>", "detail": "<details>" }
    ],
    "reasoning": "<paragraph on how AI reached conclusion>"
  },
  "claimId": "<generated claim ID>",
  "claimStatus": "<Under Review|Denied|Appeal In Progress>"
}

Be thorough and realistic. Base your analysis on the actual uploaded documents when available. If documents are not provided, generate a realistic analysis based on the patient information. Use real CPT codes, policy section numbers, and legal citations.`;

    // Build messages with file attachments
    const userContent: any[] = [];

    // Add file contents as images/documents for Gemini multimodal
    for (const file of fileContents) {
      userContent.push({
        type: "image_url",
        image_url: {
          url: `data:${file.mimeType};base64,${file.base64}`,
        },
      });
    }

    userContent.push({
      type: "text",
      text: `Analyze this insurance claim:
- Denial Type: ${denialType || "Not specified"}
- Procedure: ${form?.procedure || "Not specified"}
- CPT Code: ${form?.cpt || "Not specified"}
- Insurance Provider: ${form?.provider || "Not specified"}  
- Estimated Bill: ${form?.bill || "Not specified"}
- Description: ${form?.description || "Not specified"}
${fileContents.length > 0 ? `\n${fileContents.length} document(s) attached above.` : "\nNo documents were uploaded, generate realistic analysis based on the information above."}`,
    });

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content;

    // Parse JSON from response (strip markdown fences if present)
    let parsed;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI analysis");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-claim error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
