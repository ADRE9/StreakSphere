alter table "public"."check_ins" alter column "checked_at" drop default;

alter table "public"."check_ins" alter column "checked_at" set data type date using "checked_at"::date;

alter table "public"."habits" alter column "streak_count" set not null;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_streak_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Update the habit's streak count and last_checked_in
  UPDATE habits
  SET 
    streak_count = streak_count + 1,
    last_checked_in = NEW.checked_at
  WHERE id = NEW.habit_id;
  
  RETURN NEW;
END;
$function$
;


