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
      src: require.resolve(path.join(__dirname, 'public', 'icon.png')),
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};

const modify = modifyBuilder({ pwaConfig, manifestConfig });

module.exports = {
  plugins: [{ func: modify }]
};
