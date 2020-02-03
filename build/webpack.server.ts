import WebpackMerge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import Path from 'path';
import { config as devConfig } from './webpack.dev';
import { config as prodConfig } from './webpack.prod';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin';
import { isProduction } from './webpack.base';

export default WebpackMerge.smart({
    entry: {
        server: Path.resolve(__dirname, '../src/entry-server.js'),
    },
    target: 'node',
    externals: nodeExternals({
        whitelist: /\.css$/,
    }),
    plugins: [new VueSSRServerPlugin()],
    output: {
        libraryTarget: 'commonjs2',
    },
}, isProduction ? prodConfig : devConfig);
