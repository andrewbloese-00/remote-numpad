import { WebSocketServer } from "ws";
import { config as envConfig } from "dotenv";
import { createServer } from "http";
import robot from "robotjs";
import { readFileSync } from "fs";
import { networkInterfaces } from "os";

envConfig();

//helper , gets the current exposable ip address to share with local network...
const _isV4 = (x) => x.family === "IPv4";
function getIP() {
  const ifs = networkInterfaces();
  const result = Object.keys(ifs)
    .map((x) => [x, ifs[x].filter(_isV4)[0]])
    .filter((x) => x[1])
    .map((x) => x[1].address);

  const [local, exposable] = result;
  return { local, exposable };
}

const ip = getIP().exposable;
//http server serves the index.html file with the specified ws address
const server = createServer((req, res) => {
  if (req.method.toLowerCase() === "get") {
    const html = readFileSync("index.html", "utf8").replace("<IP_ADDR>", ip);
    res.statusCode = 200;
    res.end(html);
  } else {
    res.statusCode = 404;
    res.end("ERROR! Unsupported METHOD");
  }
});

const port = process.env.PORT || 8080;
const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
  console.log("[INFO] Client Connected");

  ws.on("message", handleMessage);
  ws.on("close", ()=>console.log("[INFO] Client Disconnected"))
});


const MESSAGE_TYPES = {
  LEFT_CLICK: "cl",
  RIGHT_CLICK: "cr",
  SWIPE: "sw",
  SCROLL: "sc",
  KEYPRESS: "kp",
  KEYHOLD: "kh",
  KEYRELEASE: "kr",
};

/*
Socket Messages
LEFT_CLICK - 'cl'
RIGHT_CLICK - 'cr'
KEYPRESS - 'kp,<key>'
KEYHOLD - 'kh,<key>'
KEYRELEASE - 'kr,<key>'
SWIPE - 'sw,<dx>,<dy>'
SCROLL - 'sc,<dx>,<dy>'
*/

/**
 * @param {Buffer} data
 */
function handleMessage(data) {
  const args = data.toString("utf8").split(",");
  switch (args[0]) {
    case MESSAGE_TYPES.LEFT_CLICK:
      robot.mouseClick();
      break;
    case MESSAGE_TYPES.RIGHT_CLICK:
      robot.mouseClick("right");
      break;
    case MESSAGE_TYPES.KEYPRESS:
      console.log("PRESS: ", args[1]);
      robot.keyTap(args[1]);
      break;
    case MESSAGE_TYPES.KEYHOLD:
      robot.keyToggle(args[1], "down");
      break;
    case MESSAGE_TYPES.KEYRELEASE:
      robot.keyToggle(args[1], "up");
      break;

    case MESSAGE_TYPES.SWIPE: {
      const dx = Number(args[1]); //client dx and dy
      const dy = Number(args[2]);
      console.log("SWIPE -> ", [dx, dy]);
      break;
    }

    default: {
      console.error("Unrecognized Message Type: ", args[0]);
      break;
    }
  }
}

server.listen(port, () => {
  const lines =
    "== == == == == == == == == == == == == == == == == == == == == \n" +
    "\n" +
    " ####   ##   ##   ##   ##########   #######  ######   ####\n" +
    " ## ##  ##   ##   ##   ##  ##  ##   ##   ##  ##  ##   ## ##\n" +
    " ##  ## ##   ##   ##   ##  ##  ##   #####    ######   ## ##\n" +
    " ##   ####    #####    ##      ##   ##       ##  ##   ####\n" +
    "\n" +
    "== == == == == == == == == == == == == == == == == == == == == \n";
  const url = `${ip}:${port}`;
  console.log(
    lines +
      `[Numpad Access URL] \n > http://${url}\n[Websocket Access URL] \n > ws://${url}`,
  );
});
