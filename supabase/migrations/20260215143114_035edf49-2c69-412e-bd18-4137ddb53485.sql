
-- Create storage bucket for claim documents
INSERT INTO storage.buckets (id, name, public) VALUES ('claim-documents', 'claim-documents', false);

-- Allow anyone to upload (no auth required for this MVP)
CREATE POLICY "Anyone can upload claim documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'claim-documents');

-- Allow anyone to read their uploaded documents
CREATE POLICY "Anyone can read claim documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'claim-documents');
