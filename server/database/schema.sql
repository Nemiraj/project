-- Real Estate Database Schema
-- Run this SQL in phpMyAdmin to create the database and tables

CREATE DATABASE IF NOT EXISTS real_estate_db;
USE real_estate_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user', 'agent') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type ENUM('villa', 'apartment', 'house', 'plot', 'commercial', 'resale') NOT NULL,
  status ENUM('sale', 'rent', 'sold', 'rented') NOT NULL,
  price DECIMAL(15, 2) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  zip_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'India',
  bedrooms INT DEFAULT 0,
  bathrooms DECIMAL(3, 1) DEFAULT 0,
  area_sqft DECIMAL(10, 2),
  year_built INT,
  parking_spaces INT DEFAULT 0,
  images JSON,
  features JSON,
  user_id INT,
  agent_name VARCHAR(100),
  agent_email VARCHAR(100),
  agent_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_city (city),
  INDEX idx_price (price)
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  property_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, property_id)
);

-- Enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  property_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO properties (title, description, type, status, price, address, city, state, bedrooms, bathrooms, area_sqft, parking_spaces, images, features, agent_name, agent_phone) VALUES
('Luxury Villa in Prime Location', 'Beautiful 4 BHK villa with modern amenities, swimming pool, and garden. Perfect for families.', 'villa', 'sale', 12500000.00, '123 MG Road', 'Bangalore', 'Karnataka', 4, 3.5, 3500, 2, '["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"]', '["Swimming Pool", "Garden", "Security", "Parking", "Gym"]', 'John Doe', '+91 9876543210'),
('Modern 3 BHK Apartment', 'Spacious apartment in gated community with all modern facilities.', 'apartment', 'rent', 35000.00, '456 Park Street', 'Mumbai', 'Maharashtra', 3, 2, 1800, 1, '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"]', '["Gym", "Clubhouse", "Security", "Parking", "Lift"]', 'Jane Smith', '+91 9876543211'),
('Residential Plot for Sale', 'Prime location plot, perfect for building your dream home. Clear title, all approvals.', 'plot', 'sale', 4500000.00, '789 Main Street', 'Delhi', 'Delhi', 0, 0, 2400, 0, '["https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800"]', '["Clear Title", "All Approvals", "Prime Location"]', 'Mike Johnson', '+91 9876543212'),
('Ready to Move 2 BHK', 'Fully furnished 2 BHK apartment, ready to move in immediately.', 'house', 'sale', 8500000.00, '321 Green Avenue', 'Pune', 'Maharashtra', 2, 2, 1200, 1, '["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"]', '["Fully Furnished", "Ready to Move", "Security", "Parking"]', 'Sarah Williams', '+91 9876543213'),
('Commercial Space for Rent', 'Prime commercial space in business district, suitable for offices or retail.', 'commercial', 'rent', 85000.00, '654 Business Park', 'Hyderabad', 'Telangana', 0, 2, 2500, 5, '["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"]', '["Central AC", "Parking", "Security", "Elevator"]', 'David Brown', '+91 9876543214'),
('Luxury Penthouse', 'Stunning 5 BHK penthouse with city views and private terrace.', 'apartment', 'sale', 25000000.00, '987 Sky Towers', 'Bangalore', 'Karnataka', 5, 4, 5000, 3, '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]', '["Private Terrace", "City View", "Gym", "Pool", "Security"]', 'Emma Davis', '+91 9876543215');

