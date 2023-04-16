const path = require("path");

module.exports = {
  entry: "./src/index.js", // path to your entry file
  output: {
    filename: "bundle.js", // name of the output file
    path: path.resolve(__dirname, "dist"), // path to the output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // use babel to transpile your JavaScript files
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // inject styles into the DOM
          "css-loader", // handle CSS imports and processing
        ],
      },
    ],
  },
};
