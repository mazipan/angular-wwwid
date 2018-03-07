const workboxBuild = require('workbox-build');
const SRC_DIR = 'src';
const BUILD_DIR = 'dist';

const input = {
  swSrc: `${SRC_DIR}/sw.js`,
  swDest: `${BUILD_DIR}/sw.js`,
  globDirectory: BUILD_DIR,
  manifestDest: `${BUILD_DIR}/manifest.js`,
  globPatterns: [
    '**/*.{js,png,ico,svg,html,css}',
    'assets/**/*',
  ],
  globIgnores: [
    'package.json',
    'index.js',
    'sw.js'
  ],
  format: 'iife',
  maximumFileSizeToCacheInBytes: 4000000
};

workboxBuild.injectManifest(input).then(() => {
  console.log('The production manifest for pre-cache has been created with a precache list.');
});
