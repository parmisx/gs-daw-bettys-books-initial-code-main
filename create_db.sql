# Create database script for Bettys books

# Create the database
CREATE DATABASE IF NOT EXISTS bettys_books;
USE bettys_books;

# create the table for authors
CREATE TABLE IF NOT EXISTS authors (
    id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);
ALTER TABLE books ADD COLUMN author_id INT NOT NULL;

# Create the table for books
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT,
    name VARCHAR(50),
    price DECIMAL(5, 2) unsigned,
    author_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);
ALTER TABLE books
ADD CONSTRAINT fk_author_id FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE;

# insert authors
INSERT INTO authors (name)
VALUES
    ('Graham Greene'),
    ('Aldous Huxley'),
    ('George Orwell');

# insert books
INSERT INTO books (name, price, author_id)
VALUES
    ('Brighton Rock', 20.25, 1),
    ('Brave New World', 25.00, 2),
    ('Animal Farm', 12.99, 3);

# Create the table for users details
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashedPassword VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

# Create the app user
CREATE USER IF NOT EXISTS 'bettys_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON bettys_books.* TO ' bettys_books_app'@'localhost';
