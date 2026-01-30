# Notes Application - Full Stack Implementation

A full-stack note-taking application with categories, built as a Single Page Application (SPA) with a REST API backend.

## Overview

This application allows users to create, edit, archive, and categorize notes. It implements both Phase 1 (basic note operations) and Phase 2 (category management and filtering) of the requirements.

## Project Structure

```
ensolvers/
├── backend/          # Express.js + TypeScript + Prisma backend
├── front/            # React + TypeScript + Vite frontend
├── start.sh          # Automated startup script
└── README.md         # This file
```

## Tech Stack

### Backend
- **Runtime**: Node.js v24.12.0
- **Framework**: Express.js v5.2.1
- **Language**: TypeScript v5.9.3
- **ORM**: Prisma v7.3.0
- **Database**: PostgreSQL
- **Architecture**: Layered (Controllers, Services, Routes)

### Frontend
- **Framework**: React v19.2.0
- **Language**: TypeScript v5.9.3
- **Build Tool**: Vite v7.2.4
- **State Management**: Redux Toolkit v2.11.2
- **Styling**: Tailwind CSS v3.4.17
- **HTTP Client**: Axios v1.13.4

## Prerequisites

Before running the application, ensure you have:

- **Node.js**: v24.12.0 or higher
- **npm**: v11.6.2 or higher
- **PostgreSQL**: Latest stable version (running)

## Quick Start

### Option 1: Automated Setup (Recommended)

The easiest way to run the application is using the provided startup script:

```bash
./start.sh
```

This script will:
1. Check all prerequisites (Node.js, npm, PostgreSQL)
2. Install all backend dependencies
3. Generate Prisma Client
4. Apply database migrations
5. Install all frontend dependencies
6. Start both backend and frontend servers
7. Display access URLs and log locations

**Note**: Before running the script for the first time:
1. Ensure PostgreSQL is running
2. Create the database: `createdb ensolvers_db`
3. Update `backend/.env` with your PostgreSQL credentials if needed

### Option 2: Manual Setup

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
# DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
# PORT=3000

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npx prisma migrate dev

# Start backend server
npm run dev
```

Backend will be available at `http://localhost:3000`

#### Frontend Setup

```bash
# Navigate to frontend directory
cd front

# Install dependencies
npm install

# Start frontend server
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Features

### Phase 1 (Implemented)
- ✅ Create notes with title and content
- ✅ Edit existing notes
- ✅ Delete notes
- ✅ Archive/unarchive notes
- ✅ List active notes
- ✅ List archived notes

### Phase 2 (Implemented)
- ✅ Add categories to notes
- ✅ Remove categories from notes
- ✅ Filter notes by category
- ✅ Category management

## API Documentation

### Notes Endpoints
- `GET /api/notes` - Get all active notes
- `GET /api/notes/archived` - Get all archived notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `PATCH /api/notes/:id/archive` - Archive a note
- `PATCH /api/notes/:id/unarchive` - Unarchive a note


## Database Schema

### Tables
- **Note**: Stores note information (id, title, content, isArchived)
- **Category**: Stores category names (id, name)
- **NoteCategory**: Junction table for many-to-many relationship


## Development

### Backend Development
```bash
cd backend
npm run dev        # Start with hot reload
npm run build      # Compile TypeScript
npm start          # Run production build
```

### Frontend Development
```bash
cd front
npm run dev        # Start with hot reload
npm run build      # Build for production
npm run lint       # Run ESLint
```

### Database Management
```bash
cd backend
npx prisma studio         # Open Prisma Studio GUI
npx prisma migrate dev    # Create and apply migrations
npx prisma migrate reset  # Reset database
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
PORT=3000
```

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd front
rm -rf node_modules package-lock.json
npm install
```



## Additional Documentation

- Backend documentation: [backend/README.md](backend/README.md)
- Frontend documentation: [front/README.md](front/README.md)

>>>>>>> 53700ae (feat:add readme files)
