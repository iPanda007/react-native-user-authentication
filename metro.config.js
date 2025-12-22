const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(process.cwd())

// Add CSS support for Tailwind
config.resolver.sourceExts.push('css')

// Try to add NativeWind support with error handling
try {
  const { withNativeWind } = require('nativewind/metro');
  module.exports = withNativeWind(config, { input: './app/global.css' });
} catch (error) {
  console.warn('NativeWind not available, using basic config:', error.message);
  module.exports = config;
}