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

async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");

      // Explicitly register the service worker
      const registration = await navigator.serviceWorker.register('firebase-messaging-sw.js');
      const token = await getToken(messaging, { serviceWorkerRegistration: registration });

      if (token) {
        console.log("FCM Token:", token);
        alert(`Your FCM Token: ${token}`);
      } else {
        console.warn("No token received. Ensure Firebase is properly set up.");
      }
    } else {
      console.error("Notification permission denied.");
    }
  } catch (err) {
    console.error("Error requesting permission:", err);
  }
}

// Listen for incoming messages
onMessage(messaging, (payload) => {
  console.log("Message received: ", payload);
  alert(`Notification: ${payload.notification.title}`);
});

document.getElementById("getTokenButton").addEventListener("click", requestNotificationPermission);
