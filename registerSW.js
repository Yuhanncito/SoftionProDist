const PUBLICKEY = "BBeSyh4-JimNpNCTwdyyUBujq1iaIoOby-Kqk8yv_GE7JAjOf8LU8xJVT9poP3Ccch0Q8IugJsGQVUnoojAxSXo";

  const Url = 'http://localhost:4000/api/test';

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
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/" })
    .then((registration) => {
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLICKEY),
        });
      })
      .then((subscription) => {
        return fetch(Url, {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .catch((error) =>
        console.error("Error during service worker registration:", error)
      );
  });
}
