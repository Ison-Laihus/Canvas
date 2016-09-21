var canvasWidth = 800;
var canvasHeight = 600;
var isRunningShow = 0;
var animation = '';
var animation2 = '';

var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;


var radius = 50;
var image = new Image();
var clippingRegion = {x:400, y:200, r:0};


image.src = "image.jpg";
image.onload = function(e) {
	initCanvas();
}

function initCanvas() {
	clippingRegion.r = 0;
	if ( isRunningShow ) {
		clearInterval(animation);
	}
	var x = Math.random()*(canvasWidth-2*radius)+50;
	var y = Math.random()*(canvasHeight-2*radius)+50;
	clippingRegion.x = x;
	clippingRegion.y = y;
	animation2 = setInterval(function() {
		if ( clippingRegion.r<radius ) {
			clippingRegion.r += 5;
			draw(image, clippingRegion);
		} else {
			clearInterval(animation2);
		}
	}, 50);
	draw(image, clippingRegion);
}

function draw(image, clippingRegion) {
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	context.save();
	setClippingRegion(clippingRegion);
	context.drawImage(image, 0, 0);
	context.restore();
}

function setClippingRegion() {
	context.beginPath();
	context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI*2, false);
	context.clip();
}

function show() {
	isRunningShow = 1;
	animation = setInterval(function(){
		if ( clippingRegion.r < Math.sqrt(canvasWidth*canvasWidth + canvasHeight*canvasHeight) ) {
			clippingRegion.r += 10;
			draw(image, clippingRegion);
		} else {
			clearInterval(animation);
		}
		
	}, 50);
}

function reset() {
	initCanvas();
}