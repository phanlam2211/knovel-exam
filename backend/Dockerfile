FROM node:20.10.0-alpine
WORKDIR /app
RUN apk add --no-cache bash netcat-openbsd
RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

# Copy and make entrypoint script executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

# Use entrypoint script
ENTRYPOINT ["/entrypoint.sh"]