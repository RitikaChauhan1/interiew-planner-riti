# Deploy to Render

This repository includes a Render Blueprint in `render.yaml` for the Express API and React frontend. The app needs a persistent MongoDB database and a Google GenAI API key; the local in-memory MongoDB fallback is intentionally disabled in production.

## Before deploying

1. Push the repository to GitHub.
2. Create or select a MongoDB Atlas database, create a database user, and allow connections from Render. Use the Atlas connection string as `MONGO_URI`.
3. Rotate the MongoDB and Google GenAI credentials currently present in the local `Backend/.env` file before deployment. Treat them as exposed; do not commit `.env` files or paste credentials into source files.

## Deploy using the Blueprint

1. In Render, choose **New** → **Blueprint** and select this GitHub repository.
2. Render reads `render.yaml` and creates `interview-ai-api` and `interview-ai-web`.
3. When prompted, provide:
   - `MONGO_URI`: the new MongoDB Atlas connection string.
   - `GOOGLE_GENAI_API_KEY`: a newly generated Google GenAI API key.
   - `CLIENT_ORIGIN`: the frontend's HTTPS URL, for example `https://interview-ai-web.onrender.com`. Once the static site is created, set or confirm this value in the API service's environment settings and redeploy the API.
4. Render generates `JWT_SECRET` and sets `VITE_API_URL` to the API service host.
5. Wait for both services to finish deploying, then open the frontend URL.

The API health check is available at `/health`. Keep the MongoDB Atlas database available: user accounts, logout token records, and interview reports are stored there.

## Local development

The frontend defaults to `http://localhost:3000` for API requests. To override it, set `VITE_API_URL` in `Frontend/.env.local`. Run the API from `Backend` with `npm start` (or `npm run dev`), and run the frontend from `Frontend` with `npm run dev`.
