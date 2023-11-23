var http = require("http");
var fs = require("fs");
var url = require("url");

function templateHTML(title, list, body) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
    </p>
  </body>
  </html>
  `;
}

function templateList(filelist) {
  var list = "<ul>";
  for (let i = 0; i < filelist.length; i++) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list = list + "</ul>";
  return list;
}

function testing(filelist, title, description, response) {
  var list = templateList(filelist);
  var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
  response.writeHead(200);
  response.end(template);
}

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", (err, filelist) => {
        var title = "Welcome";
        var description = "Hello, Node.js Page";
        testing(filelist, title, description, response);
      });
    } else {
      fs.readdir("./data", (err, filelist) => {
        fs.readFile(`data/${queryData.id}`, "utf8", (err, description) => {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>${description}`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
  // response.end(fs.readFileSync(__dirname + _url));
});
app.listen(3030);
