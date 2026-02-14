# AI Project Management SaaS

A professional AI-first project management web application with intelligent risk prediction, visual QA, test generation, and release insights.

## Features

- **Firebase Authentication**: Google OAuth + Email/Password login with persistent sessions
- **Project Dashboard**: Create and manage projects with real-time Firestore sync
- **AI-Powered Planning**: Risk scoring, task management, and intelligent health summaries
- **Visual QA**: Screenshot comparison and regression detection
- **Test Generation**: AI-powered test case generation from user stories
- **Release Insights**: Executive dashboards with readiness scores and analytics

## Tech Stack

- React 18
- Vite
- Firebase (Auth, Firestore, Storage)
- TailwindCSS
- React Router v6

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Add your Firebase configuration to `.env`:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start development server:
```bash
npm run dev
```

## Firestore Collections

### users/{uid}
- User profile data

### projects/{projectId}
- name: string
- description: string
- ownerId: string
- createdAt: timestamp

### tasks/{taskId}
- projectId: string
- name: string
- assignee: string
- dueDate: string
- storyPoints: number
- status: string
- createdAt: timestamp

## Project Structure

```
src/
├── config/
│   └── firebase.js          # Firebase configuration
├── contexts/
│   └── AuthContext.jsx      # Authentication context
├── services/
│   ├── projectService.js    # Project CRUD operations
│   └── taskService.js       # Task CRUD operations
├── components/
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── workspace/
│       ├── PlanningTab.jsx
│       ├── VisualQATab.jsx
│       ├── TestGenerationTab.jsx
│       └── InsightsTab.jsx
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── ProjectWorkspace.jsx
└── App.jsx
```

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```
