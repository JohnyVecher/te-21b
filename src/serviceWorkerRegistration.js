export function register(config) {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = "/service-worker.js";

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("✅ Service Worker зарегистрирован:", registration);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (!installingWorker) return;

            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  console.log("⚡ Новый Service Worker активен, обновляем страницу...");
                  window.location.reload();
                } else {
                  console.log("✨ Контент теперь доступен офлайн.");
                  if (config && config.onSuccess) {
                    config.onSuccess(registration);
                  }
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error("❌ Ошибка при регистрации Service Worker:", error);
        });
    });
  }
}


// Удаление Service Worker
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        console.log("⏳ Удаление старого Service Worker...");
        registration.unregister();
      })
      .catch((error) => {
        console.error("❌ Ошибка удаления SW:", error);
      });
  }
}
