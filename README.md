# Ethara AI - Inventory Management System

A full-stack inventory management system with FastAPI backend, React frontend, and PostgreSQL database.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS + Shadcn/UI
- **Backend:** FastAPI + SQLAlchemy + PostgreSQL
- **Containerization:** Docker + Docker Compose

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── controllers/    # Business logic
│   │   ├── database/       # DB connection & config
│   │   ├── models/         # SQLAlchemy models
│   │   ├── routes/         # API routes
│   │   ├── schemas/        # Pydantic schemas
│   │   └── main.py         # FastAPI app entry
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios API client
│   │   ├── components/     # UI components
│   │   ├── lib/            # Utilities
│   │   ├── pages/          # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── docker-compose.yml
└── README.md
```

## Getting Started

### Local Development

**Prerequisites:** Docker & Docker Compose installed

```bash
# Clone the repository
git clone <your-repo-url>
cd ethara-ai

# Start all services
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- PostgreSQL: localhost:5432

**Environment Variables:**

Backend (`backend/.env`):
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/inventory
```

Frontend (`frontend/.env`):
```
VITE_API_URL=http://localhost:8000
```

## Features

- **Products Management** - Add, view, update, delete products
- **Customers Management** - Manage customer base
- **Orders Management** - Create and track orders
- **Dashboard** - Overview statistics

## API Endpoints

| Method | Endpoint   | Description          |
|--------|------------|----------------------|
| GET    | /products  | List all products    |
| POST   | /products  | Create product       |
| GET    | /customers | List all customers   |
| POST   | /customers | Create customer      |
| GET    | /orders    | List all orders      |
| POST   | /orders    | Create order         |
| GET    | /dashboard | Dashboard stats      |

## Deployment

### Backend (Railway)

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Set **Root Directory** to `/backend`
4. Add a PostgreSQL plugin and copy the connection string
5. Add environment variable: `DATABASE_URL` = your PostgreSQL connection URL
6. Set **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
7. Deploy

### Frontend (Vercel)

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Set **Root Directory** to `frontend`
4. Add environment variable: `VITE_API_URL` = your Railway backend URL
5. Deploy

### Docker

```bash
# Build and run
docker-compose up --build

# Stop services
docker-compose down

# Clean slate (removes volumes)
docker-compose down -v
```

## Docker Images

| Service | Base Image       | Port |
|---------|------------------|------|
| backend | python:3.12-slim | 8000 |
| frontend| node:20-alpine   | 5173 |
| db      | postgres:16-alpine| 5432|

## Environment Variables Reference

### Backend
| Variable    | Description                  | Required |
|-------------|------------------------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes      |

### Frontend
| Variable     | Description     | Required |
|--------------|-----------------|----------|
| VITE_API_URL | Backend API URL | Yes      |

## License

MIT