# DevOps Technical Challenge

## Objective
Fork this code and deploy the frontend and backend application using two separate servers, containerize the applications, set up a reverse proxy, and implement CI/CD automation.

## Deadline
**Saturday, May 24th, 2025, 23:59:59**

## Architecture

- Two separate servers (EC2 instances t2.micro or local VMs)
- Server 1: Frontend + NGINX reverse proxy
- Server 2: Backend API
- All applications containerized with Docker
- CI/CD pipeline to automate deployment

## Requirements

### 1. Server Setup

- Launch two EC2 instances:
  - Name: frontend-server and backend-server
  - AMI: Amazon Linux 2
  - Instance Type: t2.micro
  - Security Group: Open ports 22 (SSH), 80 (HTTP)

- Install Docker on both servers:

sudo dnf update -y
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
sudo reboot

### 2. Containerization

Created separate Dockerfiles:
- CI-Frontend/Dockerfile for frontend
- CI-Backend/Dockerfile for backend

Build and push Docker images to Docker Hub:

docker login

# Build and push frontend
docker build -t <username>/frontend-app:latest ./CI-Frontend
docker push <username>/frontend-app:latest

# Build and push backend
docker build -t <username>/backend-app:latest ./CI-Backend
docker push <username>/backend-app:latest

Run containers on respective servers:

Frontend (Server 1):

docker run -d -p 3000:80 --name frontend-container <username>/frontend-app:latest

Backend (Server 2):

docker run -d -p 4000:4000 --env-file .env --name backend-container <username>/backend-app:latest

### 3. Reverse Proxy

Install NGINX on frontend server:

sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

Create reverse proxy config /etc/nginx/conf.d/backend-proxy.conf:

server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }

    location /api/ {
        proxy_pass http://<BACKEND_SERVER_PUBLIC_IP>:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}

Test and reload NGINX:

sudo nginx -t
sudo systemctl reload nginx

### 4. CI/CD Pipeline

GitHub Actions configured to:
- Build and push Docker images on push to main
- SSH into respective servers and redeploy containers

CI/CD Secrets Used:
- DOCKER_USERNAME
- DOCKER_PASSWORD
- FRONTEND_SERVER_IP
- BACKEND_SERVER_IP
- FRONTEND_SSH_PRIVATE_KEY
- BACKEND_SSH_PRIVATE_KEY
- SSH_USER

### 5. Secret Management

- Used .env file for the backend container
- Stored all sensitive variables in GitHub Secrets
- Base64-encoded PEM SSH keys and injected into CI/CD workflow
- Used --env-file .env flag in Docker to securely inject secrets at runtime

## Bonus Points - OPTIONAL

- Automated test cases in CI pipeline
- Kubernetes deployment with manifests for deployments, services, secrets, etc.
- Basic monitoring and alerting integration

## Deliverables

- ✅ Dockerfiles for the frontend and backend apps
- ✅ NGINX configuration for reverse proxy
- ✅ GitHub Actions workflow for CI/CD
- ✅ .env file with environment variables
- ✅ A video (e.g., Loom) explaining the architecture and working demo

## Author

**Amrit Khokhar**
