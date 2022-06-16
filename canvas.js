// Canvas
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight / 2;
canvas.width = window.innerWidth / 2;

const penButton = document.querySelector("#pen");
const eraserButton = document.querySelector("#eraser");
const switchColorButton = document.querySelector("#color");
const changeWidthButton = document.querySelector("#width");
const drawShapeButton = document.querySelector("#shape");
const clearButton = document.querySelector("#clear");

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

// drawShapeButton.addEventListener("change", drawShape);
// function drawShape() {
//   if (drawShapeButton.value == "Circle") {
//     console.log(ctx.strokeStyle)
//     // ctx.beginPath();
//     // ctx.arc(e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop, 50, 0, Math.PI * 2, true);
//   } else if (drawShapeButton.value == "Triangle") {
//     console.log(ctx.strokeStyle)
//   } else {
//
//     if (!painting) return;
//
//     switchColorButton.addEventListener("change", switchColor);
//     changeWidthButton.addEventListener("change", changeWidth);
//
//     ctx.lineCap = "round";
//
//     let startingX = e.clientX - ctx.canvas.offsetLeft;
//     let startingY = e.clientY - ctx.canvas.offsetTop;
//     let width = e.clientX - ctx.canvas.offsetLeft - startingX; 
//     let height = e.clientY - ctx.canvas.offsetTop - startingY;
//
//     ctx.strokeRect(startingX, startingY, width, height);
//   }
// }

canvas.addEventListener("mousedown", startingPoint);
canvas.addEventListener("mouseup", endingPoint);
canvas.addEventListener("mousemove", draw);

// window.addEventListener("resize", () => {
//   canvas.height = window.innerHeight / 2;
//   canvas.width = window.innerwidth / 2;
// })

// Random word generator

// function getWord() {
//   const wordField = document.querySelector("#wordField");
//
//   fetch("https://random-word-api.herokuapp.com/word")
//     .then( res => res.json())
//     .then( json => {
//         let randomWord = json[0].toUpperCase();
//         wordField.innerText = randomWord;
//       })
//     .catch( () => function () {
//       console.log("ERROR!!!")
//     })
// }
const wordField = document.querySelector("#wordField");
const skipWordButton = document.querySelector("#skipWord");

async function getWord() {
  try {
    let res = await fetch("https://random-word-api.herokuapp.com/word");
    let json = await res.json();
    let randomWord = await json[0].toUpperCase();

    wordField.innerText = randomWord;
  } catch (err) {
    console.log("ERROR!!!!!!")
  }
}

skipWordButton.addEventListener("click", getWord);

getWord();

// Score board
const yesButton = document.querySelector("#yes");
const noButton = document.querySelector("#no");
const restartButton = document.querySelector("#restart");
const scoreList = document.querySelector("#score");

function addEmoji(emoji) {
  let emojiField = document.createElement("li");

  emojiField.innerHTML = emoji;
  scoreList.appendChild(emojiField);
}

function restart() {
  while (scoreList.lastElementChild) {
    scoreList.removeChild(scoreList.lastElementChild);
  }
}

yesButton.addEventListener("click", () => { addEmoji("good!!") });
noButton.addEventListener("click", () => { addEmoji("bad!!") });
restartButton.addEventListener("click", restart);
