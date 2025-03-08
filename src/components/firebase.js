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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Функция запроса разрешения и получения токена
export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Уведомления отключены в браузере!");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: "ТВОЙ_VAPID_KEY" // Найти в Firebase → Cloud Messaging → Web Push сертификаты
    });

    return token;
  } catch (error) {
    console.error("Ошибка получения токена:", error);
    return null;
  }
};

// Обработчик входящих уведомлений
onMessage(messaging, (payload) => {
  console.log("Получено уведомление:", payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body
  });
});