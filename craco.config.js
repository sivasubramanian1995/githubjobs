const { getLoaders, loaderByName, whenProd } = require("@craco/craco");
const CracoLessPlugin = require("craco-less-plugin");
const path = require("path");

// Don't open the browser during development
process.env.BROWSER = "none";

module.exports = {
  webpack: {
    plugins: [
      ...(process.env.NODE_ENV === "development"
        ? [new (require("webpackbar"))({ profile: true })]
        : []),
      ...(process.env.REACT_APP_ANALYZE === "true"
        ? [
            new (require("webpack-bundle-analyzer").BundleAnalyzerPlugin)({
              openAnalyzer: true,
            }),
          ]
        : []),
    ],
  },
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  babel: {
    // mobx sugars
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve = {
        mainFiles: ["index", "Index"],
        extensions: [".js", ".jsx"],
        alias: {
          "@": path.resolve(__dirname, "src/"),
        },
      };

      webpackConfig.externals = {
        // global app config object
        config: JSON.stringify({
          APP_ENV: process.env.APP_ENV || "development",
          APP_URL: process.env.APP_URL || "http://localhost:8080",
          API_URL: process.env.APP_API_URL || "http://localhost:3000",
        }),
      };
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          const { hasFoundAny, matches } = getLoaders(
            webpackConfig,
            loaderByName("less-loader")
          );
          // fixup localIdentName for less(css) modules
          matches[1].parent[1].options.modules = {
            localIdentName: whenProd(
              () => "[hash:base64:6]",
              "[local]_[hash:base64:6]"
            ),
          };
          return webpackConfig;
        },
      },
    },
  ],
};
