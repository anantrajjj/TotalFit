/*
  # Create athletes table and related schemas

  1. New Tables
    - `athletes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `sport` (text)
      - `experience_level` (text)
      - `goals` (text)
      - `height` (numeric)
      - `weight` (numeric)
      - `created_at` (timestamptz)
    - `athlete_metrics`
      - `id` (uuid, primary key)
      - `athlete_id` (uuid, references athletes)
      - `metric_type` (text)
      - `value` (numeric)
      - `recorded_at` (timestamptz)
      
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create athletes table
CREATE TABLE IF NOT EXISTS athletes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  sport text NOT NULL,
  experience_level text NOT NULL,
  goals text,
  height numeric,
  weight numeric,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create athlete metrics table
CREATE TABLE IF NOT EXISTS athlete_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id uuid REFERENCES athletes NOT NULL,
  metric_type text NOT NULL,
  value numeric NOT NULL,
  recorded_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own athlete profile"
  ON athletes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own athlete profile"
  ON athletes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own metrics"
  ON athlete_metrics
  FOR SELECT
  TO authenticated
  USING (athlete_id IN (
    SELECT id FROM athletes WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own metrics"
  ON athlete_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (athlete_id IN (
    SELECT id FROM athletes WHERE user_id = auth.uid()
  ));