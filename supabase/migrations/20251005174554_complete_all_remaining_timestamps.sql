/*
  # Complete All Remaining Timestamps and Data

  1. Updates
    - Add last_login timestamps for all remaining users
    - Ensure all data is complete and realistic

  2. Notes
    - All users now have complete data
    - Timestamps vary to show realistic activity
*/

-- Update remaining farmers with last_login
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '14 hours' WHERE username = 'ravi_f' AND last_login IS NULL;
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '2 days' WHERE username = 'manjula_f' AND last_login IS NULL;
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '3 days' WHERE username = 'naresh_f' AND last_login IS NULL;
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '5 days' WHERE username = 'swathi_f' AND last_login IS NULL;
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '1 day' WHERE username = 'praveen_f' AND last_login IS NULL;
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '6 hours' WHERE username = 'radha_f' AND last_login IS NULL;
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '4 days' WHERE username = 'srinivas_f' AND last_login IS NULL;
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '2 days' WHERE username = 'bhavani_f' AND last_login IS NULL;
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '18 hours' WHERE username = 'rajesh_f2' AND last_login IS NULL;
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '3 days' WHERE username = 'latha_f' AND last_login IS NULL;
UPDATE farmers_auth SET last_login = NOW() - INTERVAL '1 day' WHERE username = 'murali_f' AND last_login IS NULL;

-- Update remaining distributors with last_login
UPDATE distributors SET last_login = NOW() - INTERVAL '10 hours' WHERE username = 'prakash_dist' AND last_login IS NULL;
UPDATE distributors SET last_login = NOW() - INTERVAL '1 day' WHERE username = 'kavitha_dist' AND last_login IS NULL;
UPDATE distributors SET last_login = NOW() - INTERVAL '2 days' WHERE username = 'ramana_dist' AND last_login IS NULL;
UPDATE distributors SET last_login = NOW() - INTERVAL '12 hours' WHERE username = 'divya_dist' AND last_login IS NULL;

-- Update remaining retailers with last_login
UPDATE retailers SET last_login = NOW() - INTERVAL '9 hours' WHERE username = 'karan_retail' AND last_login IS NULL;
UPDATE retailers SET last_login = NOW() - INTERVAL '2 days' WHERE username = 'sneha_retail' AND last_login IS NULL;
UPDATE retailers SET last_login = NOW() - INTERVAL '1 day' WHERE username = 'mohan_retail' AND last_login IS NULL;
UPDATE retailers SET last_login = NOW() - INTERVAL '15 hours' WHERE username = 'pooja_retail' AND last_login IS NULL;
UPDATE retailers SET last_login = NOW() - INTERVAL '4 hours' WHERE username = 'vijay_retail' AND last_login IS NULL;
UPDATE retailers SET last_login = NOW() - INTERVAL '3 days' WHERE username = 'rekha_retail' AND last_login IS NULL;
UPDATE retailers SET last_login = NOW() - INTERVAL '5 hours' WHERE username = 'arjun_retail' AND last_login IS NULL;
UPDATE retailers SET last_login = NOW() - INTERVAL '1 day' WHERE username = 'deepa_retail' AND last_login IS NULL;