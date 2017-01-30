$(function(){
	var termID;//学期ID
	var classID = $("#classid")[0].value
	$.ajaxSettings.async = false;//同步，等待getJSON数据加载完毕
	$.getJSON("../../../credit/term!getCurTerm.action?random="+Math.random(),{
			},function(data,textStatus){
				if(textStatus=="success"){
					var msg=data.success;
					var alertmessag="当前学期获取失败!";
					if(msg==false)
					{
						alert(alertmessag);
					}else
					{
						//获取当前学期的id
						var term = data.data;
						termID = term.autoId;//记录当前学期
					}
				}
			})
	// 获取班级考勤数据
	var arrPerDetail = [];//记录学生的考勤明细
	var power;//当前用户权限,1为管理员,3为班主任	
	$.get("../../../vattenced!query.action?random="+Math.random(),{
				"F_TermId":termID,//学期
				"F_ClassId":classID,//班级名称
				//"F_Week":$("#week")[0].value,//教学周	
				//"F_WeekDay":$("#weekday")[0].value,//星期几
				"F_Week":-1,//教学周	
				"F_WeekDay":-1,//星期几
				"F_Attence":-1,//假别类型
				"start":0,
				"limit":1000//所有考勤数据
			},function(data,textStatus){
				if(textStatus=="success"){
					var msg=data.success;
					if(!msg==true)
						{
							var txtHtml="查询失败！"
							alert(txtHtml);
							$("#loadingmsg").hide();
						}else
						{
								var attencelist=data.dataList;
								if(attencelist.length>0)
								{
									//成功收到查询数据列表
									var total=data.total;//获取总记录数
									//dispaly(total,$("#pagesize")[0].value,$("#curpage")[0].value);//显示分页组件
									var trlist="";
									var positionWanted;//考勤数据待插入点
									for(var i=0;i<attencelist.length;i++)
									{
										var attence=attencelist[i];
										power = attence.userpower;//用户权限
										var stuNo = attence.F_StudentNo;//学生学号
										var stuName =  attence.F_StudentName;
										if(arrPerDetail.indexOf(stuNo) == -1){//判断学生学号是否已经存在于数组中
											arrPerDetail.push(stuNo);//不存则添加学号入数组
											arrPerDetail.push(stuName);//不存则添加学号入数组
											}
										positionWanted = arrPerDetail.indexOf(stuNo) + 2;//跳过学号元素
										if(attence.attencedeal == 0){//记录考勤是否已被处理，0为未处理，1未已经处理
											arrPerDetail.splice(positionWanted,0,0);//记录未被处理
											}
										else if(attence.attencedeal == 1)
											arrPerDetail.splice(positionWanted,0,1);//记录待审核
										else
											arrPerDetail.splice(positionWanted,0,2);//记录已经被处理
										positionWanted++;
										arrPerDetail.splice(positionWanted,0,attence.F_Time);//记录请假时间
										positionWanted++;
										arrPerDetail.splice(positionWanted,0,attence.F_WeekDay);//记录星期几请假
										positionWanted++;
										arrPerDetail.splice(positionWanted,0,attence.F_Section);;//记录第几课请假
										positionWanted++;
										arrPerDetail.splice(positionWanted,0,attence.F_CourseName);//记录课程名字
										positionWanted++;
										arrPerDetail.splice(positionWanted,0,attence.F_AutoId);//记录考勤记录ID号
										positionWanted++;
										arrPerDetail.splice(positionWanted,0,attence.dealcontent);//记录班主任处理意见
										positionWanted++;										
										var attenceS;
										switch(attence.F_Attence)
											{
												case "1":
													attenceS="正常";
													//arrClassAtt[positionWanted] = attenceS;//记录正常												
													break;
												case "2":
													attenceS="迟到";
													//arrClassAtt[positionWanted] = attenceS; //记录迟到
													break;
												case "3":attenceS="严重迟到";
													//arrClassAtt[positionWanted] = attenceS; //记录严重迟到并入迟到
													break;
												case "4":
													attenceS="早退";
													//arrClassAtt[positionWanted] = attenceS; //记录早退
													break;
												case "5":
													attenceS="旷课";
													//arrClassAtt[positionWanted] = attenceS; //记录旷课
													break;
												case "6":
													attenceS="请假";
													//arrClassAtt[positionWanted] = attenceS; //记录请假
													break;
												default:
													attenceS = "其它"; //记录其它情况
											}
											arrPerDetail.splice(positionWanted,0,attenceS);//考勤信息
											//positionWanted++;
										}
								}else
									$("#loadingmsg").html("查无数据!").show();
						}
				}
			},"json");
	$.ajaxSettings.async = true;//异步
	//个人考勤明细
	var attDeal;//考勤是否被处理
	var attTime,weekDay,classOrder,courseName,attStatus,attID,attContent;//考勤时间，星期，第几课，课程名，考勤状态,考勤记录ID,考勤处理意见
	var num = 0;//0表示没有未处理的考勤记录
	for(m=0;m<arrPerDetail.length;){
		if(parseInt(arrPerDetail[m]) > 10000){
			var n = 1;//n为单个学生总格有几条考勤信息
			while(parseInt(arrPerDetail[m+2+n*8])<10000)
				n++;
			for(j=0;j<n;j++){
				attDeal = arrPerDetail[m+2+j*8];//记录考勤是否被处理状态
				attTime = arrPerDetail[m+3+j*8];
				arrTime = attTime.split("-");
				var day = arrTime[2].split(" ");
				attID = arrPerDetail[m+7+j*8];//考勤ID
				var _stuName = '<div class="attinfo" ontouchstart="return false"><div class="name">'+arrPerDetail[m+1]+'</div>';//学生姓名
				var profilePic = '<div class="item_undone" attid="'+attID+'"><img src="img/stu1_img.png" />';				
				weekDay = arrPerDetail[m+4+j*8];//星期几				
				courseName = '<div class="course">'+arrPerDetail[m+6+j*8]+'</div>';//课程名称
				attStatus = arrPerDetail[m+9+j*8];//考勤状态
				classOrder = arrPerDetail[m+5+j*8];//第几节课				
				attContent = arrPerDetail[m+8+j*8];//班主任考勤处理意见
				switch(weekDay){
					case "1":
						weekDay = "星期一 ";
						break;
					case "2":
						weekDay = "星期二 ";
						break;
					case "3":
						weekDay = "星期三 ";
						break;
					case "4":
						weekDay = "星期四 ";
						break;
					case "5":
						weekDay = "星期五 ";
						break;
					case "6":
						weekDay = "星期六 ";
						break;
					case "7":
						weekDay = "星期日 ";
					
					}
				attTime = '<div class="date">'+ arrTime[0]　+"年"+ arrTime[1] + "月" + day[0] + "日 "+weekDay+'</div>';		
				var attMsg = arrTime[0]　+"年"+ arrTime[1] + "月" + day[0] + "日 " + weekDay + "第" + classOrder + "节 " + arrPerDetail[m+6+j*8] + " " + attStatus;
				/*//每条明细是否已经被处理
					/*attDeal = '</div><div class="btn-wrap"><button class="done">已处理</button></div>';*/
				var attAction;	
				if( attDeal != 2){//列出未处理考勤明细
					num++;					
					if(attDeal == 0)
						attAction = "马上处理";
					else if(attDeal == 1)
						attAction = "等待审核"
					else
						attAction = "无权操作"
					attDeal = '</div><div class="btn-wrap" ><a data-ajax="false" href="atthandle.jsp?attMsg='+attMsg+"&attContent="+attContent+"&attDeal="+attDeal+"&power="+power+"&attID="+attID+'"><button class="undone">'+attAction+'</button></a></div>';
				perDetaiHTML = profilePic + _stuName + attTime + courseName  + " " +attDeal;	
				$("#attundone").append(perDetaiHTML);
				}
			}
			m = m + 2 + n*8	;//下个学生学号数组下标
		}
	}
	if(num == 0)
		$("#attundone").append("当前没有未处理考勤记录");
	setTimeout('$("h1").hide()',3000);//3秒过后隐藏底部"loading"
	

})
//window.ontouchstart = function(e) { e.preventDefault(); };
$(document).on("pageinit","#unatt-page",function(){
	//点击并保持一秒以上，弹出删除提示对话框
	
	$(".item_undone").on("taphold",function(){
		//event.preventDefault();
		var alautoid=$(this).attr("attid");//选中的记录id
		if(confirm("确定要删除这条记录吗？")){
    		$.getJSON("../../../attenced!del.action?random="+Math.random(),{
			"autoId":alautoid
		},function(data,textStatus){
			if(textStatus=="success"){
				var msg=data.success;
				if(msg==false)
					{
						alert("删除考勤记录时出错了!\n"+data.message);
						$("#loadingmsg").hide();
					}else
					{
						alert("考勤记录已经删除了!\n");
						//刷新
						history.go(0);
					}
			}
		});
    	}
	})
   

})
  