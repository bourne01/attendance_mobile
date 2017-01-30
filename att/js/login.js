// This Script for logining to attendance system
$(function(){
	
	 var clickNum = 0;
	 $('.remember span').click(function(){
		 clickNum++;
		 if(clickNum == 1){//The odd time is checked
		 	$("#auto_login").attr("checked",true);}
		 else{//The even time is unchecked			
			$("#auto_login").attr("checked",false);
			clickNum = 0;
			}
		 $(this).toggleClass('on-select');
      });
	//Get Username and Password from Cookie
	if($.cookie("userInfo") == "true"){//check to see if the cookie is set,the value 'true' means set		
		$("#username").val($.cookie("username"));
		$("#password").val($.cookie("password"));
		$("#auto_login").attr("checked",true);//Set the flag of checked
		$(".remember span").toggleClass('on-select');//checked in order to log on automatically
		}
	//Save Username and Password into Cookie
	function setCookie(){
		//check if automatic login checkbox is checked
		if($("#auto_login").attr("checked") == "checked"){
			$.cookie("userInfo","true",{expires:7});
			$.cookie("username",$("#username").val(),{expires:7});//expires after 7 days
			$.cookie("password",$("#password").val(),{expires:7});
			}
		else{//Set Cookies Outdated
			$.cookie("checked","false",{expires:-1});
			$.cookie("username","",{expires:-1});
			$.cookie("password","",{expires:-1});
			}
		}
	$("#auto_login").click(function(){
		setCookie();//Save Cookie
		});
	$("#login").click(function(){
		setCookie();
		$("#login_msg").html = "";//Intialize the login message
		$.getJSON("../../../login/login!login.action?&random="+Math.random(),{
			"no":$("#username").val().toString(),
			"password":$("#password").val().toString(),
			"operation":"1"
		},function(data,textStatus){
			if(textStatus=="success"){
				var msg=data.success;
				var alertmessag="登录错误:"+data.errorMessage;
				if(msg==false)
					{
						var textHtml=alertmessag;
						$("#errormsg").html("用户名或密码错误！");
					}else
					{
						setCookie();
						var txtHtml="登录成功，正在跳转到考勤页面!";
						$("#login_msg").html(txtHtml);
						var browser = navigator.userAgent;
						//Check the type of browser
						if(browser.indexOf("Chrome")!=-1||browser.indexOf("Firefox")!=-1||browser.indexOf("Android")!=-1||browser.indexOf("Mobile")!=-1)
							setTimeout("location.href='/creditBank/attence/zs/att/postlogin.jsp';", 500); 
						else
							setTimeout("location.href='/creditBank/attence/zs/att/postlogin.jsp';", 500); 
					}
			}
		});
		})
	})
	