// JavaScript Document

$(function(){
	//模拟复选框
	var arrAttDeal = [];
	var power = $("#power")[0].value;//当前操作用户权限
	/*$('.handle span').click(function(){
        $(this).toggleClass('on-select');
      });
	var clickNum1 = 0;
	//班主任知晓
	$("#head_teacher").click(function(){
		if(clickNum1 == 0){//第奇数次单击记录值
			arrAttDeal[0] = "班主任知晓";
			clickNum1 += 1;
		}
		else
		{
			clickNum1 = 0;	//偶数次执行初始化
			arrAttDeal[0] = undefined;
		}
	});
	//教务处备案，仅限于管理员操作
	var clickNum2 = 0
	$("#dean_office").click(function(){
		if(clickNum2 == 0){//第奇数次单击记录值
			if(power == 1){
				arrAttDeal[1] = "教务处备案";
				clickNum2 += 1;
				}
			else{
				alert("您无权操作此项，请用管理员操作");
				$(this).toggleClass("on-select");
				}
			
			
		}
		else
		{
			clickNum2 = 0;	//偶数次执行初始化
			arrAttDeal[1] = undefined;
		}
	});
	//扣除学分
	var clickNum3 = 0
	$("#minus_credit").click(function(){
		if(clickNum3 == 0){//第奇数次单击记录值
			arrAttDeal[2] = "扣除学分";
			clickNum3 += 1;
		}
		else
		{
			clickNum3 = 0;	//偶数次执行初始化
			arrAttDeal[2] = undefined;
		}
	});
	//处分
	var clickNum4 = 0
	$("#punishment").click(function(){
		if(clickNum4 == 0){//第奇数次单击记录值
			arrAttDeal[3] = "处分";
			clickNum4 += 1;
		}
		else
		{
			clickNum4 = 0;	//偶数次执行初始化
			arrAttDeal[3] = undefined;
		}
	});
	//其它
	var clickNum5 = 0
	$("#others").click(function(){
		if(clickNum5 == 0){//第奇数次单击记录值
			arrAttDeal[4] = "其它";
			clickNum5 += 1;
		}
		else
		{
			clickNum5 = 0;	//偶数次执行初始化
			arrAttDeal[4] = undefined;
		}
	});*/
	var comment = $("#attcontent")[0].value;//记录班主任处理意见		
	var attID = $("#attid")[0].value;//考勤明细ID号
	var attDeal = $("#attdeal")[0].value;//考勤明细状态
	var dealType = 1;//考勤处理类型，1为默认处理即正常处理，2为取消处理
	var headTeacher = '<div><p>班主任处理意见:</p><textarea id="headdeal" >默认处理：无其它意见</textarea></div>';
	var administrator = '<div><p>管理员处理意见:</p> <div class="admindeal0"><lable>正常处理：<input class="input_radio" name="dealtype" type="radio" id="dealconfirm" value="1" checked="checked"></lable><lable>取消处理：<input class="input_radio" name="dealtype" type="radio" id="dealcancel" value="2"></lable></div><textarea id="admindeal" >默认处理：无其它意见</textarea></div>';
	//页面处理
	if(power == 1 && attDeal == 0){//如果管理员当前正在操作班主任未处理的考勤，则只显示考勤信息，不显示考情处理意见
		$("#handle").css("display","none");//隐藏处理意见
		$("#save").css("display","none");//隐藏保存按钮
		alert("请班主任先做处理！");
		}
	else if(power == 3 && attDeal == 0){//当前操作用户是班主任，且未处理
		$("#handle").append(headTeacher);//显示班主任处理意见页面
		}
	else if(power == 3 && attDeal == 1){//当前操作用户是班主任，且已被其处理
		$("#handle").css("display","none");//隐藏处理意见
		$("#save").css("display","none");//隐藏保存按钮
		alert("您已处理！");
		}
	else if(power == 1){//当前操作用户是管理员
		$("#handle").append('<div><p>班主任处理意见:</p><textarea id="headdeal">'+comment+'</textarea></div>');//显示班主任已经处理的意见
		$("#handle").append(administrator);//显示管理意见处理页面
		}
	//保存按钮	
	$(".save").click(function(){		
		if(power==1)//管理员权限，既可以操作待审核状态，也可以一次性操作完毕
				//case "1"://班主任已经处理，待审核状态
			$.getJSON("../../../attenceDeal!changeAttenceDeal.action?random="+Math.random(),{
						"attencedId":attID,
						"manageDeal":$("#admindeal").val(),//获取管理处理意见内容
						"dealtype":dealType//1为立即处理，2为取消处理
					},function(data,textStatus){
						if(textStatus=="success"){
							var msg=data.success;
							var alertmessag="审核处理失败!";
							if(msg==false)
								{ 
									var textHtml=alertmessag;
									alert(textHtml);
								}else
								{
									history.go(-1);//返回前页
									alert("审核处理成功!");
									
								}
						}
					});
				
			{
				
			}
			if(power==3)//班主任处理
			{
				$.getJSON("../../../attenceDeal!saveAttenceDeal.action?random="+Math.random(),{
					"attencedId":attID,
					"teacherDeal":$("#headdeal").val()//获取班主任处理意见内容
				},function(data,textStatus){
					if(textStatus=="success"){
						var msg=data.success;
						var alertmessag="保存处理失败!";
						if(msg==false)
							{ 
								var textHtml=alertmessag;
								alert(textHtml);
							}else
							{
								history.go(-1);//返回前页
								alert("保存处理成功!");
							}
					}
				});
			}
		})
	//取消按钮
	$(".cancel").click(function(){
		history.go(-1);//返回前页
		})
	  //单选按钮单击事件
    $("#dealcancel").click(function(){
		dealType = 2;
    });
	$("#dealconfirm").click(function(){
		dealType = 1;
    });
	})