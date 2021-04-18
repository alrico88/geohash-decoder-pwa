class Icon {
  constructor(src, size) {
    this.src = `./img/icons/${src}`;
    this.sizes = `${size}x${size}`;
    this.type = 'image/png';
  }
}

module.exports = {
  lintOnSave: false,
  pwa: {
    name: 'Geohash decoder',
    themeColor: '#737E96',
    msTileColor: '#737E96',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    icons: [
      new Icon('android-chrome-192x192.png', 192),
      new Icon('android-chrome-512x512.png', 512),
      new Icon('apple-touch-icon-60x60.png', 60),
      new Icon('apple-touch-icon-76x76.png', 76),
      new Icon('apple-touch-icon-120x120.png', 120),
      new Icon('apple-touch-icon-152x152.png', 152),
      new Icon('apple-touch-icon-180x180.png', 180),
      new Icon('apple-touch-icon.png', 180),
      new Icon('favicon-16x16.png', 16),
      new Icon('favicon-32x32.png', 32),
      new Icon('favicon-16x16.png', 144),
      new Icon('fmsapplication-icon-144x144.png', 16),
      new Icon('mstile-150x150.png', 150),
    ],
  },
};
