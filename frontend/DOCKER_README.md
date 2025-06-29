# Frontend Docker Setup

## Overview
This directory contains Docker configuration for the React frontend application.

## Files
- `Dockerfile` - Multi-stage build for React app with Nginx
- `docker-compose.yml` - Docker Compose configuration
- `nginx.conf` - Nginx configuration template with environment variable support
- `entrypoint.sh` - Entrypoint script for environment variable substitution
- `.dockerignore` - Files to exclude from Docker build
- `env.example` - Example environment file

## Environment Variables
Create a `.env` file based on `env.example`:
```bash
# Copy example file
cp env.example .env

# Edit .env file
APP_BE=http://localhost:3000
```

## Usage

### Setup Environment
```bash
# Copy environment file
cp env.example .env

# Edit .env file with your backend URL
# APP_BE=http://your-backend-url:3000
```

### Build and run with Docker Compose
```bash
# Build and start the container
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop the container
docker-compose down
```

### Build and run with Docker directly
```bash
# Build the image
docker build -t frontend-app .

# Run the container with .env file
docker run -p 3001:80 --env-file .env frontend-app
```

### Custom Backend URL
```bash
# Edit .env file
echo "APP_BE=http://your-backend-url:3000" > .env

# Or override in docker-compose
docker-compose up -e APP_BE=http://your-backend-url:3000
```

## Features
- **Multi-stage build**: Optimized production build
- **Nginx server**: High-performance static file serving
- **Environment variables**: Configurable backend URL via .env file
- **API proxy**: Automatic proxy to backend API
- **React Router support**: Client-side routing
- **Gzip compression**: Optimized file delivery
- **Security headers**: Basic security configuration
- **Static file caching**: Long-term caching for static assets

## Ports
- Frontend: http://localhost:3001
- Backend API: Proxied from /api/* to APP_BE/api/*

## Development vs Production
- **Development**: Use `yarn dev` for hot reload
- **Production**: Use Docker for optimized build and deployment

## Environment File Structure
```env
# Backend API URL
APP_BE=http://localhost:3000
``` 