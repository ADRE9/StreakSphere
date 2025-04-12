-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create habits table
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  streak_count INTEGER DEFAULT 0,
  last_checked_in TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  color TEXT NOT NULL DEFAULT '#4F46E5',
  icon TEXT NOT NULL DEFAULT 'activity',
  reminder_time TIME,
  reminder_days TEXT[] DEFAULT '{}',
  frequency INTEGER DEFAULT 1
);

-- Enable realtime
ALTER publication supabase_realtime ADD TABLE habits;

-- Create check_ins table
CREATE TABLE check_ins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted BOOLEAN DEFAULT FALSE,
  frequency INTEGER DEFAULT 1
);

-- Enable realtime
ALTER publication supabase_realtime ADD TABLE check_ins;

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create function to handle timestamps for realtime updates
CREATE OR REPLACE FUNCTION handle_times()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    NEW.created_at := now();
    NEW.updated_at := now();
  ELSEIF (TG_OP = 'UPDATE') THEN
    NEW.created_at := OLD.created_at;
    NEW.updated_at := now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for timestamp handling
CREATE TRIGGER handle_habits_times
  BEFORE INSERT OR UPDATE ON habits
  FOR EACH ROW
  EXECUTE FUNCTION handle_times();

CREATE TRIGGER handle_check_ins_times
  BEFORE INSERT OR UPDATE ON check_ins
  FOR EACH ROW
  EXECUTE FUNCTION handle_times();

CREATE TRIGGER handle_profiles_times
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_times();

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    NEW.email, -- Use email as initial username
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes
CREATE INDEX habits_user_id_idx ON habits(user_id);
CREATE INDEX check_ins_habit_id_idx ON check_ins(habit_id);
CREATE INDEX check_ins_checked_at_idx ON check_ins(checked_at);
CREATE INDEX habits_reminder_time_idx ON habits(reminder_time, reminder_days);

-- Habits policies
CREATE POLICY "Users can view their own habits"
  ON habits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own habits"
  ON habits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
  ON habits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
  ON habits FOR DELETE
  USING (auth.uid() = user_id);

-- Check-ins policies
CREATE POLICY "Users can view their own check-ins"
  ON check_ins FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM habits
      WHERE habits.id = check_ins.habit_id
      AND habits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own check-ins"
  ON check_ins FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM habits
      WHERE habits.id = check_ins.habit_id
      AND habits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own check-ins"
  ON check_ins FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM habits
      WHERE habits.id = check_ins.habit_id
      AND habits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own check-ins"
  ON check_ins FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM habits
      WHERE habits.id = check_ins.habit_id
      AND habits.user_id = auth.uid()
    )
  );

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create function to update streak count
CREATE OR REPLACE FUNCTION update_streak_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update only the last_checked_in timestamp
  UPDATE habits
  SET 
    last_checked_in = NEW.checked_at
  WHERE id = NEW.habit_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
