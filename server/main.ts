import Path from 'path';
import Fs from 'fs';
import Express from 'express';
import Webpack from 'webpack';
import Mfs from 'memory-fs';
import { createBundleRenderer } from 'vue-server-renderer';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import clientConfig from '../build/webpack.client';
import serverConfig from '../build/webpack.server';
import webpack from 'webpack';

const server = Express();
const isProduction = process.env.NODE_ENV === 'production';
const srcPath = Path.resolve(__dirname, '../dist/' + (isProduction ? 'prod/' : 'dev/'));
if (!isProduction) {
    (clientConfig.entry as { client: any })['client'] = ['webpack-hot-middleware/client', (clientConfig.entry as { client: any })['client']];
    clientConfig.plugins!.push(new Webpack.HotModuleReplacementPlugin());

    const clientCompiler = webpack(clientConfig);
    const serverCompiler = webpack(serverConfig);
    const hotMiddleware = webpackHotMiddleware(clientCompiler, { heartbeat: 5000 });
    const devMiddleware = webpackDevMiddleware(clientCompiler, {
        publicPath: '' + clientConfig.output!.publicPath,
        serverSideRender: true,
        logLevel: 'silent',
    });

    // when the HMR plugin is added, webpack will auto rebuild upon a change and put in in a fake filesystem
    // when done, we read the file from memory and re-create the renderer
    clientCompiler.hooks.done.tap('Express HMR', stats => {
        const statsObj = stats.toJson();
        statsObj.warnings.forEach(warn => console.warn(warn));
        statsObj.errors.forEach(err => console.error(err));
        if (stats.hasErrors()) return;

        clientManifest = JSON.parse(devMiddleware.fileSystem.readFileSync(srcPath + '/vue-ssr-client-manifest.json'));
        renderer = createRenderer();
    });

    // The watch command by default outputs to the physical filesystem
    // Use an in memory variant instead
    // Upon a rebuild, we re-create the renderer
    const serverMfs = new Mfs();
    serverCompiler.outputFileSystem = serverMfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        const statsObj = stats.toJson();
        statsObj.warnings.forEach(warn => console.warn(warn));
        statsObj.errors.forEach(err => console.error(err));
        if (stats.hasErrors()) return;

        serverBundle = JSON.parse(serverMfs.readFileSync(srcPath + '/vue-ssr-server-bundle.json'));
        renderer = createRenderer();
    });

    server.use(devMiddleware);
    server.use(hotMiddleware);
}

// Load the default server-bundle and client-manifest
// These can be overwritten in case of an update
// Create a default renderer which can also be overwritten if needed
// This new renderer will be used when HMR signals the client to request the update
let serverBundle = JSON.parse(Fs.readFileSync(srcPath + '/vue-ssr-server-bundle.json', 'utf-8'));
let clientManifest = JSON.parse(Fs.readFileSync(srcPath + '/vue-ssr-client-manifest.json', 'utf-8'));
let template = require('fs').readFileSync(Path.join(__dirname, '../server/index.html'), 'utf-8');
const createRenderer = () =>
    createBundleRenderer(serverBundle, {
        runInNewContext: false,
        template,
        clientManifest,
        inject: false,
    });
let renderer = createRenderer();

server.use('/', Express.static(srcPath));
server.get('*', (req: any, res: any): void => {
    const context = { url: req.url };

    renderer.renderToString(context, (err, html) => {
        if (err) {
            if (+err.message === 404) {
                res.status(404).end('Page not found');
            } else {
                console.log(err);
                res.status(500).end('Internal Server Error');
            }
        }

        res.end(html);
    });
});

server.listen(process.env.PORT || 3000);
