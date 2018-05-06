const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./webpack.config.base");
const merge = require("webpack-merge");
const VueServerPlugin = require('vue-server-renderer/server-plugin');

let config = merge(baseConfig, {
    target: 'node',
    entry: {
        app: path.join(__dirname, '../client/server-entry.js'),
        vendor: ['vue']
    },
    devtool: '#source-map',
    output: {
        libraryTarget: 'commonjs2',
        filename: '[name].js',
        path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies),
    module: {
        rules: [
            {
                test: /\.styl/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash:8].css'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueServerPlugin()
    ]
});

config.resolve = {
    alias: {
        'model': path.join(__dirname, '../client/model/server-model.js')
    }
}

module.exports = config