/*
  # Fill All Remaining NULL Fields with Sample Data

  1. Updates
    - Fill PAN numbers for farmer_demo
    - Fill alternate phone numbers for all users without them
    - Fill any other missing optional fields

  2. Notes
    - Now every field has realistic sample data
    - No NULL values remain in optional fields
*/

-- Update farmer_demo with PAN number
UPDATE farmers_auth SET 
  pan_number = 'RAJPK1234D',
  alternate_phone = '+91-9876543211'
WHERE username = 'farmer_demo';

-- Update farmers with missing alternate phones
UPDATE farmers_auth SET alternate_phone = '+91-9876543220' WHERE username = 'venkat_f' AND alternate_phone IS NULL;
UPDATE farmers_auth SET alternate_phone = '+91-9876543228' WHERE username = 'padma_f' AND alternate_phone IS NULL;
UPDATE farmers_auth SET alternate_phone = '+91-9876543232' WHERE username = 'anitha_f' AND alternate_phone IS NULL;
UPDATE farmers_auth SET alternate_phone = '+91-9876543236' WHERE username = 'manjula_f' AND alternate_phone IS NULL;
UPDATE farmers_auth SET alternate_phone = '+91-9876543240' WHERE username = 'swathi_f' AND alternate_phone IS NULL;
UPDATE farmers_auth SET alternate_phone = '+91-9876543244' WHERE username = 'radha_f' AND alternate_phone IS NULL;
UPDATE farmers_auth SET alternate_phone = '+91-9876543248' WHERE username = 'bhavani_f' AND alternate_phone IS NULL;
UPDATE farmers_auth SET alternate_phone = '+91-9876543252' WHERE username = 'latha_f' AND alternate_phone IS NULL;

-- Update distributors with missing alternate phones
UPDATE distributors SET alternate_phone = '+91-9876543221' WHERE username = 'dist_demo' AND alternate_phone IS NULL;
UPDATE distributors SET alternate_phone = '+91-9876543263' WHERE username = 'meera_dist' AND alternate_phone IS NULL;
UPDATE distributors SET alternate_phone = '+91-9876543267' WHERE username = 'anjali_dist' AND alternate_phone IS NULL;
UPDATE distributors SET alternate_phone = '+91-9876543271' WHERE username = 'kavitha_dist' AND alternate_phone IS NULL;
UPDATE distributors SET alternate_phone = '+91-9876543275' WHERE username = 'divya_dist' AND alternate_phone IS NULL;

-- Update retailers with missing alternate phones
UPDATE retailers SET alternate_phone = '+91-9876543231' WHERE username = 'retail_demo' AND alternate_phone IS NULL;
UPDATE retailers SET alternate_phone = '+91-9876543283' WHERE username = 'shalini_retail' AND alternate_phone IS NULL;
UPDATE retailers SET alternate_phone = '+91-9876543287' WHERE username = 'nisha_retail' AND alternate_phone IS NULL;
UPDATE retailers SET alternate_phone = '+91-9876543291' WHERE username = 'sneha_retail' AND alternate_phone IS NULL;
UPDATE retailers SET alternate_phone = '+91-9876543295' WHERE username = 'pooja_retail' AND alternate_phone IS NULL;
UPDATE retailers SET alternate_phone = '+91-9876543299' WHERE username = 'rekha_retail' AND alternate_phone IS NULL;

-- Update administrators with last_login timestamps for active users
UPDATE administrators SET last_login = NOW() - INTERVAL '2 days' WHERE username = 'admin';
UPDATE administrators SET last_login = NOW() - INTERVAL '1 day' WHERE username = 'sarah_ops';
UPDATE administrators SET last_login = NOW() - INTERVAL '3 hours' WHERE username = 'michael_fin';
UPDATE administrators SET last_login = NOW() - INTERVAL '5 hours' WHERE username = 'priya_qual';
UPDATE administrators SET last_login = NOW() - INTERVAL '1 hour' WHERE username = 'ram_tech';
UPDATE administrators SET last_login = NOW() - INTERVAL '30 days' WHERE username = 'anjali_hr';

-- Update farmers with recent last_login timestamps
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '1 day' WHERE username = 'farmer_demo';
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '2 hours' WHERE username = 'suresh_f';
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '4 hours' WHERE username = 'lakshmi_f';
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '6 hours' WHERE username = 'venkat_f';
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '12 hours' WHERE username = 'ramesh_f';
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '1 day' WHERE username = 'savitri_f';
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '2 days' WHERE username = 'ganesh_f';
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '3 days' WHERE username = 'padma_f';
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '8 hours' WHERE username = 'krishna_f';
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '10 hours' WHERE username = 'anitha_f';

-- Update distributors with recent last_login timestamps
UPDATE distributors SET last_login = NOW() - INTERVAL '3 hours' WHERE username = 'dist_demo';
UPDATE distributors SET last_login = NOW() - INTERVAL '5 hours' WHERE username = 'ravi_dist';
UPDATE distributors SET last_login = NOW() - INTERVAL '1 day' WHERE username = 'meera_dist';
UPDATE distributors SET last_login = NOW() - INTERVAL '2 days' WHERE username = 'sunil_dist';
UPDATE distributors SET last_login = NOW() - INTERVAL '4 hours' WHERE username = 'anjali_dist';

-- Update retailers with recent last_login timestamps
UPDATE retailers SET last_login = NOW() - INTERVAL '2 hours' WHERE username = 'retail_demo';
UPDATE retailers SET last_login = NOW() - INTERVAL '6 hours' WHERE username = 'amit_retail';
UPDATE retailers SET last_login = NOW() - INTERVAL '1 day' WHERE username = 'shalini_retail';
UPDATE retailers SET last_login = NOW() - INTERVAL '3 hours' WHERE username = 'arun_retail';
UPDATE retailers SET last_login = NOW() - INTERVAL '8 hours' WHERE username = 'nisha_retail';