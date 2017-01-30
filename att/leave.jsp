<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String classID = request.getParameter("classID");
	String headTeacherID = request.getParameter("headTeacherID");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="css/public.css?15" rel="stylesheet" type="text/css" />
    <link href="css/leave.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/leave.js"></script>
    <script type="text/javascript" src="js/public.js"></script>
    <title>请假管理</title>
</head>	

<body>
<div class="leave-wrap">
	<div class="leave_profile"><img src="img/leave-profile.png" /></div>
    <div class="headteacher"></div>
    <div class="btn"><button>开始请假管理</button></div>  
    
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
</body>
<input id="classid"  type="hidden" value="<%=classID %>"></input>
<input id="headteacherid"  type="hidden" value="<%=headTeacherID %>"></input>
</html>
