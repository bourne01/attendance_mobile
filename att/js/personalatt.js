$(function(){
	
	// 获取班级考勤数据
	var arrStuNo = [];//存储学生学号和座位号
	var arrPerDetail = [];//记录学生的考勤明细
	var power;//当前用户权限,1为管理员,3为班主任
	$.ajaxSettings.async = false;//同步，等待getJSON数据加载完毕
	$.get("../../../vattenced!query.action?random="+Math.random(),{
				"F_TermId":$("#termid")[0].value,//学期
				"F_ClassId":$("#classid")[0].value,//所有班级
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
										if(arrStuNo.indexOf(stuNo) == -1){//判断学生学号是否已经存在于学号数组中
											arrStuNo.push(stuNo);//不存则添加学号入数组
											}
										
										if(arrPerDetail.indexOf(stuNo) == -1){//判断学生学号是否已经存在于数组中
											arrPerDetail.push(stuNo);//不存则添加学号入数组
											}
										positionWanted = arrPerDetail.indexOf(stuNo) + 1;//跳过学号元素
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
	var stuNo =  $("#stuNo")[0].value;//被查看明细的学生学号
	var attTime,weekDay,classOrder,courseName,attStatus,attID;//考勤时间，星期，第几课，课程名，考勤状态,考勤记录ID
	var stuNoPosition = arrPerDetail.indexOf(stuNo);
	if(stuNoPosition == -1){//无未处理考勤记录
		perDetaiHTML = '<div class="attendance">该生当前无未处理考勤记录</div>';
		$("#personal_att").append(perDetaiHTML);
		}
	else{
		var start,end;	
		start = stuNoPosition + 1;//跳过学号
		for(i=start;i<=arrPerDetail.length;i++){
			if ((i == arrPerDetail.length)||(parseInt(arrPerDetail[i]) > 10000 )){//判断是否学号或者已经是最后一元素
				end = i - 1;
				break;
				}
			}
		//个人明细条数T,数字8为每条明细占用多少个数据空间
		var T = ((end - start + 1)/8); 
		for(i=0;i<T;i++){
			var attTime = arrPerDetail[start+8*i+1];
			arrTime = attTime.split("-");
			var day = arrTime[2].split(" ");
			attID = arrPerDetail[start+8*i+5];//考勤ID
			attTime = '<div class="attendance" attid="'+attID+'" ><div class="att-text" ontouchstart="return false">'+ arrTime[0]　+"年"+ arrTime[1] + "月" + day[0] + "日 ";
			weekDay = arrPerDetail[start+8*i+2];//星期几
			classOrder = arrPerDetail[start+8*i+3];//第几节课
			courseName = arrPerDetail[start+8*i+4];//课程名称
			attStatus = arrPerDetail[start+8*i+7];//考勤状态			
			attContent = arrPerDetail[start+8*i+6];//班主任考勤处理意见
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
			var attMsg = arrTime[0]　+"年"+ arrTime[1] + "月" + day[0] + "日 " + weekDay + "第" + classOrder + "节 " + courseName + " " + attStatus;
			/*if(arrPerDetail[start+i*6] != 0)//每条明细是否已经被处理
				attDeal = '</div><div class="btn-wrap"><button class="done">已处理</button></div></div>';
			else
				attDeal = '</div><div class="btn-wrap"><a href="atthandle.jsp?attMsg='+attMsg+"&power="+power+"&attID="+attID+'"><button class="undone">未处理</button></a></div></div>';*/
			attDeal = arrPerDetail[start+i*8];
			switch(attDeal){
				case 0://未处理
					attDeal = '</div><div class="btn-wrap"><a data-ajax="false" href="atthandle.jsp?attMsg='+attMsg+"&power="+power+"&attContent="+"&attDeal="+attDeal+"&attID="+attID+'"><button class="undone">未处理</button></a></div></div>';				
					break;
				case 1://管理员审核
					if(power != 1)
						attDeal = '</div><div class="btn-wrap"><button class="done">待审核</button></div></div>';
					else
						attDeal = '</div><div class="btn-wrap"><a data-ajax="false" href="atthandle.jsp?attMsg='+attMsg+"&power="+power+"&attContent="+attContent+"&attDeal="+attDeal+"&attID="+attID+'"><button class="undone">待审核</button></a></div></div>';
					break;
				case 2://已处理
					attDeal = '</div><div class="btn-wrap"><button class="done">已处理</button></div></div>';
				}
			perDetaiHTML = attTime + weekDay + "第" + classOrder + "节 " + courseName + " " + attStatus + " " +attDeal;	
			$("#personal_att").append(perDetaiHTML);
		}	
			
	}
	setTimeout('$("h1").hide()',3000);//3秒过后隐藏底部"loading"
})

$(document).on("pageinit","#att-wrap",function(){
	//点击并保持一秒以上，弹出删除提示对话框
	
	$(".attendance").on("taphold",function(){
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
  