const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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

    plugins: [new MiniCssExtractPlugin()],

    devServer: {
        static: "./dist",
        hot: true
    }
}