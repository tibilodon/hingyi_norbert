## use script for every table in order to get updated_at dateTime properly

create extension if not exists moddatetime schema extensions;
create trigger handle_updated_at before update on ---TABLENAME---
for each row execute procedure moddatetime (updated_at);

## use this script to modify supabase tables in order to auto-generate date for updated_at columns

## cache-busting does not allow "supabase's real-time updates", that is why all previous images are deleted & replaced by the newly added one.
