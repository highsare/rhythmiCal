<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<!-- charset -->
<meta charset="UTF-8">

<!-- viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- title -->
<title>Rhythmi-Cal</title>

<!-- Road Bootstrap CDN and jQuery-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

<!-- jQuery -->
<script src="resources/JavaScriptResource/jquery-3.2.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

<script>
<!-- infinitial scroll -->
var page = 1;
$(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      console.log(++page);
      /* $("#enters").append("<h1>Page " + page + "</h1><BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~"); */
      $("#enters").append('<tr><td class="id">John</td><td class="reply">john@example.com</td></tr>');
    }
});

<!-- jQuery -->
$(function() {
	<!-- signupMember -->
	$('#signupMember').click(function() {
		<!-- 아이디, 비밀번호, 비밀번호 체크 값을 가져온다. -->
		var signupId = $('#signupId').val();
		var signupPw = $('#signupPw').val();
		var signupPwc = $('#signupPwc').val();
		
		<!-- 유효성 검사 해야 함 -->
		
		<!-- test code -->
		alert('signupId: ' + signupId + '\n'
			+ 'signupPw: ' + signupPw + '\n'
			+ 'signupPwc: ' + signupPwc);
		
		$.ajax({
		    url: 'signupMember'
		    , type: 'POST'
		    , dataType:'json'
		    , data: {'id': signupId
		    			, 'pw': signupPw}
		    , success: function(data) {
		        alert(data);
		    }
		    , fail: function(data) {
		    		alert(data);
		    }
		});
	});
	
	<!-- loginMember -->
	$('#loginMember').click(function() {
		var loginId = $('#loginId').val();
		var loginPw = $('#loginPw').val();

		alert('loginId: ' + loginId + '\n'
			+ 'loginPw: ' + loginPw + '\n');
		
		$.ajax({
		    url: 'loginMember'
		    , type: 'POST'
		    , dataType:'json'
		    , data: {'id': loginId
		    			, 'pw': loginPw}
		    , success: function(data) {
		        alert(data);
		    }
		    , fail: function(data) {
		    		alert(data);
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
</style>
</head>
<body class="responsive center">
<!-- 앱 연동이 필요함을 안내 또는 앱 다운로드를 안내하는 이미지 필요 -->
<!-- Ajax를 통해 로그인 및 회원가입 구현해야 함. 로그인 시에는 유효성검사 필요. 아이디는 영문자만. 회원가입 시 패스워드는 두 번. 일치여부 체크. -->
<!-- Ajax를 통해 DB에서 명예의전당 글 불러와야 함. -->
<!-- Modal 모양을 게임과 어울리게 레트로로 해야 함. -->
<!-- 시작화면에 BGM 깔아야 함. 게임과 잘 어울리는 핵심 BGM이어야 함. -->


<div class="center">
	<img src="resources/Images/mainPage/maplestory.png" style="width: 90%" class="center"><br>
</div>

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
					<p><input type="text" placeholder="PW" id="signupPw" name="signupPw"></p>
					<p><input type="text" placeholder="PW check" id="signupPwc" name="signupPwc"></p>
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
					<p><input type="text" placeholder="PW" id="loginPw" name="loginPw"></p>
					<p><button type="button" class="btn btn-default" data-dismiss="modal" id="loginMember">Load Game</button></p>
				</div>
			</div>
		</div>
	</div>
</div>

<br><br><br><br><br><br>

<div class="center">
  <table>
      <tr>
        <td class="id">김민아</td>
        <td class="reply">나 다깼음</td>
      </tr>
      <tr>
        <td class="id">김지원</td>
        <td class="reply">개쉬운데?</td>
      </tr>
      <tr>
        <td class="id">이진주</td>
        <td class="reply">님들 제가 1빠</td>
      </tr>
  </table>
  <div id="enters"></div>
</div>

</body>
</html>
