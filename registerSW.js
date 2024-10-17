const PUBLICKEY = "BBeSyh4-JimNpNCTwdyyUBujq1iaIoOby-Kqk8yv_GE7JAjOf8LU8xJVT9poP3Ccch0Q8IugJsGQVUnoojAxSXo";

    const Url = 'http://localhost:4000/api/test';
  const Url2 = 'https://softion-api-v3.vercel.app/api/test';

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}



if ("serviceWorker" in navigator && "PushManager" in window) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      let activeWorker;

      if (registration.waiting) {
        activeWorker = registration.waiting;
      } else if (registration.installing) {
        activeWorker = await new Promise((resolve, reject) => {
          registration.installing.addEventListener("statechange", (e) => {
            if (registration.installing.state === "activated") {
              resolve(registration.installing);
            } else if (registration.installing.state === "redundant") {
              reject(new Error("Installation failed"));
            }
          });
        });
      } else {
        activeWorker = registration.active;
      }

      if (activeWorker) {
        // Verifica si ya existe una suscripción
        let subscription = await registration.pushManager.getSubscription();
        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLICKEY),
          });
        }

        await fetch(Url, {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        });

        window.localStorage.setItem('subscription', JSON.stringify(subscription));
      }
    } catch (error) {
      console.error("Error durante el registro del Service Worker:", error);
    }
  });
}



