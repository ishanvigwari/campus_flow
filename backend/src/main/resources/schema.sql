-- ==========================================
-- Campus Flow Database Schema
-- ==========================================
-- This file is for reference only
-- Hibernate will auto-generate tables based on JPA entities

-- ==========================================
-- Enable UUID extension (if needed)
-- ==========================================
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- Users Table
-- ==========================================
-- Managed by User entity

-- ==========================================
-- Students Table
-- ==========================================
-- Managed by Student entity

-- ==========================================
-- Companies Table
-- ==========================================
-- Managed by Company entity

-- ==========================================
-- Drives Table
-- ==========================================
-- Managed by Drive entity

-- ==========================================
-- Applications Table
-- ==========================================
-- Managed by Application entity

-- ==========================================
-- Interviews Table
-- ==========================================
-- Managed by Interview entity

-- ==========================================
-- Projects Table
-- ==========================================
-- Managed by Project entity

-- ==========================================
-- Trainings Table
-- ==========================================
-- Managed by Training entity

-- ==========================================
-- Training Enrollments Table
-- ==========================================
-- Managed by TrainingEnrollment entity

-- ==========================================
-- Indexes for Performance
-- ==========================================
-- These will be created automatically by JPA annotations
-- but can be added manually if needed:

-- CREATE INDEX idx_student_batch ON students(batch);
-- CREATE INDEX idx_student_status ON students(placement_status);
-- CREATE INDEX idx_drive_status ON drives(status);
-- CREATE INDEX idx_application_status ON applications(status);
-- CREATE INDEX idx_interview_date ON interviews(interview_date);
