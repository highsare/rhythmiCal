<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html>
<head>
<!-- charset -->
<meta charset="UTF-8">
<!-- viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- title -->
<title>Rhythmi-Cal</title>
<!-- Road Bootstrap CDN and jQuery-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
<!-- jQuery -->
<script src="resources/JavaScriptResource/jquery-3.2.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
<script>
// 오늘의 날짜를 구하는 함수 (명예의 전당에서 NEW를 띄우기 위해 사용)
function today() {
	var date = new Date();

	var year  = date.getFullYear();
	var month = date.getMonth() + 1; // 0부터 시작하므로 1 더함
	var day   = date.getDate();
	
	if (("" + month).length == 1) { month = "0" + month; }
	if (("" + day).length   == 1) { day   = "0" + day;   }
   
	return "" + year + "-" + month + "-" + day;  
}

// 명예의 전당 글 출력하기 (무한스크롤 적용)
var cnt = 0;
var page = -1;
var today = today();
$(document).ready(function() {
	$(document).scroll(function() {
		console.log('document: ' + $(document).height() + '\n'
					+ 'scroll: ' + $(window).scrollTop() + '\n'
					+ 'window: ' + $(window).height());
		
		var maxHeight = $(document).height();
		var currentScroll = $(window).scrollTop() + $(window).height();
		
		if (maxHeight <= currentScroll) {
			page++; // 페이지 증가
			$.ajax({
				url: 'readFamePost'
				, data: {offset: page}
				, success: function(famePostList) {
					$.each(famePostList, function() {
						if (today == this.clearDate.substring(0, 10)) {
							$("#enters").append('<tr><td class="new"><span class="badge badge-warning">NEW</span></td><td class="id">' + this.id + '</td><td class="reply">' + this.text + '</td></tr>'); //this.id = value.id
						}
						else {
							$("#enters").append('<tr><td class="new"></td><td class="id">' + this.id + '</td><td class="reply">' + this.text + '</td></tr>'); //this.id = value.id
						}
					});
				}
				, error: function() {
					
				}
			})
	    }
	})
});

$(function() {
	// 회원가입 (NEW 버튼 클릭 시)
	$('#signupMember').click(function() {
		var signupId = $('#signupId').val();
		var signupPw = $('#signupPw').val();
		var signupPwc = $('#signupPwc').val();
		
		// 아이디 유효성 검사 (영문만 사용 가능)
		var pattern1 = /(^[a-zA-Z])/;
		if(!pattern1.test(signupId)){
			alert('아이디는 영문만 사용할 수 있어!');
		    return false;
		}
		// 비밀번호 유효성 검사 (같은지 확인)
		if (signupPw != signupPwc) {
			alert('비밀번호를 다시 한 번 확인해봐!');
			return false;
		}
		$.ajax({
		    url: 'signupMember'
		    , type: 'POST'
		    , dataType:'json'
		    , data: {'id': signupId
		    		,'password': signupPw}
		    , success: function(data) {
		        if (data == 0) {
		        	alert("회원가입 실패! \n[이미 존재하는 아이디]");
				}else{
					alert("가입성공");
				}
		    }
<<<<<<< HEAD

		    , error: function() { alert("signupMember error");} //alerttest
=======
>>>>>>> ace473e023a6e3153a87a5a1eb3bcfefad80f22e

		});
	});
	
	// 로그인 (LOAD 버튼 클릭 시)
	$('#loginMember').click(function() {
		var loginId = $('#loginId').val();
		var loginPw = $('#loginPw').val();
		var language = $('input[name="language"]:checked').val();
		
		$.ajax({
		    url: 'loginMember'
		    , type: 'POST'
		    , data: {'id': loginId
		    		,'password': loginPw
		    		,'language': language}
		    , success: function(result) { // 성공하면 game으로 이동
		    	if (result != "loginFail") {
		    		document.location.href = 'game';					
				}else{
					alert("로그인에 실패했어...");
				}
		    }
		    , error: function(result) { // 실패하면 알림
		    }
		});
	});
});
</script>

<!-- CSS -->
<style>
/* 반응형을 위한 responsive class */
.responsive {
	-webkit-background-size: cover;
 	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}
/* body class */
body {
	background-image: url("resources/Images/mainPage/image_background.gif");
	background-repeat: no-repeat;
	background-attachment: fixed;
	padding-right: 0 !important;
}
/* 중앙에 위치시킬 center class */
.center {
	display: table;
	margin-left: auto;
	margin-right: auto;
}
/* 회원가입 및 로그인 역할을 하는 modal class */
.modal-open {
    overflow: scroll;
}
@media (min-width: 768px) {
	.modal-dialog {
	  width: 300px;
	  text-align: center;
	  /* margin: 30px auto; */
	}
	.modal-content {
	  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
	          box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
	}
	.modal-sm {
	  width: 300px;
	}
	.modal-body {
	  /* background-image: url(resources/honor_reply.png); */
	}
}
/* 명예의 전당 table */
td {
	opacity: 0.9;
	height: 82px;
	text-align: center;
	vertical-align: middle;
}
.new {
	width: 40px;
}
.id {
	width: 187px;
	background-size: contain;
	background-image: url(resources/Images/mainPage/honor_id.png);
	background-repeat: no-repeat;
	font-weight: bold;
}
.reply {
	width: 630px;
	background-size: contain;
	background-image: url(resources/Images/mainPage/honor_reply.png);
	background-repeat: no-repeat;
}
.bgm {
	visibility: hidden;
}
</style>
</head>
<body class="responsive center">
<!-- 앱 연동이 필요함을 안내 또는 앱 다운로드를 안내하는 이미지 필요 -->
<!-- Ajax를 통해 로그인 및 회원가입 구현해야 함. 로그인 시에는 유효성검사 필요. 아이디는 영문자만. 회원가입 시 패스워드는 두 번. 일치여부 체크. -->
<!-- Ajax를 통해 DB에서 명예의전당 글 불러와야 함. -->
<!-- Modal 모양을 게임과 어울리게 레트로로 해야 함. -->


<!-- Main Logo -->
<div class="center">
	<img src="resources/Images/mainPage/rhythmical.png" style="width: 100%" class="center"><br>
</div>

<!-- Background Music -->
<embed class="bgm" src="resources/Audios/bgm/jsp/bgm_home.mp3" autostart="true" height="0" loop="true"></embed>

<div class="center">
	<!-- Game Button -->
	<input type="image" class="center" src="resources/Images/mainPage/button_new.png" style="width: 50%;" data-toggle="modal" data-target="#myModal1">
	<input type="image" class="center" src="resources/Images/mainPage/button_load.png" style="width: 50%;" data-toggle="modal" data-target="#myModal2">
	
	<!-- Signup Modal -->
	<div class="modal fade" id="myModal1" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Signup</h4>
					<p>Please input your new id and pw.</p>
					<p><input type="text" placeholder="ID" id="signupId" name="signupId"></p>
					<p><input type="password" placeholder="PW" id="signupPw" name="signupPw"></p>
					<p><input type="password" placeholder="PW check" id="signupPwc" name="signupPwc"></p>
					<p><button type="button" class="btn btn-default" data-dismiss="modal" id="signupMember">New Game</button></p>
				</div>
			</div>
		</div>
	</div>

	<!-- Login Modal -->	
	<div class="modal fade" id="myModal2" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Login</h4>
					<p>Please input your id and pw.</p>
					<p><input type="text" placeholder="ID" id="loginId" name="loginId"></p>
					<p><input type="password" placeholder="PW" id="loginPw" name="loginPw"></p>
					<div class="radio">
						<label><input type="radio" name="language" value="KOREAN">Korean </label>
						<label><input type="radio" name="language" value="JAPANESE">Japanese</label></div>
					<p><button type="button" class="btn btn-default" data-dismiss="modal" id="loginMember">Load Game</button></p>
				</div>
			</div>
		</div>
	</div>
</div>

<br><br><br><br><br><br>

<!-- 명예의 전당 글을 출력하는 테이블 -->
<div class="center">
  <table>
  	  <tr>
  	  	<td class="new">
  	  	<td class="id" style="background-image: url(resources/Images/mainPage/honor_id_title.png); color: white; font-size: 20px;">WINNER</td>
  	  	<td class="reply" style="background-image: url(resources/Images/mainPage/honor_reply_title.png); color: white; font-size: 20px;"><b>HALL OF FAME</b></td>
  	  </tr>
      <tr>
        <td class="new"><span class="badge badge-warning">NEW</span></td>
        <td class="id">김민아</td>
        <td class="reply">나 다깼음</td>
      </tr>
      <tr>
        <td class="new"><span class="badge badge-warning">NEW</span></td>
        <td class="id">김지원</td>
        <td class="reply">개쉬운데?</td>
      </tr>
      <tr>
        <td class="new"><span class="badge badge-warning">NEW</span></td>
        <td class="id">이진주</td>
        <td class="reply">님들 제가 1빠</td>
      </tr>
  </table>
  <div id="enters"></div>
</div>
</body>
</html>
