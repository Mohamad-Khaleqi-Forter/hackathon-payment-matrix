# MCP Backend

This is the backend service for the Marketplace MCP Client, built with Node.js, Express, and TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
NODE_ENV=development
```

## Running the Application

Development mode:
```bash
npm run dev
```

Build and run in production:
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Check if the server is running

### Products
- `GET /api/products` - List all products
- `GET /api/products/search` - Search products with filters
  - Query parameters:
    - `size` (number)
    - `color` (string)
    - `minPrice` (number)
    - `maxPrice` (number)
    - `brand` (string)
- `GET /api/products/:id` - Get product by ID

## Example Requests

List all products:
```
GET /api/products
```

Search for size 9 shoes:
```
GET /api/products/search?size=9
```

Search for black Nike shoes:
```
GET /api/products/search?brand=nike&color=black
```

Get product by ID:
```
GET /api/products/1
``` 