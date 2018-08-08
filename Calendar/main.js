//获取DOM
var monthElement = document.getElementById('month'),
	yearElement = document.getElementById('year'),
	daysElement = document.getElementById('days'),
	preBtnElement = document.getElementById('pre-month'),
	nextBtnElement = document.getElementById('next-month');

//设计月份名称 区别闰月
var month_olymoic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	month_name = ["January", "Febrary", "March", "April", "May", "June", "July","Auguest", "September", "October", "November", "December"];

//获取当下时间
var date = new Date(),
	year = date.getFullYear();
	month = date.getMonth();
	day = date.getDate();

//确定该月第一天是星期几 决定放多少个空的<li>
function getDayStart(y,m) {
	var tempDate = new Date(y,m,1);
		tempDay = tempDate.getDay();
		if(tempDay === 0){
			return 6;
		}else {
			return tempDay - 1;
		}
}

//确定该月有几天
function getDaysOfMonth(y,m) {
	if((y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0)){
		return month_olymoic[m];
	}else {
		return month_normal[m];
	}
}

function refreshDate(d,y,m) {
	var days = getDaysOfMonth(y,m);
	firstDayOfMonth = getDayStart(y,m);
	str = '';
	for(var i = 0; i < firstDayOfMonth; i++){
		str += '<li></li>';
	}

	//以前的日子显示灰色
	for(var i = 1; i <= days; i++){
		if(y < d.getFullYear() || y === d.getFullYear() && m < d.getMonth() || y === d.getFullYear() && m === d.getMonth() && i < d.getDate()){
			str += '<li class="lightgray">' + i + '</li>';
		}else if(y > d.getFullYear() || y === d.getFullYear() && m > d.getMonth() || y === d.getFullYear() && m === d.getMonth() && i > d.getDate()){
			str += '<li class="darkgray">' + i + '</li>';
		}else {
			str += '<li class="blue active">' + i + '</li>';
		}
	}
	console.log(str);

	daysElement.innerHTML = str;
	monthElement.innerHTML = month_name[m];
	yearElement.innerHTML = y;
}

refreshDate(date,year,month);

preBtnElement.addEventListener('click',function(e) {
	e.preventDefault();
	month--;
	if(month < 0){
		year--;
		month = 11;
	}
	refreshDate(date,year,month);
},false);

nextBtnElement.addEventListener('click',function(e) {
	e.preventDefault();
	month++;
	if(month > 11){
		year++;
		month = 0;
	}
	refreshDate(date,year,month);
},false);













