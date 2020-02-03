import Webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import Path from 'path';
import { config as baseConfig } from './webpack.base';
import MiniCssExtractPlugin = require('mini-css-extract-plugin');

export const config = WebpackMerge.smart({
    mode: 'production',
    devtool: 'nosources-source-map',
    module: {
        rules: [
            {
                test: /\.(s[ac])ss$/i,
                use: [MiniCssExtractPlugin.loader],
                exclude: /[\\/]node_modules[\\/]/
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader],
                exclude: /[\\/]node_modules[\\/]/
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app/[name]-[contenthash:8].css'
        }),
    ],
    output: {
        path: Path.resolve('./dist/prod/'),
    }
}, baseConfig);