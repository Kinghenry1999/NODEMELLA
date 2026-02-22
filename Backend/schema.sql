-- Run this SQL on your Aiven PostgreSQL database to create the posts table
-- This creates the table structure for blog posts

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  heading VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500),
  admin_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published BOOLEAN DEFAULT true,
  FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create an index on admin_id for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_admin_id ON posts(admin_id);
CREATE INDEX IF NOT EXISTS idx_posts_published_created_at ON posts(published, created_at DESC);
