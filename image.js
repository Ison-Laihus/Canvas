// 定义canvas的宽高
var canvasWidth = 800;
var canvasHeight = 600;

// 设置变量描述show()函数是否执行
var isRunningShow = 0;

// 设置两个动画的全局变量
var animation = '';
var animation2 = '';

// 设置剪辑的坐标和半径属性
var clippingRegion = {x:400, y:200, r:0};
var radius = 50;

// 获取canvas与绘图环境对象context
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

// 设置canvas的宽高
canvas.width = canvasWidth;
canvas.height = canvasHeight;


// 实例化图片对象，设置图片属性
var image = new Image();
image.src = "image.jpg";

// 加载图片，加载完成后立即初始化画布
image.onload = function(e) {
	initCanvas();
}

// 初始化画布
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

// 在画布上进行绘制---向画布上绘制图片以及进行剪辑
function draw(image, clippingRegion) {
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	context.save();
	setClippingRegion(clippingRegion);
	context.drawImage(image, 0, 0);
	context.restore();
}

// 设置剪辑区域的属性---坐标和半径
function setClippingRegion() {
	context.beginPath();
	context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI*2, false);
	context.clip();
}

// 将剪辑的清晰区域展开
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

// 重置剪辑区域
function reset() {
	initCanvas();
}
