-- Create the product-images storage bucket.
-- Supabase migrations cannot create buckets via the CLI, but they CAN insert into
-- storage.buckets directly — this is the recommended approach for reproducible setups.
-- The bucket is private (public = false); images are accessed via signed URLs.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  false,
  5242880,  -- 5 MB limit per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;
