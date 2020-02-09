import Webpack from 'webpack';
import Path from 'path';
import WebpackMerge from 'webpack-merge';
import { config as baseConfig } from './webpack.base';

export const config = WebpackMerge.smart(
    {
        mode: 'development',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(s[ac])ss$/i,
                    use: ['vue-style-loader'],
                },
                {
                    test: /\.css$/i,
                    use: ['vue-style-loader'],
                },
            ],
        },
        output: {
            path: Path.resolve('./dist/dev/'),
        },
    },
    baseConfig
);
