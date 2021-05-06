// server.js
// where the app starts

// Express (https://expressjs.com/)
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//var movesend = "";

io.on("connection", socket => {
  //console.log("User connected")
  //console.log("Id" + socket.id);
});


//app.use(express.static('public'));
app.use(express.json());

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index1.html");
});

app.post("/broadcast", (request, response) => {
  var message = request.body.message;
  console.log(message);
  client.say(globalTarget, message);
  response.end();
});

// listen for requests :)
const listener = server.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

/* ------ Twitch Bot Below ------- */
const tmi = require("tmi.js");
//const { Chess } = require('chess.js');
//const chess = new Chess();

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};
var globalTarget = null;
var started = false;
var voting = false;
var yes = 0;
var no = 0;

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot
  globalTarget = target;
  // Remove whitespace from chat message
  const commandNamelong = msg.trim();
  const commandNamelower = commandNamelong.toLowerCase();
  const commandNamesplit = commandNamelower.split(" ", 2);
  const commandName = commandNamesplit[0];
  const commandTail = commandNamesplit[1];

  // If the command is known, let's execute it
  switch (commandName) {
    case "!chess":
      if (!started) {
        started = true;
        client.say(
          target,
          `Let's play chess! Enter a move and then vote on it. (Example: !move e2e4)`
        );
        console.log(`* Executed ${commandName} command`);
      }
      break;
    case "!move":
      if (started && !voting) {
        if (isOnBoard(commandTail)) {
          const toMove = commandTail.substr(0, 4);
          client.say(
            target,
            `Voting on move: ${toMove}. Vote will last 10 seconds. Vote with 'y' or 'n'. `
          );
          voting = true;
          //setTimeout(moveResult(toMove, target), 10000);
          setTimeout(function() {
            moveResult(toMove, target);
          }, 10000);
        } else {
          client.say(target, `Move given invalid or no move given`);
        }
      }
      console.log(`* Executed ${commandName} command`);
      break;
    case "!veto":
      if (voting) {
        voting = false;
        console.log(`* Executed ${commandName} command`);
        client.say(target, `Move Vetoed`);
        yes = 0;
        no = 0;
      }
      break;
    default:
      if (voting) {
        if (commandName.charAt(0) == "y") {
          yes++;
        }
        if (commandName.charAt(0) == "n") {
          no++;
        }
      }
  }
}

// Evaluates if the given move is on the chess board at least
function isOnBoard(movein) {
  if (typeof movein === "undefined") {
    console.log("* No move given with move command ");
    return false;
  }
  const testmove = movein.split("");
  var patternRow = new RegExp("[a-h]");
  var patternColumn = new RegExp("[1-8]");
  if (
    patternRow.test(testmove[0]) &&
    patternColumn.test(testmove[1]) &&
    patternRow.test(testmove[2]) &&
    patternColumn.test(testmove[3])
  ) {
    return true;
  } else {
    console.log(`* Invalid move: ${movein}`);
    return false;
  }
}

function moveResult(movein, target) {
  voting = false;
  if (yes === 0 && no === 0) {
    console.log(`* Move was vetoed or no vote given`);
  } else if (yes > no) {
    var move = movein.substr(0, 2) + "-" + movein.substr(2, 2);
    console.log(`* Moving: ${move}`);
    // movesend = move;
    io.emit("message", move);
    client.say(target, `Vote passed ${yes} to ${no}. 'Moving: ${movein}'`);
  } else {
    console.log(`* Vote failed ${yes} to {no}`);
    client.say(target, `Vote failed ${yes} to ${no}`);
  }
  yes = 0;
  no = 0;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
