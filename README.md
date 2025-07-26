# Supply Setu

## About The Project

Supply Setu is a comprehensive supply chain management platform specifically designed for street food vendors. The name "Setu" means "bridge" in Hindi, representing our mission to connect vendors with the best suppliers and ingredients.

![Dashboard](dashboard.png)
![Landing](landing.png)

### Key Features

- **Nearby Suppliers**: Find suppliers in your area with competitive prices
- **Product Price Analytics**: Track and predict prices of essential ingredients
- **Trending Items**: Discover popular street food items and recipes
- **Recipe Ideas**: Access profitable street food recipe suggestions
- **Inventory Management**: Track stock and get alerts for reordering
- **Responsive Design**: Access the system from any device with our responsive interface
- **Secure Authentication**: Protect your data with robust user authentication

## Technology Stack

- **Frontend**: React with Vite, TailwindCSS 4.0
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT with secure token management

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ManishKrBarman/Supply-Setu.git
   ```

2. Install frontend dependencies:
   ```sh
   cd client
   npm install
   ```

3. Install backend dependencies:
   ```sh
   cd ../server
   npm install
   ```

### Running the Application

#### Easy Start (Windows)

Simply run the `start-app.bat` file in the root directory to start both frontend and backend servers.

#### Manual Start

1. Start the frontend development server:
   ```sh
   cd client
   npm run dev
   ```

2. Start the backend server (in a separate terminal):
   ```sh
   cd server
   npm run dev
   ```

3. Access the application at: `http://localhost:5173` (or the port shown in your terminal)

## Development Roadmap

- [x] Create responsive landing page
- [x] Set up component library
- [x] Design authentication screens
- [x] Implement UI for dashboard
- [x] Create product and supplier management interfaces
- [ ] Connect frontend to backend API
- [ ] Implement user authentication
- [ ] Set up database models and controllers
- [ ] Develop real-time analytics
- [ ] Add file upload for product images

## Project Structure

```
supply-setu/
├── client/                  # Frontend React application
│   ├── public/              # Static assets
│   └── src/
│       ├── api/             # API service functions
│       ├── components/      # Reusable components
│       ├── layouts/         # Page layout components
│       ├── pages/           # Page components
│       └── utils/           # Utility functions
│
└── server/                  # Backend Node.js/Express application
    ├── controllers/         # Request handlers
    ├── middleware/          # Express middleware
    ├── models/              # Database models
    └── routes/              # API routes
```

## Screenshots

### Landing Page
![Landing Page](landing.png)

### Dashboard
![Dashboard](dashboard.png)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/ManishKrBarman/Supply-Setu](https://github.com/ManishKrBarman/Supply-Setu)
