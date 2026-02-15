# CareClaim

CareClaim is an insurance assistant that helps people fight back against insurance claim denials.
You upload your denial and supporting docs, CareClaim analyzes them against policy language and medical coding standards, then generates an appeal strategy and a draft appeal letter.

## What it does

- **Claim Strength Score**: Scores your appeal potential and breaks down what is strong vs weak.
- **Denial Breakdown**: Highlights the key denial phrases and explains what they mean in plain English.
- **Coverage Map**: Maps your procedure to relevant policy clauses, exclusions, and missing requirements.
- **Appeal Builder**: Produces a structured appeal letter draft (with a tone selector UI).
- **Evidence Checklist**: Shows what documents you have vs what you are missing, and why each item matters.
- **Timeline Tracker**: Tracks deadlines and appeal milestones (based on the analysis response).
- **AI Transparency**: Shows confidence, sources used, and a short explanation of reasoning.

## How it works (high level)

1. You go through onboarding and upload documents (policy, denial letter, medical reports).
2. Files are stored in **Supabase Storage** (bucket: `claim-documents`).
3. The app calls a Supabase **Edge Function**: `analyze-claim`.
4. The edge function downloads the uploaded files, sends them (multimodal) to an AI model via **Lovable AI Gateway** (Gemini), and returns a **strict JSON** object.
5. The dashboard renders that JSON into the panels above.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui + Radix UI
- React Router
- TanStack React Query
- Supabase (Storage + Edge Functions)
- Framer Motion (animations)
