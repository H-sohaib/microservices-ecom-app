-- Initialize databases for TrustMart E-commerce Application

-- Create Product Database
CREATE DATABASE IF NOT EXISTS productdb;

-- Create Command Database
CREATE DATABASE IF NOT EXISTS commanddb;

-- Grant permissions
GRANT ALL PRIVILEGES ON productdb.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON commanddb.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON productdb.* TO 'trustmart'@'%';
GRANT ALL PRIVILEGES ON commanddb.* TO 'trustmart'@'%';

FLUSH PRIVILEGES;

