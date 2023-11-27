var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var templated = {
  HTML: function(title, list, body, control) {
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
      ${control}
      ${body}
      </p>
    </body>
    </html>
    `;
  },
  list: function(filelist) {
    var list = "<ul>";
    for (let i = 0; i < filelist.length; i++) {
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list = list + "</ul>";
    return list;
  },
  testing: function(filelist, title, description, response) {
    var list = templated.list(filelist);
    var html = templated.HTML(
      title,
      list,
      `<h2>${title}</h2>${description}`,
      `
    <a href="/create">create</a>`
    );
    response.writeHead(200);
    response.end(html);
  }
};

/*
function templateHTML(title, list, body, control) {
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
    ${control}
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
  var list = templated.list(filelist);
  var template = templated.html(
    title,
    list,
    `<h2>${title}</h2>${description}`,
    `
  <a href="/create">create</a>`
  );
  response.writeHead(200);
  response.end(template);
}
*/

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", (err, filelist) => {
        var title = "Welcome";
        var description = "Hello, Node.js Page";
        templated.testing(filelist, title, description, response);
      });
    } else {
      fs.readdir("./data", (err, filelist) => {
        fs.readFile(`data/${queryData.id}`, "utf8", (err, description) => {
          var title = queryData.id;
          var list = templated.list(filelist);
          var html = templated.HTML(
            title,
            list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>
            <form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${title}" />
              <input type="submit" value="delete" /> 
            </form`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", (err, filelist) => {
      var title = "web - create";
      var list = templated.list(filelist);
      var html = templated.HTML(
        title,
        list,
        `<form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea></p>
        <p><input type="submit" /></p>
      </form>
      `,
        ``
      );
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", data => {
      body += data;
    });
    request.on("end", () => {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, "utf8", err => {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathname === "/update") {
    fs.readdir("./data", (err, filelist) => {
      fs.readFile(`data/${queryData.id}`, "utf8", (err, description) => {
        var title = queryData.id;
        var list = templated.list(filelist);
        var html = templated.HTML(
          title,
          list,
          `
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}"/>
            <p><input type="text" name="title" placeholder="title" value="${title}" /></p>
            <p><textarea name="description" id="" cols="30" rows="10" placeholder="description">${description}</textarea></p>
            <p><input type="submit" /></p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/update_process") {
    var body = "";
    request.on("data", data => {
      body += data;
    });
    request.on("end", () => {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, err => {
        fs.writeFile(`data/${title}`, description, "utf8", err => {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", data => {
      body += data;
    });
    request.on("end", () => {
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, err => {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
  // response.end(fs.readFileSync(__dirname + _url));
});
app.listen(3030);
