// Canvas
window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const cxt = canvas.getContext("2d");

  // Resizing
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  // Variables
  let painting = false;

  function startingPoint(e) {
    painting = true;
    draw(e);
  }

  function endingPoint() {
    painting = false;
    cxt.beginPath();
  }

  function draw(e) {
    if (!painting) return;

    cxt.lineWidth = 10;
    cxt.lineCap = "round";
    cxt.strokeStyle = "black";

    cxt.lineTo(e.clientX, e.clientY);
    cxt.stroke();
    cxt.beginPath();
    cxt.moveTo(e.clientX, e.clientY);
  }

  // EventListeners
  canvas.addEventListener("mousedown", startingPoint);
  canvas.addEventListener("mouseup", endingPoint);
  canvas.addEventListener("mousemove", draw);
});

// window.addEventListener("resize", () => {
//   canvas.height = window.innerHeight;
//   canvas.width = window.innerwidth;
// });

// Random word generator
fetch("https://random-word-api.herokuapp.com/word")
    .then( res => res.json())
    .then( json => console.log(json))
