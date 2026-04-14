/*
  # Create Milk Collection and Related Tables

  1. New Tables
    - milk_collections: Daily milk collection records
    - products: Dairy products inventory
    - orders: Product orders from retailers
    - payments: Payment transactions
    - quality_tests: Milk quality test results
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Milk Collections Table
CREATE TABLE IF NOT EXISTS milk_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid NOT NULL,
  collection_date date NOT NULL DEFAULT CURRENT_DATE,
  morning_quantity numeric(10,2) DEFAULT 0,
  evening_quantity numeric(10,2) DEFAULT 0,
  total_quantity numeric(10,2) GENERATED ALWAYS AS (morning_quantity + evening_quantity) STORED,
  fat_percentage numeric(4,2),
  snf_percentage numeric(4,2),
  price_per_liter numeric(10,2),
  total_amount numeric(10,2),
  status text DEFAULT 'collected',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('collected', 'processed', 'paid', 'rejected'))
);

ALTER TABLE milk_collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view milk collections"
  ON milk_collections FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert milk collections"
  ON milk_collections FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  price_per_unit numeric(10,2) NOT NULL,
  unit text DEFAULT 'liter',
  stock_quantity numeric(10,2) DEFAULT 0,
  min_stock_level numeric(10,2) DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_category CHECK (category IN ('milk', 'curd', 'butter', 'ghee', 'paneer', 'cheese', 'other'))
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_id uuid NOT NULL,
  order_date timestamptz DEFAULT now(),
  delivery_date date,
  total_amount numeric(10,2) NOT NULL,
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'unpaid',
  notes text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  CONSTRAINT valid_payment_status CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded'))
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL,
  quantity numeric(10,2) NOT NULL,
  price_per_unit numeric(10,2) NOT NULL,
  total_price numeric(10,2) GENERATED ALWAYS AS (quantity * price_per_unit) STORED,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_type text NOT NULL,
  amount numeric(10,2) NOT NULL,
  payment_date timestamptz DEFAULT now(),
  payment_method text DEFAULT 'bank_transfer',
  transaction_id text,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_user_type CHECK (user_type IN ('farmer', 'distributor', 'retailer')),
  CONSTRAINT valid_payment_method CHECK (payment_method IN ('cash', 'bank_transfer', 'upi', 'cheque', 'card')),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'completed', 'failed', 'cancelled'))
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view payments"
  ON payments FOR SELECT
  TO authenticated
  USING (true);

-- Quality Tests Table
CREATE TABLE IF NOT EXISTS quality_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid REFERENCES milk_collections(id) ON DELETE CASCADE,
  test_date timestamptz DEFAULT now(),
  fat_content numeric(4,2),
  snf_content numeric(4,2),
  protein_content numeric(4,2),
  lactose_content numeric(4,2),
  water_content numeric(4,2),
  acidity numeric(4,2),
  temperature numeric(4,2),
  bacteria_count integer,
  result text DEFAULT 'pending',
  tested_by text,
  notes text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_result CHECK (result IN ('pending', 'pass', 'fail', 'warning'))
);

ALTER TABLE quality_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view quality tests"
  ON quality_tests FOR SELECT
  TO authenticated
  USING (true);