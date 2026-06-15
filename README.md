# GharKaBite  

A complete GharKaBite   web application built with React, Redux Toolkit, Bootstrap 5, Axios, React Router DOM, and a mock Express backend with JWT authentication.

## Features

- React + Redux Toolkit
- JWT authentication
- Protected routes
- Search with debouncing
- Cart persistence in localStorage
- Mock REST API with Express
- Responsive GharKaBite-like UI
- Order placement flow
- Lazy-loaded pages and reusable components

## Setup

1. Install dependencies

```bash
npm install
```

2. Run the backend mock server

```bash
npm run server
```

3. Run the frontend development server

```bash
npm run dev
```

## API

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/restaurants`
- `GET /api/restaurants/:id`
- `GET /api/dishes`
- `GET /api/dishes/:id`
- `GET /api/search?q=`
- `POST /api/orders`

## Notes

- The frontend is configured to fetch from `http://localhost:4000/api`
- Auth token and cart are persisted in `localStorage`
- Use the signup form to create a user before logging in
