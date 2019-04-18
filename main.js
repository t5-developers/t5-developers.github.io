var intervalID = window.setInterval(updateScreen, 500);

var txt = [
  "T5 DEVELOPERS [Version 1.0.0.1] Last-Modified: Thu, 18 Apr 2019 10:01:57 GMT",
  "\0",
  "2019. T5 Developers. #Solutions Delivered",
  "\0",
  "TRYPASS: ********* AUTH CODE: 1___ PRIORITY 1",
  "\0",
  "\0",
  "root@ubuntu:~# http-server '/t5-developers/master/index.html' ",
  "Starting up http-server, serving ./",
  "Available on:",
  "http://127.0.0.1:8080",
  "...",
  "...",
  "Hit CTRL-C to stop the server",
  "SERVING: /index.html",
  "SERVING: /style.css",
  "SERVING: /main.js",
  "\0",
  "\0",
  "Please wait while Version 2.0 is under development",
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
