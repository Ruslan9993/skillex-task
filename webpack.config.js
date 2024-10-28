const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let mode = "development";
let target = "web"


if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
}

module.exports = {
    mode: mode,
    target: target,

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]"
    },

    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|git|svg)$/i,
                type: "asset"
            },
            {
                test: /\.(s[ac]|c)ss$/,
                use: [{loader: MiniCssExtractPlugin.loader, options: { publicPath: ""}},, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },

        ]
    },

    resolve: {
        extensions: [".js", ".jsx"]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
        template: "./src/index.html",
    })
    ],

    devServer: {
        static: "./dist",
        hot: true
    }
}