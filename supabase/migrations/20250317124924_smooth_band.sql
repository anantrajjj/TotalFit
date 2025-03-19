/*
  # Add performance metrics table

  1. New Tables
    - `performance_metrics`
      - `id` (uuid, primary key)
      - `athlete_id` (uuid, references athletes)
      - `metric_name` (text)
      - `value` (numeric)
      - `recorded_at` (timestamptz)
      - `notes` (text)
      
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id uuid REFERENCES athletes NOT NULL,
  metric_name text NOT NULL,
  value numeric NOT NULL,
  recorded_at timestamptz DEFAULT now(),
  notes text
);

-- Enable RLS
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own performance metrics"
  ON performance_metrics
  FOR SELECT
  TO authenticated
  USING (athlete_id IN (
    SELECT id FROM athletes WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own performance metrics"
  ON performance_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (athlete_id IN (
    SELECT id FROM athletes WHERE user_id = auth.uid()
  ));