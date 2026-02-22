-- Migration: Update posts table image column to TEXT to support Base64 encoded images
-- Run this on your Aiven PostgreSQL database if you already have the posts table created
-- This changes the image column from VARCHAR(500) to TEXT to support larger Base64 encoded images

ALTER TABLE posts ALTER COLUMN image TYPE TEXT;
