console.log("starting");

var display = document.getElementById('display');
var ctx = display.getContext("2d");

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/all');
request.responseType = 'json';
request.send();
request.onload = function () {
  var data = request.response;
  var keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    let x = Math.random()*350;
    let y = Math.random()*350;
    ctx.fillText(keys[i],x ,y, 55);
  }
};

var submit = document.querySelector("#submit");
function submitAnime() {
  var anime = document.querySelector("#anime").value;
  var score = document.querySelector("#score").value;
  request.open('GET', "http://localhost:3000/add/"+anime+"/"+score);
  request.send();
  request.onload = function () {
    console.log(anime+"  "+score);
  }
}
