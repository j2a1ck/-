# cms-with-nest.js

A lightweight, extensible content management system (CMS) built with NestJS and TypeScript. This repository demonstrates a CMS structure with server-side rendering using Handlebars, a REST API, authentication, and admin features — designed for easy extension and deployment.

About
-----

cms-with-nest.js is intended as a starting point for building a production-capable CMS using NestJS. It focuses on a modular architecture, clear separation between HTTP/API and view layers (Handlebars), and common CMS needs (pages, posts, users, roles, media).

Features
--------

- NestJS backend (TypeScript-first)
- Handlebars server-side templates for send forget password email
- REST API for content
- Authentication (JWT-based)
- Role-based authorization (Admin / Editor / Viewer)
- Extensible modules: pages, posts, users, media, settings
- Configurable via environment variables
- Docker-friendly for local development and deployments
- Swagger/OpenAPI docs (if enabled in code)

Quick start
-----------

Prerequisites

- Node.js 18+ (or the version specified in .nvmrc)
- pnpm or npm

Clone and install

1. Clone the repo
   git clone <https://github.com/j2a1ck/cms-with-nest.js.git>
   cd cms-with-nest.js

2. Install dependencies
   pnpm install

3. Copy or create environment variables
   cp .env.example .env

   # Edit .env and set database url, JWT secret, etc

4. Run database migrations (if applicable)
   npm run migration:run

   # or the equivalent in your repository

5. Start in development mode
   pnpm run start:dev

   # Server should be available at <http://localhost:4000> (or PORT in .env)

Available scripts
-----------------

- pnpm run start — run built app
- pnpm run start:dev — start with hot-reloading (ts-node / nodemon)
- pnpm run build — compile TypeScript to JavaScript
- pnpm run lint — run linters
- pnpm run format — run code formatter (prettier)
- pnpm run test — run tests (Jest)
- pnpm run test:watch — run tests in watch mode

Testing
-------

- Unit and integration tests are run via Jest (npm run test).
- For database-backed tests, use a test database or in-memory db setup (configure via env/test config).
- Add tests for each module (controllers, services, pipes, guards).

Contributing
------------

Contributions are welcome. A simple process:

1. Fork the repo
2. Create a branch: feature/your-short-description
3. Implement changes with tests
4. Lint and format
5. Open a pull request describing your change

Please follow the existing code style and add tests for meaningful behavior changes.

License
-------

MIT — see LICENSE file for details.
