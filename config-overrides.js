/* config-overrides.js */
const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
    };
    config.plugins.push(
        new webpack.ProvidePlugin({

        }),
    );

    return config;
}