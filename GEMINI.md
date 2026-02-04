# GEMINI.md: Project Overview & Context

This document provides a comprehensive overview of the `nextjs-corporate-site` project for the Gemini AI agent.

## Project Overview

This is a web application built with [Next.js](https://nextjs.org) (using the App Router) and [TypeScript](https://www.typescriptlang.org/). It serves as a corporate website with a protected admin dashboard for managing content, likely blog posts.

**Core Technologies:**

*   **Framework:** Next.js 16+
*   **Language:** TypeScript
*   **Backend & Auth:** [Supabase](https://supabase.com/) is used for the database and user authentication.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Linting:** ESLint

**Architecture:**

*   The project uses the Next.js App Router for routing and layouts.
*   Authentication is handled via Supabase Auth. The application uses the `@supabase/ssr` library to manage sessions on the server-side (in middleware) and the `@supabase/supabase-js` library for client-side interactions.
*   **Security Model:**
    *   A Next.js middleware (`src/middleware.ts`) protects all routes under the `/admin` path. Unauthenticated users are redirected to the `/login` page.
    *   The Supabase database has Row Level Security (RLS) enabled on its tables (e.g., `posts`). This ensures that users can only access and modify data they own, even if the client-side code is compromised.

## Building and Running

The project's `package.json` defines the following scripts for development and production:

*   **Running the development server:**
    ```bash
    npm run dev
    ```
    This will start the application on `http://localhost:3000`.

*   **Creating a production build:**
    ```bash
    npm run build
    ```

*   **Starting the production server:**
    ```bash
    npm run start
    ```

*   **Linting the codebase:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Code Style:** The project follows standard TypeScript and React conventions, enforced by ESLint using the `eslint-config-next` configuration.
*   **Authentication:** All new routes intended for administrators must be placed under the `/admin` directory to be automatically protected by the authentication middleware.
*   **Database Access:** All database queries must go through the Supabase client. Be mindful of the active Row Level Security (RLS) policies. Data modification and retrieval will fail silently if the logged-in user does not have the appropriate permissions for the target row.
*   **Configuration:** Supabase connection details are managed through environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
