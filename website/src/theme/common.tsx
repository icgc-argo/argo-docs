export const windowSizes = {
  desktop: 'desktop',
  mobile: 'mobile',

  // This "ssr" value is very important to handle hydration FOUC / layout shifts
  // You have to handle server-rendering explicitly on the call-site
  // On the server, you may need to render BOTH the mobile/desktop elements (and hide one of them with mediaquery)
  // We don't return "undefined" on purpose, to make it more explicit
  ssr: 'ssr',
};
