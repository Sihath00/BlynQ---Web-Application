import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

// ✅ Keep Firebase credentials in the config file
const firebaseConfig = {
  apiKey: "AIzaSyBqMdGt2cD518buPmckvwadhOEEWieYQjs",
  authDomain: "blynq-43b25.firebaseapp.com",
  projectId: "blynq-43b25",
  storageBucket: "blynq-43b25.appspot.com",
  messagingSenderId: "798330701471",
  appId: "1:798330701471:web:fe3c292966c095323b04aa"
};

// ✅ Prevent multiple initializations
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Set authentication persistence (Only runs in browser)
if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("✅ Firebase Auth persistence set"))
    .catch((error) => console.error("❌ Auth persistence error:", error));
}

export { auth, app };
