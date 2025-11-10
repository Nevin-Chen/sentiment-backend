# Sentiment-backend

A financial dashboard that integrates live stock market data with Gemini for technical chart analysis. Users can search for any public company to view real time prices, news, and AI generated insights.

![Screenshot](https://res.cloudinary.com/dkdkftvsq/image/upload/v1762795472/CleanShot_2025-11-10_at_12.21.59_2x_borfhb.png)

## Links

- [Deploy](https://sentiment-frontend-seven.vercel.app/)
- [Frontend Repo](https://github.com/Nevin-Chen/sentiment-frontend)
- [Demo Video](https://res.cloudinary.com/dkdkftvsq/video/upload/v1762559760/CleanShot_2025-11-07_at_18.52.18_m8zh7j.mp4)

## Features

- Gemini AI chat assistant for learning chart analysis
- Financial headlines, and company news
- Real time stock prices and company info

## Quick start

1. Clone the project

```bash
  git clone https://github.com/Nevin-Chen/sentiment-backend.git
  cd sentiment-backend
```

2. Install dependencies

```bash
npm install
```

3. Setting up the environment

- Create a .env file in the project root following `.env.example`

4. Local Redis setup with Docker

```bash
# Defaults to port 6379
docker compose up -d
```

5. Build

```bash
npm run build
```

6. Run (local dev)

```bash
npm run dev
```

## Documentation + API Endpoints

[Docs](https://sentiment-backend-pi.vercel.app/docs)

**Local dev**
After setting up and building the project, a `swagger.json` is configured and built. Docs can be read from `http://localhost:8080/docs`

## Technologies

- **Backend:** [TypeScript + Swagger/OpenAPI](https://tsoa-community.github.io/docs/), Node.js, Redis
  - External APIs:
    - [Google Gemini](https://ai.google.dev/gemini-api/docs)
    - [Massive/Polygon.io](https://massive.com/docs/rest/quickstart)
    - [FinancialModelingPrep](https://site.financialmodelingprep.com/developer/docs)
- **Frontend:** React, Vite, TypeScript, Auth0-React
- **Infrastructure:** Vercel, Docker

## Features Roadmap

- Throttle APIs to limit backend calls
- Improve Charting feature
  - Integrate additional visual indicators and timeframes
  - Charting based on AI model feedback
- Implement predictive forecasting service using a LLM
  - Integrate through message queue

**Author:** [Nevin Chen](https://linkedin.com/in/nevin-chen) | [Portfolio](https://nevinchen.dev)
