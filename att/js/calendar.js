// JavaScript Document
	//获取农历月份
	function getLunarMonth(){
			var lunarMonth = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
			var dt = new Date();
			var month = dt.getMonth();
			return lunarMonth[month];
		}
	//获取日期	
	function _getDate(){
			var dt = new Date();
			var date = dt.getDate();
			return date;
		}
	//获取时间	
	function _getTime(){
			var dt = new Date();
			var time = dt.getHours()+":"+dt.getMinutes();
			return time;
		}
	//获取星期
	function _getDay(){
			var lunarDay = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
			var dt = new Date();
			var day = dt.getDay();
			return lunarDay[day];
		}
	$(document).ready(function() {
        $(".month").text(getLunarMonth());    
        $(".date").text(_getDate());
        $(".week").text(_getDay());
		//获取教学周信息
		$.getJSON("credit/term!getCurWeek.action?random="+Math.random(),
		{"state":2},
		function(data,textStatus){
			if(textStatus=="success"){
				var msg=data.success;
				var alertmessag="教学周信息获取失败!";
				if(msg==false)
					{ 
						var textHtml=alertmessag;
						$("#day").html(textHtml);
					}else
					{
						var week=data.week;
						var weekday=data.weekday;
						var weekdayzw;
						switch(weekday)
						{
							case 1:weekdayzw="一";break;	
							case 2:weekdayzw="二";break;
							case 3:weekdayzw="三";break;
							case 4:weekdayzw="四";break;
							case 5:weekdayzw="五";break;
							case 6:weekdayzw="六";break;
							case 7:weekdayzw="日";break;
						}
						var txtHtml="今天是星期"+weekdayzw+"(本周是第"+week+"周)";
						$("#day").html(txtHtml);
					}
			}
			else{
				$("#day").html("<span style='color:red'>无法获取教学周信息！</span>");
				}
		})
		$("#time").text("现在时间是："+_getTime());
	});	