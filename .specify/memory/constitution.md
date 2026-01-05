<!-- SYNC IMPACT REPORT
Version change: N/A (initial version) → 1.0.0
Modified principles: N/A
Added sections: All principles and sections as per user specification
Removed sections: N/A
Templates requiring updates: ⚠ pending review - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
Follow-up TODOs: None
-->

# Todo Full-Stack Web Application Constitution

## Core Principles

### AI-Assisted Development
All code must be generated using AI via Qwen Code CLI; No manual coding is allowed; The developer is only responsible for writing specifications, reviewing AI-generated output, and refining prompts when needed.

### Spec-Driven Development
Specifications come first and control implementation; Code must always match specifications; Specifications are the single source of truth; AI is treated as the implementation agent.

### Full-Stack Next.js Architecture
Frontend and backend are both implemented in Next.js App Router; Backend logic is implemented using Next.js Route Handlers; No separate backend framework or service is used; Single-framework approach for simplicity and maintainability.

### Mandatory Authentication
Authentication is mandatory for all features; Better Auth is used for user signup and signin; Authentication runs inside Next.js; Backend route handlers must verify authenticated users; Users can only access their own data.

### Persistent Data Storage
Persistent storage is required using Neon Serverless PostgreSQL; SQL-based ORM is used; No in-memory or temporary storage is allowed; Data must be reliably stored and retrieved.

### Secure API Design
APIs are implemented using Next.js Route Handlers; REST-style endpoints are used; All API routes must be secured; User identity must be verified on every request; Security is paramount in all implementations.

## Technology Stack Requirements
The project must use the following technology stack:
- Framework: Next.js 16+ (App Router)
- Backend APIs: Next.js Route Handlers
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth
- Spec-Driven Development: AI + Spec-Kit Plus
- All components must integrate seamlessly within the Next.js ecosystem.

## Development Workflow
The following Agentic Dev Stack workflow must be followed:
1. Write specifications using Spec-Kit Plus methodology
2. Generate plan using AI
3. Break plan into tasks
4. Implement using AI (Qwen Code CLI)
5. Review output against specifications
6. Validate implementation against success criteria
This workflow ensures traceability and quality in AI-assisted development.

## Governance
This constitution supersedes all other development practices and must be followed strictly. Amendments require proper documentation and approval. All implementations must verify compliance with these principles. The project is considered successful when the full-stack application works in a single framework, authentication is correctly enforced, APIs are secure and user-scoped, data is stored persistently, specifications clearly guide the implementation, and the AI-driven workflow is visible and traceable.

**Version**: 1.0.0 | **Ratified**: 2025-06-13 | **Last Amended**: 2025-12-30