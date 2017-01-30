// JavaScript Document
	//获取农历月份
	function getLunarMonth(){
			var lunarMonth = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
			var dt = new Date();
			var month = dt.getMonth();
			return lunarMonth[month];
		}
	//获取日期	
	function _getDate(){
			var dt = new Date();
			var date = dt.getDate();
			return date;
		}
	//获取时间	
	function _getTime(){
			var dt = new Date();
			var hour = dt.getHours();
			if(hour < 10)
				hour = "0"+hour;
			var minute = dt.getMinutes()
			if(minute < 10)
				minute = "0"+minute;
			var time = hour+":"+minute;
			return time;
		}
	//获取星期
	function _getDay(){
			var lunarDay = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
			var dt = new Date();
			var day = dt.getDay();
			return lunarDay[day];
		}
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
 	//选中下拉菜单项
 	function _select(option,leave_css){
		$("."+leave_css).click(function(){
			$("."+option+" li").css("display","block")
			})
		$("."+option+" li").click(function(){
			var leave_text = $(this).text();
			$("."+leave_css+" span").text(leave_text);
			})
		}
   
	$(document).ready(function() {
        $(".month").text(getLunarMonth());    
        $(".date").text(_getDate());
        $(".week").text(_getDay());	
		$.ajaxSettings.async = false;//同步，等待getJSON数据加载完毕	
		//获取教学周信息
		var weekdayzw,week,weekday; 
		$.getJSON("../../../credit/term!getCurWeek.action?random="+Math.random(),
		{"state":2},
		function(data,textStatus){
			if(textStatus=="success"){
				var msg=data.success;
				var alertmessag="教学周信息获取失败!";
				if(msg==false)
					{ 
						var textHtml=alertmessag;
						$("#day").html(textHtml);
					}else
					{
						week=data.week;
						weekday=data.weekday;						
						switch(weekday)
						{
							case 1:weekdayzw="一";break;	
							case 2:weekdayzw="二";break;
							case 3:weekdayzw="三";break;
							case 4:weekdayzw="四";break;
							case 5:weekdayzw="五";break;
							case 6:weekdayzw="六";break;
							case 7:weekdayzw="日";break;
						}
						var txtHtml="今天是星期"+weekdayzw+"(本周是第"+week+"周)";
						$("#weekday").val(weekday);//记录工作日
						$("#week").val(week);//记录教学周
						$("#day").html(txtHtml);
					}
			}
			else{
				$("#day").html("<span style='color:red'>无法获取教学周信息！</span>");
				}
		})
		$("#time").text("现在时间是："+_getTime());
		
		//获取当前学期ID
		var termID;
		$.getJSON("../../../credit/term!getCurTerm.action?random="+Math.random(),{
				},function(data,textStatus){
					if(textStatus == "success"){
						var msg=data.success;
						var alertmessag="当前学期获取失败!";
						if(msg==false)
							{
								alert(alertmessag);
							}else
							{
							//获取当前学期的id
							var term=data.data;
							termID = term.autoId;//记录当前学期
							}
						}
				})

		//实现下拉菜单功能
		selectMenu("class_order","class_option");
  		_select("class_option","class_order");
		var curClassOrder,curClass,curCourse,weekday;//当前第几课、班级和课程
		var courseID,classID;
		var teacherID = $("#teacherid")[0].value;	
		$(".class_option li").click(function(){		
			//获取是否已经考勤的信息====================================================
			var arrClassDeal = [];//记录已经考勤的课节，具体是星期几与第几课
			$.getJSON("../../../../creditBank/attence!getattencemainlist.action?random="+Math.random(),{
					"termId":termID,
					"teacherId":teacherID,
					"week":week
					},function(data,textStatus){
					if(textStatus=="success"){
						var msg=data.success;
						if(msg==true)
						{
							var datalist=data.dataList;
							for(var i=0; i<datalist.length; i++)
							{
								arrClassDeal[i] = datalist[i].weekDay+"X"+datalist[i].section;//记录已经考勤的星期几与第几节信息
							}
						}
					}
		});
			curClassOrder = $(".class_option li").index(this) + 1;//获取第几记课序
			//获取当前教师当前学期课表
			$.getJSON("../../../thrCou2!querySch2.action?random="+Math.random(),{
			"angle":2,
			"termId":termID,
			"thrId":teacherID
			},function(data,textStatus){
				if(textStatus=="success"){
					var msg=data.success;
					if(!msg==true){
						alert("获取课表时出错!");
						$("#loadingmsg").hide();
					}else{
						var lineSched=data.lineSched;//课表信息
						//当前课序在一周中的位置，每周为8节课
						classOrder =  (weekday - 1) * 8 + curClassOrder;
						curClass = lineSched[classOrder-1][0];//当前班级
						if(!curClass)curClass = "无";
						curCourse = lineSched[classOrder-1][1];
						if(!curCourse)curCourse = "无";
						//curTeacher = lineSched[classOrder-1][3];
						curTeacher = $("#teachername")[0].value;
						courseID = lineSched[classOrder-1][4];
						classID = lineSched[classOrder-1][3];
						if(arrClassDeal.indexOf(weekday+"X"+curClassOrder) == -1)
							$("#attmsg").html("本节尚未开始考勤");	
						else
							$("#attmsg").html("本节已考勤");						
						if(!classID){//当前无课							
							curTeacher = "无";
						}
						$(".classinfo").html("<p>班级："+curClass+"</p><p>科目："+curCourse+"</p><p>任课教师："+curTeacher+"</p>");
						$(".classinfo>p").css("display","block");//显示课堂信息
						$(".btn").css("display","block");//显示开始考勤按钮
					}
				}
				})
			})
		$.ajaxSettings.async = true;//异步
		
		//点击开始考勤按钮	
		$(".btn").click(function(){
			var browser = navigator.userAgent;
			//Check the type of browser
			if(browser.indexOf("Chrome")!=-1||browser.indexOf("Firefox")!=-1||browser.indexOf("Android")!=-1||browser.indexOf("Mobile")!=-1)
					setTimeout("location.href='/creditBank/attence/zs/att/classinfo.jsp?curClassOrder="+curClassOrder+"&curCourse="+curCourse+"&curClass="+curClass+"&curWeek="+week+"&weekday="+weekdayzw+"&teacherID="+teacherID+"&termID="+termID+"&courseID="+courseID+"&classID="+classID+"'", 500); 
			else
					setTimeout("location.href='/creditBank/attence/zs/att/classinfo.html'", 500); 
			})
	});	