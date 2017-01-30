<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String stuName = request.getParameter("stuName");
	String stuGender = request.getParameter("stuGender");
	String className = request.getParameter("className");
	String curWeek = request.getParameter("week");
	String classID = request.getParameter("classID");
	String studentID = request.getParameter("studentID");
	String termID = request.getParameter("termID");
	String headTeacherID = request.getParameter("headTeacherID");
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="css/public.css?15" rel="stylesheet" type="text/css" />
    <link href="css/leavemange.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/leavemanage.js"></script>
    <script type="text/javascript" src="js/public.js"></script>
    <title>请假管理</title>
</head>	

<body>
<div class="leaveinfo-wrap">
    <div class="studentinfo-wrap">
        <img src="img/stu_img.png" />
        <div class="studentinfo">
         	<div class="stu_name"><%=stuName %></div>
            <div class="stu_addr"><%=stuGender %></div> 
            <div class="stu_tel"><%=className %></div>    
        </div>
	</div>
     <div class="leave_type">
    	<div class="leave"><span></span>病假</div>
        <div class="leave"><span></span>事假</div>
        <div class="leave"><span></span>其它</div>
    </div>
    <div class="leave_time">    	
    	<p>请假开始时间：</p>
        <div class="start_time">
        	<div id ="sweek" class="sweek">
            	<span id="s_leave_week">第二周</span>
                <div class="sweek_option">
                    <ul>                    
                    </ul>
                </div>
            </div>
       		<div class="sday">
       			<span id="s_leave_day">星期二</span>
        		<div class="sday_option">
        		<ul>
                    <li>星期一</li>
                    <li>星期二</li>
                    <li>星期三</li>
                    <li>星期四</li>
                    <li>星期五</li>
                    <li>星期六</li>
                    <li>星期日</li>
           		 </ul>
        		</div>
       		</div>
      		<div class="sclass">
      		<span id="s_leave_class">第二节</span>
        		<div class="sclass_option">
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
        </div>        
        <p id="p_endtime">请假结束时间：</p>
        <div class="end_time">
        	<div id ="eweek" class="eweek">
            	<span id="e_leave_week">第二周</span>
                <div class="eweek_option">
                    <ul>                        
                    </ul>
                </div>
            </div>
       		<div class="eday">
       			<span id="e_leave_day">星期二</span>
       	 		<div class="eday_option">
        		<ul>
                    <li>星期一</li>
                    <li>星期二</li>
                    <li>星期三</li>
                    <li>星期四</li>
                    <li>星期五</li>
                    <li>星期六</li>
                    <li>星期日</li>
            	</ul>
        		</div>
      	 	</div>
      		<div class="eclass">
                <span id="e_leave_class">第二节</span>
                <div class="eclass_option">
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
    	</div>
    </div>
    <div class="leave_reason" id="leave_reason">
    	<!--<input placeholder="">-->
        <textarea id="leave_content" placeholder="请输入请假原因"></textarea>
    </div>
    <div class="btn">
    	<button id="save" class="save">保存</button>
        <button id="cancel" class="cancel">取消</button>
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
<input type="hidden" id="curweek" value="<%=curWeek %>" />
<input type="hidden" id="studentid" value="<%=studentID %>" />
<input type="hidden" id="classid" value="<%=classID %>" />
<input type="hidden" id="termid" value="<%=termID %>" />
<input id="headteacherid"  type="hidden" value="<%=headTeacherID %>" />
</body>
</html>
