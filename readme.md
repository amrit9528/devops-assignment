# DevOps Technical Challenge

## Objective
Deploy a frontend and backend application using two separate servers, containerize the applications, set up a reverse proxy, and implement CI/CD automation.

## Architecture
- Two separate servers (EC2 instances t2.micro or local VMs)
- Server 1: Frontend + NGINX reverse proxy
- Server 2: Backend API
- All applications containerized with Docker
- CI/CD pipeline to automate deployment

## Requirements

### 1. Server Setup
- Provision 2 EC2 instances (t2.micro Free Tier) or local VMs

### 2. Containerization
- Dockerize backend API and Build the Frontend for Prod
- Frontend container runs on Server 1
- Backend container runs on Server 2

### 3. Reverse Proxy
- Set up NGINX on the frontend server to:
  - Route `/` requests to the frontend container
  - Route `/api` requests to the backend server

### 4. CI/CD Pipeline
- Implement GitHub Actions (or similar) to:
  - Build Docker images when code is pushed
  - Push images to Docker Hub
  - Deploy to the respective servers automatically

### 5. Secret Management
- Implement secure handling of environment variables and secrets:
  - Store sensitive information (API keys, database credentials, etc.) as environment variables
  - Use GitHub Secrets or any other for CI/CD pipeline credentials
  - Demonstrate secure method to inject environment variables into containers

## Deliverables

Submit a GitHub repository containing:

1. **Dockerfiles** for the application.
2. **NGINX configuration** for the reverse proxy
3. **CI/CD configuration** files
4. **README.md** with setup and deployment instructions
5. **Video** of you explaining the whole architecture and flow. (You can use LOOM to showcase)
