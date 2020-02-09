import Webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import GifSicle from 'imagemin-gifsicle';
import MozJpeg from 'imagemin-mozjpeg';
import PngQuant from 'imagemin-pngquant';
import Svgo from 'imagemin-svgo';

export const isProduction = process.env.NODE_ENV === 'production';

export const config: Webpack.Configuration = {
    resolve: {
        mainFields: ['module', 'main'],
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /[\\/]node_modules[\\/]/,
            },
            {
                test: /\.tsx?$/i,
                loader: 'ts-loader',
                options: {
                    configFile: '../build/tsconfig.bundle.json',
                    transpileOnly: true,
                    happyPackMode: false,
                    appendTsSuffixTo: /\.vue$/i,
                },
                exclude: /[\\/]node_modules[\\/]/,
            },
            {
                test: /\.(s[ac])ss$/i,
                use: ['css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            esModule: false,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    esModule: false,
                                    name: 'img/[name]-[contenthash:8].[ext]',
                                },
                            },
                        },
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                GifSicle({ interlaced: false }),
                                MozJpeg({ progressive: true, arithmetic: false }),
                                PngQuant({ strip: true, speed: 2 }),
                                Svgo({ plugins: [{ removeTitle: true }, { convertPathData: false }] }),
                            ],
                        },
                    },
                ],
                exclude: /[\\/]node_modules[\\/]/,
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new CaseSensitivePathsPlugin(),
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    output: {
        filename: 'app/[name]-[hash:8].js',
        chunkFilename: 'app/[name]-[chunkhash:8].js',
        publicPath: '/',
    },
};
