// 雅思特训 PWA 离线服务工作线程 (Service Worker)
const CACHE_NAME = "ielts-practice-v5";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.json",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./db.js",
  "./content/schemas.js",
  "./content/manifest.js",
  "./content/registry.js",
  "./content/user-materials/cambridge-mistake-schema.js",
  "./content/listening/words/wanglu-core-v1.js",
  "./content/listening/paraphrase/paraphrase-concepts-v1.js",
  "./content/listening/option-scan/option-scan-pool-v1.js",
  "./content/listening/traps/trap-scenarios-v1.js",
  "./content/listening/map/map-landmarks-v1.js",
  "./content/listening/map/map-routes-v1.js",
  "./content/listening/procedural/number-rules-v1.js",
  "./content/writing/task1/task1-workbook-v1.js",
  "./content/writing/task1/task1-rapid-legacy-v1.js",
  "./words-dictation-data.js",
  "./task1-rapid-data.js",
  "./map-training-data.js",
  "./map-data/landmarks.js",
  "./map-data/direction-templates.js",
  "./map-data/spatial-templates.js",
  "./map-data/route-scenarios.js",
  "./map-data/hotspot-templates.js",
  "./map-engine.js",
  "./factory/user-model.js",
  "./factory/data/paraphrase-concepts.js",
  "./factory/paraphrase-factory.js",
  "./factory/trap-factory.js",
  "./factory/number-factory.js",
  "./factory/question-factory.js",
  "./number-date-engine.js",
  "./number-date-ui.js",
  "./paraphrase-data.js",
  "./paraphrase-engine.js",
  "./paraphrase-ui.js",
  "./option-scan.js",
  "./app.js",
  "./writing-practice.js",
  "./map-training.js",
  "./mistakes.js",
  "./hub.js"
];

// 安装时预缓存全部静态资源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[SW] Pre-cache warning:", err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 激活时清理旧版本缓存
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 离线优先 / 缓存优先拦截
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // 忽略 bridge API 动态接口
  if (url.pathname.startsWith("/bridge/")) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      // 找到本地缓存直接返回
      if (cached) {
        // 后台静默发起网络请求更新缓存 (Stale-While-Revalidate)
        fetch(request).then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkRes));
          }
        }).catch(() => {});
        return cached;
      }

      // 未命中缓存则请求网络
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return response;
      }).catch(() => {
        // 彻底离线且未命中时 fallback 到 index.html
        if (request.headers.get("accept")?.includes("text/html")) {
          return caches.match("./index.html");
        }
      });
    })
  );
});
