//当DIV进入窗口就移动到中心
function isElementInViewport(el) {
	var rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 && rect.bottom <= (window.innerHight || document.documentElement.clientHeight)
		);
}

//获取所有li元素
var items = document.querySelectorAll('.timeline li');

function callbackFunc() {
	var len = items.length;
	for(var i = 0; i < len; i++) {
		if(isElementInViewport(items[i])) {
			items[i].classList.add('in-view');
		}
	}
}
//监听窗口载入和滚动
window.addEventListener('load', callbackFunc);
window.addEventListener('scroll', callbackFunc);