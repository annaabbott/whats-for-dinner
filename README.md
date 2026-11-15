# What's for Dinner

A minimal React + TypeScript app built with Vite, React Router, Axios, ESLint,
and Prettier.

## Getting started

Use Node.js 22.22.0 or newer and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. The app includes Home (`/`), About (`/about`),
and a fallback page for unknown routes.

## Commands

| Command                | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start the development server with hot reload         |
| `npm run build`        | Check TypeScript and build for production in `dist/` |
| `npm run preview`      | Serve the production build locally                   |
| `npm run typecheck`    | Check app and Vite configuration types               |
| `npm run lint`         | Run ESLint with zero warnings allowed                |
| `npm run format`       | Format files with Prettier                           |
| `npm run format:check` | Check formatting without changing files              |

## API configuration

The reusable Axios instance is exported as `api` from `src/lib/api.ts`. It uses
a 10-second timeout and makes no requests until you call it.

Optionally copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to your
backend URL. Restart the dev server after changing environment variables. Without
this setting, relative requests use the app's origin.

```ts
import { api } from './lib/api';

const response = await api.get('/your-endpoint');
```

`VITE_` environment variables are public browser configuration; never store
secrets in them. A backend on another origin must allow requests from the app
through CORS.

## Project layout

- `src/main.tsx`: React entry point and browser router.
- `src/App.tsx`: shared layout, navigation, and route definitions.
- `src/pages/`: Home, About, and Not Found pages.
- `src/lib/api.ts`: shared Axios client.
- `src/styles.css`: global styles.

## Deployment

Run `npm run build` and deploy `dist/` to a static host. Configure the host to
serve `index.html` for application routes such as `/about`, while continuing to
serve static assets normally. This allows direct links and browser refreshes to
work with `BrowserRouter`. `npm run preview` is for local verification.
