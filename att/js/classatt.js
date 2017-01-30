$(function(){
	var week,weekDay;//教学周，星期几
	$.ajaxSettings.async = false;//同步，等待getJSON数据加载完毕
	$.getJSON("../../../credit/term!getCurWeek.action?random="+Math.random(),{
			"state":2
		},function(data,textStatus){
			if(textStatus=="success"){
				var msg=data.success;
				var alertmessag="教学周信息获取失败!";
				if(msg==false)
					{ 
						var textHtml=alertmessag;
						$("#weekinf").html(textHtml);
					}else
					{
						week=data.week;
						weekDay=data.weekday;
					}
			}
		})
			
	//获取当前学期
	var termID;//学期ID
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
	//获取班级列表
	var classID = $("#classid")[0].value;
	//获取请假数据
	var positionWanted;//数据待插入点
	/*var arrLeave = [];
	$.getJSON("../../../vleave!query.action?random="+Math.random(),{
			"F_Termid":termID,
			"F_ClassId":classID,
			"F_StartWeek":1,
			"F_EndWeek":25,
			"F_Status":1,
    		"start":0,
    		"limit":1000
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
						var leavelist=data.dataList;
						if(leavelist.length>0)
						{
							//成功收到查询数据列表
							//var total=data.total;//获取总记录数
							//dispaly(total,$("#pagesize")[0].value,$("#curpage")[0].value);//显示分页组件
							//var trlist="";
							for(var i=0;i<leavelist.length;i++)
							{
								var leave=leavelist[i];
								var leavetype="";
								var others = false;
								var stuNo = leave.F_StudentNo;//学生学号
								var stuName = leave.F_StudentName;//学生姓名 										
								if(arrLeave.indexOf(stuNo) == -1){//判断学生学号是否已经存在于数组中
										arrLeave.push(stuNo);//不存则添加学号入数组
										arrLeave.push(stuName);//不存在则添加姓名入数组
									}
								positionWanted = arrLeave.indexOf(stuNo)+2;//跳过学号和名字元素索引，指向后一个元素
								switch(leave.F_LeaveType)
								{
									case "1":
										leavetype="病假";
										if(arrLeave[positionWanted] == undefined)
											arrLeave[positionWanted] = 1;
										else
											arrLeave[positionWanted] += 1;
										break;
									case "2":
										leavetype="事假";
										if(arrLeave[positionWanted+1] == undefined)
											arrLeave[positionWanted+1] = 1;
										else
											arrLeave[positionWanted+1] += 1;
										break;
									case "3":
										leavetype="其它";
										if(arrLeave[positionWanted+2] == undefined)
											arrLeave[positionWanted+2] = 1;
										else
											arrLeave[positionWanted+2] += 1;
										others = true;
										break;
								}
								if(!others && (arrLeave[positionWanted+2] == undefined))//确保每个学生占用5个数据空间
									arrLeave[positionWanted+2] = 0;
							}
						}
					}
			}
		})*/
	// 获取班级考勤数据
	var arrStuNo = [];//存储学生学号和座位号
	var arrClassAtt = [];//存储学生学号、名字、病假、事假、其它、迟到、早退、旷课和缺课
	$.get("../../../vattenced!query.action?random="+Math.random(),{
				"F_TermId":termID,//学期
				"F_ClassId":classID,//所有班级
				"F_Week":-1,//教学周
				"F_WeekDay":-1,//星期几
				"F_Attence":-1,//所有假别类型
				"start":0,
				"limit":1000 //所有数据
			},function(data,textStatus){
				if(textStatus=="success"){
					var msg=data.success;
					if(!msg==true)
						{
							var txtHtml="班级考勤数据查询失败！"
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
									
									for(var i=0;i<attencelist.length;i++)
									{
										var attence=attencelist[i];
										var stuNo = attence.F_StudentNo;//学生学号 
										var stuName = attence.F_StudentName;//学生姓名
										if(arrStuNo.indexOf(stuNo) == -1){//判断学生学号是否已经存在于学号数组中
											arrStuNo.push(stuNo);//不存则添加学号入数组
											}
										
										if(arrClassAtt.indexOf(stuNo) == -1){//判断学生学号是否已经存在于数组中
											arrClassAtt.push(stuNo);//不存则添加学号入数组
											arrClassAtt.push(stuName);//记录学生姓名
											}
										positionWanted = arrClassAtt.indexOf(stuNo) + 2;//跳过学号和姓名元素
										if(attence.attencedeal != 2){//0为未处理，1为待审核，2为已处理
											if(arrClassAtt[positionWanted] == undefined)//当前位置没有值
												arrClassAtt[positionWanted] = 1;
											else
												arrClassAtt[positionWanted] += 1; //记录未处理考勤数
											
											}
										else 
										{
											if(arrClassAtt[positionWanted] == undefined)//当前位置没有值
												arrClassAtt[positionWanted] = 0;//无记录未处理考勤数
											else
												arrClassAtt[positionWanted] += 0;
											}
					
										positionWanted += 1;
										//var sickLeave,privateLeave,otherLeave,late,ealy,skip;//病假、事假、其它、迟到、早退和旷课									
										var attenceS="正常";
										switch(attence.F_Attence)
											{
												case "1":
													attenceS="正常";	
													if(arrClassAtt[positionWanted] == undefined)//当前位置没有值
														arrClassAtt[positionWanted] = 0;
													else
														arrClassAtt[positionWanted] += 0;  										
													break;
												case "2"://记录迟到数
													attenceS="迟到";
													if(arrClassAtt[positionWanted+1] == undefined)//当前位置没有值
														arrClassAtt[positionWanted+1] = 1;
													else
														arrClassAtt[positionWanted+1] += 1;  
													break;
												case "3"://记录严重迟到数并入迟到数
													attenceS="严重迟到";
													if(arrClassAtt[positionWanted+1] == undefined)//当前位置没有值
														arrClassAtt[positionWanted+1] = 1;
													else
														arrClassAtt[positionWanted+1] += 1;  
													break;
												case "4"://记录早退数量
													attenceS="早退";
													if(arrClassAtt[positionWanted+2] == undefined)//当前位置没有值
														arrClassAtt[positionWanted+2] = 1;
													else
														arrClassAtt[positionWanted+2] += 1;  
													break;
												case "5"://记录旷课数量
													attenceS="旷课";
													if(arrClassAtt[positionWanted+3] == undefined)//当前位置没有值
														arrClassAtt[positionWanted+3] = 1;
													else
														arrClassAtt[positionWanted+3] += 1;  
													break;
												case "6"://记录请假数量
													attenceS="请假";
													if(arrClassAtt[positionWanted+4] == undefined)//当前位置没有值
														arrClassAtt[positionWanted+4] = 1;
													else
														arrClassAtt[positionWanted+4] += 1;  
													break;
												default://记录其它数量
													if(arrClassAtt[positionWanted+5] == undefined)//当前位置没有值
														arrClassAtt[positionWanted+5] = 1;
													else
														arrClassAtt[positionWanted+5] += 1;  
											}
											if(arrClassAtt[positionWanted+5] == undefined)//确保每个同学占9个数组空间
												arrClassAtt[positionWanted+5] = 0;
										}
								}else
									$("#loadingmsg").html("查无数据!").show();
						}
				}
			},"json");
		$.ajaxSettings.async = true;//异步
		//学生请假人数
		//var leaveStuNum = arrLeave.length / 5
		//合并请假和考勤情况，关系是并集
		/*for(i=0;i<leaveStuNum;i++){
			var _stuNo = arrLeave[i*5];
			var _stuName = arrLeave[i*5+1];
			var _stuNoIndex = arrClassAtt.indexOf(_stuNo);
			if( _stuNoIndex == -1){//判断请假中的学生是否也在考勤数据中，-1为不存在，所以添加进入考勤数组中
				arrClassAtt.push(_stuNo);
				arrClassAtt.push(_stuName);
				_stuNoIndex = arrClassAtt.indexOf(_stuNo);
				//把考勤情况都设置为0
				for(j=_stuNoIndex+2;j<=_stuNoIndex+8;j++)
					arrClassAtt[j] = 0;
				}
			}*/		
		var profilePic,_stuName,statistics,status,stuNo,url,button;
		//学生人数
		var stuNum = arrClassAtt.length / 9;
		for (i = 0;i < stuNum ;i++){
			 profilePic = '<div class="student-wrap"><img src="img/stu1_img.png" />';
    		 _stuName = '<div class="attinfo"><div class="name">'+arrClassAtt[i*9+1]+'</div>';
			 for(j=i*9+3;j<=i*9+8;j++){//处理无迟到、早退、旷课、请假及其它为0
				 if(arrClassAtt[j] == undefined)
				 	arrClassAtt[j] = 0;
				 }
			 stuNo = arrClassAtt[i*9+0];//学生学号
			 /*indexLeave = arrLeave.indexOf(stuNo);
			 if(indexLeave == -1){//该学生无请假记录，向请假数据添加一条如下内容记录
				 arrLeave.push(stuNo);
				 arrLeave.push(arrClassAtt[i*9+1]);
				 arrLeave.push(0);
				 arrLeave.push(0);
				 arrLeave.push(0);
			     indexLeave = arrLeave.length - 5;//新插入请假学生的学号索引位置			 
				 }
			 else
			 	for(j=2;j<5;j++){
				 	if(arrLeave[indexLeave+j] == undefined)
				 		arrLeave[indexLeave+j] = 0;
				 }*/
			 //sickLeave = "病假"+arrLeave[indexLeave+2]+"节 ";//病假
			 //privateLeave = "事假"+arrLeave[indexLeave+3]+"节 ";//事假
			 //otherLeave = "其它"+arrLeave[indexLeave+4]+"节 "; //其它		 
			 /*statistics = '<div class="statistics"><p>'+sickLeave+privateLeave+otherLeave+'迟到'+
				arrClassAtt[i*9+4]+'次，早退'+arrClassAtt[i*9+5]+'次，旷课'+arrClassAtt[i*9+6]+'节</p></div>';*/
			 statistics = '<div class="statistics"><p>迟到'+	arrClassAtt[i*9+4]+'次，早退'+arrClassAtt[i*9+5]+'次，旷课'+arrClassAtt[i*9+6]+'节</p></div>';
			 status = '<div class="status">考勤未处理'+arrClassAtt[i*9+2]+'次</div> </div>';
       		 
			 url = "personalatt.jsp?stuNo="+stuNo;
			 button = '<div class="btn-wrap"><a href="'+url+'&week='+week+'&weekDay='+weekDay+'&termID='+termID+'&classID='+classID+'"><button>查看明细</button></a></div></div>';
			 //button = '<div class="btn-wrap"><button>马上处理</button></div></div>';
		 
			 stuAttHTML = profilePic + _stuName + statistics + status + button;
			 $("#stu_att").append(stuAttHTML);
			 
		}
		if(!arrClassAtt.length)
			 	alert("当前该班无考勤信息！");
})
