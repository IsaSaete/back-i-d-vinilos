# 🎧 I+D Vinyls – Backend API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** to support the I+D Vinyls application.

This backend allows users to manage their vinyl collection by providing endpoints to create, read, update, and delete vinyl records.

## 🚀 Features

- 📦 **CRUD operations** for vinyl records.
- ⚙️ Built with **TypeScript** and **Express 5**.
- 🧪 Unit and integration testing with **Jest** and **Supertest**.
- 🛡️ Robust error handling and input validation.
- 🔐 Environment variables managed via `.env`.
- 💾 MongoDB with **Mongoose** ODM.
- 🧰 Dev tools: ESLint, Prettier, Husky, Commitlint, and Lint-staged.

## 🌐 Technologies

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **TypeScript**
- **Jest** / **Supertest**
- **dotenv**, **debug**, **chalk**, **morgan**

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

4. Build and run the server

```bash
npm run build:dev
npm run start:dev
```

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
📁 src/
├── server/               # Express server setup and middleware
│   ├── app.ts            # Main Express app
│   └── startServer.ts    # Initializes and starts the server
│
├── vinyl/                # Feature module: Vinyls
│   ├── model/            # Mongoose schema and model
│   ├── controller/       # Route controller logic
│   ├── router/           # Express routers for vinyl endpoints
│   ├── fixtures.ts       # Sample data for development and testing
│   └── types.ts          # Vinyl-specific TypeScript types
│
├── database/             # MongoDB connection logic
├── middleware/           # Custom Express middleware functions
├── globals/              # Shared types and constants
└── index.ts              # Entry point of the application
```

The project uses a feature-based structure, clearly separating controllers, routers, middleware, and models.

---

## 🎧 API Endpoints - Vinyls

| Method | Route                           | Description                             |
| ------ | ------------------------------- | --------------------------------------- |
| GET    | `/vinyls`                       | Retrieves a paginated list of vinyls.   |
| PATCH  | `/vinyls/toggle-owned/:vinylId` | Toggles the `isOwned` state of a vinyl. |
| DELETE | `/vinyls/:vinylId`              | Deletes a vinyl by its ID.              |
| POST   | `/vinyls`                       | Adds a new vinyl to the database.       |
| GET    | `/vinyls/:vinylId`              | Get vinyl by ID                         |
| PUT    | `/vinyls/:vinylId`              | Replaces a vinyl's data by its ID.      |

---

### 📄 GET /vinyls

Retrieves a paginated list of vinyls sorted by artist name.

- **URL:** `/vinyls?page=<number>`
- **Method:** `GET`
- **Query Parameters:**
  - `page` _(optional)_: Page number (defaults to `1`)
- **Response:**

```json
Status: 200 OK
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

### 🔄 PATCH /vinyls/toggle-owned/:vinylId

- **Method:** `PATCH`
- **URL:** `/vinyls/toggle-owned/:vinylId`
- **Description:** Toggles the ownership status (`isOwned`) of a vinyl record by its ID.
- **URL Parameters:**
  - `vinylId`: ID of the vinyl to toggle.
- **Request Body:** _None_
- **Response:**

```json
Status: 200 OK
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

- **Possible Errors:**
  - `400 Bad Request`: Id not valid
  - `404 Not Found`: If the vinyl does not exist

### 🗑 DELETE /vinyls/:vinylId

Deletes a vinyl by its ID.

- **URL:** `/vinyls/:vinylId`
- **Method:** `DELETE`
- **Params:**
  - `vinylId`: ID of the vinyl to delete
- **Response:**

```json
Status: 200 OK
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

- **Possible Errors:**
  - `400 Bad Request`: Id not valid
  - `404 Not Found`: If the vinyl does not exist

---

### ➕ POST /vinyls

Adds a new vinyl to the database.

- **URL:** `/vinyls`
- **Method:** `POST`
- **Body:**

```json
{
  "vinyl": {
    "title": "New Vinyl",
    "artist": "Artist Name",
    "genre": "Rock",
    "isOwned": false,
    ...
  }
}
```

- **Response:**

```json
Status: 201 Created
{
  "vinyl": {
    "_id": "456def",
    "title": "New Vinyl",
    "artist": "Artist Name",
    "genre": "Rock",
    "isOwned": false,
    ...
  }
}
```

- **Possible Errors:**
  - `409 Conflict`: If the vinyl already exists

---

### 🔍 GET /vinyls/:vinylId

Retrieves a single vinyl by its ID.

- **URL:** `/vinyls/:vinylId`
- **Method:** `GET`
- **Params:**
  - `vinylId`: ID of the vinyl to retrieve
- **Response:**

```json
Status: 200 OK
{
  "vinyl": {
    "_id": "6643e61db6c99acbce993c3f",
    "title": "Kind of Blue",
    "artist": "Miles Davis",
    "year": 1959,
    "isOwned": true,
    "coverUrl": "https://example.com/kind-of-blue.jpg"
    ...
  }
}
```

- **Possible Errors:**
  - `400 Bad Request`: Id not valid
  - `404 Not Found`: If the vinyl does not exist

---

🔁 **PUT /vinyls/:vinylId**  
Replaces a vinyl's information completely by its ID.

- **URL:** `/vinyls/:vinylId`
- **Method:** `PUT`

- **Params:** `vinylId`: ID of the vinyl to update

**Request Body:**

```json
{
  "vinyl": {
    "_id": "6643e61db6c99acbce993c3f",
    "title": "Kind of Blue (Remastered)",
    "artist": "Miles Davis",
    "year": 1959,
    "genre": "Jazz",
    "isOwned": true,
    "coverUrl": "https://example.com/kind-of-blue-remastered.jpg"
  }
}
```

**Response:**

- **Status:** `200 OK`

```json
{
  "vinyl": {
    "_id": "6643e61db6c99acbce993c3f",
    "title": "Kind of Blue (Remastered)",
    "artist": "Miles Davis",
    "year": 1959,
    "genre": "Jazz",
    "isOwned": true,
    "coverUrl": "https://example.com/kind-of-blue-remastered.jpg"
  }
}
```

**Possible Errors:**

- `400 Bad Request`: ID not valid
- `404 Not Found`: If the vinyl does not exist

---

### 🏓 Health Check

- **Method:** `GET`
- **URL:** `/health`
- **Description:** Basic health check endpoint.
- **Response:**

```json
{
  "message": "pong"
}
```

### 🔎 Not Found Handler

- **Description:** Triggered when a request is made to an undefined endpoint.
- **Response:**

```json
{
  "error": "Endpoint not found"
}
```

### ❌ Error Handler (Middleware)

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
[GitHub](https://github.com/IsaSaete/back-i-d-vinilos)
