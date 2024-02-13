const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point of the application
  output: {
    filename: "bundle.js", // Output bundle filename
    path: path.resolve(__dirname, "dist"), // Output directory path
    assetModuleFilename: "assets/[hash][ext][query]", // Configure asset filenames
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Match CSS files
        use: ["style-loader", "css-loader"], // Use style-loader to inject CSS into the DOM and css-loader to handle CSS imports
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Match image files
        type: "asset/resource", // Use asset/resource to emit the file as a separate asset
        generator: {
          filename: "images/[hash][ext][query]", // Configure output filename for images
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Match font files
        type: "asset/resource", // Use asset/resource to emit the file as a separate asset
        generator: {
          filename: "fonts/[hash][ext][query]", // Configure output filename for fonts
        },
      },
    ],
  },
  mode: "development",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
