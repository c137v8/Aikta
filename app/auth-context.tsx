import { useRouter, useSegments } from 'expo-router';
import { initializeApp } from "firebase/app";
import {
  signOut as firebaseSignOut,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from 'react';

// Replace with your Firebase project configuration
// You can find this in your Firebase project's settings page
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter(); // Use useRouter() for Expo Router navigation

  useEffect(() => {
    // This listener will be called whenever the user's sign-in state changes.
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false); // Authentication state has been checked, so loading is done.
    });

    // Clean up the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Firebase Sign In Error:", error);
      // You should handle this error in your login.tsx component
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // The onAuthStateChanged listener will handle setting the user to null
    } catch (error) {
      console.error("Firebase Sign Out Error:", error);
      throw error;
    }
  };

  // This effect handles the redirection logic based on authentication state
  useEffect(() => {
    // Prevent redirection while loading or if user is null/false
    if (loading) return; 
    
    const inApp = segments[0] === '(tabs)';
    
    if (user && !inApp) {
      // If the user is authenticated and not in the main app, redirect to the tabs.
      router.replace('/(tabs)/home');
    } else if (!user && inApp) {
      // If the user is not authenticated and is in the app, redirect to login.
      router.replace('/login');
    }
  }, [user, loading, segments]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
