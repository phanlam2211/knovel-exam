#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "Database is ready!"

# Run migrations
echo "Running migrations..."
npm run migration:run

# Run seeds
echo "Running seeds..."
npm run seed:run

# Start the application
echo "Starting application..."
exec node dist/main 