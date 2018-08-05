const preBtn = document.getElementById('pre-btn');
const nextBtn = document.getElementById('next-btn');
const imgArray = ['P1','P2','P3','P4','P5','P6','P7'];
const box = document.querySelector('.box');
const list = document.querySelectorAll('li');
const ul = document.querySelector('ul');
const nav = document.querySelectorAll('.nav span');
const a = document.querySelectorAll('.nav a');
let index = 0;

//改变底部导航条颜色
const show = () => {
    for (let i = 0, len = nav.length; i < len; i++) {
        if (i === index) {
            nav[i].className = 'blue';
        } else {
            nav[i].className = '';
        }
    }
}
 
//切换到上一张图片
const preImg = () => {
    imgArray.push(imgArray[0]);
    imgArray.shift();
    //移除当前的类 添加调整位置后的类
    for(let i = 0, len = list.length; i < len; i++) {
        list[i].className = imgArray[i];
    }
    index--;
    if (index < 0) {
        index = 6;
    }
    show();
} 

//切换到下一张图片
const nextImg = () => {
    imgArray.unshift(imgArray[6]);
    imgArray.pop();
    //移除当前的类 添加调整位置后的类
    for(let i = 0, len = list.length; i < len; i++) {
        list[i].className = imgArray[i];
    }
    index++;
    if (index > 6) {
        index = 0;
    }
    show();
} 

//监听按钮
preBtn.addEventListener('click', preImg);
nextBtn.addEventListener('click', nextImg);

//监听底部导航条
for (let i = 0, len = a.length; i < len; i++) {
    a[i].addEventListener('click', function(e) {
        if(i > index) {
            while(i > index) {
                console.log(i);
                nextImg();
            }
        } else if (i < index) {
            while(i < index) {
                preImg();
            }
        }
    });
}

//点击上一张或下一站图片
ul.addEventListener('click',function(e) {
    //这里的e.target是img标签
    if (e.target && e.target.parentNode.parentNode.className === 'P3') {
        preImg();
    } 
    if (e.target && e.target.parentNode.parentNode.className === 'P5') {
        nextImg();
    }
});


//进入页面时开始自动切换图片
let timer = setInterval(nextImg,4000);

//当鼠标进入Box时停止自动切换
box.addEventListener('mouseenter',function() {
    clearInterval(timer);
});
//当鼠标离开Box时开始自动切换
box.addEventListener('mouseleave',function() {
    timer = setInterval(nextImg,4000);
});
