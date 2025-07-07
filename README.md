# User Dashboard Project

This project is a full-stack user management dashboard with authentication, role-based access control, and user CRUD, built with **NestJS** (backend) and **Angular** (frontend). It supports admin/user roles, user registration, login, and a modern UI with PrimeNG.

---

## 🚀 Running the Backend with Docker

1. **Build and start the backend using Docker Compose:**

   ```sh
   docker-compose up --build backend
   ```

   This will build and run the backend service defined in `docker-compose.yml`.

2. **Default Admin Credentials (Seeded):**

   - **Email:** `admin@example.com`
   - **Password:** `admin123`

   The backend seeds this admin user on first run if it does not exist.

---

## 🗂️ Project Structure

### Backend (`/backend`)

- **NestJS** application with modular structure:
  - `src/app.module.ts` — Main app module
  - `src/auth/` — Authentication (JWT, local strategy, guards, role decorators)
  - `src/user/` — User entity, controller, service, role guards, DTOs
  - `src/utils/` — Utility types and transformers
  - **Seeding:** Admin user is seeded on app bootstrap in `user.service.ts`
  - **Role-based access:** Guards and decorators restrict endpoints to admins

### Frontend (`/user-dashboard`)

- **Angular** standalone app with PrimeNG UI:
  - `src/app/auth/` — Auth pages, services, JWT utility, NgRx store
  - `src/app/dashboard/` — Dashboard page, user table, modal dialogs, NgRx store
  - `src/app/core/` — Guards and interceptors
  - `src/app/shared/` — Shared modules/components
  - **State management:** NgRx for user and auth state
  - **UI:** PrimeNG Table, Dialog, Button, modern SCSS styling

---

## 🧑‍💻 Design Decisions

- **NestJS for backend:** Modular, scalable, and easy to secure with guards and decorators.
- **Angular + PrimeNG for frontend:** Fast UI development, modern look, and easy integration with state management (NgRx).
- **JWT authentication:** Secure, stateless, and easy to decode on frontend for role-based UI.
- **Role-based access:** Only admins can create, update, or delete users or change roles.
- **Seeded admin:** Ensures there's always an admin to bootstrap the system.
- **NgRx:** Ensures consistent state management and easier debugging.
- **Modern SCSS:** Custom styles for a clean, responsive dashboard and modal dialogs.

---

## 📝 What More Could Be Done

- **Production-ready Docker:** Add environment variable support, production DB, and secure secrets.
- **User profile page:** Allow users to update their own info and password.
- **Password reset:** Add email-based password reset flow.
- **Audit logging:** Track user changes and log admin actions.
- **Pagination & filtering:** For large user lists.
- **Unit & e2e tests:** Expand test coverage for both backend and frontend.
- **CI/CD:** Add pipelines for automated build, test, and deploy.
- **Accessibility & theming:** Improve accessibility and add dark/light theme toggle.

---
