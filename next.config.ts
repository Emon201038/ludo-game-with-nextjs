import nextPwa from "next-pwa";
const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // don't enable in dev
});

module.exports = withPWA({
  // your next config
});
