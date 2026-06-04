# Serverless Demo App

A simple serverless Node.js application deployed on **Vercel** using 3 free REST APIs — no API keys needed.

## What it demonstrates

- Serverless functions as isolated API endpoints (`/api/*.js`)
- Calling external REST APIs from server-side functions
- Auto-scaling & pay-per-use model (Vercel handles everything)

## REST APIs used

| Function | Route | External API | Cost |
|---|---|---|---|
| Weather | `GET /api/weather` | [Open-Meteo](https://open-meteo.com) | Free, no key |
| Joke | `GET /api/joke` | [JokeAPI](https://jokeapi.dev) | Free, no key |
| Quote | `GET /api/quote` | [Quotable](https://quotable.kurokeita.dev) | Free, no key |

## Project structure

```
serverless-app/
├── api/
│   ├── weather.js   ← Serverless function 1
│   ├── joke.js      ← Serverless function 2
│   └── quote.js     ← Serverless function 3
├── public/
│   └── index.html   ← Frontend UI
├── vercel.json      ← Routing config
└── package.json
```

## Run locally

```bash
npm install
npm run dev          # starts vercel dev on http://localhost:3000
```

## Deploy to Vercel (free)

```bash
npm install -g vercel
vercel login
vercel --prod
```

That's it — Vercel automatically detects the `/api` folder and deploys each file as a serverless function.

## How serverless works here

1. User clicks a button → browser sends `GET /api/weather`
2. Vercel routes the request → spins up `api/weather.js` in an isolated container
3. The function fetches data from the external API
4. Returns JSON → function container is destroyed
5. Next request? A fresh container is spun up again

No persistent server. No idle cost. Auto-scales to any traffic.
