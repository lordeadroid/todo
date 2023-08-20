const http = require("node:http");

const { route } = require("./src/router.js");

const log = (request) => {
  console.log(request.method, request.url);
};

const main = () => {
  const server = http.createServer((request, response) => {
    log(request);
    route(request, response);
  });

  const PORT = 8000;
  const TIME = new Date().toTimeString();
  server.listen(PORT, () => {
    console.log("Listening on PORT:", PORT, TIME);
  });
};

main();
