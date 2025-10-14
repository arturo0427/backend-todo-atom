# 🧠 TODO Backend — Node.js + Express + Firebase Functions

This project is a backend REST API built with **Node.js**, **Express**, and **TypeScript**,  
integrated with **Firebase Cloud Functions** for serverless deployment.

It provides authentication, task management, and CORS-enabled endpoints for a connected Angular frontend.

---

## ⚙️ Tech Stack

- **Node.js v22+**
- **Express.js**
- **TypeScript**
- **Firebase Functions**
- **MongoDB (via Mongoose)**
- **JWT Authentication**
- **CORS**

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── application/           # Core business logic and use cases
│   ├── config/                # App configuration (env, database, firebase)
│   │   ├── env.ts             # Environment variable loader
│   │   └── firestore.ts       # Firebase admin initialization
│   ├── domain/                # Entity definitions
│   ├── infrastructure/        # External service logic (e.g. Mongo, Firebase)
│   ├── interfaces/            # Data Transfer Objects (DTOs)
│   ├── middlewares/           # Express middlewares (authGuard, validators, etc.)
│   ├── routes/                # API route definitions
│   │   ├── auth.routes.ts     # Authentication endpoints
│   │   └── tasks.routes.ts    # Task management endpoints
│   ├── app.ts                 # Express app setup (CORS, routes, middlewares)
│   └── server.ts              # Local dev server entrypoint
│
├── functions/
│   ├── src/
│   │   └── index.ts           # Firebase Cloud Function entrypoint
│   ├── package.json           # Firebase Functions dependencies
│   └── tsconfig.json          # Functions TypeScript configuration
│
├── .env.example               # Example of required environment variables
├── firebase.json              # Firebase configuration
├── .firebaserc                # Firebase project alias
├── package.json               # Main backend dependencies
└── tsconfig.json              # TypeScript configuration
```

---

## 🔑 Environment Variables

Create a `.env` file in the root of `/backend` using the structure below:

```bash
# Connection
PORT=5001
NODE_ENV=
FRONTEND_URL=

# JWT authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=12h

# Google Credentials
GOOGLE_APPLICATION_CREDENTIALS=credential_file

# Firebase configuration
FIREBASE_PROJECT_ID=todo-1a513
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@todo-1a513.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"

# CORS
CORS_ORIGIN=https://your-angular-app.web.app
```

> ⚠️ **Never commit your `.env` or Firebase key files.**  
> They must be listed inside `.gitignore`.

---

## 🚀 Local Development

### 1️⃣ Clone the repository

```bash
git clone https://github.com/arturo0427/backend-todo-atom.git
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Compile TypeScript

```bash
npm run build
```

### 4️⃣ Start development server

```bash
npm run dev
```

### 5️⃣ Access the API

Default local server runs at:

```
http://localhost:5001/
```

---

## ☁️ Deploying to Firebase Functions

### 1️⃣ Initialize Firebase (only once)

```bash
firebase login
firebase init functions
```

### 2️⃣ Build project

```bash
npm run build
```

### 3️⃣ Deploy to Firebase

```bash
cd functions
firebase deploy --only functions
```

After deployment, Firebase will provide a URL such as:

```
https://<function-name>-<region>.cloudfunctions.net/api
```

---

## 🔐 Firebase Service Account Setup

To deploy securely, create a Firebase **Service Account key**:

1. Go to **[Firebase Console → Project Settings → Service Accounts](https://console.firebase.google.com/)**
2. Click **Generate new private key**
3. Rename it to `serviceAccountKey.json`
4. Place it inside `/backend/`
5. Add it to `.gitignore`:
   ```
   serviceAccountKey.json
   ```

---

## 🧪 Testing with Postman

Use your deployed URL or local URL:

```
POST https://<your-region>-<project>.cloudfunctions.net/api/auth/login
```

Example body:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

---

## 🧰 Available NPM Scripts

| Command                            | Description                        |
| ---------------------------------- | ---------------------------------- |
| `npm run dev`                      | Run backend in development mode    |
| `npm run build`                    | Compile TypeScript to JavaScript   |
| `npm start`                        | Run the built code (production)    |
| `firebase deploy --only functions` | Deploy to Firebase Cloud Functions |

---

## 👥 Author

**Arturo Muñoz**  
Full Stack Developer — Node.js | Angular | React | ThreeJs  
📧 [arturo_munoz27@outlook.com](mailto:arturo_munoz27@outlook.com)
📧 [LinkedIn](https://www.linkedin.com/in/arturom0427/)
