const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: true,
    externalDir: true | {
      enabled: true,
      silent: true,
 },
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  disableExperimentalFeaturesWarning: true,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }

}
