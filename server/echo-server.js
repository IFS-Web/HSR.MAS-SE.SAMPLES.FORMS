const http = require('http');
const url = require('url');
const path = require('path');
const port = process.argv[2] || "5001";

http.createServer(function (request, response) {

  let body = "";
  request.on('data', function (chunk) {
    body += chunk;
  });
  request.on('end', function () {
    const parsedUrl = url.parse(request.url);
    const query = parsedUrl.query;

    const responseHtml = `<!DOCTYPE html>
    <title>Echo</title>
    <pre>
    method: ${request.method};
    url: ${request.url};
    query: ${query};
    body: ${body}
    </pre>`;
    console.log(responseHtml);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(responseHtml);


  });

}).listen(parseInt(port));

console.log('Server listening on localhost port', port);