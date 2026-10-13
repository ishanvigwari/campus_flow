# Set environment variables
$env:DATABASE_PASSWORD="password"
$env:DATABASE_USERNAME="postgres"
$env:DATABASE_URL="jdbc:postgresql://localhost:5432/eduplacement_pro"

# Start the backend
mvn spring-boot:run
