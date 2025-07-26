# Supply Setu 🍜

## About The Project

Supply Setu is a comprehensive supply chain management platform specifically designed for street food vendors. The name "Setu" means "bridge" in Hindi, representing our mission to connect vendors with the best suppliers and ingredients through innovative technology.

![Dashboard](dashboard.png)
![Landing](landing.png)

## 🚀 Live Demo

Try the location features: [Location Demo](./location-demo.html) (Open in browser)

### ✨ Key Features

#### 🔐 **Authentication & User Management**
- **Multi-Role System**: Vendor, Supplier, and Admin roles with role-based access control
- **Secure JWT Authentication**: Robust token-based authentication system with refresh tokens
- **Admin Portal**: Complete admin dashboard for user approval, management, and analytics
- **User Approval Workflow**: Pending → Approved → Active user flow with status tracking
- **Protected Routes**: Role-based route protection and authentication middleware

#### 🗺️ **Advanced Location-Based Features**
- **Real-Time GPS Detection**: Browser-based location detection with permission handling
- **Interactive Maps**: Leaflet-powered maps with custom markers and real-time updates
- **Distance Calculations**: Precise distance calculations using Haversine formula
- **Smart Search Radius**: Configurable search radius (5km, 10km, 15km, 25km)
- **Category Filtering**: Filter suppliers by category while maintaining location context
- **Dual View Modes**: Switch between interactive map view and detailed list view
- **Visual Search Radius**: See your search area with circle overlay on map

#### 🏪 **For Vendors**
- **Nearby Suppliers**: Find suppliers in your area with real-time distance calculations
- **Visual Mapping**: Interactive map view with supplier markers and search radius visualization
- **Category-Based Search**: Filter by Vegetables, Spices, Dairy, Grains, Oils, Sweets & Snacks
- **Delivery Time Estimates**: Automatic delivery time calculation based on distance
- **Product Management**: Add, edit, and manage your food products
- **Order Management**: Track and manage supplier orders
- **Dashboard Analytics**: View sales metrics and business insights

#### 📦 **For Suppliers**
- **Location Registration**: Add precise GPS coordinates for accurate discovery
- **Business Profile Management**: Complete supplier profile with verification system
- **Product Catalog**: Manage your product offerings and inventory
- **Order Processing**: Handle vendor orders efficiently
- **Rating & Reviews**: Build trust through customer feedback system
- **Verification Badge**: Get verified supplier status through admin approval

#### 👨‍💼 **Admin Portal**
- **User Approval System**: Approve/reject vendor and supplier registrations
- **User Management**: View, edit, and manage all platform users
- **Platform Analytics**: Dashboard with user statistics and platform metrics
- **Supplier Verification**: Verify and manage supplier credentials
- **Location Analytics**: View supplier distribution and coverage areas

#### 🌐 **Additional Features**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progressive Web App**: Works offline with cached location data
- **Smart Fallbacks**: Approximate location detection when GPS is unavailable
- **Real-Time Filtering**: Dynamic category and radius filtering with instant results
- **Secure Data Storage**: MongoDB with proper data validation and GeoJSON support
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance Optimized**: Fast loading with optimized image and map rendering
- **Secure Data Storage**: MongoDB with proper data validation and GeoJSON support
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite for fast development and hot reload
- **TailwindCSS 4.0** for modern, responsive styling
- **React Router v7** for client-side routing with data loading
- **React Hook Form** for efficient form management and validation
- **Axios** for API communication with interceptors
- **Leaflet & React-Leaflet v5** for interactive maps and geolocation
- **React Icons** for consistent iconography
- **Browser Geolocation API** for location detection

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM and GeoJSON support for location data
- **JWT** for secure authentication with refresh token rotation
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests
- **Geospatial Queries** for location-based supplier discovery
- **Express Middleware** for authentication and error handling

### Development Tools
- **ES6+ Modules** throughout the project
- **Environment Variables** for configuration
- **RESTful API** design patterns
- **Async/Await** for clean asynchronous code
- **ESLint** for code quality and consistency

### Maps & Location
- **Leaflet** - Open-source mapping library
- **OpenStreetMap** - Free, open-source map tiles
- **Haversine Formula** - Accurate distance calculations
- **GeoJSON** - Standard format for geographic data
- **Custom Map Markers** - Category-specific supplier icons

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (version 9 or higher) - Comes with Node.js
- **MongoDB** (local installation or MongoDB Atlas) - [Setup guide](https://docs.mongodb.com/manual/installation/)
- **Modern Browser** with geolocation support

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ManishKrBarman/Supply-Setu.git
   cd Supply-Setu
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables:**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=3005
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   NODE_ENV=development
   ```

### 🎯 Running the Application

#### Option 1: Quick Start (Recommended)

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application:**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3005
   - **Location Demo**: Open `location-demo.html` in browser

#### Option 2: Development Mode with Auto-Restart

1. **Start backend in development mode:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start frontend in development mode:**
   ```bash
   cd client
   npm run dev
   ```

#### Option 3: Create Admin User First

```bash
cd server
node quick-admin.js
```

### 👤 Default Admin Credentials

After running the admin setup:
- **Email**: admin@supplysetu.com
- **Password**: admin123

### 🔗 Important URLs

- **Frontend**: http://localhost:5173
- **Admin Portal**: http://localhost:5173/admin/login
- **Vendor Dashboard**: http://localhost:5173/dashboard
- **API Health Check**: http://localhost:3005/api/health
- **Location Demo**: Open `location-demo.html` for standalone testing

## 📱 User Roles & Access

### 🛒 **Vendor**
- Register business and manage profile
- Browse and connect with suppliers
- Manage product catalog
- Place and track orders
- Access to vendor dashboard

### 📦 **Supplier**
- Register business and get verified
- Manage product inventory
- Process vendor orders
- Build reputation through ratings
- Access to supplier dashboard

### 👨‍💼 **Admin**
- Approve/reject user registrations
- Manage all platform users
- View platform analytics
- Verify supplier credentials
- Full system access

## 🌟 Project Status

### ✅ **Completed Features**
- [x] **Complete authentication system** (login, register, JWT with refresh tokens)
- [x] **Multi-role user management** (Vendor, Supplier, Admin with role-based access)
- [x] **Admin portal** with user approval workflow and analytics
- [x] **User registration and profile management** with status tracking
- [x] **Role-based access control** and protected route implementation
- [x] **🗺️ Real-time GPS location detection** with permission handling
- [x] **🗺️ Interactive maps with Leaflet** integration and custom markers
- [x] **🗺️ Distance-based supplier search** with configurable radius (5-25km)
- [x] **🗺️ Advanced category filtering** with location context preservation
- [x] **🗺️ Dual view modes** (Interactive Map/Detailed List) for supplier browsing
- [x] **🗺️ Automatic delivery time estimation** based on real distance calculations
- [x] **🗺️ Visual search radius** with circle overlay on interactive maps
- [x] **Responsive UI** with TailwindCSS and mobile-first design
- [x] **MongoDB integration** with GeoJSON support for location data
- [x] **Comprehensive error handling** and user feedback systems
- [x] **RESTful API endpoints** for all operations including geolocation
- [x] **Standalone location demo** for testing and showcase

### 🚧 **In Progress**
- [ ] **Payment Integration**: Stripe/Razorpay for supplier payments
- [ ] **Real-time notifications**: WebSocket integration for order updates
- [ ] **Advanced analytics dashboard**: Revenue and supplier performance metrics
- [ ] **File upload system**: Product images and supplier documents
- [ ] **Order management system**: Complete order lifecycle management

### 🔮 **Planned Features**
- [ ] **Multi-language support**: Hindi and regional language support
- [ ] **Offline functionality**: PWA with offline supplier data caching
- [ ] **Advanced search filters**: Price range, delivery time, ratings
- [ ] **Supplier recommendations**: AI-based supplier matching
- [ ] **Inventory management**: Stock tracking and automatic reorder alerts
- [ ] **Mobile app**: React Native companion app
- [ ] **Vendor community**: Forums and knowledge sharing platform

## 📁 Project Structure

```
supply-setu/
├── 📄 README.md                    # Project documentation
├── 📄 location-demo.html           # Standalone location features demo
├── 🖼️ dashboard.png               # Dashboard screenshot
├── 🖼️ landing.png                 # Landing page screenshot
├── 📁 client/                     # Frontend React application
│   ├── 📁 public/                 # Static assets and favicon
│   ├── 📁 src/
│   │   ├── 📁 admin/              # Admin portal components
│   │   ├── 📁 api/                # API service functions
│   │   │   ├── 📄 authService.js  # Authentication API calls
│   │   │   ├── 📄 supplierService.js # Supplier API with location features
│   │   │   ├── 📄 adminService.js # Admin portal API calls
│   │   │   └── 📄 axios.js        # Axios configuration with interceptors
│   │   ├── 📁 components/         # Reusable UI components
│   │   │   ├── 📄 LocationDetector.jsx # GPS location detection
│   │   │   ├── 📄 SuppliersMap.jsx     # Interactive map with suppliers
│   │   │   ├── 📄 NearbySuppliers.jsx  # Complete location-based UI
│   │   │   ├── 📄 Button.jsx           # Reusable button components
│   │   │   ├── 📄 FormElements.jsx     # Form input components
│   │   │   └── 📄 ProtectedRoute.jsx   # Route protection
│   │   ├── 📁 layouts/            # Page layout components
│   │   │   ├── 📄 DashboardLayout.jsx  # Authenticated user layout
│   │   │   └── 📄 LandingLayout.jsx    # Public pages layout
│   │   ├── 📁 pages/              # Main page components
│   │   │   ├── 📄 LandingPage.jsx      # Homepage with location features
│   │   │   ├── 📄 LoginPage.jsx        # Authentication page
│   │   │   ├── 📄 DashboardPage.jsx    # User dashboard
│   │   │   └── 📄 SuppliersPage.jsx    # Supplier management
│   │   ├── 📁 utils/              # Utility functions
│   │   │   └── 📄 locationService.js   # Location utilities and calculations
│   │   ├── 📄 App.jsx             # Main app component
│   │   ├── 📄 AppRouter.jsx       # Routing configuration
│   │   └── 📄 main.jsx            # Entry point
│   ├── 📄 package.json            # Frontend dependencies
│   ├── 📄 vite.config.js          # Vite configuration
│   └── 📄 tailwind.config.js      # TailwindCSS configuration
│
├── 📁 server/                     # Backend Node.js application
│   ├── 📁 controllers/            # Request handlers
│   │   ├── 📄 userController.js   # User authentication and management
│   │   ├── 📄 supplierController.js # Basic supplier CRUD operations
│   │   ├── 📄 supplierControllerExtended.js # Location-based supplier queries
│   │   └── 📄 adminController.js  # Admin portal operations
│   ├── 📁 middleware/             # Express middleware
│   │   ├── 📄 authMiddleware.js   # JWT authentication
│   │   └── 📄 errorMiddleware.js  # Error handling
│   ├── 📁 models/                 # MongoDB/Mongoose models
│   │   ├── 📄 User.js             # User authentication model
│   │   ├── 📄 Supplier.js         # Supplier model with GeoJSON location
│   │   └── 📄 index.js            # Model exports
│   ├── 📁 routes/                 # API route definitions
│   │   ├── 📄 userRoutes.js       # Authentication and user routes
│   │   ├── 📄 supplierRoutes.js   # Supplier routes with location endpoints
│   │   └── 📄 adminRoutes.js      # Admin portal routes
│   ├── 📄 app.js                  # Express app configuration
│   ├── 📄 quick-admin.js          # Admin user creation script
│   ├── 📄 package.json            # Backend dependencies
│   └── 📄 .env                    # Environment variables
│
└── 📄 .gitignore                  # Git ignore configuration
```

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register/vendor` - Register as vendor with location data
- `POST /api/users/register/supplier` - Register as supplier with GPS coordinates
- `POST /api/users/login` - User login with role-based response
- `GET /api/users/profile` - Get authenticated user profile
- `PUT /api/users/profile` - Update user profile and location

### Admin Portal
- `GET /api/admin/stats` - Platform statistics and analytics
- `GET /api/admin/users/pending` - Pending user approvals
- `PUT /api/admin/users/:id/approve` - Approve user registration
- `PUT /api/admin/users/:id/reject` - Reject user registration
- `GET /api/admin/suppliers/locations` - Supplier location analytics

### Suppliers & Location Features
- `GET /api/suppliers` - Get all suppliers with optional filters
- `GET /api/suppliers/:id` - Get specific supplier by ID
- `GET /api/suppliers/nearby?lat={lat}&lng={lng}&radius={radius}&category={category}` - **🗺️ Location-based supplier search**
- `POST /api/suppliers` - Create new supplier with location
- `PUT /api/suppliers/:id` - Update supplier information
- `DELETE /api/suppliers/:id` - Delete supplier

### Location API Parameters
- **lat** (required): Latitude coordinate (decimal degrees)
- **lng** (required): Longitude coordinate (decimal degrees)  
- **radius** (optional): Search radius in kilometers (default: 10, max: 25)
- **category** (optional): Filter by supplier category
  - `vegetables` - Vegetables & Fruits
  - `spices` - Spices & Condiments
  - `dairy` - Dairy Products
  - `grains` - Grains & Flour
  - `oils` - Cooking Oils
  - `sweets` - Sweets & Snacks

### Example Location API Call
```bash
GET /api/suppliers/nearby?lat=28.6139&lng=77.2090&radius=10&category=vegetables
```

### Response Format
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "supplier_id",
      "name": "Singh Vegetable Supply",
      "category": "vegetables",
      "location": {
        "coordinates": [77.1025, 28.7041],
        "address": "Connaught Place, New Delhi"
      },
      "distance": 2.5,
      "rating": 4.8,
      "deliveryTime": "15-30 mins"
    }
  ],
  "searchParams": {
    "userLocation": {"lat": 28.6139, "lng": 77.2090},
    "radius": 10,
    "category": "vegetables"
  }
}
```

## 🧪 Testing & Development

### Location Features Testing

1. **Standalone Demo**: Open `location-demo.html` in your browser
   - Test GPS detection
   - Try different search radius
   - Filter by categories
   - View interactive maps

2. **Frontend Development**:
   ```bash
   cd client
   npm run dev
   ```

3. **Backend Development**:
   ```bash
   cd server
   npm run dev  # With nodemon for auto-restart
   ```

### Test Admin Creation
```bash
cd server
node quick-admin.js
```

### Test API Endpoints
```bash
# Test location endpoint
curl "http://localhost:3005/api/suppliers/nearby?lat=28.6139&lng=77.2090&radius=10"
```

### Browser Requirements
- **Location Services**: Enable GPS/location access for full functionality
- **Modern Browser**: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- **JavaScript**: Must be enabled for map interactions

## 🎯 Key Implementation Highlights

### Location Detection Strategy
1. **Primary**: Browser Geolocation API with high accuracy
2. **Fallback**: IP-based approximate location
3. **Manual**: Allow users to enter location manually
4. **Caching**: Store last known location for faster subsequent loads

### Distance Calculation
- **Haversine Formula**: Accurate earth-surface distance calculation
- **Performance**: Optimized for real-time filtering of 100+ suppliers
- **Precision**: Distance accurate to within 10 meters

### Map Performance
- **Lazy Loading**: Maps load only when needed
- **Marker Clustering**: For areas with many suppliers
- **Responsive Design**: Adapts to screen size automatically
- **Custom Icons**: Category-specific visual markers

### Search Optimization
- **Default Radius**: 10km (optimal for street food vendors)
- **Smart Categories**: Pre-defined categories matching vendor needs
- **Real-time Filtering**: No page refresh required
- **Visual Feedback**: Loading states and error handling

## 🤝 Contributing

We welcome contributions to Supply Setu! Here's how you can help:

### 🚀 Getting Started

1. **Fork the Project**
2. **Create your Feature Branch** 
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes** 
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch** 
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### 🎯 Contribution Guidelines

#### Frontend Development
- Follow React best practices and hooks patterns
- Use TailwindCSS for styling (no custom CSS unless necessary)
- Ensure responsive design for mobile devices
- Test location features on different browsers
- Maintain component reusability

#### Backend Development
- Follow RESTful API conventions
- Use async/await for asynchronous operations
- Implement proper error handling
- Add input validation for all endpoints
- Test geolocation features with real coordinates

#### Location Features
- Test GPS detection across different devices
- Ensure map performance with large datasets
- Validate distance calculations accuracy
- Test offline fallback scenarios

### 🐛 Bug Reports

When reporting bugs, please include:
- Browser version and device type
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (especially for map/location issues)
- Console error messages

### 💡 Feature Requests

We're particularly interested in:
- Mobile app development (React Native)
- Payment gateway integrations
- Advanced analytics and reporting
- Multi-language support
- Offline functionality improvements

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact & Support

- **Project Repository**: [Supply Setu on GitHub](https://github.com/ManishKrBarman/Supply-Setu)
- **Issue Tracker**: [Report Bugs & Request Features](https://github.com/ManishKrBarman/Supply-Setu/issues)
- **Developer**: Manish Kr Barman
- **LinkedIn**: [Connect with Developer](https://linkedin.com/in/manishkrbarman)

## 🙏 Acknowledgments

- **OpenStreetMap** - For free, open-source map data
- **Leaflet** - For the excellent mapping library
- **Tailwind CSS** - For the amazing utility-first CSS framework
- **MongoDB** - For robust database with geospatial support
- **React Community** - For the incredible ecosystem and tools
- **Street Food Vendors** - Our inspiration and target users

---

<div align="center">
  <h3>🍜 Built with ❤️ for the Street Food Vendor Community</h3>
  <p>Empowering local businesses through technology</p>
  
  **⭐ Star this repo if you find it helpful!**
</div>
