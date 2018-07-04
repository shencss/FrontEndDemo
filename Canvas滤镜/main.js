//获取画布
var canvas = document.getElementById('myCanvas'),
	ctx = canvas.getContext('2D'),
	canvasWidth = 320,
	canvasHeight = 480,
	radius = 35,
	clipRegion = {x:-1,y:-1,r:radius},
	//获取按键
	show = document.getElementById('show'),
	reset = document.getElementById('reset'),
	img,
	timeId,
	max = Math.max(canvasWidth,canvasHeight)*2;
//按键监听事件
show.addEventListener('click',function(){
	showChange();
},false);

reset.addEventListener('click',function(){
	reset();
})


function showChange() {
	timeId = setTimeout(function change() {
		if(clipRegion.r > max){
			stopChange(timeId);
		}else{
			clipRegion.r += 10;
			draw(img,clipRegion);
			timeId = setTimeout(change,30);
			console.log('1');
		}
	},30);
}


function stopChange(timeId){
	clearTimeout(timeId);
}


function initView(){
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	setRandomPosition();
	img = new Image();
	img.src = 'spider.jpg';
	img.onload = function(e){
		draw();
	}
}

function reset(){
	stopChange(timeId);
	clipRegion.r = radius;
	setRandomPoistion();
	draw();
}

function draw(){
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	ctx.save();
	drawClip();
	ctx.drawIamge(img,0,0,canvasWidth,canvasHeight);
	ctx.restore();
}

function drawClip(){
	ctx.beginPath();
	ctx.arc(clipRegion.x,clipRegion.y,clipRegion.r,0,Math.PI*2,false);
	ctx.clip();
}

function setRandomPosition(){
	clipRegion.x = Math.random() * (canvasWidth - 2 * radius) + radius;
	clipRegion.y = Math.random() * (canvasHeight - 2 * radius) + radius;
}


initView();






