# Campus Flow Database Setup Script
# This script sets up PostgreSQL database for Campus Flow project

Write-Host "=== Campus Flow Database Setup ===" -ForegroundColor Cyan
Write-Host ""

# Find PostgreSQL installation
$possiblePaths = @(
    "C:\Program Files\PostgreSQL\18\bin\psql.exe",
    "C:\Program Files\PostgreSQL\17\bin\psql.exe",
    "C:\Program Files\PostgreSQL\16\bin\psql.exe",
    "C:\Program Files\PostgreSQL\15\bin\psql.exe",
    "C:\Program Files\PostgreSQL\14\bin\psql.exe"
)

$psqlPath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $psqlPath = $path
        Write-Host "Found PostgreSQL at: $path" -ForegroundColor Green
        break
    }
}

if (-not $psqlPath) {
    Write-Host "ERROR: PostgreSQL not found!" -ForegroundColor Red
    Write-Host "Please install PostgreSQL from https://www.postgresql.org/download/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Please enter your PostgreSQL password for user 'postgres':" -ForegroundColor Yellow
$password = Read-Host -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

# Set environment variable for psql
$env:PGPASSWORD = $passwordPlain

Write-Host ""
Write-Host "Testing connection..." -ForegroundColor Cyan

# Test connection
$testResult = & $psqlPath -U postgres -c "SELECT 1" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Connection failed! Password incorrect." -ForegroundColor Red
    $env:PGPASSWORD = $null
    exit 1
}

Write-Host "Connection successful!" -ForegroundColor Green
Write-Host ""

# Check if database exists
Write-Host "Checking if database 'eduplacement_pro' exists..." -ForegroundColor Cyan
$dbCheck = & $psqlPath -U postgres -lqt 2>&1 | Select-String -Pattern "eduplacement_pro"

if ($dbCheck) {
    Write-Host "Database already exists. Dropping and recreating..." -ForegroundColor Yellow
    & $psqlPath -U postgres -c "DROP DATABASE IF EXISTS eduplacement_pro;" 2>&1 | Out-Null
}

# Create database
Write-Host "Creating database 'eduplacement_pro'..." -ForegroundColor Cyan
$createResult = & $psqlPath -U postgres -c "CREATE DATABASE eduplacement_pro;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database created successfully!" -ForegroundColor Green
} else {
    Write-Host "Failed to create database!" -ForegroundColor Red
    Write-Host $createResult
    $env:PGPASSWORD = $null
    exit 1
}

# Update backend/.env file
Write-Host ""
Write-Host "Updating backend/.env file..." -ForegroundColor Cyan

$envPath = "backend\.env"
$envContent = @"
# Database Configuration
DATABASE_URL=jdbc:postgresql://localhost:5432/eduplacement_pro
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=$passwordPlain

# JWT Configuration
JWT_SECRET=your-secret-key-here-change-in-production-min-256-bits-long
JWT_EXPIRATION=86400000

# Google OAuth (optional - disabled by default)
GOOGLE_CLIENT_ID=disabled
"@

Set-Content -Path $envPath -Value $envContent -Encoding UTF8

Write-Host "Configuration file updated!" -ForegroundColor Green

# Clear password from environment
$env:PGPASSWORD = $null

Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Database 'eduplacement_pro' is ready!" -ForegroundColor Cyan
Write-Host "Configuration saved to backend/.env" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Start backend: cd backend; mvn spring-boot:run" -ForegroundColor White
Write-Host "2. Wait for 'Started EduPlacementProApplication' message" -ForegroundColor White
Write-Host "3. Start frontend: cd frontend; npm run dev" -ForegroundColor White
Write-Host "4. Open http://localhost:5173" -ForegroundColor White
Write-Host "5. Login with: admin@eduplacement.edu / admin123" -ForegroundColor White
Write-Host ""
