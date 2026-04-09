// ============================================
// NTK Firebase Configuration
// Path: src/lib/firebase/config.ts
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvbv5-cOMMl8VCv3_x91GrXCw4zupUZwo",
  authDomain: "ntk-2026.firebaseapp.com",
  projectId: "ntk-2026",
  storageBucket: "ntk-2026.firebasestorage.app",
  messagingSenderId: "503914410810",
  appId: "1:503914410810:web:8ceec2be1d593aba2a1603",
  measurementId: "G-L3M1T762CF",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
