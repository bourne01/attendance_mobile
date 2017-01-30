<%@ page language="java" import="java.util.*,com.kud.cb.entity.User" pageEncoding="utf-8"%>
<%
	String name=null;
	String no=null;
	String pass=null;
	String teacherid=null;
	User user = (User)session.getAttribute("user"); 		//从session中获取用户登录信息
	Date d=new Date();//取服务器当前时间
	if(user!=null)
	{ 
		teacherid=String.valueOf(user.getTeacherId());
		name=user.getUserName();
		no=user.getNo();
		pass=user.getPassword();
	}
	else
	{
		response.sendRedirect("login.html");
	    //out.write("<html><head></head><body>");
		//out.write("<h5><font color=red>您还没有登录呢，请先登录再考勤！</font></h5>");
		//out.write("<p><a href='login.jsp'>单击登录</a></p>");
		//out.write("</body></html>");
		//out.close();
	}
%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="css/public.css?15" rel="stylesheet" type="text/css" />
    <link href="css/postlogin.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/postlogin.js"></script>
    <script type="text/javascript" src="js/public.js"></script>
    <title>课堂点名</title>
</head>

<body>
<div class="postlogin-wrap">
        <div class="logo">
            <img src="img/logo0.png" />
        </div>
          <div class="user-profile">
                    <img src="img/profile.png" />
                </div>
          <p class="greeting">
                    欢迎您：<%=name %>老师
                </p>
          <p class="btn">
          <button>课堂考勤管理平台</button>
          </p>
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
 <input id="teacherid"  type="hidden" value="<%=teacherid %>"></input>
 <input id="teachername"  type="hidden" value="<%=name %>"></input>
</body>
</html>
