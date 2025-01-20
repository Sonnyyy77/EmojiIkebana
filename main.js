
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let sakura = document.getElementById('sakura');
let rose = document.getElementById('rose');
let hibiscus = document.getElementById('hibiscus');
let sunflower = document.getElementById('sunflower');
let daisy = document.getElementById('daisy');
let tulip = document.getElementById('tulip');
let hyacinth = document.getElementById('hyacinth');
let leaf = document.getElementById('leaf');
let undo = document.getElementById('undo');
let reset = document.getElementById('reset');
let save = document.getElementById('save');

let isDrawing = false;
let undoStack = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function pushState() {
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  if (undoStack.length > 50) {
    undoStack.shift();
  }
}
pushState()
undo.addEventListener("click", function() {
  undoStack.pop();
  let lastItem = undoStack[undoStack.length - 1];
  if (lastItem) {
    ctx.putImageData(lastItem, 0, 0);
  }
});

save.addEventListener("click", function() {
  var dataURL = canvas.toDataURL('image/png');

  var downloadLink = document.createElement('a');

  downloadLink.download = 'your-ikebana.png';

  downloadLink.href = dataURL;

  document.body.appendChild(downloadLink);
  downloadLink.click();

  document.body.removeChild(downloadLink);
});

let paintSakura = document.createElement("img");
let sakurapic = './images/sakura.png';
paintSakura.src = sakurapic;

let paintRose = document.createElement("img");
let rosepic = './images/rose.png';
paintRose.src = rosepic;

let paintHibiscus = document.createElement("img");
let hibiscuspic = './images/hibiscus.png';
paintHibiscus.src = hibiscuspic;

let paintSunflower = document.createElement("img");
let sunflowerpic = './images/sunflower.png';
paintSunflower.src = sunflowerpic;

let paintDaisy = document.createElement("img");
let daisypic = './images/daisy.png';
paintDaisy.src = daisypic;

let paintTulip = document.createElement("img");
let tulippic = './images/tulip.png';
paintTulip.src = tulippic;

let paintHyacinth = document.createElement("img");
let hyacinthpic = './images/hyacinth.png';
paintHyacinth.src = hyacinthpic;

let paintLeaf = document.createElement("img");
let leafpic = './images/leaf.png';
paintLeaf.src = leafpic;

let vase = document.createElement("img");
let vasepic = './images/vase.png';
vase.src = vasepic;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let currentPen = "sakura";
sakura.className = "active";

function clearActive() {
  sakura.className = "";
  rose.className = "";
  hibiscus.className = "";
  sunflower.className = "";
  daisy.className = "";
  tulip.className = "";
  hyacinth.className = "";
  leaf.className = "";
}

sakura.addEventListener("click", function() {
  currentPen = "sakura";
  clearActive();
  sakura.className = "active";
});

rose.addEventListener("click", function() {
  currentPen = "rose";
  clearActive();
  rose.className = "active";
});

hibiscus.addEventListener("click", function() {
  currentPen = "hibiscus";
  clearActive();
  hibiscus.className = "active";
});

sunflower.addEventListener("click", function() {
  currentPen = "sunflower";
  clearActive();
  sunflower.className = "active";
});

daisy.addEventListener("click", function() {
  currentPen = "daisy";
  clearActive();
  daisy.className = "active";
});

tulip.addEventListener("click", function() {
  currentPen = "tulip";
  clearActive();
  tulip.className = "active";
});

hyacinth.addEventListener("click", function() {
  currentPen = "hyacinth";
  clearActive();
  hyacinth.className = "active";
});

leaf.addEventListener("click", function() {
  currentPen = "leaf";
  clearActive();
  leaf.className = "active";
});

reset.addEventListener("click", function() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(vase, canvas.width / 2 - 200, canvas.height - 470, 400, 400);
});

function rand(scale) {
  return (Math.random() - 0.5) * scale;
}

function render() {
  ctx.drawImage(vase, canvas.width / 2 - 200, canvas.height - 470, 400, 400);
}

function drawRotated(image, degrees) {
  ctx.save();
  ctx.translate(event.clientX, event.clientY);
  ctx.rotate(degrees * Math.PI / 180);
  ctx.drawImage(image, -25, -25, 50, 50);
  ctx.restore();
}

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawing() {
  if (isDrawing) {
    pushState()
  }
  isDrawing = false;
}


function draw(e) {
  if (!isDrawing) {
    return;
  }

  let currentX = e.clientX;
  let currentY = e.clientY;

  let start = { x: canvas.width / 2, y: canvas.height - 281 };
  let cp1 = { x: canvas.width / 2, y: canvas.height - 300 };
  let cp2 = { x: canvas.width / 2, y: canvas.height - 350 };
  let end = { x: currentX, y: currentY };

  let angle = Math.atan2(end.y - cp2.y, end.x - cp2.x) * 180 / Math.PI + 90;

  // Cubic Bézier curve
  ctx.strokeStyle = "rgba(50, 95, 24, 0.5)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(start.x + rand(30), start.y);
  ctx.bezierCurveTo(cp1.x + rand(10), cp1.y + rand(10), cp2.x + rand(10), cp2.y + rand(10), end.x, end.y);
  ctx.stroke();

  if (currentPen === "rose") {
    drawRotated(paintRose, angle);
  }

  if (currentPen === "sakura") {
    drawRotated(paintSakura, angle);
  }

  if (currentPen === "hibiscus") {
    drawRotated(paintHibiscus, angle);
  }

  if (currentPen === "sunflower") {
    drawRotated(paintSunflower, angle);
  }

  if (currentPen === "daisy") {
    drawRotated(paintDaisy, angle);
  }

  if (currentPen === "tulip") {
    drawRotated(paintTulip, angle);
  }

  if (currentPen === "hyacinth") {
    drawRotated(paintHyacinth, angle);
  }

  else if (currentPen === "leaf") {
    drawRotated(paintLeaf, angle - 20);
  }
}

canvas.addEventListener('pointerdown', startDrawing);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', stopDrawing);
canvas.addEventListener('pointerout', stopDrawing);

vase.onload = render;
