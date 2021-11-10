const { resolve } = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/index.ts', './src/sass/index.scss'],
    },

    output: {
        clean: true,
        filename: 'index.js',
        path: resolve(__dirname, 'dist'),
    },
    
    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js', 'scss', 'sass'],
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: false,
                },
            }),
            new CssMinimizerPlugin()
        ]
    },
    
    plugins: [
        new MiniCssExtractPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.[jt]s?$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            eslintPath: 'eslint',

                        },
                        loader: 'eslint-loader',
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.[jt]s?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s[ac]ss)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
};