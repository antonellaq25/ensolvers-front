# Notes App - Backend

RESTful API backend for the Notes application built with Express.js, TypeScript, and Prisma ORM.

## Tech Stack

- **Runtime**: Node.js v24.12.0
- **Package Manager**: npm v11.6.2
- **Framework**: Express.js v5.2.1
- **Language**: TypeScript v5.9.3
- **ORM**: Prisma v7.3.0
- **Database**: PostgreSQL

## Architecture

The backend follows a layered architecture pattern:
- **Controllers**: Handle HTTP requests/responses (`src/controllers/`)
- **Services**: Business logic layer (`src/services/`)
- **Routes**: API endpoint definitions (`src/routes/`)
- **Prisma**: Database access layer

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**: v24.12.0 or higher
- **npm**: v11.6.2 or higher
- **PostgreSQL**: Latest stable version

## Database Schema

The application uses three models:
- **Note**: Stores note information (title, content, isArchived)
- **Category**: Stores category names
- **NoteCategory**: Junction table for many-to-many relationship

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
PORT=3000  # Optional, defaults to 3000
```

Replace `username`, `password`, and `database_name` with your PostgreSQL credentials.

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Create the database (if not already created)
createdb ensolvers_db

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npx prisma migrate dev
```

## Available Scripts

- `npm run dev` - Start development server with hot reload (tsx watch)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Deploy database migrations

## Running the Application

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:3000`


## API Endpoints

### Notes
- `GET /api/notes` - Get all active notes
- `GET /api/notes/archived` - Get all archived notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `PATCH /api/notes/:id/archive` - Archive a note
- `PATCH /api/notes/:id/unarchive` - Unarchive a note


## Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── routes/           # API routes
│   ├── lib/              # Utilities (Prisma client)
│   ├── app.ts            # Express app configuration
│   └── server.ts         # Server entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── generated/
│   └── prisma/           # Generated Prisma Client
├── .env                  # Environment variables
├── package.json
└── tsconfig.json
```

## Database Management

### View Database
```bash
npx prisma studio
```

### Reset Database
```bash
npx prisma migrate reset
```

### Create Migration
```bash
npx prisma migrate dev --name migration_name
```
