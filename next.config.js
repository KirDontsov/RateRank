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
  localIdentName: "[]",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**",
      },
    ],
  },
  // effector swc нужен для серверных компонентов
  // experimental: {
  //   swcPlugins: [
  //       "@effector/swc-plugin",
  //       {
  //         "factories": ["src/createEffectStatus", "~/createCommonPending"]
  //       }
  //     ],
  // },
}

module.exports = nextConfig