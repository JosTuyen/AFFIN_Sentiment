//initial express module
var fs = require('fs');
var express = require('express');
//excute express object
var app = express();
//listenning gate 3000
var server = app.listen(3000, listenning);
//read data.json
var database = fs.readFileSync('data.json');
var data = JSON.parse(database);

console.log(data);
console.log("starting server");
function listenning() {
  console.log("listenning");
}
//fletch static html file
app.use(express.static('website'));
//===============RESTful routers==================
app.get('/add/:anime/:score',addAnime);

function addAnime(request, response) {
  var anime = request.params.anime;
  var score = request.params.score;
  data[anime] = score;
  var converted = JSON.stringify(data, null, 2);
  //save to JSON file
  fs.writeFile('data.json',converted,error);
  function error(err) {
    console.log('all set.')
  }
  response.send("Everything is ok!");
}

app.get('/:manga/:num',sendManga);

function sendManga(request, response) {
  var input = request.params;
  var reply = "";
  for (var i = 0; i < input.num; i++) {
    reply += "I love "+ input.manga + " too!</br>";
  }
  response.send(reply);
}

app.get('/all',sendAll);

function sendAll(request, response) {
  response.send(data);
}
