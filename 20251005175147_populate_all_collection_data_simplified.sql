/*
  # Populate All Collection Data - Simplified

  1. Data Inserted
    - Milk collection records
    - Orders and order items
    - Quality tests
    - Payments
    
  2. Notes
    - Using direct INSERT statements for reliability
*/

-- Insert sample milk collections with specific farmer IDs
INSERT INTO milk_collections (farmer_id, collection_date, morning_quantity, evening_quantity, fat_percentage, snf_percentage, price_per_liter, total_amount, status)
SELECT 
  id,
  CURRENT_DATE - (d ||' days')::interval,
  (random() * 20 + 15)::numeric(10,2),
  (random() * 18 + 12)::numeric(10,2),
  (random() * 1.5 + 4.5)::numeric(4,2),
  (random() * 0.8 + 8.2)::numeric(4,2),
  (random() * 8 + 28)::numeric(10,2),
  0,
  CASE 
    WHEN d > 7 THEN 'paid'
    WHEN d > 3 THEN 'processed'
    ELSE 'collected'
  END
FROM farmers_auth
CROSS JOIN generate_series(0, 29) AS d
WHERE status = 'active'
LIMIT 300;

-- Update total amounts
UPDATE milk_collections
SET total_amount = total_quantity * price_per_liter
WHERE total_amount = 0;

-- Insert quality tests for recent collections
INSERT INTO quality_tests (collection_id, fat_content, snf_content, protein_content, lactose_content, water_content, acidity, temperature, bacteria_count, result, tested_by)
SELECT 
  id,
  fat_percentage,
  snf_percentage,
  (random() * 0.8 + 3.2)::numeric(4,2),
  (random() * 0.4 + 4.6)::numeric(4,2),
  (random() * 1.5 + 86.5)::numeric(4,2),
  (random() * 0.04 + 0.15)::numeric(4,2),
  (random() * 3 + 4)::numeric(4,2),
  (random() * 80000 + 20000)::integer,
  CASE 
    WHEN random() < 0.88 THEN 'pass'
    WHEN random() < 0.96 THEN 'warning'
    ELSE 'fail'
  END,
  CASE (random() * 2)::integer
    WHEN 0 THEN 'Priya Desai'
    ELSE 'Lab Tech'
  END
FROM milk_collections
WHERE collection_date >= CURRENT_DATE - 15
ORDER BY random()
LIMIT 80;

-- Insert orders from retailers
WITH retailer_sample AS (
  SELECT id, row_number() OVER () as rn
  FROM retailers
  WHERE status = 'active'
  LIMIT 10
), order_data AS (
  INSERT INTO orders (retailer_id, order_date, delivery_date, total_amount, status, payment_status)
  SELECT 
    (SELECT id FROM retailer_sample ORDER BY random() LIMIT 1),
    now() - (random() * interval '25 days'),
    CURRENT_DATE + (random() * 4)::integer,
    (random() * 15000 + 5000)::numeric(10,2),
    CASE 
      WHEN random() < 0.3 THEN 'delivered'
      WHEN random() < 0.6 THEN 'shipped'
      WHEN random() < 0.85 THEN 'processing'
      ELSE 'confirmed'
    END,
    CASE 
      WHEN random() < 0.5 THEN 'paid'
      WHEN random() < 0.8 THEN 'partial'
      ELSE 'unpaid'
    END
  FROM generate_series(1, 35)
  RETURNING id, retailer_id, total_amount, order_date, status, payment_status
)
SELECT * FROM order_data;

-- Insert order items for each order
INSERT INTO order_items (order_id, product_id, quantity, price_per_unit)
SELECT 
  o.id,
  p.id,
  (random() * 40 + 10)::numeric(10,2),
  p.price_per_unit
FROM orders o
CROSS JOIN LATERAL (
  SELECT id, price_per_unit
  FROM products
  ORDER BY random()
  LIMIT (random() * 3 + 2)::integer
) p
WHERE o.created_at >= now() - interval '1 hour';

-- Update order totals
UPDATE orders o
SET total_amount = COALESCE((
  SELECT SUM(total_price)
  FROM order_items oi
  WHERE oi.order_id = o.id
), total_amount);

-- Insert farmer payments
INSERT INTO payments (user_id, user_type, amount, payment_date, payment_method, transaction_id, status, notes)
SELECT 
  farmer_id,
  'farmer',
  SUM(total_amount),
  MAX(collection_date)::timestamptz + interval '2 days',
  CASE (random() * 2)::integer
    WHEN 0 THEN 'bank_transfer'
    WHEN 1 THEN 'upi'
    ELSE 'cheque'
  END,
  'FP' || to_char(MAX(collection_date), 'YYYYMMDD') || lpad(floor(random() * 999999)::text, 6, '0'),
  'completed',
  'Weekly milk payment'
FROM milk_collections
WHERE status = 'paid' AND collection_date >= CURRENT_DATE - 20
GROUP BY farmer_id
LIMIT 40;

-- Insert retailer payments
INSERT INTO payments (user_id, user_type, amount, payment_date, payment_method, transaction_id, status, notes)
SELECT 
  retailer_id,
  'retailer',
  total_amount,
  order_date + interval '1 day',
  CASE (random() * 3)::integer
    WHEN 0 THEN 'bank_transfer'
    WHEN 1 THEN 'upi'
    WHEN 2 THEN 'card'
    ELSE 'bank_transfer'
  END,
  'RP' || to_char(order_date, 'YYYYMMDD') || lpad(floor(random() * 999999)::text, 6, '0'),
  'completed',
  'Order payment'
FROM orders
WHERE payment_status = 'paid'
LIMIT 25;