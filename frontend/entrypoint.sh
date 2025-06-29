#!/bin/sh

# Replace environment variables in nginx config
envsubst '${APP_BE}' < /etc/nginx/nginx.conf > /tmp/nginx.conf
mv /tmp/nginx.conf /etc/nginx/nginx.conf

# Start nginx
exec nginx -g 'daemon off;' 