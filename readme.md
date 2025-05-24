name: Update README

on:
  workflow_dispatch:

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Update README.md
        run: |
          cat > README.md << 'EOF'
# 🚀 DevOps Technical Challenge Submission  
**Author:** Amrit Khokhar  
**Deadline:** May 24, 2025, 23:59:59  

---

## 🎯 Objective  
Fork the given project and deploy the **frontend** and **backend** applications using two separate servers.  
Tasks include:
- Dockerizing the applications  
- Setting up a reverse proxy using NGINX  
- Automating deployment using GitHub Actions (CI/CD)

---

## 🏗️ Architecture

\`\`\`
          [ User Browser ]
                 |
                 v
          [ Frontend EC2 ]
            - Docker (Frontend)
            - NGINX (Reverse Proxy)
                 |
         ┌───────┴────────┐
         |                |
         v                v
 [ Route / → localhost:3000 ]  
 [ Route /api → Backend EC2:4000 ]

        [ Backend EC2 ]
        - Docker (Backend API)
\`\`\`

---

## 🧾 Requirements Checklist

### ✅ 1. Server Setup

- Two EC2 instances:
  - **Frontend Server:** `t2.micro`, Amazon Linux 2
  - **Backend Server:** `t2.micro`, Amazon Linux 2
- Security Groups:
  - Ports **22** (SSH) and **80** (HTTP) open
- Docker Installation:

\`\`\`bash
sudo dnf update -y
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
sudo reboot
\`\`\`

---

### ✅ 2. Containerization

**Dockerfiles:**
- `CI-Frontend/Dockerfile` (multi-stage build for React frontend)
- `CI-Backend/Dockerfile` (Node.js backend)

**Build & Push to Docker Hub:**

\`\`\`bash
# Frontend
docker build -t <docker-username>/frontend-app:latest ./CI-Frontend
docker push <docker-username>/frontend-app:latest

# Backend
docker build -t <docker-username>/backend-app:latest ./CI-Backend
docker push <docker-username>/backend-app:latest
\`\`\`

**Run Containers:**

- **Frontend (Server 1):**
\`\`\`bash
docker run -d -p 3000:80 --name frontend-container <docker-username>/frontend-app:latest
\`\`\`

- **Backend (Server 2):**
\`\`\`bash
docker run -d -p 4000:4000 --env-file .env --name backend-container <docker-username>/backend-app:latest
\`\`\`

---

### ✅ 3. Reverse Proxy (NGINX on Frontend Server)

**Install NGINX:**
\`\`\`bash
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
\`\`\`

**Create file** `/etc/nginx/conf.d/backend-proxy.conf`:

\`\`\`nginx
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
\`\`\`

**Test and reload:**
\`\`\`bash
sudo nginx -t
sudo systemctl reload nginx
\`\`\`

---

### ✅ 4. CI/CD Pipeline (GitHub Actions)

**Workflow Triggers:**
- On `push` to `main` branch:
  - Builds Docker images
  - Pushes to Docker Hub
  - SSH into EC2 servers to redeploy containers

**Secrets Used:**
- \`DOCKER_USERNAME\`, \`DOCKER_PASSWORD\`
- \`FRONTEND_SSH_PRIVATE_KEY\`, \`BACKEND_SSH_PRIVATE_KEY\`
- \`FRONTEND_SERVER_IP\`, \`BACKEND_SERVER_IP\`
- \`SSH_USER\`

Secrets securely injected using GitHub Secrets and \`ssh-agent\`.

---

### ✅ 5. Secret Management

- **Backend Environment Variables:**
  - Stored in \`.env\` file
  - Injected securely with \`--env-file\` flag
- **GitHub Actions Secrets:**
  - All sensitive values handled through encrypted GitHub Secrets

---

## 📦 Deliverables

| Deliverable                          | Status     |
|-------------------------------------|------------|
| Dockerfiles for frontend/backend    | ✅ Done     |
| NGINX reverse proxy config          | ✅ Done     |
| CI/CD GitHub Actions workflow       | ✅ Done     |
| .env file for backend               | ✅ Done     |
| Video explanation (Loom)            | ✅ [Insert link here] |

---

---

## ✅ Conclusion

This project demonstrates a complete end-to-end DevOps pipeline:
- CI/CD with GitHub Actions
- Dockerized microservices
- Reverse proxy with NGINX
- Environment variable handling
- Automated deployments on AWS

EOF
