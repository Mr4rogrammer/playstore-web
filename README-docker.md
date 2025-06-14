
# Docker Setup Instructions

## Option 1: Local Development (if you already have the code)
```bash
# Build and run the application
docker-compose up --build

# Run in background
docker-compose up -d --build
```

## Option 2: Clone from GitHub and Run
1. First, update the `docker-compose.yml` file and replace:
   - `YOUR_USERNAME` with your GitHub username
   - `YOUR_REPO_NAME` with your repository name

2. Run the git clone service first:
```bash
# Clone the repository
docker-compose --profile clone up git-clone

# Then build and run the app
docker-compose up --build pushnotify-app
```

## Option 3: Direct Clone and Build
```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Build and run with Docker Compose
docker-compose up --build
```

## Access the Application
Once running, your application will be available at:
- http://localhost:3000

## Useful Commands
```bash
# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache
docker-compose up
```
