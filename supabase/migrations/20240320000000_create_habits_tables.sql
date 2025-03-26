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
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create check_ins table
CREATE TABLE check_ins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted BOOLEAN DEFAULT FALSE
);

-- Create RLS policies
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

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

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_habits_updated_at
  BEFORE UPDATE ON habits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_check_ins_updated_at
  BEFORE UPDATE ON check_ins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX habits_user_id_idx ON habits(user_id);
CREATE INDEX check_ins_habit_id_idx ON check_ins(habit_id);
CREATE INDEX check_ins_checked_at_idx ON check_ins(checked_at); 