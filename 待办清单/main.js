$(document).ready(function(){
	//清除旧的本地存储数据
	localStorage.removeItem('sss');

	//实例model和render
	

	//入口

	//默认显示task列表
	$('#task-list').show();

	/*
		==================================================================================
										任务管理
					1. 添加任务按钮 模块
						|-1. 添加任务，按钮动效 √
						|-2. 确认添加按钮 √
						|-3. input输入监听，验证有无输入 √
					4. 任务列表项 清除/完成 点击操作 √
					5. 本地存储 添加/清除/完成 √
					6. 任务列表渲染器 √
		==================================================================================
	*/
	(function(event){
		//获取DOM
		var btnSVG = $('#addBtn svg'),
 		addTaskContent = $('#addContent'),
 		okAddBtn = $('.okAddBtn'),
 		input = $('#value');

 		//添加新任务
 		$('#addBtn').click(function(){
 			if(addTaskContent.css('display') === 'none'){
 				addTaskContent.show('100');
 				input.focus();
 				//旋转添加按钮
 				btnSVG.css({
 					'transform':'rotate(-45deg)',
 					'-webkit-transform':'rotate(-45deg)'
 				});
 				//弹出确认按钮
 				okAddBtn.css('bottom','90px');
 			}else{
 				addTaskContent.hide('100');
 				btnSVG.css({
 					'transform':'rotate(45deg)',	
 					'-webkit-transform':'rotate(45deg)'
 				});
 				okAddBtn.css('bottom','5px');
 			}
 		});
 		//确认添加任务
 		okAddBtn.click(function(){
 			var text = input.val();
 			if(text){

 			}
 		});
	
	})();

	//本地存储
	function Model(){
		
	}

});