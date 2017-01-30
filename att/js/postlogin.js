// JavaScript Document
$(function(){
	$(".btn").click(function(){
		var teacherID = $("#teacherid")[0].value;
		var teacherName = $("#teachername")[0].value;
		var browser = navigator.userAgent;
		//Check the type of browser
		if(browser.indexOf("Chrome")!=-1||browser.indexOf("Firefox")!=-1||browser.indexOf("Android")!=-1||browser.indexOf("Mobile")!=-1)
				setTimeout('location.href="/creditBank/attence/zs/att/rollcall.jsp?teacherID='+teacherID+"&teacherName="+teacherName+'"', 500); 
		else
				setTimeout('location.href="/creditBank/attence/zs/att/rollcall.jsp?teacherID='+teacherID+"&teacherName="+teacherName+'"', 500); 
		})
	})