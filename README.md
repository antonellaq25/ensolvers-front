# Notes App - Frontend

A modern Single Page Application (SPA) for managing notes with categories, built with React, TypeScript, and Redux Toolkit.

## Tech Stack

- **Runtime**: Node.js v24.12.0
- **Package Manager**: npm v11.6.2
- **Framework**: React v19.2.0
- **Language**: TypeScript v5.9.3
- **Build Tool**: Vite v7.2.4
- **State Management**: Redux Toolkit v2.11.2
- **Styling**: Tailwind CSS v3.4.17
- **HTTP Client**: Axios v1.13.4

## Features

- Create, edit, and delete notes
- Archive/unarchive notes
- List active notes
- List archived notes
- Add/remove categories to notes
- Filter notes by category
- Category management

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**: v24.12.0 or higher
- **npm**: v11.6.2 or higher

## Installation

1. Navigate to the frontend directory:
```bash
cd front
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The frontend is configured to connect to the backend API at `http://localhost:3000/api`.

If your backend runs on a different port, update the `baseURL` in `src/services/api.ts`:

```typescript
export const api = axios.create({
  baseURL: 'http://localhost:YOUR_PORT/api',
})
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

```bash
npm run build
npm run preview
```

## State Management

The application uses Redux Toolkit for state management with the following slices:
- **Notes slice**: Manages note state (active/archived notes, selected note)
- **Categories slice**: Manages category state and filtering

## API Integration

The frontend communicates with the backend REST API using Axios. All API calls are centralized in the `src/services/api.ts` file.

### API Service Structure
```typescript
- GET /api/notes - Fetch all notes
- POST /api/notes - Create a note
- PUT /api/notes/:id - Update a note
- DELETE /api/notes/:id - Delete a note
- PATCH /api/notes/:id/archive - Archive a note
- PATCH /api/notes/:id/unarchive - Unarchive a note
```