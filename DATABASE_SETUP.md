# Database Setup Guide

## Quick Setup Steps

### 1. Create the Database

**Option A: Using phpMyAdmin (Recommended)**
1. Open phpMyAdmin in your browser: `http://localhost/phpmyadmin`
2. Click "New" on the left sidebar
3. Enter database name: `real_estate_db`
4. Select collation: `utf8mb4_unicode_ci` (or leave default)
5. Click "Create"

**Option B: Using MySQL Command Line**
```sql
CREATE DATABASE real_estate_db;
USE real_estate_db;
```

### 2. Import the Schema

**Using phpMyAdmin:**
1. Select the `real_estate_db` database
2. Go to "Import" tab
3. Choose file: `server/database/schema.sql`
4. Click "Go"

**Using MySQL Command Line:**
```bash
mysql -u root -p real_estate_db < server/database/schema.sql
```

### 3. Configure Environment Variables

The `.env` file should be in the `server` directory with these settings:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=real_estate_db
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**Important:** 
- Replace `your_mysql_password` with your actual MySQL root password
- If you don't have a password, leave it empty: `DB_PASSWORD=`
- Replace `your_secret_key_here` with a secure random string

### 4. Common Issues

**Issue: Access denied for user 'root'@'localhost'**
- Solution: Check your MySQL password in `.env` file
- If no password: Leave `DB_PASSWORD=` empty
- If forgot password: Reset MySQL root password

**Issue: Unknown database 'real_estate_db'**
- Solution: Create the database first (see Step 1)
- Make sure database name matches in `.env` file

**Issue: MySQL server is not running**
- Windows: Check Services (Win+R → services.msc) → Find MySQL → Start
- Or restart XAMPP/WAMP if using it

**Issue: Connection timeout**
- Make sure MySQL is running
- Check if port 3306 is not blocked
- Verify DB_HOST is correct (usually 'localhost')

### 5. Verify Connection

After setup, restart your server:
```bash
cd server
npm run dev
```

You should see:
```
✅ MySQL Database connected successfully
```

If you still see errors, check the console output for specific error messages.




