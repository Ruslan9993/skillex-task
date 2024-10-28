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

    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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