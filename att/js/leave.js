$(function(){
	var classID = $("#classid")[0].value;//班级编号
	var headTeacherID = $("#headteacherid")[0].value;//班主任编号
//获取班级列表==========================================================================================================
	$.get("../../../class2!getMyClass.action?random="+Math.random(),{
	},function(data,textStatus){
		if(textStatus=="success"){
			var msg=data.success;
			if(!msg==true)
				{
					var txtHtml="<div id='msg'>获取班级列表失败！</div>"
					$("#msg").html(txtHtml);
				}else
				{
					var termlist=data.dataList;
					var msg;
					if(termlist.length > 3){//当前用户是管理员
						msg = "您是 管理员";
						}
					else{
						msg = "您是 " + termlist[0].name + " 班主任"
						}					
					$(".headteacher").append(msg);
				
				}
		}
	},"json");
	//按钮开始请假管理
	$(".btn").click(function(){
		var browser = navigator.userAgent;
		//Check the type of browser
		if(browser.indexOf("Chrome")!=-1||browser.indexOf("Firefox")!=-1||browser.indexOf("Android")!=-1||browser.indexOf("Mobile")!=-1)
				setTimeout("location.href='/creditBank/attence/zs/att/studentlist.jsp?headTeacherID="+headTeacherID+"&classID="+classID+"';", 500); 
		else
				setTimeout("location.href='/creditBank/attence/zs/att/studentlist.jsp?headTeacherID="+headTeacherID+"&classID="+classID+"';", 500); 
		})
})