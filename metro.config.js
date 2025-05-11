// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // PNG uzantılarını assetExts'e ekleyelim
  config.resolver.assetExts = [
    ...config.resolver.assetExts,
    "png",
  ];

  // react-native-chessboard içindeki .assets klasörünü de izle
  config.watchFolders = [
    path.resolve(
      __dirname,
      "node_modules/react-native-chessboard/src/assets"
    ),
  ];

  return config;
})();
