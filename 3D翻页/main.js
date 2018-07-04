var preBtn = document.getElementById('pre'),
	nextBtn = document.getElementById('next'),
	currentIndex = 1;

preBtn.addEventListener('click',function(){
	if(currentIndex > 1){
		document.getElementById('page'+currentIndex).style.transform = 'rotateX(90deg)';
		currentIndex--;
		document.getElementById('page'+currentIndex).style.transform = 'rotateX(0deg)';

	}
},false);

nextBtn.addEventListener('click',function(){
	if(currentIndex < 5){
		document.getElementById('page'+currentIndex).style.transform = 'rotateX(-90deg)';
		currentIndex++;
		document.getElementById('page'+currentIndex).style.transform = 'rotateX(0deg)';
	}
},false);