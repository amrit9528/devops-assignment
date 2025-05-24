# DevOps Technical Challenge

## Objective
Fork this code and Deploy the frontend and backend application using two separate servers, containerize the applications, set up a reverse proxy, and implement CI/CD automation.

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
- Provision 2 EC2 instances (t2.micro Free Tier) or local VMs
- Instance Details:
  - AMI: Amazon Linux 2
  - Security Group: Open ports 22 (SSH), 80 (HTTP)
- Install Docker on both servers:
  ```bash
  sudo dnf update -y
  sudo dnf install -y docker
  sudo systemctl start docker
  sudo systemctl enable docker
  sudo usermod -aG docker ec2-user
  sudo reboot
# Containerization
##Created separate Dockerfiles:
CI-Frontend/Dockerfile for frontend

CI-Backend/Dockerfile for backend
#Build and push Docker images to Docker Hub:
# Login to Docker Hub
docker login

# Build and push frontend
docker build -t <username>/frontend-app:latest ./CI-Frontend
docker push <username>/frontend-app:latest

# Build and push backend
docker build -t <username>/backend-app:latest ./CI-Backend
docker push <username>/backend-app:latest


