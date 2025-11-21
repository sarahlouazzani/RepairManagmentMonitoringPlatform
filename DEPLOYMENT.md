# 🚀 Deployment Guide - Repair Management Monitoring Platform

This guide will help you deploy and run the PGSR application on a new machine from scratch.

## 📋 Prerequisites Checklist

Before starting, ensure you have the following installed on your machine:

### Required Software

- [ ] **Node.js** (v16.x or higher) - [Download](https://nodejs.org/)
- [ ] **npm** (v7.x or higher) - Comes with Node.js
- [ ] **Git** - [Download](https://git-scm.com/)
- [ ] **Podman** OR **Docker** - [Podman Download](https://podman.io/) | [Docker Download](https://www.docker.com/)

### Verify Installations

Open a terminal/PowerShell and run:

```bash
# Check Node.js version
node --version
# Should output: v16.x.x or higher

# Check npm version
npm --version
# Should output: 7.x.x or higher

# Check Git version
git --version
# Should output: git version 2.x.x

# Check Podman (or Docker)
podman --version
# OR
docker --version
```

---

## 🔧 Step-by-Step Installation

### Step 1: Clone the Repository

```bash
# Navigate to your desired directory
cd ~/Desktop
# or
cd C:\Users\YourUsername\Desktop

# Clone the repository
git clone https://github.com/sarahlouazzani/RepairManagmentMonitoringPlatform.git

# Navigate into the project
cd RepairManagmentMonitoringPlatform
```

### Step 2: Install Backend Dependencies

```bash
# Install root/backend dependencies
npm install
```

**Expected output:** You should see packages being installed, ending with "found 0 vulnerabilities" or similar.

### Step 3: Install Frontend Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Go back to root directory
cd ..
```

### Step 4: Setup Database Container

#### Using Podman (Recommended for Linux/WSL):

```bash
# Start MariaDB container
podman run -d \
  --name repair-mysql \
  --tls-verify=false \
  -e MYSQL_ROOT_PASSWORD=yourpassword \
  -e MYSQL_DATABASE=repair_management \
  -p 3306:3306 \
  docker.io/library/mariadb:latest
```

#### Using Docker:

```bash
# Start MariaDB container
docker run -d \
  --name repair-mysql \
  -e MYSQL_ROOT_PASSWORD=yourpassword \
  -e MYSQL_DATABASE=repair_management \
  -p 3306:3306 \
  mariadb:latest
```

#### For Windows PowerShell with Podman:

```powershell
podman run -d --name repair-mysql --tls-verify=false -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=repair_management -p 3306:3306 docker.io/library/mariadb:latest
```

**Wait 10-15 seconds** for the database to initialize before proceeding.

### Step 5: Verify Database is Running

```bash
# Check container status
podman ps
# OR
docker ps

# You should see a container named "repair-mysql" with status "Up"
```

### Step 6: Build Backend TypeScript Code

```bash
# Compile TypeScript to JavaScript
npm run build
```

**Expected output:** TypeScript compilation should complete without errors.

### Step 7: Load Test Data (Optional but Recommended)

This will create test users, devices, tickets, and workflows.

#### For PowerShell:

```powershell
Get-Content "test-data.sql" | podman exec -i repair-mysql mariadb -uroot -pyourpassword repair_management
```

#### For Bash/Linux:

```bash
podman exec -i repair-mysql mariadb -uroot -pyourpassword repair_management < test-data.sql
```

#### Using Docker:

```bash
docker exec -i repair-mysql mariadb -uroot -pyourpassword repair_management < test-data.sql
```

**Verify data was loaded:**

```bash
podman exec repair-mysql mariadb -uroot -pyourpassword repair_management -e "SELECT COUNT(*) FROM user; SELECT COUNT(*) FROM device;"
```

You should see:
- 3 users
- 8 devices

---

## ▶️ Running the Application

### Method 1: Using Two Terminals (Recommended)

#### Terminal 1 - Start Backend:

```bash
# From project root directory
npm start
```

**Expected output:**
```
✅ Database connected successfully
✅ GraphQL endpoint ready at http://localhost:5000/graphql
✅ REST API server running on http://localhost:5000
🚀 Server is ready!
```

**Keep this terminal running!**

#### Terminal 2 - Start Frontend:

Open a **new terminal** in the same project directory:

```bash
# Navigate to frontend directory
cd frontend

# Start React development server
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view frontend in the browser.
  Local:            http://localhost:3001
```

**Keep this terminal running too!**

### Method 2: Using Background Processes (Windows)

#### PowerShell Script:

```powershell
# Start backend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"

# Wait 5 seconds
Start-Sleep -Seconds 5

# Start frontend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"
```

---

## 🌐 Access the Application

Once both servers are running:

1. **Open your web browser**
2. **Navigate to:** http://localhost:3001
3. **Login with test credentials:**
   - **Username:** `admin`
   - **Password:** `testpass123`

### Available URLs:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3001 | Main application UI |
| **Backend API** | http://localhost:5000 | REST API endpoints |
| **GraphQL** | http://localhost:5000/graphql | GraphQL playground |

---

## 🔐 Default User Accounts

The test data includes these users:

| Role | Username | Email | Password |
|------|----------|-------|----------|
| Admin | `admin` | admin@pgsr.com | `testpass123` |
| Technician | `tech1` | tech1@pgsr.com | `testpass123` |
| Technician | `tech2` | tech2@pgsr.com | `testpass123` |

---

## 🛑 Stopping the Application

### Stop Backend and Frontend:
- Press `Ctrl + C` in each terminal window

### Stop and Remove Database Container:

```bash
# Stop the container
podman stop repair-mysql

# Remove the container
podman rm repair-mysql

# (Optional) Remove the image
podman rmi mariadb:latest
```

---

## 🔄 Restarting the Application

If you need to restart after stopping:

### 1. Check if Database Container Exists:

```bash
podman ps -a | grep repair-mysql
```

### 2. Start Existing Container:

```bash
# If container exists but is stopped
podman start repair-mysql
```

### 3. Or Create New Container:

```bash
# If container doesn't exist, run the creation command from Step 4
podman run -d --name repair-mysql --tls-verify=false -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=repair_management -p 3306:3306 docker.io/library/mariadb:latest
```

### 4. Start Backend and Frontend:

Follow the instructions in "Running the Application" section.

---

## 🐛 Troubleshooting

### Issue: "Port 5000 already in use"

**Solution:**

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Kill the process (Linux/Mac)
kill -9 <PID>
```

### Issue: "Port 3001 already in use"

**Solution:**

```bash
# Find and kill process using port 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Issue: "Cannot connect to database"

**Check database container:**

```bash
# Check if container is running
podman ps

# Check container logs
podman logs repair-mysql

# Restart container
podman restart repair-mysql
```

### Issue: "Module not found" errors

**Solution:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Do the same for frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..
```

### Issue: Frontend won't stay running

**Solution (Windows PowerShell):**

```powershell
# Start in a new window that stays open
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\path\to\RepairManagmentMonitoringPlatform\frontend'; `$env:BROWSER='none'; npm start"
```

### Issue: "ECONNREFUSED" when backend starts

**Cause:** Database not ready yet.

**Solution:**
1. Wait 10-15 seconds after starting the database container
2. Restart the backend: `npm start`

### Issue: GraphQL/Apollo errors in frontend

**Solution:**

```bash
# Clear Apollo cache
# In browser console:
localStorage.clear()
# Then refresh the page
```

---

## 📦 Production Deployment

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=repair_management

# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Secret (change this!)
JWT_SECRET=your_very_secure_secret_key_here_change_me

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001
```

### Build for Production

```bash
# Build backend
npm run build

# Build frontend
cd frontend
npm run build
cd ..
```

### Serve Production Build

```bash
# Install serve globally
npm install -g serve

# Serve frontend build
serve -s frontend/build -l 3001

# Backend runs with
npm start
```

---

## 🔒 Security Recommendations

Before deploying to production:

1. **Change Database Password**
   - Use a strong, unique password
   - Update in container creation command and `.env` file

2. **Change JWT Secret**
   - Generate a strong random string
   - Update in `.env` file

3. **Update CORS Settings**
   - In `backend/src/index.ts`, update allowed origins

4. **Use HTTPS**
   - Set up SSL certificates
   - Use a reverse proxy (nginx, Apache)

5. **Create New Users**
   - Remove or change test user passwords
   - Create production admin accounts

---

## 📊 Database Management

### Backup Database:

```bash
# Export database
podman exec repair-mysql mysqldump -uroot -pyourpassword repair_management > backup.sql
```

### Restore Database:

```bash
# Import database
podman exec -i repair-mysql mariadb -uroot -pyourpassword repair_management < backup.sql
```

### Access Database Console:

```bash
# Enter MySQL shell
podman exec -it repair-mysql mariadb -uroot -pyourpassword repair_management
```

---

## 🆘 Getting Help

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review terminal output for error messages
3. Check container logs: `podman logs repair-mysql`
4. Verify all prerequisites are installed correctly
5. Ensure no firewall is blocking ports 3001, 5000, or 3306
6. Open an issue on GitHub with error details

---

## ✅ Quick Start Checklist

- [ ] Install Node.js, npm, Git, and Podman/Docker
- [ ] Clone the repository
- [ ] Install backend dependencies (`npm install`)
- [ ] Install frontend dependencies (`cd frontend && npm install`)
- [ ] Start database container
- [ ] Wait 10-15 seconds for database initialization
- [ ] Load test data
- [ ] Build backend (`npm run build`)
- [ ] Start backend (`npm start`)
- [ ] Start frontend (new terminal: `cd frontend && npm start`)
- [ ] Access http://localhost:3001
- [ ] Login with admin / testpass123

---

## 📞 Support

For questions or issues:
- **GitHub Issues:** https://github.com/sarahlouazzani/RepairManagmentMonitoringPlatform/issues
- **Email:** admin@pgsr.com

---

**Happy Deploying! 🎉**
