const modifyBuilder = require('razzle-plugin-pwa').default;
const path = require('path');
const pwaConfig = {
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true
};

const manifestConfig = {
  filename: 'manifest.json',
  name: 'Razzle App',
  short_name: 'Razzle',
  description: 'Another Razzle App',
  display: 'standalone',
  start_url: '.',
  theme_color: '#ffffff',
  background_color: '#000000',
  icons: [
    {
      src: path.resolve('public/icon.png'),
      sizes: [96, 128, 192, 256, 384, 512]
    }
  ]
};

const modify = modifyBuilder({ pwaConfig, manifestConfig });

module.exports = {
  plugins: [{ func: modify }]
};
