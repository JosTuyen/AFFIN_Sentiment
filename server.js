//initial express module
var fs = require('fs');
var express = require('express');
//excute express object
var app = express();
//listenning gate 3000
var server = app.listen(3000, listenning);
//read data.json

var affinData = fs.readFileSync('AFINN-111.json');
var additionData = fs.readFileSync('additionList.json');
var words = JSON.parse(affinData);
var newWords = JSON.parse(additionData);

console.log("starting server");
function listenning() {
  console.log("listenning");
}
//fletch static html file
app.use(express.static('website'));
//===============RESTful routers==================

app.get('/all',sendAll);

function sendAll(request, response) {
  var data = {
    additionWords : newWords,
    Words : words
  };
  response.send(data);
}

//app.post('/analyze',analyzeThis);

app.get('/add/:nWord/:nScore',addWord);

function addWord(request, response) {
  var nWord = request.params.nWord;
  var nScore = Number(request.params.nScore);
  newWords[nWord] = nScore;
  var converted = JSON.stringify(newWords, null, 2);
  //save to JSON file
  fs.writeFile('additionList.json',converted,error);
  function error(err) {
    console.log('Update.')
  }
  response.send("Thanks for word :)");
}

/*app.get('/:manga/:num',sendManga);

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
}*/
