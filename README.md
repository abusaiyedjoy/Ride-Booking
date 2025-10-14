# Ride Booking Management System

🌟 Project Overview
A production-grade, fully responsive, and role-based ride booking platform similar to Uber or Pathao. The application provides distinct user experiences for Riders, Drivers, and Admins with a consistent, polished, and intuitive UI/UX across all devices.

🎯 Key Highlights
Role-Based Access Control: Tailored dashboards for Riders, Drivers, and Admins
Real-time Features: Live ride tracking and status updates
Responsive Design: Optimized for mobile, tablet, and desktop
Production Ready: Comprehensive error handling and data validation
Safety First: Built-in SOS emergency system for rider and driver safety

🚀 Live Deployment
**Live Demo:** [https://ride-booking-management.netlify.app](https://ride-booking-management.netlify.app)

👤 Rider Account:
Email: 143princejoy@gmail.com
Password: 01988084185aA@

🚗 Driver Account:
Email: abu.saidking@gmail.com
Password: 01988084185aA@

👨‍💼 Admin Account:
Email: abusaiyedjoy1@gamail.com
Password: 12345678

✨ Features
🏠 Public Pages

Landing Page: Hero banner, service overview, testimonials, and call-to-action sections
About Us: Company background, mission, and team profiles
Features: Detailed breakdown of platform capabilities
Contact: Validated inquiry form with real-time feedback
FAQ: Searchable knowledge base

👤 Rider Features

Ride Booking: Pickup/destination selection with fare estimation
Live Tracking: Real-time ride monitoring with driver details
Payment Integration: Multiple payment method selection
Ride History: Paginated history with advanced search and filters
Profile Management: Personal information and password updates

🚗 Driver Features

Availability Control: Online/Offline status toggle
Ride Management: Accept/reject requests and update ride statuses
Earnings Dashboard: Visual analytics with daily/weekly/monthly breakdowns
Ride History: Complete transaction history with filtering
Vehicle Management: Update vehicle details and documentation

👨‍💼 Admin Features

User Management: Comprehensive user oversight with block/unblock capabilities
Ride Oversight: Complete ride monitoring with advanced filtering
Analytics Dashboard: Data visualizations for business insights
Driver Approval: Review and approve/suspend driver applications
System Monitoring: Platform-wide statistics and performance metrics

🆘 Safety Features

SOS Emergency System: One-click emergency assistance
Live Location Sharing: GPS-based location broadcasting
Emergency Contacts: Pre-configured trusted contact notifications
Safety Settings: Customizable emergency preferences

🛠️ Technology Stack
Frontend

Framework: React 18+ with TypeScript
State Management: Redux Toolkit + RTK Query
Routing: React Router v6
Styling: Tailwind CSS with responsive utilities
Charts: Recharts for data visualization
Notifications: React Hot Toast
Maps: Leaflet for location services
Geolocation: React Geolocated

Backend

Runtime: Node.js with Express.js
Database: MongoDB with Mongoose ODM
Authentication: JWT + bcrypt
API: RESTful endpoints with validation
File Upload: Multer for document handling

🌐 API Endpoints
Authentication

POST /api/auth/register - User registration
POST /api/auth/login - User login
GET /api/auth/profile - Get user profile
PUT /api/auth/profile - Update profile

Rides

POST /api/rides - Create ride request
GET /api/rides - Get user rides
PUT /api/rides/:id/status - Update ride status
DELETE /api/rides/:id - Cancel ride

Admin

GET /api/admin/users - Get all users
PUT /api/admin/users/:id/status - Update user status
GET /api/admin/analytics - Get platform analytics

🎨 UI/UX Features

Responsive Design: Mobile-first approach with breakpoint optimization
Dark/Light Mode: System preference detection with manual toggle
Loading States: Skeleton loaders for improved perceived performance
Error Handling: User-friendly error messages with retry options
Accessibility: WCAG 2.1 AA compliant with keyboard navigation
Animations: Smooth transitions and micro-interactions
Progressive Web App: Offline support and installable experience

🔒 Security Features

JWT Authentication: Secure token-based authentication
Role-Based Access: Granular permission system
Input Validation: Client and server-side validation
CORS Configuration: Cross-origin request security
Rate Limiting: API endpoint protection
Data Encryption: Sensitive data encryption at rest

🧪 Testing
bash# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm test -- --testNamePattern="Rider"
📱 Browser Support

Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)
Mobile browsers (iOS Safari, Chrome Mobile)

🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open a Pull Request

Coding Standards

Follow TypeScript best practices
Use conventional commit messages
Maintain 80%+ test coverage
Follow component naming conventions

Development Tools

Build Tool: Vite
Linting: ESLint + Prettier
Type Checking: TypeScript
Testing: Jest + React Testing Library
Version Control: Git with conventional commits

Deployment & DevOps

Frontend: Vercel/Netlify
Backend: Railway/Heroku
Database: MongoDB Atlas
CDN: Cloudinary for asset management

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abusaiyedjoy/Ride-Booking.git
   cd Ride-Booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
   VITE_SOCKET_URL=ws://localhost:5000
  (check env.example)
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── forms/          # Form components
│   └── charts/         # Chart components
├── pages/              # Page components
│   ├── public/         # Public pages (landing, about, etc.)
│   ├── auth/           # Authentication pages
│   ├── rider/          # Rider dashboard pages
│   ├── driver/         # Driver dashboard pages
│   └── admin/          # Admin dashboard pages
├── redux/              # Redux store configuration
│   ├── store.ts        # Store setup
│   └── features/       # Feature-based slices
│       ├── auth/       # Authentication slice
│       ├── rides/      # Ride management slice
│       └── users/      # User management slice
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── assets/             # Static assets
└── lib/                # Third-party library configurations
```
