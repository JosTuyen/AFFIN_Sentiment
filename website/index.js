var request = new XMLHttpRequest();

var txt = document.querySelector('#txt');

request.open('GET', "http://localhost:3000/all");
request.responseType = 'json';
request.send();
request.onload = function () {
  var data = request.response;
  txt.oninput = function () {
    var score = 0;
    var words = txt.value.split(/\W/);
    var scoreWord = [];
    var listWord = "";
    for (var i = 0; i < words.length; i++) {
      var word = words[i].toLowerCase();
      if (data.additionWords.hasOwnProperty(word)) {
        score += data.additionWords[word];
        scoreWord.push(word + "  : "+data.additionWords[word]);
      }else if (data.Words.hasOwnProperty(word)) {
        score += data.Words[word];
        scoreWord.push(word + " : "+data.Words[word]);
      }
    }
    for (var j = 0; j <= scoreWord.length/3 + 1; j++) {
      listWord += "<tr>";
      for (var k = 0; k < 3; k++)
        if (3*j+k<scoreWord.length)
          listWord +="<td>" + scoreWord[3*j+k].toString() + "</td>";

      listWord += "</tr>";
    }

    document.querySelector('#score').innerHTML = "Score : " + score;
    document.querySelector('#comparative').innerHTML = "Comparative : "
    + Math.round(score/words.length*100)/100;
    document.querySelector('#wordlist').innerHTML = listWord;
  };
}

function submit() {
  var nWord = document.querySelector('#nWord').value;
  var nScore = document.querySelector('#nScore').value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET',"http://localhost:3000/add/"+nWord+"/"+nScore);
  xhr.responseType = 'text';
  xhr.send();
  xhr.onload = function () {
    console.log(xhr.response);
  }
}
