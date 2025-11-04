# Sentiment-backend

The backend to [sentiment-frontend](https://github.com/Nevin-Chen/sentiment-frontend). This provides Gemini's model with stock data to assist users with exploring and learning technical analysis. It also provides live data such as, stock prices, news, and company info for any public company.

## Technologies

- [TypeScript + Swagger/OpenAPI](https://tsoa-community.github.io/docs/) (TSOA)
- Redis
- Docker
- Vercel

**External APIs:**  
- [Google Gemini](https://ai.google.dev/gemini-api/docs)
- [Massive/Polygon.io](https://massive.com/docs/rest/quickstart)
- [FinancialModelingPrep](https://site.financialmodelingprep.com/developer/docs)

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

3. Environment
  Copy `.env.example` to `.env` and set keys as needed.

4. Build
```bash
npm run build
```

5. Run (local dev)
```bash
npm run dev
```

6. Redis setup with Docker (local dev)
```bash
docker compose up -d
```

## API docs / Endpoints

Once the `swagger.json` is configured and built, open `http://localhost:8080/docs` to view and test all available endpoints.

## Features Roadmap

- Add rate limiting for APIs
- Implement predictive forecasting service using a LLM
  - Integrate message queue for service

## Author

**Nevin Chen**  
- [LinkedIn](https://linkedin.com/in/nevin-chen)
