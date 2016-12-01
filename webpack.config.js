var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FileSystem = require("fs");

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/scripts');

var version = (function getVersion(){
    var date = new Date();
    var Y = date.getFullYear()+'';
    var M = date.getMonth()+1+'';
    var D = date.getDate()+'';
    var H = date.getHours()+'';
    var m = date.getMinutes()+'';
    var s = date.getSeconds()+'';
    M=M.length==1?'0'+M:M;
    D=D.length==1?'0'+D:D;
    H=H.length==1?'0'+H:H;
    m=m.length==1?'0'+m:m;
    s=s.length==1?'0'+s:s;
    return [ Y, M, D, H, m, s ].join('');
})();

var config = {
    entry: APP_DIR + '/entry.js',
    output: {
        path: BUILD_DIR + '/',
        filename: 'main-'+ version +'.min.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?$/,
                include : APP_DIR,
                loader : 'babel'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },    plugins: [
        new webpack.DefinePlugin({
            __DEBUG__: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            test: /(\.jsx|\.js)$/
            ,compress: {
                warnings: false
            }
            ,minimize: true
            ,sourceMap: false
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin('/css/main-'+ version +'.min.css', {
            allChunks: true
        }),
        // 通过[template.ejs]模板, 打包生成[index.html]文件
        function() {
            this.plugin("done", function(statsData) {
                var stats = statsData.toJson();
                if (!stats.errors.length) {
                    var htmlFileName = "template.ejs";
                    var html = FileSystem.readFileSync(path.join(__dirname, htmlFileName), "utf8");
                    var htmlOutput = html.replace(/\[js\-bundle\]/, stats.assetsByChunkName.main[0]);
                    htmlOutput = htmlOutput.replace(/\/\[css\-bundle\]/, stats.assetsByChunkName.main[1]);
                    FileSystem.writeFileSync(
                        path.join(__dirname, "/", 'index.html'),
                        htmlOutput
                    );
                }
            });
        }
    ]
};

module.exports = config;