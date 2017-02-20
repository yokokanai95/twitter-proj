let path =      require("path"),
    webpack =   require("webpack");


module.exports = {
    cache: true,
    debug: true,
    devtool: 'source-map',
    context: path.join(__dirname, "/src/client"),
    entry: {
        main: "./main.js"
    },
    output: {
        path: "./public/js/",
        filename: "main.js",
        publicPath: "/js/"
    },
    module: {
        loaders: [
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            // required to write "require('./style.css')"
            { test: /\.css$/,  loader: "style-loader!css-loader" },
            { test: /\.png$/,  loader: "url-loader?limit=100000" },
            { test: /\.json$/, loader: "json-loader" },

            // required for bootstrap icons
            { test: /\.(woff|woff2)$/,  loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
            { test: /\.ttf$/,           loader: "file-loader?prefix=font/" },
            { test: /\.eot$/,           loader: "file-loader?prefix=font/" },
            { test: /\.svg$/,           loader: "file-loader?prefix=font/" },

            // required for ES6 and react-jsx
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets:['es2015','stage-0', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss'],
        alias: {
            underscore  : "lodash"
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            "_":        "lodash",
            "$":        "jquery",
            "jQuery":   "jquery",
            "Backbone": "backbone"
        })
    ]
};
