import fs from "fs";

const readFile = (path, encoding = "utf-8") => {
  return new Promise((res, rej) => {
    fs.readFile(path, encoding, (err, content) => {
      if (err) {
        res("[]");
      }
      res(content);
    });
  });
};

export default readFile;
