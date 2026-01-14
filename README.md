# Real Estate Website - MERN Stack with MySQL

A full-stack real estate website built with the MERN stack (MongoDB replaced with MySQL) and phpMyAdmin for database management.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MySQL (phpMyAdmin)
- **Additional**: Framer Motion, Lucide Icons

## Features

- 🏠 Property listings with search and filters
- 🔍 Advanced search (by type, status, city, price, bedrooms)
- 📄 Detailed property pages
- 📧 Contact/Enquiry form for properties
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- MySQL Server
- phpMyAdmin (optional, for database management)
- npm or yarn

## Setup Instructions

### 1. Database Setup

1. Open phpMyAdmin (usually at `http://localhost/phpmyadmin`)
2. Import the database schema:
   - Go to phpMyAdmin
   - Click "New" to create a database
   - Create database named `real_estate_db` (or use the name in your `.env` file)
   - Select the database and go to "Import" tab
   - Choose the file `server/database/schema.sql`
   - Click "Go" to import

Alternatively, you can run the SQL commands from `server/database/schema.sql` directly in phpMyAdmin's SQL tab.

### 2. Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MySQL credentials:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=real_estate_db
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to the client directory (in a new terminal):
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `client` directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is taken)

## Project Structure

```
treaksbe/
├── client/                 # React frontend
│   ├── src/
│   │   ├── compontents/   # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                # Express backend
│   ├── config/            # Database configuration
│   ├── routes/            # API routes
│   ├── database/          # Database schema
│   ├── server.js          # Server entry point
│   └── package.json
└── README.md
```

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `GET /api/properties/city/:city` - Get properties by city
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Enquiries
- `GET /api/enquiries` - Get all enquiries
- `POST /api/enquiries` - Create enquiry
- `GET /api/enquiries/property/:propertyId` - Get enquiries by property

### Query Parameters for Properties
- `type` - Filter by property type (villa, apartment, house, plot, commercial, resale)
- `status` - Filter by status (sale, rent)
- `city` - Filter by city
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `bedrooms` - Minimum bedrooms
- `search` - Search in title, description, address, city

## Sample Data

The database schema includes sample properties that will be automatically inserted when you run the SQL script.

## Development

- Backend runs on: `http://localhost:5000`
- Frontend runs on: `http://localhost:5173`
- API base URL: `http://localhost:5000/api`

## Production Build

### Frontend
```bash
cd client
npm run build
```

### Backend
```bash
cd server
npm start
```

## Notes

- Make sure MySQL server is running before starting the backend
- Update database credentials in `server/.env`
- The database schema includes sample data for testing
- CORS is enabled for development (configure for production)

## License

MIT
