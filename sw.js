if (!self.define) {

  let e,
    i = {};
  const s = (s, r) => (
    (s = new URL(s + ".js", r).href),
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
  self.define = (r, n) => {
    const o =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (i[o]) return;
    let f = {};
    const t = (e) => s(e, o),
      l = { module: { uri: o }, exports: f, require: t };
    i[o] = Promise.all(r.map((e) => l[e] || t(e))).then((e) => (n(...e), f));
  };
}
define(["./workbox-3e911b1d"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "assets/index-B_S6gtpN.css", revision: null },
        { url: "assets/index-C679bYcw.js", revision: null },
        { url: "index.html", revision: "cec179a30062d01333a810599ea9daed" },
        { url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07" },
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
