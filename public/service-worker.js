/* eslint-disable no-restricted-globals */  

console.log("🔧 Service Worker загружен!");

// Загружаем Firebase SDK
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");

// Инициализируем Firebase
firebase.initializeApp({
  apiKey: "AIzaSy...",
  authDomain: "schedulenotifications-a7f31.firebaseapp.com",
  projectId: "schedulenotifications-a7f31",
  storageBucket: "schedulenotifications-a7f31.firebasestorage.app",
  messagingSenderId: "1089118341502",
  appId: "1:1089118341502:web:2aaced60550327826e8b2f",
});

const messaging = firebase.messaging();

self.addEventListener("install", (event) => {
  console.log("📦 Service Worker устанавливается...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker активирован!");
  event.waitUntil(self.clients.claim());
});

// Убираем дублирование уведомлений
messaging.onMessage(() => {
  console.log("🔔 Получено foreground уведомление (вкладка активна)");
});

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Получено фоновое уведомление:", payload);

  // Проверяем, есть ли уже уведомление с таким текстом
  self.registration.getNotifications().then((existingNotifications) => {
    const duplicate = existingNotifications.some((n) => n.body === payload.notification.body);
    
    if (!duplicate) {
      self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
      });
    } else {
      console.log("⚠️ Дубликат уведомления, пропускаем...");
    }
  });
});
