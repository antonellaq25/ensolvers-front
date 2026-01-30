#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Notes App - Startup Script${NC}"
echo -e "${BLUE}========================================${NC}"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js
echo -e "\n${YELLOW}Checking prerequisites...${NC}"
if ! command_exists node; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo -e "Please install Node.js v24.12.0 or higher"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Node.js version: $NODE_VERSION${NC}"

# Check npm
if ! command_exists npm; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✓ npm version: v$NPM_VERSION${NC}"

# Check PostgreSQL
if ! command_exists psql; then
    echo -e "${YELLOW}⚠ Warning: PostgreSQL CLI (psql) not found in PATH${NC}"
    echo -e "${YELLOW}  Make sure PostgreSQL is installed and running${NC}"
else
    echo -e "${GREEN}✓ PostgreSQL is available${NC}"
fi

# Setup Backend
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}  Setting up Backend${NC}"
echo -e "${BLUE}========================================${NC}"

cd backend || { echo -e "${RED}Error: backend directory not found${NC}"; exit 1; }

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠ No .env file found in backend directory${NC}"
    echo -e "${YELLOW}Creating .env file...${NC}"
    echo 'DATABASE_URL="postgresql://antonellaquintana@localhost:5432/ensolvers_db"' > .env
    echo 'PORT=3000' >> .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}⚠ Please update DATABASE_URL in backend/.env with your PostgreSQL credentials${NC}"
fi

# Install backend dependencies
if [ ! -d "node_modules" ]; then
    echo -e "\n${YELLOW}Installing backend dependencies...${NC}"
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Backend dependencies installed${NC}"
    else
        echo -e "${RED}Error: Failed to install backend dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
fi

# Generate Prisma Client
echo -e "\n${YELLOW}Generating Prisma Client...${NC}"
npm run prisma:generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Prisma Client generated${NC}"
else
    echo -e "${RED}Error: Failed to generate Prisma Client${NC}"
    exit 1
fi

# Check if database exists and run migrations
echo -e "\n${YELLOW}Setting up database...${NC}"
echo -e "${YELLOW}Running migrations...${NC}"
npx prisma migrate deploy 2>/dev/null

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠ Migration deployment failed. Trying migrate dev...${NC}"
    npx prisma migrate dev

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Database migrations applied${NC}"
    else
        echo -e "${RED}Error: Failed to apply migrations${NC}"
        echo -e "${YELLOW}Please ensure:${NC}"
        echo -e "  1. PostgreSQL is running"
        echo -e "  2. Database exists (or run: createdb ensolvers_db)"
        echo -e "  3. DATABASE_URL in .env is correct"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Database migrations applied${NC}"
fi

# Setup Frontend
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}  Setting up Frontend${NC}"
echo -e "${BLUE}========================================${NC}"

cd ../front || { echo -e "${RED}Error: front directory not found${NC}"; exit 1; }

# Install frontend dependencies
if [ ! -d "node_modules" ]; then
    echo -e "\n${YELLOW}Installing frontend dependencies...${NC}"
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
    else
        echo -e "${RED}Error: Failed to install frontend dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi

# Start the application
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}  Starting Application${NC}"
echo -e "${BLUE}========================================${NC}"

cd ..

# Function to cleanup background processes on script exit
cleanup() {
    echo -e "\n\n${YELLOW}Shutting down servers...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo -e "${GREEN}✓ Backend server stopped${NC}"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo -e "${GREEN}✓ Frontend server stopped${NC}"
    fi
    exit 0
}

trap cleanup INT TERM

# Start backend server
echo -e "\n${YELLOW}Starting backend server...${NC}"
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..
sleep 3

if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✓ Backend server started on http://localhost:3000${NC}"
else
    echo -e "${RED}Error: Failed to start backend server${NC}"
    echo -e "${YELLOW}Check backend.log for details${NC}"
    exit 1
fi

# Start frontend server
echo -e "\n${YELLOW}Starting frontend server...${NC}"
cd front
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
sleep 3

if ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${GREEN}✓ Frontend server started on http://localhost:5173${NC}"
else
    echo -e "${RED}Error: Failed to start frontend server${NC}"
    echo -e "${YELLOW}Check frontend.log for details${NC}"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Display success message
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  Application Started Successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "\n${BLUE}Backend API:${NC}  http://localhost:3000"
echo -e "${BLUE}Frontend App:${NC} http://localhost:5173"
echo -e "\n${YELLOW}Logs:${NC}"
echo -e "  Backend:  ./backend.log"
echo -e "  Frontend: ./frontend.log"
echo -e "\n${YELLOW}Press Ctrl+C to stop all servers${NC}\n"

# Keep script running and tailing logs
tail -f backend.log frontend.log
