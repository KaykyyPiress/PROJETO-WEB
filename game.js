// Set up canvas and game objects
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 45;
const brickHeight = 15;
const brickPadding = 5;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score = 0;
let lives = 3;

let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
bricks[c] = [];
for(let r=0; r<brickRowCount; r++) {
bricks[c][r] = { x: 0, y: 0, status: 1 };
}
}

// Event listeners for paddle movement
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
rightPressed = true;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
leftPressed = true;
}
}

function keyUpHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
rightPressed = false;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
leftPressed = false;
}
}

// Collision detection
function collisionDetection() {
for(let c=0; c<brickColumnCount; c++) {
for(let r=0; r<brickRowCount; r++) {
let b = bricks[c][r];
if(b.status == 1) {
if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
dy = -dy;
b.status = 0;
score++;
if(score == brickRowCount*brickColumnCount) {
alert("Congratulations, you won!");
document.location.reload();
}
}
}
}
}
}

// Draw functions
function drawBall() {
ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

function drawPaddle() {
ctx.beginPath();
ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

function drawBricks() {
for(let c=0; c<brickColumnCount; c++) {
for(let r=0; r<brickRowCount; r++) {
if(bricks[c][r].status == 1) {
let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
bricks[c][r].x = brickX;
bricks[c][r].y = brickY;
ctx.beginPath();
ctx.rect(brickX, brickY, brickWidth, brickHeight);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}
}
}
}

// Event listeners for paddle movement
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
rightPressed = true;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
leftPressed = true;
}
}

function keyUpHandler(e) {
if(e.key == "Right" || e.key == "ArrowRight") {
rightPressed = false;
}
else if(e.key == "Left" || e.key == "ArrowLeft") {
leftPressed = false;
}
}

// Collision detection
function collisionDetection() {
for(let c=0; c<brickColumnCount; c++) {
for(let r=0; r<brickRowCount; r++) {
let b = bricks[c][r];
if(b.status == 1) {
if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
dy = -dy;
b.status = 0;
score++;
if(score == brickRowCount*brickColumnCount) {
alert("Congratulations, you won!");
document.location.reload();
}
}
}
}
}
}

// Draw functions
function drawBall() {
ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

function drawPaddle() {
ctx.beginPath();
ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

function drawBricks() {
for(let c=0; c<brickColumnCount; c++) {
for(let r=0; r<brickRowCount; r++) {
if(bricks[c][r].status == 1) {
let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
bricks[c][r].x = brickX;
bricks[c][r].y = brickY;
ctx.beginPath();
ctx.rect(brickX, brickY, brickWidth, brickHeight);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}
}
}
}

function drawScore() {
ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// Main game function

ctx.clearRect(0, 0, canvas.width, canvas.height);
drawBricks();
drawBall();
drawPaddle();
drawScore();
drawLives();
collisionDetection();