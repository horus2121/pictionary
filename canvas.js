// Canvas
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight / 2;
canvas.width = window.innerWidth / 2;

let penButton = document.querySelector("#pen");
let eraserButton = document.querySelector("#eraser");
let switchColorButton = document.querySelector("#color");
let changeWidthButton = document.querySelector("#width");
let clearButton = document.querySelector("#clear");
let painting = false;

function startingPoint(e) {
  painting = true;
  draw(e);
}

function endingPoint() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  penButton.addEventListener("click", pen);
  eraserButton.addEventListener("click", eraser);
  switchColorButton.addEventListener("change", switchColor);
  changeWidthButton.addEventListener("change", changeWidth);
  clearButton.addEventListener("click", clear);

  ctx.lineCap = "round";

  ctx.lineTo(e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop);
}

function pen() {
  ctx.strokeStyle = "black";
}

function eraser() {
  ctx.strokeStyle = "white";
}

function switchColor() {
  ctx.strokeStyle = switchColorButton.value;
}

function changeWidth() {
  ctx.lineWidth = changeWidthButton.value;
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", startingPoint);
canvas.addEventListener("mouseup", endingPoint);
canvas.addEventListener("mousemove", draw);

// window.addEventListener("resize", () => {
//   canvas.height = window.innerHeight / 2;
//   canvas.width = window.innerwidth / 2;
// })

// Random word generator
function getWord() {
  let wordField = document.querySelector("#wordField");

  fetch("https://random-word-api.herokuapp.com/word")
    .then( res => res.json())
    .then( json => (function () {
      let randomWord = json[0].toUpperCase();
      wordField.innerText = randomWord;
    })())
    .catch( err => function () {
      console.log("ERROR!!!")
    })
}

let switchWordButton = document.querySelector("#switchWord");

switchWordButton.addEventListener("click", getWord);

getWord();
