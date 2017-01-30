// JavaScript Document
$(function () {
	//获取星期几
	var weekday = $("#weekday")[0].value;
	switch(weekday){
		case "一":weekday = 1;break;	
		case "二":weekday = 2;break;
		case "三":weekday = 3;break;
		case "四":weekday = 4;break;
		case "五":weekday = 5;break;
		case "六":weekday = 6;break;
		case "日":weekday = 7;break;
		}
	var classID = $("#classid")[0].value;//班级编号	
	
	//全勤按钮
	$("#fullyattend").click(function(){
    	//点击全勤时
    	 if(confirm("确定全勤吗？")){
    	 	//$("#loadingmsg").html("正在处理全勤...").show();
			$.getJSON("../../../attence!allAttence.action?random="+Math.random(),{
				"termId":		$("#termid")[0].value,
				"classId":		classID,
				"teacherId":	$("#teacherid")[0].value,
				"courseId":		$("#courseid")[0].value,
				"week":			$("#week")[0].value,
				"weekDay":		weekday,
				"section":		$("#classorder")[0].value
			},function(data,textStatus){
				if(textStatus=="success"){
					var msg=data.success;
					if(msg==false)
						{
							alert("全勤处理失败，请重试!");
						}else
						{
							//获取或生成考勤主表成功
							alert("已经全勤处理，请返回!");
							//全勤完成后整个刷新一下
							 window.location.reload();//刷新当前页面
						}
				}
			});
   		}
    });
	//确认按钮
	$("#confirm").click(function(){
		alert("您已确认本节课堂考勤！");
		})
	//取消按钮
	$("#back").click(function(){
		history.go(-1);//返回前页
		})
	$.ajaxSettings.async = false;//同步，等待getJSON数据加载完毕
	//获取请请人数
	var arrLeave = [];//记录请假学生的编号(studentId)
	if(!classID)
		$("#leavenum").html("已请假:0人");//当前无课
	else{
		$.getJSON("../../../leave!getleaveList.action?random="+Math.random(),{
			"termId":		$("#termid")[0].value,
			"classId":		classID,
			"teacherId":	$("#teacherid")[0].value,
			"courseId":		$("#courseid")[0].value,
			"week":			$("#week")[0].value,
			"weekDay":		weekday,
			"section":		$("#classorder")[0].value
			},function(data,textStatus){
				if(textStatus=="success"){
					var msg=data.success;
					var alertmessag="获取请假信息失败!";
					if(msg==false){	
						alert(alertmessag);
					}
					else{
						var leavelist=data.dataList;//获取请假列表
						$("#leavenum").html("已请假:"+leavelist.length+"人");
						for(i=0;i<leavelist.length;i++){
								arrLeave[i] = leavelist[i].studentId;//记录学生编号； 
							}
						
					}
				}
			})
	}
	//获取学生列表
	var arrStuList = [];//存储学生学号与姓名
	$.getJSON("../../../claStu2!query.action?random="+Math.random(),{
			"classId":classID
		},function(data,textStatus){
			if(textStatus=="success"){
				var msg=data.success;
				var alertmessag="获取班级学生列表失败!";
				if(msg==false)
					{
						alert(alertmessag);
					}else
					{
							//学生列表获取成功
							var studentlist=data.dataList;
							var trlist="";
							var draglist="";
							for(var i=0;i<studentlist.length;i++)
							{
								var student=studentlist[i];
								arrStuList[2*i] = student.studentId;
								arrStuList[2*i+1] = student.stuName;
							}
					}
			}
		})
	
	//获取考勤数据列表
	var arrAttenceD = [];//记录学生编号和考勤状态
	$.getJSON("../../../attence!getAttenceD.action?random="+Math.random(),{
								"termId":		$("#termid")[0].value,
								"classId":		$("#classid")[0].value,
								"teacherId":	$("#teacherid")[0].value,
								"courseId":		$("#courseid")[0].value,
								"week":			$("#week")[0].value,
								"weekDay":		weekday,
								"section":		$("#classorder")[0].value
							},function(data,textStatus){
								if(textStatus=="success"){
									var msg=data.success;
									var alertmessag="获取考勤信息失败!";
									if(msg==false)
									{
										alert(alertmessag);
									}
									else
									{
										var attenceD=data.dataList;
										var attStatus;
										var j = 0;
										for(i=0;i<attenceD.length;i++){
											arrAttenceD[j] = attenceD[i].TStudent;//学生编号									
											arrAttenceD[j+1] = attenceD[i].FAttence;
											j += 2;
											}
									}
								}
							})
	$.ajaxSettings.async = true;//异步
	//向网页输出本节课请假、考勤信息，以及任课老师进行课堂考勤
	for(i=0;i<arrStuList.length;i++){
		var _attStatus,attStatus;
		var statusStyle;
		var stuImg,	stuName,stuSeat,leaveStatus,statusNormal,statusLate,statusEarlyLeave,statusSkip;
		var leStaColor ="";//请假状态文字颜色，已经请假用绿色表示
		var leStaBackColor = "";//请假状态颜色
		stuNo = arrStuList[i];//学生编号
		stuName = arrStuList[i+1];//学生名字
		i++;
		//记录考勤状态
		if(arrAttenceD.indexOf(stuNo) == -1)
			_attStatus = "1";//没有考勤信息就记录为正常状态1
		else
			_attStatus = arrAttenceD[arrAttenceD.indexOf(stuNo)+1];//记录考勤状态
		
		stuSeat = "无";
		stuImg = '<img src="img/stu_img.png" />';//学生头像
		stuName = '<div class="stu_name">'+stuName+'</div>';//学生姓名
		//stuSeat = '<div class="stu_seat">座位号:'+stuSeat+'</div>';//学生座位，暂时无信息									
		statusNormal = '<div class="att_status normal" studentId='+stuNo+' id="normal">正常</div>';//考勤状态为正常
		statusLate = '<div class="att_status late" studentId='+stuNo+' id="late">迟到</div>';//考勤状态为迟到
		statusEarlyLeave = '<div class="att_status earlyleave" studentId='+stuNo+' id="earlyleave">早退</div>';//考勤状态早退
		statusSkip = '<div class="att_status skip" studentId='+stuNo+' id="skip">旷课</div>';//考勤状态早退							
		switch(_attStatus){
			case "1":
				attStatus="正常";
				statusStyle = "background-color:#2e9699;color:#fff";
				statusNormal = '<div class="att_status normal" studentid='+stuNo+' id="normal" style="'+statusStyle+'">正常</div>';//添加Style行内样式，几给圆圈加背景色，更改字体颜色,以下情况同理
				break;
			case "2":
				attStatus="迟到";													
				statusStyle = "background-color:#f26a44;color:#fff";
				statusLate = '<div class="att_status late" studentid='+stuNo+' id="late" style="'+statusStyle+'">迟到</div>';
				break;
			case "3":
				attStatus="严重迟到";
				statusStyle = "background-color:#f26a44;color:#fff";
				statusLate = '<div class="att_status late" studentid='+stuNo+' id="late" style="'+statusStyle+'">迟到</div>';
				break;
			case "4":
				attStatus="早退";
				statusStyle = "background-color:#a8226b;color:#fff";
				statusEarlyLeave = '<div class="att_status earlyleave" studentid='+stuNo+' id="earlyleave" style="'+statusStyle+'">早退</div>';
				break;
			case "5":
				attStatus="旷课"
				statusStyle = "background-color:#ee2856;color:#fff";
				statusSkip = '<div class="att_status skip" studentid='+stuNo+' id="skip" style="'+statusStyle+'">旷课</div>';
				break;											
			}
		//记录是否已经请假
		if(arrLeave.indexOf(stuNo) == -1)
			leaveStatus = "未请假";//记录未请假信息
		else{
			leaveStatus = "已请假";//记录已请假信息
			leStaColor = 'style="color:green;"';//已经请假的同学，更改“已请假”为绿
			leStaBackColor = 'style="background:grey;height:8.5vh;"';
			}
		leaveStatus = '<div class="leave_status" '+leStaColor+'>'+leaveStatus+'</div></div>';					
		//var attHTML = '<div class="student">'+stuImg+'<div class="stuinfo">'+stuName+stuSeat+leaveStatus+statusNormal+statusLate+statusEarlyLeave+statusSkip+'</div></div>';
		var attHTML = '<div class="student" '+leStaBackColor+'>'+stuImg+'<div class="stuinfo">'+stuName+leaveStatus+statusNormal+statusLate+statusEarlyLeave+statusSkip+'</div></div>';
		$(".student-wrap").append(attHTML);//学生课堂信息							
		}
	$(".student-wrap").prepend('<p>学生列表：</p>');//插入成为第一个子元素
	//更改考勤信息
	$("div.att_status").click(function(){
		var attStatusValue = $(this).attr("id");//获取考勤状态Div的ID属性值
		var studentID = $(this).attr("studentid");//获取学生编号
		if(arrLeave.indexOf(studentID) != -1)
			return;//已请假学生，就不能再进行考勤操作
		var attStatusID;//考勤状态编号	
		switch(attStatusValue){
			case "normal"://选中一个，其余三个状态Style行内样式清除，以下几种状态同理
				attStatusID = 1;
				$("div[studentid="+studentID+"]").attr("style","background-color:#2e9699;color:#fff");
				$("div[id=late][studentid="+studentID+"]").removeAttr("style");
				$("div[id=earlyleave][studentid="+studentID+"]").removeAttr("style");
				$("div[id=skip][studentid="+studentID+"]").removeAttr("style");
				break;
			case "late":
				attStatusID = 2;
				$("div[studentid="+studentID+"]").attr("style","background-color:#f26a44;color:#fff");
				$("div[id=normal][studentid="+studentID+"]").removeAttr("style");
				$("div[id=earlyleave][studentid="+studentID+"]").removeAttr("style");
				$("div[id=skip][studentid="+studentID+"]").removeAttr("style");
				break;
			case "earlyleave":
				$("div[studentid="+studentID+"]").attr("style","background-color:#a8226b;color:#fff");
				$("div[id=normal][studentid="+studentID+"]").removeAttr("style");
				$("div[id=late][studentid="+studentID+"]").removeAttr("style");
				$("div[id=skip][studentid="+studentID+"]").removeAttr("style");
				attStatusID = 4;
				break;
			case "skip":
				$("div[studentid="+studentID+"]").attr("style","background-color:#ee2856;color:#fff");
				$("div[id=normal][studentid="+studentID+"]").removeAttr("style");
				$("div[id=late][studentid="+studentID+"]").removeAttr("style");
				$("div[id=earlyleave][studentid="+studentID+"]").removeAttr("style");
				attStatusID = 5;				
			}
		//考勤提交
		$.getJSON("../../../attence!changeAttenced.action?random="+Math.random(),{
				"termId":		$("#termid")[0].value,
				"classId":		$("#classid")[0].value,
				"teacherId":	$("#teacherid")[0].value,
				"courseId":		$("#courseid")[0].value,
				"week":			$("#week")[0].value,
				"weekDay":		weekday,
				"section":		$("#classorder")[0].value,
				"studentId":    studentID,
				"attence":      attStatusID
			},function(data,textStatus){
				if(textStatus=="success"){
					var msg=data.success;
					if(msg==false)
						{
							alert("考勤提交失败!");
						}else
						{
							//alert("考勤提交成功!");
						}
				}
			});
		})
	
})