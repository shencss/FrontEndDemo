var colors = ['#16A085', '#27AE60', '#2C3E50', '#F39C12', '#E74C3C', '#9B59B6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];
var currentQuote = '', currentFrom = '', color = 0;

function getQuote() {
    //使用ajax获取数据
    $.ajax({
        type: 'GET',
        //‘一言’免费API
        url: 'https://v1.hitokoto.cn/?c=d',
        cache: false,
        async: true,
        dataType: 'JSON',
        timeout: 1000,
        success: function(data) {
            //获取数据
            if (data) {
                currentFrom = data.from;
                currentQuote = data.hitokoto;
            }
            //渲染Quote
            $('.quote-text').animate({
                    opacity: 0
                }, 500, function() {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#text').text(currentQuote);
                }
            );
            //渲染Author
            $('.quote-from').animate({
                    opacity: 0
                }, 500, function() {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#from').text(currentFrom);
              }
            );
            //渲染页面颜色
            color = Math.floor(Math.random() * colors.length);
            $('html body').animate({
                backgroundColor: colors[color],
                color: colors[color]
            }, 1000);
            //渲染button颜色
            $('.button').animate({
                backgroundColor: colors[color],
            }, 1000);
        },
        error: function() {
            console.log("请求数据出错！");
          }
    });
}

$(document).ready(function() {
    getQuote();
    //监听New Quote按钮的点击事件
    $('#new-quote').click(getQuote);
});