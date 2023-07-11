const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // 设置允许跨域的域名，* 代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 设置允许的请求方法
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // 设置允许的请求头部信息
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理请求
    if (req.url === '/test' && req.method === 'GET') {
        // 处理 GET 请求
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        setTimeout(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('hello');
        }, 8000);
    } else if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('running');
    } else {
        // 处理其他请求
        const pathName = req.url.substring(1);
        console.log('pathName', pathName);
        try {
            const content = fs.readFileSync(pathName);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(content.toString());
        } catch (e) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(String(e));
        }
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
