# EduPlacement Pro - Database Setup Script
# This script helps you set up MySQL database for the application

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  EduPlacement Pro - MySQL Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL is running
Write-Host "Checking MySQL service..." -ForegroundColor Yellow
$mysqlService = Get-Service -Name "*mysql*" -ErrorAction SilentlyContinue

if ($null -eq $mysqlService) {
    Write-Host "❌ MySQL service not found!" -ForegroundColor Red
    Write-Host "Please install MySQL from: https://dev.mysql.com/downloads/installer/" -ForegroundColor Yellow
    exit 1
}

if ($mysqlService.Status -ne "Running") {
    Write-Host "❌ MySQL service is not running!" -ForegroundColor Red
    Write-Host "Starting MySQL service..." -ForegroundColor Yellow
    Start-Service $mysqlService.Name
    Start-Sleep -Seconds 3
}

Write-Host "✅ MySQL service is running" -ForegroundColor Green
Write-Host ""

# Get MySQL password
Write-Host "Enter your MySQL root password:" -ForegroundColor Yellow
$password = Read-Host -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

# Test MySQL connection and create database
Write-Host ""
Write-Host "Creating database..." -ForegroundColor Yellow

$createDbCommand = @"
CREATE DATABASE IF NOT EXISTS eduplacement_pro 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
SHOW DATABASES LIKE 'eduplacement%';
"@

try {
    $result = $createDbCommand | mysql -u root -p"$passwordPlain" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database 'eduplacement_pro' created successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to create database" -ForegroundColor Red
        Write-Host "Error: $result" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Error connecting to MySQL: $_" -ForegroundColor Red
    exit 1
}

# Update application-mysql.properties with the password
Write-Host ""
Write-Host "Updating application-mysql.properties..." -ForegroundColor Yellow

$propertiesFile = "src\main\resources\application-mysql.properties"
$content = Get-Content $propertiesFile -Raw

# Update password line
$content = $content -replace "spring\.datasource\.password=.*", "spring.datasource.password=$passwordPlain"

Set-Content $propertiesFile $content

Write-Host "✅ Configuration updated!" -ForegroundColor Green
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Database Details:" -ForegroundColor Yellow
Write-Host "  Host:     localhost" -ForegroundColor White
Write-Host "  Port:     3306" -ForegroundColor White
Write-Host "  Database: eduplacement_pro" -ForegroundColor White
Write-Host "  Username: root" -ForegroundColor White
Write-Host ""
Write-Host "To start the application with MySQL, run:" -ForegroundColor Yellow
Write-Host '  .\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=mysql"' -ForegroundColor Cyan
Write-Host ""
