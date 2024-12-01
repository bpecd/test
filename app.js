import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_TQoYqoSxyuV480c3BxJ_g_6TELxlGAg",
  authDomain: "bpecd-ping.firebaseapp.com",
  projectId: "bpecd-ping",
  storageBucket: "bpecd-ping.firebasestorage.app",
  messagingSenderId: "460187093569",
  appId: "1:460187093569:web:e13c8f70f0923ed2b814c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request notification permission and get token
async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const token = await getToken(messaging);
      if (token) {
        console.log("User FCM Token:", token);
        alert(`Your FCM Token: ${token}`);
      } else {
        console.warn("No token received. Make sure Firebase is set up correctly.");
      }
    } else {
      console.error("Permission not granted for notifications.");
    }
  } catch (err) {
    console.error("Error requesting permission:", err);
  }
}

// Listen for incoming messages
onMessage(messaging, (payload) => {
  console.log("Message received: ", payload);
  alert(`Notification Received: ${payload.notification.title}`);
});

// Add a listener to the button
document.getElementById("getTokenButton").addEventListener("click", requestNotificationPermission);
