# Workflow Builder Lite

A lightweight AI-native workflow automation web app that allows users to build, run, and track simple multi-step text processing workflows powered by LLMs.

Live Demo: [(https://work-flow-ai-seven.vercel.app/)](https://work-flow-ai-seven.vercel.app/)  
Backend API: [(https://workflow-builder-backend-jecf.onrender.com)](https://workflow-builder-backend-jecf.onrender.com)

---

## Overview

Workflow Builder Lite is a small automation runner designed to demonstrate how modular AI workflows can be created and executed in a production-style full stack application.

Users can:
- Create workflows with multiple processing steps
- Run workflows on input text
- View step-by-step outputs
- View recent run history
- Check system health (backend, database, LLM)

---

## Features

### Workflow Builder
Create workflows using steps like:
- Clean Text
- Summarize
- Extract Key Points
- Tag Category

### Workflow Runner
- Execute workflows on input text
- View output of each step
- View final combined output

### Run History
- Stores last 5 workflow executions
- Allows viewing past outputs

### System Status Page
Shows health of:
- Backend API
- Database
- LLM connection

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Groq LLM API (Llama models)

### Hosting
- Frontend: Vercel
- Backend: Render

---

## AI Integration

The application uses Groq-hosted LLM models for:
- Text summarization
- Key point extraction
- Text categorization

A mock fallback mode is also implemented for resilience and local testing.

---

## Project Structure

```
workflow-builder-lite/
  backend/
    app/
    requirements.txt
    .env.example
  frontend/
    src/
    .env.example
```

---

## Local Setup

### Backend

```
cd backend
python -m venv venv
venv\Scripts\activate   (Windows)
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)

```
DATABASE_URL=sqlite:///./workflow.db
AI_MODE=real
LLM_PROVIDER=groq
LLM_API_KEY=your_key_here
```

---

### Frontend (.env)

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

---

## Hosting Notes

- Render free tier may sleep after inactivity (first request may take ~30 seconds)
- SQLite is used for simplicity

---

## Error Handling

The system includes:
- Backend health endpoint
- LLM connection test
- Safe fallback to mock AI mode
- Basic input validation

---

## What Is Implemented vs Not Implemented

### Implemented
- Workflow creation
- Workflow execution
- Step output tracking
- Run history storage
- LLM integration
- Health monitoring
- Deployment

### Not Implemented (Out of Scope)
- User authentication
- Multi-user workflow isolation
- Production database (Postgres)
- Advanced workflow editor UI

---

## About

This project was built as part of a technical hiring task to demonstrate:
- Full stack development
- AI workflow integration
- Production-style architecture
- Deployment and system reliability thinking

---

## Author

Arshwin Sajeevan  

