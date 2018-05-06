const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./webpack.config.base");
const merge = require("webpack-merge");
const VueClientPlugin = require("vue-server-renderer/client-plugin");

const isDev = process.env.NODE_ENV === 'development';
const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
        index: '/public/index.html'
    },
    proxy: {
        '/api': 'http://127.0.0.1:3333',
        '/user': 'http://127.0.0.1:3333'
    },
    hot: true
};
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin({
        template: path.join(__dirname, "template.html")
    }),
    new VueClientPlugin()
]

let config;

if (isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',
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
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/client-entry.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js',
            publicPath: '/public/'
        },
        module: {
            rules: [{
                test: /\.styl(us)?$/,
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
            }]
        },
        plugins: defaultPlugins.concat([
            new MiniCssExtractPlugin({
                filename: 'styles.[contentHash:8].css'
            })
        ]),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minSize: 0,
                        minChunks: 2,
                        maxInitialRequests: 5
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            },
            runtimeChunk: true
        }
    });
}

config.resolve = {
    alias: {
        'model': path.join(__dirname, '../client/model/client-model.js')
    }
}

module.exports = config