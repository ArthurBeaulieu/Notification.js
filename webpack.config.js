module.exports = env => {
    // Webpack clean and uglify plugins
    const path = require('path');
    const TerserPlugin = require('terser-webpack-plugin');
    const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    // Utils path
    const SRC = path.resolve(__dirname, 'src');
    const DIST = path.resolve(__dirname, 'dist');
    // CSS loaders to be used on compilation
    const cssLoaders = [{
        loader: 'css-loader',
        options: {
            importLoaders: 1
        }
    }, {
        loader: 'postcss-loader',
        options: {
            plugins: () => [
                require('autoprefixer')
            ]
        }
    }];
    // Webpack configuration object
    return {
        mode: env.dev === 'true' ? 'development' : 'production',
        watch: env.dev === 'true',
        entry: ['./src/js/Notification.js', './src/scss/notification.scss'],
        stats: {
            warnings: env.dev === 'true',
        },
        devtool: false,
        output: {
            path: DIST,
            filename: `Notification.min.js`
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    ...cssLoaders,
                    'sass-loader'
                ]
            }]
        },
        plugins: [
            new CleanWebpackPlugin({
                root: DIST,
                verbose: true,
                dry: false
            }),
            new MiniCssExtractPlugin({
                filename: 'notification.min.css'
            })
        ],
        resolve: {
            extensions: ['.js', '.scss'],
            modules: ['node_modules', SRC]
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: 4,
                    terserOptions: {
                        ecma: 5
                    }
                }),
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }]
                    },
                    canPrint: true
                })
            ]
        }
    };
};
