const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // Add any custom transformer or resolver settings here if needed
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);