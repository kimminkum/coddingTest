var templated = {
  HTML: function(title, list, body, control) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>WEB3 - ${title}</title>
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

module.exports = templated;
