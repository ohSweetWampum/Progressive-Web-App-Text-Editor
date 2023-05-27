// Importing required modules
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    // Define entry points for Webpack
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    // Configure output directory and filenames
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // HTML Webpack Plugin to generate HTML files
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "jate",
      }),
      // Inject Manifest to generate a service worker file
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // PWA Manifest to generate a manifest file for PWA
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Jate",
        short_name: "Jate",
        description: "Just another text editor",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    // Configure module loading rules
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
