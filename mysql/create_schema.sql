CREATE DATABASE IF NOT EXISTS clickfit_db;
USE clickfit_db;

CREATE TABLE IF NOT EXISTS users (
  userId INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  type ENUM('admin', 'user') DEFAULT 'user',
  active BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE PROCEDURE addUser(
  IN p_email VARCHAR(255),
  IN p_password VARCHAR(255),
  IN p_type ENUM('admin', 'user'),
  IN p_active BOOLEAN
)
BEGIN
  INSERT INTO users (email, password, type, active)
  VALUES (p_email, p_password, p_type, p_active);
END //
DELIMITER ;

CALL addUser('test@example.com', 'password123', 'user', TRUE);