// JavaScript Document
	//模拟下拉菜单
	function selectMenu(css1,css2){
		var selects=$("."+css1);
	  	var options=$("."+css2);
	  	var state=true; 
	  
  	  	selects.click(function(){
   			if(state){
				if(!($(this).is(":animated"))){
					options.slideDown();
				}else{
					options.css("display","none");
				}  
					state=false;
			}else{
				if(!($(this).is(":animated"))){
					options.slideUp();
				}else{
					$(this).stop(true,true);
					options.css("display","");
				}
				state=true;
			}
	  })
 	}
	//选中下来菜单项
  	function _select(option,leave_css){
		var liIndex;
		var blClick = false;
		$("."+leave_css).click(function(){
			$("."+option+" li").css("display","block")
			})
		$("."+option+" li").click(function(){
			blClick = true;
			var leave_text = $(this).text();
			$("."+leave_css+" span").text(leave_text);
			liIndex = $("."+option+" li").index(this) + 1;//当前元素li在所有同辈元素li中的位置，从0开始			
			})
		if(blClick == false){
			liIndex = 2;
			}
		return(liIndex);
		
		}
	
  
 	$(document).ready(function(){
		 //模拟选择请假类别单选框
		 var clickTotal = 0;//记录鼠标几点次数
		 var leaveType,sequence;
		 
		 $('.leave span').click(function(){
			sequence = $(this).parent(".leave").index();//元素的基数
			//if($(this).siblings($(this)).hasClass("on-select"))
				//$(this).siblings($(this)).toggleClass("on-select");
			clickTotal +=1;			
			$(this).toggleClass('on-select');
			if((clickTotal % 2) != 0){
				leaveType = sequence + 1;//请假类型：1为病假，2为事假，3为其它
				}
		  });
		 //请假周起，从当前周起
		 var curWeek = $("#curweek")[0].value;
		 for(i = curWeek; i < 25;i++){
			$(".sweek_option>ul").append("<li>第"+i+"周</li>");//请假开始周
			$(".eweek_option>ul").append("<li>第"+i+"周</li>");//请假结束周
		 }
		 //请假开始时间下来菜单
		 selectMenu('sweek','sweek_option');
		 selectMenu('sday','sday_option');
		 selectMenu('sclass','sclass_option');
		 //请假结束时间下来菜单
		 selectMenu('eweek','eweek_option');
		 selectMenu('eday','eday_option');
		 selectMenu('eclass','eclass_option');
		 //选中开始请假时间
		 var sWeek = 2;//默认值
		 var eWeek = 2;//默认值
		 var sDay = 2;//默认值
		 var eDay = 2;//默认值
		 var eClass = 2;//默认值
		 var sClass = 2;//默认值
		 //起始周
		 $(".sweek").click(function(){
			$(".sweek_option li").css("display","block")
			})
		 $(".sweek_option li").click(function(){
			var leave_text = $(this).text();
			$(".sweek span").text(leave_text);
			sWeek = parseInt($(".sweek_option li").index(this)) + parseInt(curWeek);//当前元素li在所有同辈元素li中的位置，从0开始			
			})
		//终止周
		 $(".eweek").click(function(){
			$(".eweek_option li").css("display","block")
			})
		 $(".eweek_option li").click(function(){
			var leave_text = $(this).text();
			$(".eweek span").text(leave_text);
			eWeek = parseInt($(".eweek_option li").index(this)) + parseInt(curWeek);//当前元素li在所有同辈元素li中的位置，从0开始			
			})
		//起始星期
		$(".sday").click(function(){
			$(".sday_option li").css("display","block")
			})
		 $(".sday_option li").click(function(){
			var leave_text = $(this).text();
			$(".sday span").text(leave_text);
			sDay = $(".sday_option li").index(this) + 1;//当前元素li在所有同辈元素li中的位置，从0开始			
			})
		//终止星期
		$(".eday").click(function(){
			$(".eday_option li").css("display","block")
			})
		 $(".eday_option li").click(function(){
			var leave_text = $(this).text();
			$(".eday span").text(leave_text);
			eDay = $(".eday_option li").index(this) + 1;//当前元素li在所有同辈元素li中的位置，从0开始			
			})
		//起始课节
		$(".sclass").click(function(){
			$(".sclass_option li").css("display","block")
			})
		 $(".sclass_option li").click(function(){
			var leave_text = $(this).text();
			$(".sclass span").text(leave_text);
			sClass = $(".sclass_option li").index(this) + 1;//当前元素li在所有同辈元素li中的位置，从0开始			
			})
		//终止课节
		 $(".eclass").click(function(){
			$(".eclass_option li").css("display","block")
			})
		 $(".eclass_option li").click(function(){
			var leave_text = $(this).text();
			$(".eclass span").text(leave_text);
			eClass = $(".eclass_option li").index(this) + 1;//当前元素li在所有同辈元素li中的位置，从0开始			
			})
		 //请假原因
		 var leaveReason = $("#leave_content").val();
	//保存按钮
    $("#save").click(function(){
    	$(".msg").hide();
    	//简单验证
    	var studentid=$("#studentid")[0].value;//学生编号
		var classID = $("#classid")[0].value;//编辑编号
		var headteacherID = $("#headteacherid")[0].value;//班主任编号
    	if(studentid<0)
    		{$("#studentmsg").show();return;}
    	if(eWeek<sWeek||(eWeek == sWeek && eDay < sDay)||(eWeek == sWeek && eDay == sDay && eClass<sClass))
    		{$("#timemsg").show();return;}
    	$("#loadingmsg").val("正在保存请假信息...");
    	$.getJSON("../../../leave!save.action?random="+Math.random(),{
			"termId":$("#termid")[0].value,
			"classId":$("#classid")[0].value,
			"studentId":studentid,
			"startWeek":sWeek,
			"startWeekDay":sDay,
			"startSection":sClass,
			"endWeek":eWeek,
			"endWeekDay":eDay,
			"endSection":eClass,
			"leaveType":leaveType,
			"leaveReason":leaveReason,
			"status":1,
			"optTeacherId":headteacherID
		},function(data,textStatus){
			if(textStatus=="success"){
				var msg=data.success;
				if(msg==false)
					{
						alert("请假保存时出错了!\n"+data.message);
					}else
					{
							//学生列表获取成功
							alert("请假保存成功!");
							history.go(-1);//返回前页
					}
			}
		});
    	
    });
	//取消按钮	
	$("#cancel").click(function(){
		history.go(-1);//返回前页
		});
 });