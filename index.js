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

app.get("/api/",(req,res)=>{
  let date =  new Date();
  res.json({unix: date.getTime(),utc: date.toUTCString()})

});

app.get("/api/:date", (req, res) => {
  let date = req.params.date;

  if (isValidDate(date))
  {
    let realDate = new Date(date);
    res.json({ unix: realDate.getTime(),utc: realDate.toUTCString() });
  }
  else if (isValidUnixDate(date)) 
  {
    let realDate = new Date(parseInt(date));
    res.json({ unix: parseInt(date) ,utc: realDate.toUTCString() });
  }
  else if(date == "")
  {
    res.json({message: "Nothing to show"});
  }
  else 
  {
    res.json({ error: "Invalid Date" });
  }
});

function isValidDate(dateStr) {
  // Expression régulière pour le format "YYYY-MM-DD"
  let dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateRegex.test(dateStr)) {
    // La chaîne correspond au format "YYYY-MM-DD"
    let dateObject = new Date(dateStr);

    // Vérifie si la date est valide après la conversion
    return !isNaN(dateObject.getTime());
  }

  return false;
}

function isValidUnixDate(unixTimestamp) {
  // Convertit le timestamp Unix en millisecondes
  let milliseconds = unixTimestamp * 1000;

  // Tente de créer un objet Date à partir des millisecondes
  let dateObject = new Date(milliseconds);

  // Vérifie si la date est valide après la conversion
  return !isNaN(dateObject.getTime());
}

// listen for requests :)
var listener = app.listen("3000", function () {
  console.log("Your app is listening on port " + listener.address().port);
});
