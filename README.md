# SchoolManagement-API

A REST API built with Node.js, Express, and MySQL to manage school data — supports adding schools and retrieving them sorted by proximity to a given location.

## Live API

Base URL: `https://your-app.onrender.com`

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MySQL (hosted on Railway)
- **Deployment** — Render

---

## Getting Started

### Prerequisites

- Node.js v18+
- MySQL database (Railway or local)

### Installation

```bash
git clone https://github.com/yourusername/SchoolManagement-API.git
cd SchoolManagement-API/backend
npm install
```

### Environment Variables

Create a `.env` file inside the `backend` folder:

```env
DB_URL=mysql://root:password@host:port/railway
```

### Run Locally

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:8000`

---

## API Reference

### Add School

```
POST /school/add-school
```

**Request Body**

```json
{
  "name": "Green Valley School",
  "address": "123 MG Road, Hyderabad",
  "latitude": 17.385044,
  "longitude": 78.486671
}
```

**Validation Rules**
- All fields are required
- `name` and `address` must be non-empty strings
- `latitude` must be a number between -90 and 90
- `longitude` must be a number between -180 and 180

**Response `201`**

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Green Valley School",
    "address": "123 MG Road, Hyderabad",
    "latitude": 17.385044,
    "longitude": 78.486671
  }
}
```

---

### List Schools

```
GET /school/list-schools?latitude=17.385044&longitude=78.486671
```

**Query Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `latitude` | number | Yes | User's latitude (-90 to 90) |
| `longitude` | number | Yes | User's longitude (-180 to 180) |

**Response `200`**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Green Valley School",
      "address": "123 MG Road, Hyderabad",
      "latitude": 17.385,
      "longitude": 78.4867,
      "distance": 0.01
    },
    {
      "id": 2,
      "name": "Delhi Public School",
      "address": "Banjara Hills, Hyderabad",
      "latitude": 17.4109,
      "longitude": 78.4558,
      "distance": 4.36
    },
    {
      "id": 3,
      "name": "Sunrise Academy",
      "address": "Gachibowli, Hyderabad",
      "latitude": 17.4407,
      "longitude": 78.3486,
      "distance": 15.9
    }
  ]
}
```

`distance` is in **kilometers**, calculated using the Haversine formula and sorted nearest first.

---

## Error Responses

```json
{
  "success": false,
  "message": "All fields are required"
}
```

| Status Code | Meaning |
|---|---|
| `400` | Validation error — missing or invalid fields |
| `500` | Internal server error |

---

## Project Structure

```
SchoolManagement-API/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── school.controller.js
│   │   └── routes/
│   │       └── school.route.js
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── README.md
```

---

## Database Schema

```sql
CREATE TABLE schools (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  address     VARCHAR(500) NOT NULL,
  latitude    FLOAT NOT NULL,
  longitude   FLOAT NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Postman Collection

Import the collection to test all endpoints — includes example requests and expected responses for both APIs.