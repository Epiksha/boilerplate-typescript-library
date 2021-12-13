const { resolve } = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        index: ['./src/index.ts', './src/sass/index.scss'],
    },

    output: {
        clean: true,
        filename: 'index.js',
        path: resolve(__dirname, 'dist'),
        library: 'UnnamedLibrary',
        globalObject: 'this',
    },

    watchOptions: {
        aggregateTimeout: 600,
        ignored: /node_modules/,
    },
    
    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', 'tsx', '.js', 'scss', 'sass'],
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
        new ESLintPlugin(),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: [resolve(__dirname, "./dist")],
        }),
    ],

    module: {
        rules: [
            {
                test: /\.[jt]s?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                    'ts-loader',
                ],
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