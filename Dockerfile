# Use Nginx as the production server
FROM nginx:1.25.2

# Set the working directory in the container
# skip setting working directory
# workdir /app here is referring the /app in the container image
#WORKDIR /app

# Copy the conf.d to Nginx's web server conf.d
COPY conf.d /etc/nginx/conf.d

# Copy the built React app to Nginx's web server directory
COPY build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]

