// JavaScript Document
$(function(){
	//获取班级列表	
	$.getJSON("../../../class2!getMyClass.action?random="+Math.random(),{
	},function(data,textStatus){
		if(textStatus=="success"){
			var msg=data.success;
			if(!msg==true)
				{
					var txtHtml='<div class="class">获取班级列表失败，'+data.message+'</div>'
					$("#classlist").append(txtHtml);
					$("#loadmsg").hide()
				}else
				{
					var termlist=data.dataList;
					var url,button,classID,className;
					var headTeacherID;//班主任ID
					var attType = $("#attType")[0].value;
					var classLogo = '<div class="class"><img src="img/class_logo.png" />';
					//$("#loadmsg").show()
					for(i=0;i < termlist.length;i++){
						data = termlist[i];						
						className = '<div class="classname">' + data.name + '</div>';//班级名称						
						classID = data.autoId;//班级编号
						headTeacherID = data.masterId;//班主任编号
						switch(attType){
							case '0':
								url="login.html?classID="+classID;
								break;
							case '1':
								url="leave.jsp?headTeacherID="+headTeacherID+"&classID="+classID;//当前进行请假管理操作
								break;
							case '2':
								url="classatt.jsp?classID="+classID;//当前进行考勤管理操
								break;
							case '3':
								url="attundone.jsp?classID="+classID;//考勤未处理
								break;
							case '4':
								url="historyunatt.jsp?classID="+classID;//历史考勤
								break;
							case '5':
								url="classleave.jsp?classID="+classID;//请假管理
							}
			 			button = '<div class="btn-wrap"><a href="'+url+'"><button>进入班级</button></a></div></div>';		 
			 			classListHTML = classLogo + className + button;
			 			$("#classlist").append(classListHTML);
					}
					if(termlist.length == 0)
						$("#classlist").append("您非班主任或管理员，无权操作此项功能！");
					$("#loadmsg").hide()
				}
		}
	},"json");		
})
