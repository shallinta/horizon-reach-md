// Configuration for the HTML pages (headers/titles/scripts/css/etc).
// We make use of react-helmet to consume the values below.
// @see https://github.com/nfl/react-helmet

const projectName = 'horizon-reach-md';

export default Object.freeze({
  title: projectName,
  description: 'A blog site which may transform an article into speech slides automatically. Material-UI will be used to reach google material design.',
  head: {
    htmlAttributes: {
      lang: 'zh'
    },
    titleTemplate: 'Reach | %s',
    meta: [
      // Default content encoding.
      { charset: 'utf-8' },
      { name: 'description', content: 'A blog site which may transform an article into speech slides automatically. Material-UI will be used to reach google material design.' },
      // This is important to signify your application is mobile responsive!
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Providing a theme color is good if you are doing a progressive
      // web application.
      // { name: 'theme-color', content: '#2196F3' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: projectName },
      // { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: projectName },
      { name: 'msapplication-TileImage', content: '/images/touch/logo_144.png' },
      // { name: 'msapplication-TileColor', content: '#2196F3' }
    ],
    link: [
      // When building a progressive web application you need to supply
      // a manifest.json as well as a variety of icon types. This can be
      // tricky. Luckily there is a service to help you with this.
      // http://realfavicongenerator.net/
      { rel: 'icon', type: 'image/png', href: '/images/favicon_32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/images/favicon_16.png', sizes: '16x16' },
      { rel: 'apple-touch-icon', href: '/images/touch/logo_192.png' },
      // Make sure you update your manifest.json to match your application.
      { rel: 'manifest', href: '/manifest.json' }
    ],
    script: []
  }

});
