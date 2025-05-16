# back-i-d

Backend for the **I+D** project, a RESTful API built with TypeScript, Express, and MongoDB Atlas, focused on managing a music vinyl collection.

---

## 📌 Table of Contents

- [Description](#description)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Deployment](#deployment)
- [License](#license)
- [Author](#author)

---

## 🧾 Description

This project implements the backend of an application to manage music vinyl records. It provides a REST API that allows retrieving and updating vinyls stored in a MongoDB Atlas cloud database. It follows a professional architecture including strong typing with TypeScript, automated tests, organized middleware, and modern development tools for code quality and formatting.

---

## 💾 Installation

1. Clone the repository:

```bash
git clone https://github.com/IsaSaete/back-i-d-vinilos.git
cd back-i-d
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file based on the `.env.sample`:

```bash
cp .env.sample .env
```

Update it with your environment variables.

---

## ▶️ Usage

To run the project in development mode:

```bash
npm run start:dev
```

To compile and run in production mode:

```bash
npm run build
npm start
```

---

## 🔁 API Endpoints

| Method | Route                           | Description                             |
| ------ | ------------------------------- | --------------------------------------- |
| GET    | `/vinyls`                       | Retrieves a paginated list of vinyls.   |
| PATCH  | `/vinyls/toggle-owned/:vinylId` | Toggles the `isOwned` state of a vinyl. |

---

## 📦 Available Scripts

| Script          | Description                                  |
| --------------- | -------------------------------------------- |
| `build`         | Compiles TypeScript to JavaScript (`/dist`). |
| `build:dev`     | Compiles in watch mode.                      |
| `start`         | Runs the compiled build with Node.           |
| `start:dev`     | Runs the project directly with Node.         |
| `test`          | Runs tests using Jest.                       |
| `test:dev`      | Runs tests in watch mode.                    |
| `test:coverage` | Generates test coverage report.              |
| `prepare`       | Sets up Git hooks via Husky.                 |

---

## 🧱 Project Structure

```
📁 src
├── database/
│   └── connectToDatabase.ts
├── server/
│   ├── middleware/
│   ├── __tests__/
│   ├── app.ts
│   └── startServer.ts
├── vinyl/
│   ├── controller/
│   ├── model/
│   ├── router/
│   └── types.ts
├── index.ts
```

The project uses a feature-based structure, clearly separating controllers, routers, middleware, and models.

---

## API Endpoints

### 1. Get Vinyls (Paginated)

- **Method:** `GET`
- **URL:** `/vinyls`
- **Description:** Retrieves a paginated list of vinyl records sorted by artist name.
- **Query Parameters:**
  - `page` (optional, default: `1`) – Page number for pagination.
- **Request Body:** _None_
- **Response:**

```json
{
  "vinyls": [
    {
      "_id": "6643e61db6c99acbce993c3f",
      "title": "Kind of Blue",
      "artist": "Miles Davis",
      "year": 1959,
      "isOwned": false,
      "coverUrl": "https://example.com/kind-of-blue.jpg"
    }
  ],
  "vinylsTotal": 32
}
```

### 2. Toggle Vinyl Ownership

- **Method:** `PATCH`
- **URL:** `/vinyls/toggle-owned/:vinylId`
- **Description:** Toggles the ownership status (`isOwned`) of a vinyl record by its ID.
- **URL Parameters:**
  - `vinylId`: ID of the vinyl to toggle.
- **Request Body:** _None_
- **Response:**

```json
{
  "vinyl": {
    "_id": "6643e61db6c99acbce993c3f",
    "title": "Kind of Blue",
    "artist": "Miles Davis",
    "year": 1959,
    "isOwned": true,
    "coverUrl": "https://example.com/kind-of-blue.jpg"
  }
}
```

- **Error Responses:**
  - `statusCode.NOT_FOUND Not Found` if the vinyl does not exist
  - `400 Bad Request` if `vinylId` is not a valid MongoDB ObjectId

### 3. Health Check

- **Method:** `GET`
- **URL:** `/health`
- **Description:** Basic health check endpoint.
- **Response:**

```json
{
  "message": "pong"
}
```

### 4. Not Found Handler

- **Description:** Triggered when a request is made to an undefined endpoint.
- **Response:**

```json
{
  "error": "Endpoint not found"
}
```

### 5. Error Handler (Middleware)

- **Description:** Catches and handles server-side errors.
- **Error Response Example:**

```json
{
  "error": "This vinyl does not exist"
}
```

## 🧪 Testing

This project uses **Jest** and **Supertest** for unit and integration testing. Test files are located next to their respective modules under `__tests__` folders.

Run tests:

```bash
npm test
```

Run coverage report:

```bash
npm run test:coverage
```

---

## ✅ Code Quality

The project maintains high code quality standards using:

- `eslint` + `@typescript-eslint` for linting
- `prettier` for code formatting
- `husky` for Git hooks
- `lint-staged` to lint only staged files
- `commitlint` to ensure conventional commit messages

---

## 🚀 Deployment

This backend is ready to be deployed on [Render](https://isabelsaenz-202502-back.onrender.com):

- The database is hosted on MongoDB Atlas.
- Render runs the server using `npm start` after building with `tsc`.

---

https://isabelsaenz-202502-back.onrender.com

## 📝 License

This project is licensed under the **ISC License**.

---

## 👩‍💻 Author

**Isabel Sáenz**  
For the **I+D Vinilos** project
[GitHub](https://github.com/IsaSaete/back-i-d-vinilos.git)
