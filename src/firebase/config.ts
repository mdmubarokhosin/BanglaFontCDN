// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuKB0w9GeyXPTr9pBlyjjLrgumqqQPePU",
  authDomain: "md-mubarok-hossain.firebaseapp.com",
  databaseURL: "https://md-mubarok-hossain-default-rtdb.firebaseio.com",
  projectId: "md-mubarok-hossain",
  storageBucket: "md-mubarok-hossain.firebasestorage.app",
  messagingSenderId: "399079788020",
  appId: "1:399079788020:web:3121a231a7b432ff6bbda1",
  measurementId: "G-6WZRLRZ89Y"
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('Firebase config is not set');
  }
  return firebaseConfig;
}
