/** @type {import('next').NextConfig} */
const nextConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
  },
  localIdentName: "[]",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',
        port: '',
        pathname: '/blocks/marketing-ui/hero/**',
      },
    ],
  },
  experimental: {
    swcPlugins: [
        "@effector/swc-plugin",
        {
          "factories": ["src/createEffectStatus", "~/createCommonPending"]
        }
      ],
  },
}

module.exports = nextConfig