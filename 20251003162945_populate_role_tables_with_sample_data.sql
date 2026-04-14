/*
  # Populate Role Tables with Comprehensive Sample Data

  1. Tables Populated
    - administrators (5 additional)
    - farmers_auth (20 farmers)
    - distributors (8 distributors)
    - retailers (12 retailers)

  2. Notes
    - All data is realistic and interconnected
    - Includes various statuses and attributes
    - Password for all demo accounts: password123
*/

-- Additional Administrators
INSERT INTO administrators (username, password, full_name, email, department, permissions, status, notes) VALUES
('sarah_ops', 'ops123', 'Sarah Johnson', 'sarah.johnson@dairy.com', 'Operations', ARRAY['manage_operations', 'view_reports', 'manage_farmers'], 'active', 'Senior operations manager with 8 years experience'),
('michael_fin', 'fin123', 'Michael Chen', 'michael.chen@dairy.com', 'Finance', ARRAY['manage_payments', 'view_reports', 'financial_audit'], 'active', 'Finance head managing all transactions'),
('priya_qual', 'qual123', 'Priya Desai', 'priya.desai@dairy.com', 'Quality Control', ARRAY['quality_tests', 'view_reports', 'approve_milk'], 'active', 'Quality control specialist'),
('ram_tech', 'tech123', 'Ram Prasad', 'ram.prasad@dairy.com', 'IT', ARRAY['system_admin', 'user_management', 'view_reports'], 'active', 'IT administrator'),
('anjali_hr', 'hr123', 'Anjali Reddy', 'anjali.reddy@dairy.com', 'HR', ARRAY['user_management', 'view_reports'], 'inactive', 'HR manager on leave')
ON CONFLICT (username) DO NOTHING;

-- Additional Farmers
INSERT INTO farmers_auth (username, password, full_name, phone, address, village, bank_account_number, ifsc_code, pan_number, cattle_count, land_area, rating, status, notes, alternate_phone) VALUES
('suresh_f', 'farmer123', 'Suresh Reddy', '+91-9876543215', 'Plot 23, Village Road', 'Sangareddy', '234567890123', 'SBIN0002345', 'ABCPS1234E', 20, 8.5, 4.8, 'active', 'Top producer in region', '+91-9876543216'),
('lakshmi_f', 'farmer123', 'Lakshmi Devi', '+91-9876543217', 'House 67, Main Street', 'Medak', '345678901234', 'HDFC0003456', 'DEFGH5678F', 12, 4.2, 4.3, 'active', 'Reliable supplier', '+91-9876543218'),
('venkat_f', 'farmer123', 'Venkat Rao', '+91-9876543219', 'Farm House 12', 'Patancheru', '456789012345', 'ICIC0004567', 'GHIJK9012G', 18, 6.8, 4.6, 'active', 'Quality focused farmer', NULL),
('ramesh_f', 'farmer123', 'Ramesh Kumar', '+91-9876543221', 'Near Temple, Village Center', 'Gajwel', '567890123456', 'SBIN0005678', 'JKLMN3456H', 10, 3.5, 4.0, 'active', 'Regular supplier', '+91-9876543222'),
('savitri_f', 'farmer123', 'Savitri Bai', '+91-9876543223', 'Plot 89, Farm Area', 'Zaheerabad', '678901234567', 'HDFC0006789', 'MNOPQ7890I', 25, 10.2, 4.9, 'active', 'Largest producer', NULL),
('ganesh_f', 'farmer123', 'Ganesh Naik', '+91-9876543225', 'Village Square', 'Narayankhed', '789012345678', 'ICIC0007890', 'PQRST1234J', 8, 2.8, 3.8, 'active', 'Small scale farmer', '+91-9876543226'),
('padma_f', 'farmer123', 'Padma Kumari', '+91-9876543227', 'House 45, East Street', 'Siddipet', '890123456789', 'SBIN0008901', 'STUVW5678K', 14, 5.5, 4.4, 'active', 'Growing business', NULL),
('krishna_f', 'farmer123', 'Krishna Murthy', '+91-9876543229', 'Farm 23, Highway Road', 'Dubbak', '901234567890', 'HDFC0009012', 'VWXYZ9012L', 22, 9.2, 4.7, 'active', 'Experienced farmer', '+91-9876543230'),
('anitha_f', 'farmer123', 'Anitha Sharma', '+91-9876543231', 'Plot 56, Colony Road', 'Toopran', '012345678901', 'ICIC0001234', 'XYZAB3456M', 11, 4.0, 4.1, 'active', 'Quality milk producer', NULL),
('ravi_f', 'farmer123', 'Ravi Teja', '+91-9876543233', 'Near School, Main Road', 'Jharasangam', '123450987654', 'SBIN0001235', 'ABCDE7890N', 16, 6.5, 4.5, 'active', 'Consistent supplier', '+91-9876543234'),
('manjula_f', 'farmer123', 'Manjula Reddy', '+91-9876543235', 'House 78, West Area', 'Kondapur', '234561098765', 'HDFC0002346', 'BCDEF1234O', 19, 7.8, 4.6, 'active', 'High quality producer', NULL),
('naresh_f', 'farmer123', 'Naresh Babu', '+91-9876543237', 'Farm 45, Rural Area', 'Pulkal', '345672109876', 'ICIC0003457', 'CDEFG5678P', 13, 5.2, 4.2, 'active', 'Regular payments', '+91-9876543238'),
('swathi_f', 'farmer123', 'Swathi Varma', '+91-9876543239', 'Plot 90, Village End', 'Sadashivpet', '456783210987', 'SBIN0004568', 'DEFGH9012Q', 9, 3.2, 3.9, 'active', 'New member', NULL),
('praveen_f', 'farmer123', 'Praveen Kumar', '+91-9876543241', 'House 34, Center Road', 'Narayankhed', '567894321098', 'HDFC0005679', 'EFGHI3456R', 17, 7.0, 4.5, 'active', 'Active participant', '+91-9876543242'),
('radha_f', 'farmer123', 'Radha Krishna', '+91-9876543243', 'Farm House 67', 'Sadasivpet', '678905432109', 'ICIC0006780', 'FGHIJ7890S', 21, 8.8, 4.8, 'active', 'Top quality', NULL),
('srinivas_f', 'farmer123', 'Srinivas Reddy', '+91-9876543245', 'Plot 12, Highway', 'Sangareddy', '789016543210', 'SBIN0007891', 'GHIJK1234T', 15, 6.0, 4.4, 'active', 'Reliable member', '+91-9876543246'),
('bhavani_f', 'farmer123', 'Bhavani Devi', '+91-9876543247', 'House 89, Temple Street', 'Medak', '890127654321', 'HDFC0008902', 'HIJKL5678U', 10, 3.8, 4.0, 'active', 'Good quality milk', NULL),
('rajesh_f2', 'farmer123', 'Rajesh Naik', '+91-9876543249', 'Village Center', 'Patancheru', '901238765432', 'ICIC0009013', 'IJKLM9012V', 12, 4.5, 4.2, 'active', 'Growing business', '+91-9876543250'),
('latha_f', 'farmer123', 'Latha Kumari', '+91-9876543251', 'Farm 78, Rural Road', 'Gajwel', '012349876543', 'SBIN0001236', 'JKLMN3456W', 14, 5.8, 4.3, 'active', 'Active supplier', NULL),
('murali_f', 'farmer123', 'Murali Krishna', '+91-9876543253', 'Plot 45, East Area', 'Zaheerabad', '123450987655', 'HDFC0002347', 'KLMNO7890X', 18, 7.5, 4.7, 'active', 'Premium quality', '+91-9876543254')
ON CONFLICT (username) DO NOTHING;

-- Additional Distributors
INSERT INTO distributors (username, password, full_name, email, phone, company_name, bank_account_number, ifsc_code, gstin, coverage_area, license_number, rating, status, notes, alternate_phone) VALUES
('ravi_dist', 'dist123', 'Ravi Transport Services', 'ravi@transport.com', '+91-9876543260', 'Ravi Logistics', '111222333444', 'SBIN0011122', '36AABCR1234F1Z1', ARRAY['Hyderabad', 'Warangal'], 'DL-2023-001', 4.3, 'active', 'Fast delivery service', '+91-9876543261'),
('meera_dist', 'dist123', 'Meera Distribution', 'meera@dist.com', '+91-9876543262', 'Meera Enterprises', '222333444555', 'HDFC0022233', '36BBCDS2345G2A2', ARRAY['Nizamabad', 'Karimnagar'], 'DL-2023-002', 4.5, 'active', 'Reliable partner', NULL),
('sunil_dist', 'dist123', 'Sunil Carriers', 'sunil@carriers.com', '+91-9876543264', 'Sunil Transport Co', '333444555666', 'ICIC0033344', '36CCDET3456H3B3', ARRAY['Khammam', 'Nalgonda'], 'DL-2023-003', 4.1, 'active', 'Large fleet', '+91-9876543265'),
('anjali_dist', 'dist123', 'Anjali Logistics', 'anjali@logistics.com', '+91-9876543266', 'Anjali Supply Chain', '444555666777', 'SBIN0044455', '36DDEFU4567I4C4', ARRAY['Mahabubnagar', 'Rangareddy'], 'DL-2023-004', 4.4, 'active', 'Cold chain specialist', NULL),
('prakash_dist', 'dist123', 'Prakash Transport', 'prakash@transport.com', '+91-9876543268', 'Prakash Movers', '555666777888', 'HDFC0055566', '36EEFGV5678J5D5', ARRAY['Adilabad', 'Mancherial'], 'DL-2023-005', 4.2, 'active', 'Remote area coverage', '+91-9876543269'),
('kavitha_dist', 'dist123', 'Kavitha Distribution', 'kavitha@dist.com', '+91-9876543270', 'Kavitha Enterprises', '666777888999', 'ICIC0066677', '36FFGHW6789K6E6', ARRAY['Medchal', 'Siddipet'], 'DL-2023-006', 4.6, 'active', 'Premium service', NULL),
('ramana_dist', 'dist123', 'Ramana Logistics', 'ramana@logistics.com', '+91-9876543272', 'Ramana Supply Co', '777888999000', 'SBIN0077788', '36GGHIX7890L7F7', ARRAY['Sangareddy', 'Medak'], 'DL-2023-007', 4.3, 'active', 'Local specialist', '+91-9876543273'),
('divya_dist', 'dist123', 'Divya Transport', 'divya@transport.com', '+91-9876543274', 'Divya Carriers', '888999000111', 'HDFC0088899', '36HHIJY8901M8G8', ARRAY['Vikarabad', 'Narayanpet'], 'DL-2023-008', 4.4, 'active', 'Efficient service', NULL)
ON CONFLICT (username) DO NOTHING;

-- Additional Retailers
INSERT INTO retailers (username, password, full_name, email, phone, shop_name, shop_address, bank_account_number, ifsc_code, gstin, business_type, delivery_available, rating, status, notes, alternate_phone) VALUES
('amit_retail', 'retail123', 'Amit Kumar', 'amit@store.com', '+91-9876543280', 'Amit Dairy Store', 'Shop 5, MG Road, Hyderabad', '123456789111', 'SBIN0012345', '36AAAAR1111A1Z1', 'retail_store', true, 4.5, 'active', 'Prime location store', '+91-9876543281'),
('shalini_retail', 'retail123', 'Shalini Gupta', 'shalini@market.com', '+91-9876543282', 'Fresh Mart', 'Shop 12, Market Street, Secunderabad', '234567890222', 'HDFC0023456', '36BBBBS2222B2A2', 'supermarket', true, 4.6, 'active', 'Large supermarket', NULL),
('arun_retail', 'retail123', 'Arun Sharma', 'arun@cafe.com', '+91-9876543284', 'Arun Cafe', 'Shop 8, FC Road, Hyderabad', '345678901333', 'ICIC0034567', '36CCCCT3333C3B3', 'cafe', false, 4.2, 'active', 'Popular cafe', '+91-9876543285'),
('nisha_retail', 'retail123', 'Nisha Patel', 'nisha@hotel.com', '+91-9876543286', 'Grand Hotel', 'Building 23, Banjara Hills', '456789012444', 'SBIN0045678', '36DDDDU4444D4C4', 'hotel', false, 4.7, 'active', '4-star hotel', NULL),
('karan_retail', 'retail123', 'Karan Singh', 'karan@restaurant.com', '+91-9876543288', 'Karan Restaurant', 'Shop 45, Jubilee Hills', '567890123555', 'HDFC0056789', '36EEEUV5555E5D5', 'restaurant', true, 4.4, 'active', 'Fine dining', '+91-9876543289'),
('sneha_retail', 'retail123', 'Sneha Reddy', 'sneha@store.com', '+91-9876543290', 'Sneha Dairy Products', 'Shop 67, Begumpet', '678901234666', 'ICIC0067890', '36FFFFVW6666F6E6', 'retail_store', true, 4.3, 'active', 'Specialty store', NULL),
('mohan_retail', 'retail123', 'Mohan Das', 'mohan@market.com', '+91-9876543292', 'Mohan Supermarket', 'Plot 34, Kukatpally', '789012345777', 'SBIN0078901', '36GGGGWX7777G7F7', 'supermarket', true, 4.5, 'active', 'Family supermarket', '+91-9876543293'),
('pooja_retail', 'retail123', 'Pooja Jain', 'pooja@cafe.com', '+91-9876543294', 'Coffee House', 'Shop 12, Gachibowli', '890123456888', 'HDFC0089012', '36HHHHXY8888H8G8', 'cafe', false, 4.1, 'active', 'Coffee specialist', NULL),
('vijay_retail', 'retail123', 'Vijay Kumar', 'vijay@store.com', '+91-9876543296', 'Fresh Dairy Corner', 'Shop 89, KPHB', '901234567999', 'ICIC0090123', '36IIIIYZ9999I9H9', 'retail_store', true, 4.4, 'active', 'Local favorite', '+91-9876543297'),
('rekha_retail', 'retail123', 'Rekha Nair', 'rekha@market.com', '+91-9876543298', 'Rekha Market', 'Shop 23, Miyapur', '012345678000', 'SBIN0001237', '36JJJJZA0000J0I0', 'retail_store', true, 4.2, 'active', 'Neighborhood store', NULL),
('arjun_retail', 'retail123', 'Arjun Rao', 'arjun@hotel.com', '+91-9876543300', 'Pearl Hotel', 'Building 56, Hi-Tech City', '123456789012', 'HDFC0012348', '36KKKKAB1111K1J1', 'hotel', false, 4.8, 'active', 'Luxury hotel', '+91-9876543301'),
('deepa_retail', 'retail123', 'Deepa Menon', 'deepa@restaurant.com', '+91-9876543302', 'Spice Garden', 'Shop 90, Kondapur', '234567890123', 'ICIC0023458', '36LLLLBC2222L2K2', 'restaurant', true, 4.6, 'active', 'Multi-cuisine', NULL)
ON CONFLICT (username) DO NOTHING;