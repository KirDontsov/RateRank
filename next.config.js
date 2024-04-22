const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // renders only 1 time
  reactStrictMode: false,
  cssModules: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  cssLoaderOptions: {
    importLoaders: 1,
  },
  localIdentName: '[]',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  rewrites: async () => [
    {
      source: '/',
      destination: '/yandex_cde14065ca884149.html',
    },
  ],
  // effector swc нужен для серверных компонентов
  // experimental: {
  //   swcPlugins: [
  //       "@effector/swc-plugin",
  //       {
  //         "factories": ["src/createEffectStatus", "~/createCommonPending"]
  //       }
  //     ],
  // },
};

module.exports = nextConfig;
