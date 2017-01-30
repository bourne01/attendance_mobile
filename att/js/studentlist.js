// JavaScript Document
$(function(){
	//获取教学周信息
	var curWeek;
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
						curWeek=data.week;
					}
			}
		})
	//获取学期列表==========================================================================================================
	var termID;
	//首先获取当前学期
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
							var term=data.data;
							termID=term.autoId;
						}
				}
			})
	//获取学生列表
	var headTeacherID = $("#headteacherid")[0].value;//班主任编号
	$.getJSON("../../../claStu2!query.action?random="+Math.random(),{
			"classId":$("#classid")[0].value
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
							for(var i=0;i<studentlist.length;i++)
							{
								var student=studentlist[i];
								var stuName = student.stuName;//学生姓名
								var stuGender = student.stuSex;//学生性别
								var className = student.myClaName;//班级名称
								var studentID = student.studentId;//学生编号
								var classID = student.classId;	//编辑编号
								var _link = "leavemanage.jsp?stuName="+stuName+"&className="+className+"&stuGender="+stuGender+"&week="+curWeek+"&classID="+classID+"&studentID="+studentID+"&termID="+termID+"&headTeacherID="+headTeacherID;
								var stuHTML = '<div class="student"><a href="'+_link+'"><img src="img/stu_img.png" /></a><div class="name">'+stuName+"</div></div>";
								$(".students").append(stuHTML);	
							}
							if(!studentlist.length)
								alert("该班当前无学生信息！");
					}
			}
		});
	})