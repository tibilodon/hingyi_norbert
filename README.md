create extension if not exists moddatetime schema extensions;

create trigger handle_updated_at before update on home
for each row execute procedure moddatetime (updated_at);

## use this script to modify supabase tables in order to auto-generate date for updated_at columns
