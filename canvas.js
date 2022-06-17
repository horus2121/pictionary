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

penCursor = "url('https://img.icons8.com/ios-glyphs/30/undefined/quill-pen.png') 0 30, auto"
function pen() {
  ctx.strokeStyle = "black";
  canvas.style.cursor = penCursor;
  eraserOn = false;
}

eraserOn = false;
function eraser() {
  const eraserCursor = "url('https://img.icons8.com/metro/26/undefined/eraser.png') 0 26, auto"
  ctx.strokeStyle = "white";
  canvas.style.cursor = eraserCursor;
  eraserOn = true;
}

function switchColor() {
  if (eraserOn) {
    ctx.strokeStyle = "white";
  } else {
    ctx.strokeStyle = switchColorButton.value;
  }
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
  // canvas.height = window.innerHeight / 2;
  // canvas.width = window.innerwidth / 2;
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
const numOfRose = document.querySelector("#numOfRose");
const numOfPoo = document.querySelector("#numOfPoo");
const plusSign = document.querySelectorAll("#plusSign")
plusSign[0].style.display = "none";
plusSign[1].style.display = "none";

function addScore(roseOrPoo) {
  let num = roseOrPoo.innerText;

  if (num == 0) {
    if (roseOrPoo.id == "numOfRose") {
    plusSign[0].style.display = "inline";
  } else {
    plusSign[1].style.display = "inline";
    }
  } 

  num++;
  roseOrPoo.innerText = num;
}

function restart() {
  numOfRose.innerText = 0;
  numOfPoo.innerText = 0;
  plusSign[0].style.display = "none";
  plusSign[1].style.display = "none";
}

yesButton.addEventListener("click", () => { addScore(numOfRose) });
noButton.addEventListener("click", () => { addScore(numOfPoo) });
restartButton.addEventListener("click", restart);
