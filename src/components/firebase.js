import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAVj8WCWud9YOQ7yebR7WQOZHhjFmze_-Q",
  authDomain: "schedulenotifications-a7f31.firebaseapp.com",
  projectId: "schedulenotifications-a7f31",
  storageBucket: "schedulenotifications-a7f31.firebasestorage.app",
  messagingSenderId: "1089118341502",
  appId: "1:1089118341502:web:2aaced60550327826e8b2f"
};

console.log("Инициализация Firebase...");
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
console.log("Firebase инициализирован");

// Функция запроса разрешения и получения токена
export const requestPermission = async () => {
  try {
    console.log("Запрашиваем разрешение на уведомления...");
    const permission = await Notification.requestPermission();
    console.log("Разрешение получено:", permission);

    if (permission !== "granted") {
      alert("Уведомления отключены в браузере!");
      return null;
    }

    console.log("Получаем токен FCM...");
    const token = await getToken(messaging, {
      vapidKey: "BAh362wLjn4_Mnek4jSgBN9kZ4Stvw72n__bkvlW2GYRt4aawGFS4oLiYrbuSi7B8az87OA874nyj0IWlwQj79w"
    });

    if (!token) {
      console.warn("Не удалось получить токен (возможно, браузер блокирует)");
      return null;
    }

    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Ошибка получения токена:", error);
    return null;
  }
};

// Обработчик входящих уведомлений
onMessage(messaging, (payload) => {
  console.log("🔔 Получено уведомление:", payload);
});
