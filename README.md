# Online Learning Tracker - Backend

Node.js/Express backend API for the Online Learning Tracker platform.

## Features

- JWT Authentication with role-based access
- RESTful API endpoints
- MongoDB integration with Mongoose
- Input validation and error handling
- Rate limiting and security middleware
- Course and quiz management
- User profile and analytics

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Validation:** Joi
- **Security:** bcrypt, CORS, Rate limiting

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Environment Setup:**
Create `.env` file:
```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=7d
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

3. **Seed Database:**
```bash
npm run seed
```

4. **Start Server:**
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (instructor/admin)

### Assessments
- `GET /api/assessments/course/:courseId` - Get quiz by course
- `POST /api/assessments/:id/submit` - Submit quiz answers

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats

## Database Models

- **User:** Authentication and profile data
- **Course:** Course information with external links
- **Assessment:** Quiz questions and answers
- **Assignment:** Project assignments
- **Submission:** Assignment submissions

## Demo Accounts

- **Admin:** admin@test.com / password123
- **Instructor:** instructor@test.com / password123
- **Learner:** learner@test.com / password123

## License

MIT