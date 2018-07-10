//取得canvas元素 获取context对象
var canvas = $('#my-canvas').get(0);
var ctx = canvas.getContext('2d'); 

//画布铺满整个屏幕
canvas.width = window.innerWidth;  
canvas.height = window.innerHeight;

//如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout  
window.requestAnimFrame = (function(){  
return  window.requestAnimationFrame       ||  
        window.webkitRequestAnimationFrame ||  
        window.mozRequestAnimationFrame    ||  
        function( callback ){  
          window.setTimeout(callback, 1000 / 60);  
        };  
})();  

// 波浪大小
var boHeight = canvas.height / 10;
var posHeight = canvas.height / 1.2;

//初始角度为0  
var step = 0, increment = 1; 

//定义三条不同波浪的颜色  
var lines = ["rgba(33,150,243, .9)","rgba(244,81,30, .9)",    
               "rgba(34,199,169, .9)"];  

function loop(){  
    ctx.clearRect(0,0,canvas.width,canvas.height);  
    step += increment;


    //画3个不同颜色的矩形  
    for(var j = lines.length - 1; j >= 0; j--) {  
        ctx.fillStyle = lines[j];  
        //每个矩形的角度都不同，每个之间相差45度
        var angle = (step+j*50)*Math.PI/180;  
        var deltaHeight = Math.sin(angle) * boHeight;
        var deltaHeightRight = Math.cos(angle) * boHeight;  
        ctx.beginPath();
        ctx.moveTo(0, posHeight+deltaHeight);  
        ctx.bezierCurveTo(canvas.width/2, posHeight+deltaHeight-boHeight, canvas.width / 2, posHeight+deltaHeightRight-boHeight, canvas.width, posHeight+deltaHeightRight);  
        ctx.lineTo(canvas.width, canvas.height);  
        ctx.lineTo(0, canvas.height);  
        ctx.lineTo(0, posHeight+deltaHeight);  
        ctx.closePath();  
        ctx.fill();  
    }
    requestAnimFrame(loop);
}  
$('#faster').click(function() {
    increment++;
});
$('#slower').click(function() {
    increment--;
});

loop(); 
