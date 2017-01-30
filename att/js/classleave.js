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
	var arrLeave = [];
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
		})
	// 获取班级考勤数据
	var arrStuNo = [];//存储学生学号和座位号
		$.ajaxSettings.async = true;//异步
		//学生请假人数,数字5为每个学生所占数组单元数
		var leaveStuNum = arrLeave.length / 5;
		var profilePic,_stuName,status,url,button,statistics;
		//合并请假和考勤情况，关系是并集
		for(i=0;i<leaveStuNum;i++){
			var _stuNo = arrLeave[i*5];
			var _stuName = arrLeave[i*5+1];
			profilePic = '<div class="student-wrap"><img src="img/stu1_img.png" />';
			_stuName = '<div class="attinfo"><p class="name">'+_stuName+'</p>';
			if(arrLeave[i*5+2] == undefined)
				sickLeave = "病假0节 ";
			else 
				sickLeave = "病假"+arrLeave[i*5+2]+"节 ";//病假
			if(arrLeave[i*5+3] == undefined)
				privateLeave = "事假0节 ";
			else
				privateLeave = "事假"+arrLeave[i*5+3]+"节 ";//事假
			otherLeave = "其它"+arrLeave[i*5+4]+"节 "; //其它
			statistics = '<div class="statistics"><p>'+sickLeave+privateLeave+otherLeave+'</p></div></div>';
			url = "personalleave.jsp?stuNo="+_stuNo;
			button = '<div class="btn-wrap"><a href="'+url+'&week='+week+'&weekDay='+weekDay+'&termID='+termID+'&classID='+classID+'"><button>查看明细</button></a></div>';
			//button = '<div class="btn-wrap"><button>马上处理</button></div></div>';
		 
			stuAttHTML = profilePic + _stuName + statistics + button;
			$("#stu_att").append(stuAttHTML);		 	
			}		
		if(!arrLeave.length)
			 	alert("当前该班无请假信息！");
})
