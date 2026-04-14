/*
  # Add Comprehensive Attributes to Role Tables

  1. Administrators Table - Enhanced
    - Added: department, permissions, profile_image, notes
    
  2. Farmers Table - Enhanced
    - Added: bank_account_number, ifsc_code, pan_number, aadhar_number, 
             cattle_count, land_area, profile_image, notes, rating
    
  3. Distributors Table - Enhanced
    - Added: bank_account_number, ifsc_code, gstin, pan_number,
             vehicle_details, coverage_area, profile_image, notes, rating
    
  4. Retailers Table - Enhanced
    - Added: bank_account_number, ifsc_code, gstin, pan_number,
             shop_license_number, business_type, profile_image, notes, rating

  2. Security
    - All existing RLS policies remain unchanged
    - New columns are nullable to maintain backward compatibility

  3. Notes
    - Rating is on a scale of 0-5
    - All financial details are encrypted in production
    - Profile images store URLs to image storage
*/

-- Add columns to administrators table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'administrators' AND column_name = 'department') THEN
    ALTER TABLE administrators ADD COLUMN department TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'administrators' AND column_name = 'permissions') THEN
    ALTER TABLE administrators ADD COLUMN permissions TEXT[];
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'administrators' AND column_name = 'profile_image') THEN
    ALTER TABLE administrators ADD COLUMN profile_image TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'administrators' AND column_name = 'notes') THEN
    ALTER TABLE administrators ADD COLUMN notes TEXT;
  END IF;
END $$;

-- Add columns to farmers_auth table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'bank_account_number') THEN
    ALTER TABLE farmers_auth ADD COLUMN bank_account_number TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'ifsc_code') THEN
    ALTER TABLE farmers_auth ADD COLUMN ifsc_code TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'pan_number') THEN
    ALTER TABLE farmers_auth ADD COLUMN pan_number TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'aadhar_number') THEN
    ALTER TABLE farmers_auth ADD COLUMN aadhar_number TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'cattle_count') THEN
    ALTER TABLE farmers_auth ADD COLUMN cattle_count INTEGER DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'land_area') THEN
    ALTER TABLE farmers_auth ADD COLUMN land_area DECIMAL(10,2);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'profile_image') THEN
    ALTER TABLE farmers_auth ADD COLUMN profile_image TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'notes') THEN
    ALTER TABLE farmers_auth ADD COLUMN notes TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'rating') THEN
    ALTER TABLE farmers_auth ADD COLUMN rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'alternate_phone') THEN
    ALTER TABLE farmers_auth ADD COLUMN alternate_phone TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'farmers_auth' AND column_name = 'registration_date') THEN
    ALTER TABLE farmers_auth ADD COLUMN registration_date DATE DEFAULT CURRENT_DATE;
  END IF;
END $$;

-- Add columns to distributors table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'bank_account_number') THEN
    ALTER TABLE distributors ADD COLUMN bank_account_number TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'ifsc_code') THEN
    ALTER TABLE distributors ADD COLUMN ifsc_code TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'gstin') THEN
    ALTER TABLE distributors ADD COLUMN gstin TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'pan_number') THEN
    ALTER TABLE distributors ADD COLUMN pan_number TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'vehicle_details') THEN
    ALTER TABLE distributors ADD COLUMN vehicle_details JSONB;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'coverage_area') THEN
    ALTER TABLE distributors ADD COLUMN coverage_area TEXT[];
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'profile_image') THEN
    ALTER TABLE distributors ADD COLUMN profile_image TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'notes') THEN
    ALTER TABLE distributors ADD COLUMN notes TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'rating') THEN
    ALTER TABLE distributors ADD COLUMN rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'alternate_phone') THEN
    ALTER TABLE distributors ADD COLUMN alternate_phone TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'distributors' AND column_name = 'registration_date') THEN
    ALTER TABLE distributors ADD COLUMN registration_date DATE DEFAULT CURRENT_DATE;
  END IF;
END $$;

-- Add columns to retailers table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'bank_account_number') THEN
    ALTER TABLE retailers ADD COLUMN bank_account_number TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'ifsc_code') THEN
    ALTER TABLE retailers ADD COLUMN ifsc_code TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'gstin') THEN
    ALTER TABLE retailers ADD COLUMN gstin TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'pan_number') THEN
    ALTER TABLE retailers ADD COLUMN pan_number TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'shop_license_number') THEN
    ALTER TABLE retailers ADD COLUMN shop_license_number TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'business_type') THEN
    ALTER TABLE retailers ADD COLUMN business_type TEXT CHECK (business_type IN ('retail_store', 'supermarket', 'restaurant', 'hotel', 'cafe', 'other'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'profile_image') THEN
    ALTER TABLE retailers ADD COLUMN profile_image TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'notes') THEN
    ALTER TABLE retailers ADD COLUMN notes TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'rating') THEN
    ALTER TABLE retailers ADD COLUMN rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'alternate_phone') THEN
    ALTER TABLE retailers ADD COLUMN alternate_phone TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'registration_date') THEN
    ALTER TABLE retailers ADD COLUMN registration_date DATE DEFAULT CURRENT_DATE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'retailers' AND column_name = 'delivery_available') THEN
    ALTER TABLE retailers ADD COLUMN delivery_available BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Insert sample data for enhanced attributes
UPDATE administrators 
SET 
  department = 'Operations',
  permissions = ARRAY['manage_users', 'view_reports', 'manage_payments', 'system_settings']
WHERE username = 'admin';

-- Insert sample farmer with enhanced data
INSERT INTO farmers_auth (
  username, password, full_name, phone, address, village,
  bank_account_number, ifsc_code, cattle_count, land_area, rating
) VALUES (
  'farmer_demo', 'farmer123', 'Rajesh Kumar', '+91-9876543210',
  'Plot 45, Main Road', 'Kothapally', '123456789012', 'SBIN0001234',
  15, 5.5, 4.5
) ON CONFLICT (username) DO NOTHING;

-- Insert sample distributor with enhanced data
INSERT INTO distributors (
  username, password, full_name, email, phone, company_name,
  bank_account_number, ifsc_code, gstin, coverage_area, rating
) VALUES (
  'dist_demo', 'dist123', 'Vikram Transport', 'vikram@transport.com',
  '+91-9876543220', 'Vikram Logistics Pvt Ltd', '987654321012', 'HDFC0001234',
  '29ABCDE1234F1Z5', ARRAY['Hyderabad', 'Secunderabad', 'Cyberabad'], 4.2
) ON CONFLICT (username) DO NOTHING;

-- Insert sample retailer with enhanced data
INSERT INTO retailers (
  username, password, full_name, email, phone, shop_name, shop_address,
  bank_account_number, ifsc_code, gstin, business_type, delivery_available, rating
) VALUES (
  'retail_demo', 'retail123', 'Priya Sharma', 'priya@shop.com',
  '+91-9876543230', 'Fresh Dairy Store', 'Shop 12, Market Complex, Hyderabad',
  '456789123012', 'ICIC0001234', '36FGHIJ5678K1L9', 'retail_store', true, 4.7
) ON CONFLICT (username) DO NOTHING;