// src/service-worker.js

/* eslint-disable no-restricted-globals */  

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Подключаем Firebase Messaging
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");

// Инициализируем Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAVj8WCWud9YOQ7yebR7WQOZHhjFmze_-Q",
  authDomain: "schedulenotifications-a7f31.firebaseapp.com",
  projectId: "schedulenotifications-a7f31",
  storageBucket: "schedulenotifications-a7f31.firebasestorage.app",
  messagingSenderId: "1089118341502",
  appId: "1:1089118341502:web:2aaced60550327826e8b2f"
});

const messaging = firebase.messaging();

// Обработчик входящих push-уведомлений в фоне
messaging.onBackgroundMessage((payload) => {
  console.log("🔔 Фоновое уведомление получено:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icons/icon-192x192.png",
  });
});

// Принудительная активация нового Service Worker
clientsClaim();

// Заранее кешируем ресурсы
precacheAndRoute(self.__WB_MANIFEST || []);

// Очищаем старые кеши
cleanupOutdatedCaches();

// Кешируем JS и CSS
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// Кешируем изображения
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
  })
);

// Обрабатываем сообщения для немедленной активации нового SW
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Устанавливаем SW и кешируем ресурсы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ]);
    })
  );
  self.skipWaiting();
});

// Обрабатываем запросы
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
