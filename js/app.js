/**
 * challenge
 * 
 * 1. destroy 전에 확인하기
 * 2. 그리기 모드 : 라인, 라인 그린 후 채우기
 * 3. 폰트 : 사이즈 조절, 폰트 변경
 * 4. 폰트 채우기 : 아웃 라인, 폰트 채우기
 * 
 */



const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");

const drawModeCheckBox = document.querySelectorAll("input[name=draw-mode]");
const textModeCheckBox = document.querySelectorAll("input[name=text-mode]");

const textFamilySelect = document.getElementById("text-type");
const textSizeInput = document.getElementById("text-size");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

let isPainting = false;
let isFilling = false;
let currentDrawMode = "draw";
let currentTextMode = "fill";
let currentTextSize = "16px";
let currentTextFamily = "'Noto Sans KR'";
let currentTextStyle = `${currentTextSize} ${currentTextFamily}`;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
ctx.font = currentTextStyle;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);

    if (currentDrawMode === "shape") ctx.fill();
    else ctx.stroke();
    return;
  }

  ctx.moveTo(event.offsetX, event.offsetY);
}

function starPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  const colorValue = event.target.value;

  changeColor(colorValue);
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;

  changeColor(colorValue);
  color.value = colorValue;

  console.log(colorValue);
}

function changeColor(color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function onCanvasClick() {
  if (currentDrawMode === "bg") {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  if (confirm("정말 모두 지우시겠습니까?")) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onEraserClick() {  
  if (currentDrawMode !== "bg") {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
  }
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();

  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  }
}

function onDoubleClick(event) {
  const text = textInput.value;

  if (text !== "") {
    // 현재 cavas 설정값 저장.
    ctx.save();

    // 설정값 변경
    ctx.lineWidth = 1;

    if (currentTextMode === "stroke") {
      ctx.strokeText(text, event.offsetX, event.offsetY);
    } else {
      ctx.fillText(text, event.offsetX, event.offsetY);
    }

    // cavas 값 이전 값으로 복구
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");

  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

function onTextFamilyChange() {
  const textFamily = textFamilySelect.value;
  const textStyle = `${currentTextSize} ${textFamily}`;
console.log('textFamily', textFamily);
  currentTextFamily = textFamily;
  ctx.font = textStyle;
  ctx.beginPath();
}

function onTextSizeChange() {
  const textSize = textSizeInput.value + "px";
  const textStyle = `${textSize} ${currentTextFamily}`;

  currentTextSize = textSize;
  ctx.font = textStyle;
  ctx.beginPath();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", starPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);

textFamilySelect.addEventListener("change", onTextFamilyChange);
textSizeInput.addEventListener("change", onTextSizeChange);

drawModeCheckBox.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const current = e.currentTarget;

    if (current.checked) {
      currentDrawMode = current.value;
      ctx.strokeStyle = color.value;
      ctx.fillStyle = color.value;
    }

    console.log ( 'Draw mode : ', color.value);
  });
});

textModeCheckBox.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const current = e.currentTarget;

    if (current.checked) {
      currentTextMode = current.value;
      ctx.strokeStyle = color.value;
      ctx.fillStyle = color.value;
    }

    console.log( 'Text mode : ', color.value );
  });
});

//////////////////////////////////////////////////////////
/**  movemove event */
// ctx.lineWidth = 2;

// const colors = [
//   "#ff3838",
//   "#ffb8b8",
//   "#c56cf0",
//   "#ff9f1a",
//   "#fff200",
//   "#32ff7e",
//   "#7efff5",
//   "#18dcff",
//   "#7d5fff", 
// ];

// function onClick(event) {
//   ctx.beginPath();
//   ctx.moveTo(800, 800);

//   const color = colors[Math.floor(Math.random() * colors.length)];

//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }

// canvas.addEventListener("mousemove", onClick);



////////////////////////////////////////////////////////
/* simple house */
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.fillRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.fill();


///////////////////////////////////////////////////////
/* simple man */
// ctx.fillRect(210 - 40, 200 - 30, 15, 100);
// ctx.fillRect(350 - 40, 200 - 30, 15, 100);
// ctx.fillRect(260 - 40, 200 - 30, 60, 200);


// ctx.arc(250, 100, 50, 0, 2 * Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(260 + 10, 80, 8, Math.PI, 2 * Math.PI);
// ctx.arc(220 + 10, 80, 8, Math.PI, 2 * Math.PI);
// ctx.fill();
