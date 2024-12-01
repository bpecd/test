importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA_TQoYqoSxyuV480c3BxJ_g_6TELxlGAg",
  authDomain: "bpecd-ping.firebaseapp.com",
  projectId: "bpecd-ping",
  storageBucket: "bpecd-ping.firebasestorage.app",
  messagingSenderId: "460187093569",
  appId: "1:460187093569:web:e13c8f70f0923ed2b814c0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
