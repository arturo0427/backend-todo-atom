import admin from "firebase-admin";
import "./env.js";

let app = admin.apps[0];
if (!app) {
  // Initialize Firebase admin either via credentials file or environment variables.
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    app = admin.initializeApp();
  } else if (process.env.FIREBASE_PROJECT_ID) {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } else {
    throw new Error("Firestore credentials not configured");
  }
}
export const firestore = admin.firestore();
// Ignore undefined fields to mirror the behavior of plain Firestore SDK.
firestore.settings({ ignoreUndefinedProperties: true });
