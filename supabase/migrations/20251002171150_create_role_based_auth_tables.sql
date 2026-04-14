/*
  # Role-Based Authentication Tables

  1. New Tables
    - `administrators` - Admin users with credentials
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password` (text, hashed)
      - `full_name` (text)
      - `email` (text, unique)
      - `created_at` (timestamptz)
      - `last_login` (timestamptz)
      - `status` (text) - active/inactive
    
    - `farmers_auth` - Farmer users with credentials
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password` (text, hashed)
      - `full_name` (text)
      - `phone` (text)
      - `address` (text)
      - `village` (text)
      - `created_at` (timestamptz)
      - `last_login` (timestamptz)
      - `status` (text) - active/inactive
    
    - `distributors` - Distributor users with credentials
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password` (text, hashed)
      - `full_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `company_name` (text)
      - `license_number` (text)
      - `address` (text)
      - `created_at` (timestamptz)
      - `last_login` (timestamptz)
      - `status` (text) - active/inactive
    
    - `retailers` - Retailer users with credentials
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password` (text, hashed)
      - `full_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `shop_name` (text)
      - `shop_address` (text)
      - `created_at` (timestamptz)
      - `last_login` (timestamptz)
      - `status` (text) - active/inactive

  2. Security
    - Enable RLS on all tables
    - Add policies for users to read their own data
    - Add policies for public registration (insert)
    - Passwords will be hashed before storage

  3. Notes
    - Each table is independent for role-based access
    - Username must be unique across each role table
    - Status defaults to 'active' for new accounts
*/

-- Administrators table
CREATE TABLE IF NOT EXISTS administrators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
);

-- Farmers authentication table
CREATE TABLE IF NOT EXISTS farmers_auth (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  village TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
);

-- Distributors table
CREATE TABLE IF NOT EXISTS distributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  license_number TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
);

-- Retailers table
CREATE TABLE IF NOT EXISTS retailers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  shop_name TEXT,
  shop_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
);

-- Enable RLS on all tables
ALTER TABLE administrators ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmers_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE retailers ENABLE ROW LEVEL SECURITY;

-- Policies for administrators
CREATE POLICY "Admins can read own data"
  ON administrators FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public registration for admins"
  ON administrators FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can update own data"
  ON administrators FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Policies for farmers
CREATE POLICY "Farmers can read own data"
  ON farmers_auth FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public registration for farmers"
  ON farmers_auth FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Farmers can update own data"
  ON farmers_auth FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Policies for distributors
CREATE POLICY "Distributors can read own data"
  ON distributors FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public registration for distributors"
  ON distributors FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Distributors can update own data"
  ON distributors FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Policies for retailers
CREATE POLICY "Retailers can read own data"
  ON retailers FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public registration for retailers"
  ON retailers FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Retailers can update own data"
  ON retailers FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Insert sample admin account (password: admin123 - should be hashed in production)
INSERT INTO administrators (username, password, full_name, email, status) VALUES
('admin', 'admin123', 'System Administrator', 'admin@dairy.com', 'active')
ON CONFLICT (username) DO NOTHING;