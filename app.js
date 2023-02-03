const http = require("http");
var os = require("os");

const host = "127.0.0.1";
const port = 8080;

let value = "SSE";
let sseCon = null;
const requestListener = function (req, res) {
  if (req.url === "/test") {
    sseCon = res;

    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("connection", "keep-alive");
    res.setHeader("Content-Type", "text/event-stream");

    setInterval(() => {
      res.write(
        "event: red\n" + 'data: {"message" : "hello ' + value + '"}\n\n'
      );
    }, 1000);

    setTimeout(() => {
      res.write(
        'data: {"message" : "hello ' + value + '"}\n\n'
      );
    }, 2000);

  } else if (req.url === "/change") {
    value = "CHANGED";
    sseCon.write(
        "event: red\n" + 'data: {"message" : "hello ' + value + '"}\n\n'
      );
    res.end("");
  } else {
    res.statusCode = 404;
    res.end("resource does not exist");
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`server running at http://${host}:${port}`);
});
