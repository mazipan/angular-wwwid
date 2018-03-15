const workboxBuild = require('workbox-build');
const SRC_DIR = 'src';
const BUILD_DIR = 'dist';

const input = {
  swSrc: `${SRC_DIR}/sw.js`,
  swDest: `${BUILD_DIR}/sw.js`,
  globDirectory: BUILD_DIR,
  manifestDest: `${BUILD_DIR}/manifest.js`,
  globPatterns: [
    '**/*.{js,png,ico,svg,html,css}'
  ],
  globIgnores: [
    'package.json',
    'index.js',
    'sw.js',
    'assets/launcher-icon-2x.jpg',
    'assets/launcher-icon-3x.jpg',
    'assets/launcher-icon-4x.jpg',
    'assets/ng.png'
  ],
  format: 'iife',
  maximumFileSizeToCacheInBytes: 4000000
};

workboxBuild.injectManifest(input);
