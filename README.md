# I+D Vinilos – Backend

RESTful API built with Node.js, Express, and TypeScript for the **I+D Vinilos** project. This backend will manage vinyl records, artists, formats, and related entities for the catalog system.

## 🚀 Tech Stack

- [Node.js](https://nodejs.org/) – JavaScript runtime
- [Express](https://expressjs.com/) – Web framework for building APIs
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript
- [Jest](https://jestjs.io/) – Testing framework for unit and integration tests

## ⚙️ Project Status

> 🛠️ Initial setup complete.  
> The first commit includes:

- `.gitignore`
- `.editorconfig`
- `package.json`
- `package-lock.json`

## 🌐 Deployment

This API will be deployed on [Render](https://isabelsaenz-202502-back.onrender.com).

---

## ✍️ Author

Developed by Isabel Sáenz.  
For the **I+D Vinilos** project

## 🧹 Code Quality Tools

This project uses the following tools to ensure clean and consistent code:

- **ESLint** – Linter to catch bugs and enforce style rules.
- **Prettier** – Code formatter for consistent code style.
- **Husky** – Git hooks to automate checks before commits and pushes.

### Configured Git Hooks (via Husky)

- `pre-commit`: Runs linters and formatters.
- `pre-push`: Runs tests before pushing code.
- `commit-msg`: Validates commit messages (e.g. for Conventional Commits).

> 🔧 After cloning the project, run `npm install` to automatically configure Husky hooks.

## 📂 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/IsaSaete/back-i-d-vinilos.git
cd id-vinilos-backend
npm install
```
