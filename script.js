const box = document.getElementById("box");
const text = document.getElementById("text");
const height = box.clientHeight;
const width = box.clientWidth;
const vertUnit = height / 100;
const horizontalUnit = width / 359;

let currentBrightness = 100;
let currentHue = 0;
let currentSaturation = 100;
let currentX = 0;
let currentY = height;

let isDown = false;

updateColor();

function getYPos(clientY) {
    return height - clientY;
}

function onDownStart(x, y) {
    isDown = true;
    currentX = x;
    currentY = y;
}

function onUpEnd() {
    isDown = false;
}

function updateColor() {
    box.style.backgroundColor = "hsl(" + currentHue + ", " + currentSaturation + "%, " + currentBrightness + "%)";
    console.log("hsl(" + currentHue + ", " + currentSaturation + "%, " + currentBrightness + "%)");

    text.innerHTML = "hsl(" + currentHue + ", " + currentSaturation + "%, " + currentBrightness + "%)";
    text.style.color = "hsl(" + currentHue + ", 100%, " + currentBrightness + "%)";
}

function onMove(x, y) {
    if (!isDown) return;

    //TODO: Break out to be more readable
    let changeX = x - currentX;
    let changeY = getYPos(y) - currentY;
    
    let changeBrightness = Math.round(changeY / vertUnit);
    let changeHue = Math.round(changeX / horizontalUnit);
    
    if (changeBrightness != 0 ||changeHue != 0) {
        currentX = x;
        currentY = getYPos(y);
        
        let tempBrightness = currentBrightness + changeBrightness;
        if (tempBrightness >= 0 && tempBrightness <= 100) currentBrightness = tempBrightness;
        let tempHue = currentHue + changeHue;
        if (tempHue >= 0 && tempHue <= 359) currentHue = tempHue;
        
        updateColor();
    }
}

// PC Mouse Events
function onMouseDown(e) {
    onDownStart(e.clientX, getYPos(e.clientY));
}

function onMouseUp() {
    onUpEnd();
}

function onMouseMove(e) {
    onMove(e.clientX, e.clientY);
}

function onMouseWheel(e) {
    let unit = e.shiftKey ? 5 : 1
    let tempSaturation = currentSaturation + (e.deltaY > 0 ? unit : -unit);
    if (tempSaturation >= 0 && tempSaturation <= 100){
        currentSaturation = tempSaturation;
        updateColor();
    }
}

// Touch Events
function ontouchstart(e) {
    onDownStart(e.touches[0].clientX, e.touches[0].clientY);
}

function ontouchEnd() {
    onUpEnd();
}

function onTouchMove(e) {
    onMove(e.touches[0].clientX, e.touches[0].clientY);
}
