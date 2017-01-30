<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String curWeek = request.getParameter("week");
	String weekDay = request.getParameter("weekDay");
	String termID = request.getParameter("termID");
	String stuNo = request.getParameter("stuNo");
	String classID = request.getParameter("classID");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="css/public.css?15" rel="stylesheet" type="text/css" />
    <link href="css/personalatt.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/personalatt.js"></script>
    <script type="text/javascript" src="js/public.js"></script>
    
<div class="attendance-wrap" id="personal_att">
	
</div>
    <div class="footer">
        <div class="input">
            <span class="att_text">输入</span>
        </div>
        <div class="nav">
            <div class="att" id="att1">
                <a href="login.html" class="att_text">课堂点名</a>
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
                    <a href='classlist.jsp?attType=4'>历史缺勤</a>
                </div>
            </div>
    </div>
<input type="hidden" id="termid" value="<%=termID %>" />
<input type="hidden" id="week" value="<%=curWeek %>" />
<input type="hidden" id="weekday" value="<%=weekDay %>" />
<input type="hidden" id="stuNo" value="<%=stuNo %>" />
<input type="hidden" id="classid" value="<%=classID %>" />
</body>
</html>
