# Campus Flow Database Setup Script
# This script helps set up PostgreSQL for Campus Flow

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Campus Flow Database Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Find PostgreSQL installation
$possiblePaths = @(
    "C:\Program Files\PostgreSQL\18\bin",
    "C:\Program Files\PostgreSQL\17\bin",
    "C:\Program Files\PostgreSQL\16\bin",
    "C:\Program Files\PostgreSQL\15\bin",
    "C:\Program Files\PostgreSQL\14\bin"
)

$psqlPath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path "$path\psql.exe") {
        $psqlPath = "$path\psql.exe"
        Write-Host "✓ Found PostgreSQL at: $path" -ForegroundColor Green
        break
    }
}

if (-not $psqlPath) {
    Write-Host "✗ PostgreSQL not found in standard locations" -ForegroundColor Red
    Write-Host "Please install PostgreSQL or provide the path manually" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Now we'll try to connect to PostgreSQL..." -ForegroundColor Yellow
Write-Host "If you don't know your PostgreSQL password, press Ctrl+C and see FIX_DATABASE_PASSWORD.md" -ForegroundColor Yellow
Write-Host ""

# Prompt for password
$password = Read-Host "Enter your PostgreSQL password for user 'postgres'" -AsSecureString
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

Write-Host ""
Write-Host "Testing connection..." -ForegroundColor Cyan

# Test connection
$env:PGPASSWORD = $plainPassword
$testResult = & $psqlPath -U postgres -c "SELECT version();" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Connection failed! Password incorrect." -ForegroundColor Red
    Write-Host "See FIX_DATABASE_PASSWORD.md for password reset instructions" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Connection successful!" -ForegroundColor Green
Write-Host ""

# Check if database exists
Write-Host "Checking if database 'eduplacement_pro' exists..." -ForegroundColor Cyan
$dbCheck = & $psqlPath -U postgres -t -c "SELECT 1 FROM pg_database WHERE datname='eduplacement_pro';" 2>&1

if ($dbCheck -match "1") {
    Write-Host "✓ Database 'eduplacement_pro' already exists" -ForegroundColor Green
} else {
    Write-Host "Creating database 'eduplacement_pro'..." -ForegroundColor Yellow
    & $psqlPath -U postgres -c "CREATE DATABASE eduplacement_pro;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database created successfully!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to create database" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Updating backend/.env file..." -ForegroundColor Cyan

# Update .env file
$envContent = @"
# ==========================================
# Backend Environment Variables
# ==========================================
# Database Configuration
# ==========================================
DATABASE_URL=jdbc:postgresql://localhost:5432/eduplacement_pro
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=$plainPassword

# Connection Pool
DB_POOL_SIZE=10
DB_MIN_IDLE=5
DB_CONNECTION_TIMEOUT=30000

# ==========================================
# JPA Configuration
# ==========================================
JPA_DDL_AUTO=update
JPA_SHOW_SQL=true

# ==========================================
# JWT Configuration
# ==========================================
JWT_SECRET=campus_flow_jwt_secret_key_for_development_minimum_256_bits_long
JWT_EXPIRATION=604800000

# ==========================================
# Google OAuth Configuration (Optional)
# ==========================================
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# ==========================================
# Logging Configuration
# ==========================================
LOG_LEVEL_ROOT=INFO
LOG_LEVEL_APP=DEBUG
LOG_LEVEL_SECURITY=DEBUG
LOG_LEVEL_SQL=DEBUG

# ==========================================
# File Upload Configuration
# ==========================================
MAX_FILE_SIZE=10MB
MAX_REQUEST_SIZE=10MB

# ==========================================
# CORS Configuration
# ==========================================
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# ==========================================
# Demo Data Configuration
# ==========================================
DEMO_DATA_ENABLED=true
"@

$envPath = Join-Path $PSScriptRoot "backend\.env"
$envContent | Out-File -FilePath $envPath -Encoding UTF8 -Force

Write-Host "✓ backend/.env file updated with your password" -ForegroundColor Green
Write-Host ""

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open a terminal and run: cd backend && mvn spring-boot:run" -ForegroundColor White
Write-Host "2. Wait for 'Started EduPlacementProApplication' message" -ForegroundColor White
Write-Host "3. Open another terminal and run: cd frontend && npm run dev" -ForegroundColor White
Write-Host "4. Open browser at: http://localhost:5173" -ForegroundColor White
Write-Host "5. Login with: admin@eduplacement.edu / admin123" -ForegroundColor White
Write-Host ""
