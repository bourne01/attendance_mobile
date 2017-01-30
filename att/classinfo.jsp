<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String curWeek = request.getParameter("curWeek");
	String curCourse = request.getParameter("curCourse");
	String curClass = request.getParameter("curClass");
	String curClassOrder = request.getParameter("curClassOrder");
	String weekday = request.getParameter("weekday");
	String teacherID = request.getParameter("teacherID");
	String termID = request.getParameter("termID");
	String classID = request.getParameter("classID");
	String courseID = request.getParameter("courseID");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="css/public.css?15" rel="stylesheet" type="text/css" />
    <link href="css/classinfo.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/classinfo.js"></script>
    <script type="text/javascript" src="js/public.js"></script>
    <title>课堂点名</title>
</head>	

<body>
<div class="class-wrap">
	<div class="class">
    	<p>当前课堂信息：</p>
        <div class="curclass">第<%=curWeek %>周｜星期<%=weekday %>｜第<%=curClassOrder %>节｜<%=curClass %>｜<%=curCourse %></div>
        <p id="leavenum">已请假：0人</p>
        <div class="btn">
        	<button class="fullyattend" id="fullyattend">全勤</button>
            <!--<button class="confirm" id="confirm">确认</button>-->
            <button class="back" id="back">返回</button>
        </div>
    </div>
    <div class="student-wrap">

    </div>    
</div>
 <div class="footer">
        <!--<div class="input">
            <span class="att_text">输入</span>
        </div>-->
        <div class="nav">
            <div class="att" id="att1">
                <a href="postlogin.jsp" class="att_text">课堂点名</a>
                <div class="second">
                </div>
            </div>
             <div class="att" id="att2">
               <span class="att_text">请假管理</span>
                <div class="second">
               		<a href="classlist.jsp?attType=1" class="att_text">请假</a> 
                    <a href="classlist.jsp?attType=5" class="att_text">请假明细</a>
                </div>        
            </div>
            <div class="att" id="att3">
                <span class="att_text">考勤管理</span>
                <div class="second">
                    <a href='classlist.jsp?attType=2'>班级考勤</a>
                    <a href='classlist.jsp?attType=3'>未处理考勤</a>
                    <!--<a href='classlist.jsp?attType=4'>历史未处理</a>-->
                </div>
            </div>
    </div>
<input id="termid"  type="hidden" value="<%=termID %>"></input>
<input id="courseid"  type="hidden" value="<%=courseID %>"></input>
<input id="week"  type="hidden" value="<%=curWeek %>"></input>
<input id="weekday"  type="hidden" value="<%=weekday %>"></input>
<input id="classorder"  type="hidden" value="<%=curClassOrder %>"></input>
<input id="classid"  type="hidden" value="<%=classID %>"></input>
<input id="teacherid"  type="hidden" value="<%=teacherID %>"></input>
</body>
</html>
