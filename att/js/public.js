// JavaScript Document
$(function () {
	var clickNum1 = 0;
	$('#att1').click(function (){
		if(clickNum1 == 0){//点击奇数次出现
			$('.second',this).css('bottom', '6.2vh').show();
			clickNum1++;
		}
		else{//点击偶数次隐藏
			$(".second").hide();
			clickNum1 = 0;	
		}
			
	})
	var clickNum2 = 0;
	$('#att2').click(function (){
		if(clickNum2 == 0){//点击奇数次出现
			$('.second',this).css('bottom', '6.2vh').show();
			clickNum2++;
		}
		else{//点击偶数次隐藏
			$(".second").hide();
			clickNum2 = 0;	
		}
			
	})
	var clickNum3 = 0;
	$('#att3').click(function (){
		if(clickNum3 == 0){//点击奇数次出现
			$('.second',this).css('bottom', '6.2vh').show();
			clickNum3++;
		}
		else{//点击偶数次隐藏
			$(".second").hide();
			clickNum3 = 0;	
		}
			
	})
	//点击网页其余地方收缩弹出菜单
	$('body').click(function(e){
		className = e.target.className
		if((className != "att" && className!= "att_text") && (clickNum1 == 1 || clickNum2 == 1 || clickNum3 == 1)  )  
			$(".second").hide();
		})
});