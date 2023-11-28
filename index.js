// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", function (req, res) {
  const userInput = req.params.date;

  let date = new Date(userInput);
  if (isValidDate(userInput)) {

    
    if (!isNaN(userInput)) {
      const unix = parseInt(userInput);
      date = new Date(unix);
      return res.json({
        unix: unix,
        date: date.toUTCString()
      });
    }

    res.json({
      yo: "yo",
      unix: date.getTime(),
      utc: date.toUTCString(),
    });

  }else {

    res.json({ error: "Invalid Date",value:isValidDate(userInput)});
  }
});

function isValidDate(dateStr) {
  // Try parsing as a standard date format
  let standardDate = new Date(dateStr);
  if (!isNaN(standardDate.getTime())) {
      return true;
  }

  // Try parsing as a Unix timestamp
  let unixTimestamp = parseInt(dateStr, 10);
  if (!isNaN(unixTimestamp)) {
      let unixDate = new Date(unixTimestamp * 1000); // Convert to milliseconds
      return !isNaN(unixDate.getTime());
  }

  return false;
}


// listen for requests :)
var listener = app.listen("3000", function () {
  console.log("Your app is listening on port " + listener.address().port);
});
