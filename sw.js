if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, r) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[t]) return;
    let f = {};
    const a = (e) => i(e, t),
      c = { module: { uri: t }, exports: f, require: a };
    s[t] = Promise.all(n.map((e) => c[e] || a(e))).then((e) => (r(...e), f));
  };
}
define(["./workbox-7cfec069"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: "assets/index-CCe06EyD.js", revision: null },
        { url: "assets/index-CR4B3lXP.css", revision: null },
        {
          url: "ganttStyles/frappe-gantt.css",
          revision: "c6ebdf349f99b3c0db6c093e33bc723f",
        },
        {
          url: "ganttStyles/frappe-gantt.js",
          revision: "ab82e6e4003ba93b6bec487f89adb289",
        },
        {
          url: "ganttStyles/frappe-gantt.min.css",
          revision: "fef88de645caec679ec2c8602388edcd",
        },
        {
          url: "ganttStyles/frappe-gantt.min.js",
          revision: "e131076fc0acdc62d81f1c5e8eec7b71",
        },
        { url: "index.html", revision: "3db5228f334e62ea645d6049a4e1cf46" },
        { url: "registerSW.js", revision: "54b93b4d2874635550a6cd9b92cf9d3b" },
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
//# sourceMappingURL=sw.js.map
self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
    });
  });
  