alter table "public"."habits" alter column "last_checked_in" set default now();

alter table "public"."habits" alter column "reminder_days" set data type text[] using "reminder_days"::text[];


