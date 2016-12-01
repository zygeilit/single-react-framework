
var connect = require('connect');
var HttpDispatcher = require('httpdispatcher');
var dispatcher = new HttpDispatcher();
var fs = require('fs');
var util = require('util');
var path = require('path');

var interfaces = require('./src/interfaces/index');

var port = 8091;

// 配置接口
for(var i=0; i<interfaces.length; i++) (function(intfe){
    var m = { 'get': 'onGet', 'post': 'onPost' };
    var callback = intfe['callback'] || function(req, res){
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-cache' });
            var reponseText = JSON.stringify(intfe['response'] || {});
            res.write(reponseText);
            res.end();
        };
    dispatcher[m[intfe['type']]](intfe['path'], callback);
})(interfaces[i]);

// 承载页
dispatcher.onGet('/', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
    fs.readFile('./index.html', null, function(error, data){
        if(error) {
            res.writeHead(404);
            res.write('File not fount!');
        } else {
            res.write(data);
        }
        res.end();
    });
});


(new connect())
    .use(function logger(req, res, next) {
        console.log('%s %s', req.method, req.url);
        next();
    })

    // 返回资源文件
    .use(function staticFiles(req, res, next) {
        var filePath = '.' + req.url;
        var extname = path.extname(filePath);
        var contentType = '';
        var isStaticFile = false;
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                isStaticFile = true;
                break;
            case '.css':
                contentType = 'text/css';
                isStaticFile = true;
                break;
            case '.png':
            case '.jpg':
            case '.gif':
                contentType = 'image/' + extname.replace('\.', '');
                isStaticFile = true;
                break;
            default: break;
        }
        if(isStaticFile) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    res.writeHead(404);
                    res.write('File not fount!');
                }
                else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
                res.end();
            });
        } else {
            next();
        }
    })

    // 接口路由
    .use(function interfaces(req, res, next) {
        dispatcher.dispatch(req, res);
    })

    .listen(port)