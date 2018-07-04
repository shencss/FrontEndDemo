//获取DOM元素
var startBtn = document.getElementById('start'),
	resetBtn = document.getElementById('reset'),
	timeDisplay = document.getElementById('time'),
	gameElement = document.getElementById('gameContainer');

var tiems = 0,clockTimeId;

//start按钮的点击事件
startBtn.addEventListener('click',startHandler,false);

//嵌套setTimeout实现计时
function startHandler() {
	clockTimeId = setTimeout(function start() {
		times++;
		timeDisplay.innerHTML =getColckText(Math.floor(times / 60),times % 60);
		clockTimeId = setTimeout(start,1000);
	},1000)
}

//rese按钮的点击事件
resetBtn.addEventListener('click',function() {
	clearTimeout(clockTimeId);
	timeDisplay.innerHTML = getColckText(0,0);
	tiems = 0;
	startRandom();
},false);

//设置时间格式
function getColckText(minutes,seconds) {
	var minutes = minutes >= 10 ? minutes : '0' + minutes,
		seconds = seconds >= 10 ? seconds : '0' + seconds;
	return minutes + ':' + seconds;
}

var direct = [
	[0],
	[2, 4],
	[1, 3, 5],
	[2, 6],
	[1, 5, 7],
	[2, 4, 6, 8],
	[3, 5, 9],
	[4, 8],
	[7, 9, 5],
	[8, 6]
];
var posXY = [
	[0],
	[0, 0],
	[160, 0],
	[320, 0],
	[0, 160],
	[160, 160],
	[320, 160],
	[0, 320],
	[160, 320],
	[320, 320]
];
var nowPos = [];

//游戏中的点击事件
gameElement.addEventListener('click',function(event) {
	var targetId = parseInt(event.target.id.replace('block', ''));
	if(targetId != 9){
		canMove(targetId);
	}
},false);

//移动判断
function canMove(id) {
	var blankIndex = nowPos.indexOf(9);
	var targetIndex = nowPos.indexOf(id);

	if(!!~direct[targetIndex].indexOf(blankIndex)) {
		move(blankIndex,targetIndex,9,id);
		if(check()) {
			timeDisplay.innerHTML = '你在用时' + getColckText(tiems / 60,times % 60) + '后通关';
		}
	}
}

//移动
function move(blankIndex,targetIndex,blankValue,targetValue) {
	//互换位置
	nowPos[blankIndex] = targetValue;
	nowPos[targetIndex] = blankValue;
	document.getElementById('block' + blankValue).style.left = posXY[targetIndex][0] + 'px';
	document.getElementById('block' + blankValue).style.top = posXY[targetIndex][1] + 'px';
	document.getElementById('block' + targetValue).style.left = posXY[blankIndex][0] + 'px';
	document.getElementById('block' + targetValue).style.top = posXY[blankIndex][1] + 'px';
}

//检查胜利与否
function check() {
	var result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var flag = true;

	result.forEach(function(value,index) {
		if(value !== nowPos[index]) {
			flag = false;
		}
	});

	return flag;
}

function startRandom() {
	nowPos = [];

	for(var i = 0; i < 9; i++) {
		nowPos.push(i+1)	
	}
	nowPos.sort(function() {
		return Math.random() - .5;
	});

	nowPos.unshift(0);

	for(var i = 1; i <= 9; i++) {
			document.getElementById('block' + nowPos[i]).style.left = posXY[i][0] + 'px';
			document.getElementById('block' + nowPos[i]).style.top = posXY[i][1] + 'px';
		} 
}