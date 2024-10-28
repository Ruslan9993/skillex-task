const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let mode = "development";
let target = "web"
const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html",
    })
]


if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
} else {
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    mode: mode,
    target: target,

    entry: "./src/index.js",

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

    plugins: plugins,

    devServer: {
        static: "./dist",
        hot: true
    }
}