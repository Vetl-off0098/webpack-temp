const path = require('path'),
    HTMLplugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry:{
        main: path.resolve(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
    },
    module:{
        rules :[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/img/[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                exclude: /[^\.]svg/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/fonts/[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                exclude: /fonts/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/svg/[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins :[
        new HTMLplugin({
            template: path.resolve(__dirname, 'src', 'pages', 'index.pug'),
        }),
        new HTMLplugin({
            template: path.resolve(__dirname, 'src', 'pages', 'about.pug'),
            filename: 'about/index.html'
        }),
        new HTMLplugin({
            template: path.resolve(__dirname, 'src', 'pages', 'payment.pug'),
            filename: 'payment/index.html'
        }),
        new HTMLplugin({
            template: path.resolve(__dirname, 'src', 'pages', 'delivery.pug'),
            filename: 'delivery/index.html'
        }),
        new HTMLplugin({
            template: path.resolve(__dirname, 'src', 'pages', 'contacts.pug'),
            filename: 'contacts/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ],
};