const fs = require('fs');
const http = require('http');
const querystring = require('querystring');


const PORT = process.env.PORT || 8080;

const server = http.createServer(function (req, res) {
  console.log('METHOD', req.method, req.url, req.httpVersion);
  console.log('HEADERS', req.headers);

  // console.log(req.url);
  let request = req.method;
  console.log(request);
  console.log('URL', req.url)

  //GET METHOD
  if (request === "GET") {
    if (req.url === "/") {
      fs.readFile('./public' + '/index.html', 'utf8', (err, data) => {
        if (err) { throw err; }
        console.log('DATA', data);
        res.end(data);
      });
    } else if (!req.url) {
      fs.readFile('./public' + '/error.html', 'utf8', (err, data) => {
        if (err) { throw err; }
        console.log('DATA', data);
        res.end(data);
      });
    } else
      fs.readFile('./public' + req.url, 'utf8', (err, data) => {
        if (err) { throw err; }
        console.log('DATA', data);
        res.end(data);
      });
  }

  //POST METHOD
  if (request === "POST") {
    // req.uri = '/elements';

    let body = '';
    req.on('data', function (chunk) {
      // console.log(chunk);
      body = querystring.parse(chunk.toString());

      elementBody = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>The Elements - ${body.elementName}</title>
        <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
        <h1>${body.elementName}</h1>
        <h2>${body.elementSymbol}</h2>
        <h3>Atomic number ${body.elementAtomicNumber}</h3>
        <p>${body.elementDescription}</p>
        <p><a href="/">back</a></p>
      </body>
      </html>
      `
      const filePath = './public/' + body.elementName + '.html'

      console.log('body:', body);
      console.log(elementBody);
      fs.appendFile(filePath, elementBody, 'utf8', (err, data) => {
        if (err) {
          fs.writeHead(500);
          fs.write('Sorry could not write file');
          res.end();
        }
        console.log('The file was saved!')
      });
    });
    res.end();
    // do something here with the body
    // return the response
    return res.end('goodbye');
  }





});

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});