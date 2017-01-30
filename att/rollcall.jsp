<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<% 
   String teacherID = request.getParameter("teacherID");
   String teacherName = request.getParameter("teacherName");
   String attType = request.getParameter("attType");
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="css/public.css?15" rel="stylesheet" type="text/css" />
    <link href="css/rollcall.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery.js"></script>
     <script type="text/javascript" src="js/rollcall.js"></script>
     <script type="text/javascript" src="js/public.js"></script>
    <title>课堂点名</title>
</head>	

<body>
    <div class="rollcall-wrap">
        <div class="calendar-wrap">
            <div class="calendar">
                <div class="month"></div>
                <div class="date"></div>
                <div class="week"></div>
            </div>
            <div class="daytime">
                <p id="day"></p>
                <p id="time"></p>
            </div>
        </div>
        <div class="class-wrap">
          <p>请确认您要考勤的节次	：</p>
          <p style="float:left">节次：</p>
          <div class="class_order">
            <span>请选择节次</span>
            <div class="class_option">
                <ul>
                  <li>第一节</li>
                    <li>第二节</li>
                    <li>第三节</li>
                    <li>第四节</li>
                    <li>第五节</li>
                    <li>第六节</li>
                    <li>第七节</li>
                    <li>第八节</li>
                </ul>
            </div>
          </div>
         <div class="classinfo">
            <p>班级：15美术设计</p>
            <p>科目：素描</p>
            <p>任课教师：周强</p>
         </div>
            
        </div>
        <div class="btn">
            <p id="attmsg"></p>
            <button>开始考勤</button>
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
<input id="teacherid"  type="hidden" value="<%=teacherID %>"></input>
<input id="teachername" type="hidden" value="<%=teacherName %>">
<input id="attType"  type="hidden" value="<%=attType %>"></input>
</body>
</html>
