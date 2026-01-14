# Troubleshooting: Cannot POST /api/auth/register

## Common Causes and Solutions

### 1. Server Not Running
Make sure the server is running:
```bash
cd server
npm run dev
```

You should see:
```
🚀 Server is running on http://localhost:5000
📊 API endpoints available at http://localhost:5000/api
✅ MySQL Database connected successfully
```

### 2. Database Connection Issues
If the database connection fails, the server might not start properly.

**Check your `.env` file in the `server` directory:**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=real_estate_db
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

**Make sure:**
- MySQL server is running
- Database `real_estate_db` exists
- User table exists (run the schema.sql file)

### 3. Port Already in Use
If port 5000 is already in use:
- Change PORT in `.env` file
- Or stop the process using port 5000

### 4. Check Server Logs
Look for any error messages in the console when starting the server.

### 5. Verify Routes
The route should be accessible at:
- URL: `http://localhost:5000/api/auth/register`
- Method: POST
- Content-Type: application/json

### 6. Test with curl or Postman
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### 7. Restart the Server
Sometimes a simple restart fixes the issue:
1. Stop the server (Ctrl+C)
2. Start it again: `npm run dev`




