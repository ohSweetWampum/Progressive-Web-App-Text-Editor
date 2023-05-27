const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// precache files
precacheAndRoute(self.__WB_MANIFEST);

// cache first strategy for pages
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    // Cache only 0 and 200 status
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Expire pages after 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// warm the page cache
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// Register route with a navigation request for page cache
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Register route with a StaleWhileRevalidate strategy for style, script, and worker
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
