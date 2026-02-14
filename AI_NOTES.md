# AI_NOTES

## Overview

AI tools were used to accelerate development and assist with implementation patterns.  
All generated outputs were reviewed, tested, and adjusted manually before being used in the final code.

---

## Where AI Was Used

AI was used for:

- Backend structure planning (FastAPI project layout)
- Workflow execution engine design suggestions
- API route boilerplate generation
- Frontend API integration patterns
- UI structure ideas (Tailwind layout)
- Debugging deployment and environment setup issues

---

## What Was Verified Manually

The following were implemented and validated manually:

- Database schema and relationships
- Workflow step execution logic
- LLM integration and fallback behavior
- Health check system
- Frontend state and API wiring
- Deployment configuration and environment variables

---

## LLM Provider Choice

Groq was used because:

- Free tier availability
- Low latency
- Simple API integration

Model Used:
- llama-3.1-8b-instant

---

## Fallback Strategy

A mock AI mode was implemented to ensure:

- Local development without API dependency
- Stability if LLM API fails
- Easier testing

---

## Prompt Design Approach

Prompts were designed to be:

- Short and task-specific
- Deterministic where possible
- Focused on single operations (summarize, extract points, categorize)

---

## Safety Practices

- API keys stored in environment variables
- `.env` files excluded from repository
- Basic validation added before using LLM outputs

---

## Summary

AI was used as a development accelerator, while architecture decisions, debugging, integration, and deployment were handled manually.
