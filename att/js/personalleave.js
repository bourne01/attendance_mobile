$(function(){
	// 获取班级考勤数据
	var arrStuNo = [];//存储学生学号和座位号
	var arrPerDetail = [];//记录学生的请假明细
	var power;//当前用户权限,1为管理员,3为班主任
	var termID = $("#termid")[0].value;//学期编号
	var classID = $("#classid")[0].value;//班级编号
	$.ajaxSettings.async = false;//同步，等待getJSON数据加载完毕
	$.getJSON("../../../vleave!query.action?random="+Math.random(),{
			"F_Termid":termID,
			"F_ClassId":classID,
			"F_StartWeek":1,
			"F_EndWeek":25,
			"F_Status":1,
    		"start":0,
    		"limit":1000
		},function(data,textStatus){
			if(textStatus=="success"){
				var msg=data.success;
				if(!msg==true)
					{
						var txtHtml="查询失败！"
						alert(txtHtml);
						$("#loadingmsg").hide();
					}else
					{
						var leavelist=data.dataList;
						if(leavelist.length>0)
						{
							//成功收到查询数据列表
							//var total=data.total;//获取总记录数
							//dispaly(total,$("#pagesize")[0].value,$("#curpage")[0].value);//显示分页组件
							//var trlist="";
							for(var i=0;i<leavelist.length;i++)
							{
								var leave=leavelist[i];
								var leaveType="";
								var others = false;
								var stuNo = leave.F_StudentNo;//学生学号
								var stuName = leave.F_StudentName;//学生姓名 										
								if(arrPerDetail.indexOf(stuNo) == -1){//判断学生学号是否已经存在于数组中
										arrPerDetail.push(stuNo);//不存则添加学号入数组
									}
								positionWanted = arrPerDetail.indexOf(stuNo)+1;//跳过学号和名字元素索引，指向后一个元素
								//arrPerDetail.splice(positionWanted,0,leave.F_LeaveType);//记录请假类型，1为病假，2为事假，3为其它
								arrPerDetail.splice(positionWanted,0,leave.F_StartWeek);//请假开始周
								positionWanted++;
								arrPerDetail.splice(positionWanted,0,leave.F_EndWeek);//请假结束周
								positionWanted++;
								arrPerDetail.splice(positionWanted,0,leave.F_StartWeekDay);//请假开始日
								positionWanted++;
								arrPerDetail.splice(positionWanted,0,leave.F_EndWeekDay);//请假结束周日
								positionWanted++;
								arrPerDetail.splice(positionWanted,0,leave.F_StartSection);//请假开始节
								positionWanted++;
								arrPerDetail.splice(positionWanted,0,leave.F_EndSection);//请假结束节
								positionWanted++;
								arrPerDetail.splice(positionWanted,0,leave.F_AutoId);//请假结束节
								positionWanted++;
								switch(leave.F_LeaveType)//请假类型
								{
									case "1":
										leaveType="病假";
										break;
									case "2":
										leaveType="事假";
										break;
									case "3":
										leaveType="其它";
										break;
								}
								arrPerDetail.splice(positionWanted,0,leaveType);
							}
						}
					}
			}
		})
	$.ajaxSettings.async = true;//异步
	//个人请假明细
	var leaveBtn;
	var leaveId;//请假记录编号
	var stuNo =  $("#stuNo")[0].value;//被查看明细的学生学号
	var startWeek,endWeek,startWeekday,endWeekday,startSection,endSection,_leaveType;//请假开始星期，结束星期，开始日，结束日，开始课,结束课，请假类型
	var stuNoPosition = arrPerDetail.indexOf(stuNo);
	if(stuNoPosition == -1){//无未处理考勤记录
		perDetaiHTML = '<div class="attendance">该生当前无未处理考勤记录</div>';
		$("#personal_att").append(perDetaiHTML);
		}
	else{
		var start,end;	
		start = stuNoPosition + 1;//跳过学号
		for(i=start;i<=arrPerDetail.length;i++){
			if ((i == arrPerDetail.length)||(parseInt(arrPerDetail[i]) > 10000 )){//判断是否学号或者已经是最后一元素
				end = i - 1;
				break;
				}
			}
		var arrWeek = ["星期一","星期二","星期三","星期四","星期五","星期六","星期天"];
		//个人明细条数T,数字8为每条明细占用多少个数据空间
		var T = ((end - start + 1)/8); 
		for(i=0;i<T;i++){
			startWeek = arrPerDetail[start+8*i];
			endWeek = arrPerDetail[start+8*i+1];
			startWeekday = parseInt(arrPerDetail[start+8*i+2]);
			endWeekday = parseInt(arrPerDetail[start+8*i+3]);
			startSection = arrPerDetail[start+8*i+4];
			endSection = arrPerDetail[start+8*i+5];
			leaveId = arrPerDetail[start+8*i+6];
			_leaveType = arrPerDetail[start+8*i+7];//请假类型		
			leaveBtn = '</div><div class="btn-wrap" id="delete"  leaveid='+leaveId+'><button class="undone">删除</button></div></div>';				
			perDetaiHTML = '<div class="attendance"><div class="att-text">从第' + startWeek + "周" + arrWeek[startWeekday-1] + "第" + startSection + "节到第" + endWeek +"周" + arrWeek[endWeekday-1] + "第" + endSection + "节 " + _leaveType + leaveBtn;	
			$("#personal_att").append(perDetaiHTML);
		}	
			
	}
	//删除请假记录
	$("[id=delete]").each(function(){
	 //$("#delete").click(function(){
		 $(this).click(function(){
			var alautoid=$(this).attr("leaveid");//选中的记录id
			if(confirm("确定要删除这条记录吗？")){
				$.getJSON("../../../leave!del.action?random="+Math.random(),{
				"autoId":alautoid
			},function(data,textStatus){
				if(textStatus=="success"){
					var msg=data.success;
					if(msg==false)
						{
							alert("删除请假记录时出错了!\n"+data.message);
						}else
						{
							alert("请假记录已经删除了!\n");
							//刷新
							history.go(0);
						}
				}
			});
			}
		 })
		});	
})