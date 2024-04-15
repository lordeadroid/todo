const fs = require("fs");

const readFile = (path, encoding = "utf-8") => {
  return new Promise((res, rej) => {
    fs.readFile(path, encoding, (err, content) => {
      if (err) {
        rej(err);
      }
      res(content);
    });
  });
};

module.exports = { readFile };
