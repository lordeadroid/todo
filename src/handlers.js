const { readFile } = require("fs");

const { HEADERS, MIME_TYPES } = require("./constants.js");

const serveHomePage = (_, response) => {
  const path = "./index.html";

  readFile(path, (_, content) => {
    response.setHeader(HEADERS.contentType, MIME_TYPES.html);
    response.end(content);
  });
};

module.exports = { serveHomePage };
