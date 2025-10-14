import admin from "firebase-admin";

let app = admin.apps[0];

if (!app) {
  try {
    app = admin.initializeApp();
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    throw new Error("Firestore credentials not configured");
  }
}

export const firestore = admin.firestore();

firestore.settings({ ignoreUndefinedProperties: true });
