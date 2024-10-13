if (!self.define) {
  let e,
    i = {};
  const s = (s, f) => (
    (s = new URL(s + ".js", f).href),
    i[s] ||
      new Promise((i) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = i), document.head.appendChild(e);
        } else (e = s), importScripts(s), i();
      }).then(() => {
        let e = i[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (f, r) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (i[n]) return;
    let o = {};
    const l = (e) => s(e, n),
      t = { module: { uri: n }, exports: o, require: l };
    i[n] = Promise.all(f.map((e) => t[e] || l(e))).then((e) => (r(...e), o));
  };
}
define(["./workbox-7cfec069"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: "assets/index-B_S6gtpN.css", revision: null },
        { url: "assets/index-CwDXDUzT.js", revision: null },
        { url: "index.html", revision: "ed868b8b5f4e26a89953f60b224f0c4d" },
        { url: "registerSW.js", revision: "bffaacfd7a0766dc14efff8f56cd9854" },
        {
          url: "service-worker.js",
          revision: "e9104e72783ba8667fa411ad5ac165b8",
        },
        { url: "logo.png", revision: "4f5f6a22be3fa16afeec064ee57adcb5" },
        {
          url: "images/logo.png",
          revision: "4f5f6a22be3fa16afeec064ee57adcb5",
        },
        {
          url: "images/logo_192x192.png",
          revision: "2aab3b1fff6535f6faf6c91ac83bfedd",
        },
        {
          url: "images/logo_512x512.png",
          revision: "4c3776fe8d98bf6479315bf68e661ad5",
        },
        {
          url: "manifest.webmanifest",
          revision: "3b27294350b8769528dbef960e524f68",
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))
    );
});
self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
  });
});