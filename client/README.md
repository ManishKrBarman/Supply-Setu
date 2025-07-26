# Supply Setu Frontend

This is the React frontend application for Supply Setu, a supply chain management platform for street food vendors.

## Tech Stack

- **React 18** - Modern React with Hooks
- **Vite** - Fast build tool and development server
- **TailwindCSS 4.0** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Axios** - HTTP client for API calls

## Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── admin/              # Admin portal components
├── api/                # API service functions
├── components/         # Reusable UI components
├── layouts/            # Page layout components
├── pages/              # Main page components
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── AppRouter.jsx       # Routing configuration
└── main.jsx            # Entry point
```

## Key Features

### Authentication
- Multi-role authentication (Vendor, Supplier, Admin)
- JWT token management
- Protected routes
- Role-based access control

### Admin Portal
- User approval workflow
- Platform analytics
- User management dashboard

### User Management
- Vendor registration and profile management
- Supplier registration and verification
- Profile updates and status tracking

### Responsive Design
- Mobile-first approach
- TailwindCSS utility classes
- Cross-device compatibility

## API Integration

The frontend communicates with the backend API at `http://localhost:3005/api`

### Available Services

- **authService**: Authentication and user management
- **adminService**: Admin portal operations
- **supplierService**: Supplier-related operations
- **productService**: Product management
- **foodService**: Food catalog operations

## Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:3005/api
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

When contributing to the frontend:

1. Follow React best practices
2. Use TailwindCSS for styling
3. Ensure responsive design
4. Test on multiple screen sizes
5. Follow the existing code structure

## Key Components

### Layouts
- `DashboardLayout.jsx` - Layout for authenticated users
- `LandingLayout.jsx` - Layout for public pages

### Pages
- `LandingPage.jsx` - Homepage
- `LoginPage.jsx` - Authentication
- `DashboardPage.jsx` - User dashboard
- `AnalyticsPage.jsx` - Analytics view

### Admin Portal
- Separate routing structure under `/admin`
- Complete user management interface
- Platform statistics and analytics

For more information, see the main project README.md
