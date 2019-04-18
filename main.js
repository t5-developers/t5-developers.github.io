var intervalID = window.setInterval(updateScreen, 200);

var txt = [
  "T5 DEVELOPERS [Version 1.0.0.1]",
  "\0",
  "2019. T5 Developers. #Solutions Delivered",
  "\0",
  "TRYPASS: ********* AUTH CODE: ALPHA GAMMA: 1___ PRIORITY 1",
  "Priority 1 // local / loading...",
  "\0",
  "\0",
  "root@ubuntu:~# http-server /T5/var/www/index.html",
  "Starting up http-server, serving ./",
  "Available on:",
  "http://127.0.0.1:8080",
  "...",
  "...",
  "Hit CTRL-C to stop the server",
  "SERVING: index.html",
  "SERVING: style.css",
  "SERVING: main.js",
  "\0",
  "\0",
]

var docfrag = document.createDocumentFragment();

function updateScreen() 
{
  //Shuffle the "txt" array
  txt.push(txt.shift());
  //Rebuild document fragment
  txt.forEach(function(e) {
    var p = document.createElement("p");
    p.textContent = e;
    docfrag.appendChild(p);
  });
  //Clear DOM body
  var c = document.getElementById("console");
  while (c.firstChild) {
    c.removeChild(c.firstChild);
  }
  c.appendChild(docfrag);
}
