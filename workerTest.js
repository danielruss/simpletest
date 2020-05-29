console.log("in workerTest.js");

importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, CacheOnly } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;

registerRoute(/https:\/\/sitf-cwlcji5kxq-uc.a.run.app\/soccer\/code.*/, new CacheFirst());
