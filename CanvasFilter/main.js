//获取canvas
var canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d"),
    //规定尺寸
    canvasWidth = 320,
    canvasHeight = 480,
    radius = 35,
    //位置
    clipRegion = {x: -1, y: -1, r: radius},
    //获取按钮
    show = document.getElementById("show"),
    resetButton = document.getElementById("reset"),

    img,
    timeId,
    max = Math.max(canvasWidth, canvasHeight) * 2;
//绑定监听事件
show.addEventListener("click", function() {
    showChange();   
},false);
resetButton.addEventListener("click", function() {
    reset();
}, false);

//除去滤镜
function showChange() {
    timeId = setTimeout(function change() {
        if(clipRegion.r > max) {
            stopChange(timeId);
        } else {
            clipRegion.r += 10;
            draw(img, clipRegion);
            timeId = setTimeout(change, 30);
            console.log("1");
        }
    }, 30);
}

//停止timeout
function stopChange(timeId) {
    clearTimeout(timeId);
}

//初始化
function initView() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    setRandomPosition();

    img = new Image();
    img.src = "spider.jpg";
    img.onload = function(e) {
        draw();
    }
}

//重置
function reset() {
    stopChange(timeId);
    clipRegion.r = radius;
    setRandomPosition();
        draw();
}

//画出同心圆图像
function draw() {

    ctx.clearRect(0,0,canvasWidth, canvasHeight);
    ctx.save();
    drawClip();
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    ctx.restore();

}

//获取同心圆
function drawClip() {
    ctx.beginPath();
    ctx.arc(clipRegion.x, clipRegion.y, clipRegion.r, 0, Math.PI * 2, false);
    ctx.clip();
}

//随机放置圆心
function setRandomPosition() {
    clipRegion.x = Math.random() * (canvasWidth - 2 * radius) + radius;
    clipRegion.y = Math.random() * (canvasHeight - 2* radius) + radius;
}

initView();