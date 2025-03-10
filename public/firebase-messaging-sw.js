importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAVj8WCWud9YOQ7yebR7WQOZHhjFmze_-Q",
  authDomain: "schedulenotifications-a7f31.firebaseapp.com",
  projectId: "schedulenotifications-a7f31",
  storageBucket: "schedulenotifications-a7f31.firebasestorage.app",
  messagingSenderId: "1089118341502",
  appId: "1:1089118341502:web:2aaced60550327826e8b2f"
});

const messaging = firebase.messaging();

// Убираем вызов showNotification, если вкладка активна
messaging.onBackgroundMessage((payload) => {
  console.log("🔔 Фоновое уведомление получено:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
