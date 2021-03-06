const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
            './src/index'
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                include: /\.pug$/,
                use: [
                    {loader: 'raw-loader'},
                    {loader: 'pug-html-loader', options: {data: {}}}
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js','.pug']
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], { verbose: true, root: path.resolve(__dirname) }),
        new HtmlWebpackPlugin({
            filetype: 'pug',
            template: 'index.pug',
            inject: "head"
        }),
        new HtmlWebpackPlugin({
            filetype: 'html',
            template: 'index.pug',
            inject: "head"
        }),
        new HtmlWebpackPugPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './static'),
                to: 'static',
                ignore: ['.*']
            },
            {
                from: path.join(
                    path.resolve(__dirname, './node_modules/@webcomponents/webcomponentsjs/'),
                    '*.js'
                ),
                to: './webcomponentjs',
                flatten: true
            }
        ]),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.HotModuleReplacementPlugin(),
    ]
};