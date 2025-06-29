# Knovel Example – Fullstack Task Management

## Overview

This project is a fullstack task management system with:
- **Backend:** NestJS (Node.js, TypeScript, PostgreSQL)
- **Frontend:** React (Vite, Ant Design, TypeScript)
- **Role-based access:** Employer & Employee
- **Dockerized** for easy local development and deployment
- **Authentication:** JWT-based with refresh tokens
- **Database:** PostgreSQL with TypeORM migrations and seeding

---

## Features

### Backend Features
- **Authentication & Authorization**
  - JWT-based authentication with refresh tokens
  - Role-based access control (EMPLOYER, EMPLOYEE)
  - Session management
  - Email/password login

- **Task Management**
  - CRUD operations for tasks
  - Task assignment to employees
  - Task status tracking
  - Pagination and filtering
  - Employee task summary (for employers)

- **User Management**
  - Employee creation and management (employers only)
  - User role management
  - User status tracking

- **API Documentation**
  - Swagger/OpenAPI documentation
  - Available at `/api/docs` when running

### Frontend Features
- **Modern UI/UX**
  - Ant Design components
  - Responsive design
  - Dark/light theme support

- **Authentication**
  - Login/logout functionality
  - Route protection based on roles
  - Persistent user sessions

- **Task Management Interface**
  - Task listing with pagination
  - Task creation and editing
  - Advanced filtering and search
  - Role-based UI (employers see more options)

- **Employee Management** (Employers only)
  - Employee listing and search
  - Employee creation and editing
  - Employee task summary dashboard

---

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user info
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - User logout

### Tasks
- `GET /api/v1/tasks` - Get all tasks (with pagination/filtering)
- `POST /api/v1/tasks` - Create new task (EMPLOYER only)
- `GET /api/v1/tasks/:id` - Get task by ID
- `PATCH /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task (EMPLOYER only)
- `GET /api/v1/tasks/summary` - Get employee task summary (EMPLOYER only)

### Users
- `GET /api/v1/users` - Get all users (EMPLOYER only)
- `POST /api/v1/users/create-employee` - Create employee (EMPLOYER only)
- `GET /api/v1/users/employees` - Get all employees (EMPLOYER only)
- `PATCH /api/v1/users/:id` - Update user (EMPLOYER only)
- `DELETE /api/v1/users/:id` - Delete user (EMPLOYER only)

---

## Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose installed
- Node.js (for local development, optional)

---

## Quick Start with Docker

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd knovel-example
```

### 2. Environment Variables

#### Backend

- Copy the example env file and adjust if needed:
  ```bash
  cd backend
  cp env-example .env
  ```
- Default database settings are for Docker (PostgreSQL service).

#### Frontend

- Copy the example env file and adjust if needed:
  ```bash
  cd ../frontend
  cp env.example .env
  ```
- Set `APP_BE` to your backend URL:
  - For local Docker:  
    `APP_BE=http://host.docker.internal:3000`
  - For production:  
    `APP_BE=https://your-backend-domain.com`
  - For Docker Compose with both services:  
    `APP_BE=http://backend:3000`

### 3. Build & Run with Docker Compose

#### Option 1: Run Backend and Frontend Separately

**Backend:**
```bash
cd backend
docker-compose up --build
```
- Backend will be available at [http://localhost:3000](http://localhost:3000)
- API Documentation: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

**Frontend:**
```bash
cd ../frontend
docker-compose up --build
```
- Frontend will be available at [http://localhost:3001](http://localhost:3001)

#### Option 2: Run Both with a Single Docker Compose (Recommended for Production)

- Use the provided root `docker-compose.yml` (if available) to run all services in one network.
- In this case, set `APP_BE=http://backend:3000` in the frontend `.env`.

---

## Environment Variable: `APP_BE`

- `APP_BE` tells the frontend where to find the backend API.
- **Local Docker (Mac/Windows):**  
  `APP_BE=http://host.docker.internal:3000`
- **Production:**  
  `APP_BE=https://your-backend-domain.com`
- **Docker Compose (same network):**  
  `APP_BE=http://backend:3000`  
  (where `backend` is the service name in `docker-compose.yml`)

You can also use the backend's internal IP if both containers are on the same Docker network.

---

## Database

- Uses PostgreSQL (Dockerized)
- Data is persisted in a Docker volume (`postgres_data`)
- Automatic migrations and seeding on container startup

### Database Schema
- **Users**: User accounts with roles and status
- **Tasks**: Task management with assignments
- **Sessions**: User session management
- **Roles**: Role definitions (EMPLOYER, EMPLOYEE)
- **Statuses**: Status definitions for users and tasks

---

## Migrations & Seed

- On backend container startup, migrations and seed scripts are run automatically.
- You can also run them manually:
  ```bash
  docker exec -it <backend-container-name> yarn migration:run
  docker exec -it <backend-container-name> yarn seed:run
  ```

### Default Seed Data
- 30 fake employee users
- Default roles (EMPLOYER, EMPLOYEE)
- Default statuses

---

## Development (without Docker)

### Backend Development
```bash
cd backend
npm install
cp env-example .env
# Update DATABASE_HOST=localhost in .env
npm run migration:run
npm run seed:run
npm run start:dev
```

### Frontend Development
```bash
cd frontend
npm install
cp env.example .env
# Set APP_BE=http://localhost:3000 in .env
npm run dev
```

---

## Project Structure

```
knovel-example/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication & authorization
│   │   ├── users/          # User management
│   │   ├── tasks/          # Task management
│   │   ├── roles/          # Role management
│   │   ├── session/        # Session management
│   │   └── database/       # Database config, migrations, seeds
│   ├── docker-compose.yaml # Backend services
│   └── env-example         # Environment variables template
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── containers/     # Page containers
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── hocs/           # Higher-order components
│   │   └── swagger-api/    # Auto-generated API client
│   ├── docker-compose.yml  # Frontend service
│   └── env.example         # Environment variables template
└── README.md              # This file
```

---

## Authentication Flow

1. **Login**: User provides email/password
2. **Token Generation**: Backend returns access token + refresh token
3. **Token Storage**: Frontend stores tokens in memory/localStorage
4. **API Calls**: Frontend includes access token in Authorization header
5. **Token Refresh**: When access token expires, frontend uses refresh token
6. **Logout**: Frontend clears tokens, backend invalidates session

---

## Role-Based Access Control

### EMPLOYER Role
- Can create, edit, delete tasks
- Can manage employees (create, edit, delete)
- Can view employee task summaries
- Full access to all features

### EMPLOYEE Role
- Can view assigned tasks
- Can update task status
- Limited access to user management features

---

## Troubleshooting

### Common Issues

- **Frontend cannot connect to backend:**  
  Check `APP_BE` in frontend `.env` and ensure backend is accessible from the frontend container.

- **Database connection errors:**  
  Ensure PostgreSQL service is running and credentials in backend `.env` match the Docker Compose setup.

- **Authentication issues:**  
  Check JWT secrets in backend `.env` and ensure tokens are properly stored in frontend.

- **CORS errors:**  
  Backend has CORS enabled by default. For production, configure allowed origins in backend config.

### Development Tips

- **API Documentation**: Visit `http://localhost:3000/api/docs` for interactive API documentation
- **Database Access**: Use Adminer or any PostgreSQL client to connect to the database
- **Logs**: Use `docker-compose logs -f` to monitor service logs
- **Hot Reload**: Frontend supports hot reload in development mode

---

## Customization

- **Environment Variables**: Modify `.env` files to change database, authentication, and other settings
- **API Endpoints**: Add new endpoints in backend controllers
- **UI Components**: Extend or modify Ant Design components in frontend
- **Database Schema**: Create new migrations for database changes
- **Authentication**: Extend auth strategies for additional providers (OAuth, etc.)

---

## Testing

### Backend Tests
```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
```

### Frontend Tests
```bash
cd frontend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
```

---

## Deployment

### Production Considerations
- Use production-grade database (managed PostgreSQL service)
- Configure proper CORS settings
- Set up SSL/TLS certificates
- Use environment-specific configuration
- Implement proper logging and monitoring
- Set up CI/CD pipelines

### Docker Production
```bash
# Build production images
docker-compose -f docker-compose.prod.yml up --build
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## License

MIT