import * as Webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';

export const isProduction = process.env.NODE_ENV === 'production';

export const config: Webpack.Configuration = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
            },
            {
                test: /\.(s[ac])ss$/i,
                use: ['css-loader', 'sass-loader'],
                exclude: /[\\/]node_modules[\\/]/
            },
            {
                test: /\.css$/i,
                use: ['css-loader'],
                exclude: /[\\/]node_modules[\\/]/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[contenthash:8].[ext]',
                    },
                },
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    output: {
        filename: 'app/[name]-[hash:8].js',
        chunkFilename: 'app/[name]-[hash:8].js',
        publicPath: '/',
    },
};
