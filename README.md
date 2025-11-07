# Sentiment-backend

The backend to [sentiment-frontend](https://github.com/Nevin-Chen/sentiment-frontend). The main feature wraps Gemini's model with stock data to assist users with exploring and learning technical analysis. It also provides live stock prices, news, and company info for any public company.

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

## Documentation + API Endpoints
[Docs](https://sentiment-backend-pi.vercel.app/docs)  
If setting up locally, once the `swagger.json` is configured and built, it can be read from `http://localhost:8080/docs`

## Features Roadmap

- Add rate limiting for APIs
- Implement predictive forecasting service using a LLM
  - Integrate message queue for service

## Technologies

- [TypeScript + Swagger/OpenAPI](https://tsoa-community.github.io/docs/) (TSOA)
- Auth0
- Redis
- Docker
- Vercel

**External APIs:**  
- [Google Gemini](https://ai.google.dev/gemini-api/docs)
- [Massive/Polygon.io](https://massive.com/docs/rest/quickstart)
- [FinancialModelingPrep](https://site.financialmodelingprep.com/developer/docs)

## Author

**Nevin Chen**  
- [LinkedIn](https://linkedin.com/in/nevin-chen)
