import Webpack from 'webpack';
import Path from 'path';
import WebpackMerge from 'webpack-merge';
import { config as devConfig } from './webpack.dev';
import { config as prodConfig } from './webpack.prod';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import { isProduction } from './webpack.base';

let config = WebpackMerge.smart(isProduction ? prodConfig : devConfig, {
    entry: {
        client: Path.resolve(__dirname, '../src/entry-client.js'),
    },
    target: 'web',
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                },
            },
        },
    },
    plugins: [new VueSSRClientPlugin()],
} as Webpack.Configuration);

export default config;
