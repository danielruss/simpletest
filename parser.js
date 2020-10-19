console.log("in parser.js");

function parse(event) {
  event.preventDefault();
  let text = [...document.getElementById("parserInput").value];
  console.log(text);
}

window.onload = function () {
  document.getElementById("parserform").addEventListener("submit", parse);
};
