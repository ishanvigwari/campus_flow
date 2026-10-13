# Quick Start with MySQL

## तुरंत शुरू करें (Quick Setup) 🚀

### विकल्प 1: Automated Setup (आसान तरीका)

```powershell
cd backend
.\setup-database.ps1
```

यह script automatically:
- ✅ MySQL service check करेगा
- ✅ Database create करेगा
- ✅ Configuration update करेगा
- ✅ आपको बस password देना होगा

### विकल्प 2: Manual Setup

#### Step 1: MySQL में login करें
```powershell
mysql -u root -p
# अपना password enter करें
```

#### Step 2: Database बनाएं
```sql
CREATE DATABASE eduplacement_pro 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

EXIT;
```

#### Step 3: Password update करें
File खोलें: `src/main/resources/application-mysql.properties`

```properties
spring.datasource.password=YOUR_PASSWORD_HERE
```

अपना actual MySQL password डालें।

#### Step 4: Application चलाएं
```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=mysql"
```

## Verify करें ✓

Application start होने के बाद:
1. Console में check करें: `Started EduPlacementProApplication`
2. Browser में खोलें: http://localhost:8080/api/debug/counts
3. Database counts दिखनी चाहिए

## अगर Problem आए 🔧

### MySQL password भूल गए?
```powershell
# MySQL Workbench खोलें
# या command line से reset करें
```

### Port 3306 busy है?
```powershell
netstat -ano | findstr :3306
```

### Database नहीं दिख रहा?
```sql
SHOW DATABASES;
```

## Data Size की जानकारी 📊

MySQL के साथ:
- Initial size: ~5-10 MB (demo data के साथ)
- प्रत्येक student: ~5-10 KB
- प्रत्येक project: ~2-5 KB
- प्रत्येक drive: ~3-7 KB
- Maximum size: कोई limit नहीं (GBs तक बढ़ सकता है)

यानी अगर आप:
- 1000 students enroll करें = ~10 MB
- 500 projects add करें = ~2.5 MB
- 100 drives schedule करें = ~500 KB
- **Total: ~13 MB** (और बढ़ता रहेगा)

H2 के साथ (पुराना):
- Fixed at 49 KB (बहुत छोटा!)
- Data제properly persist नहीं होता था

## आगे क्या करें? 🎯

1. ✅ MySQL setup हो गया
2. ✅ Application चल रहा है
3. 🎮 अब freely data add करो - सब कुछ save होगा!
4. 💾 Backend restart करने पर भी data रहेगा
5. 📈 Database बढ़ता रहेगा जैसे-जैसे data add होगा
