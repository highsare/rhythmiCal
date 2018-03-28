<!DOCTYPE html>
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

<!-- Bootstrap CDN -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"><!-- 합쳐지고 최소화된 최신 CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"><!-- 부가적인 테마 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script><!-- 합쳐지고 최소화된 최신 자바스크립트 -->

<!-- infinitial scroll -->
<script>
var page = 1;

$(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      console.log(++page);
      /* $("#enters").append("<h1>Page " + page + "</h1><BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~<BR/>So<BR/>MANY<BR/>BRS<BR/>YEAHHH~"); */
      $("#enters").append('<tr><td class="id">John</td><td class="reply">john@example.com</td></tr>');
    }
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
	background-image: url("resources/image_background.gif");
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
	  margin: 30px auto;
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
	background-image: url(resources/honor_id.png);
	background-repeat: no-repeat;
	font-weight: bold;
}
.reply {
	width: 630px;
	background-size: contain;
	background-image: url(resources/honor_reply.png);
	background-repeat: no-repeat;
}
</style>
</head>
<body class="responsive center">

<div class="center">
	<img src="resources/maplestory.png" style="width: 90%" class="center"><br>
</div>

<div class="center">
	<!-- Game Button -->
	<input type="image" class="center" src="resources/button_new.png" style="width: 50%;" data-toggle="modal" data-target="#myModal">
	<input type="image" class="center" src="resources/button_load.png" style="width: 50%;" data-toggle="modal" data-target="#myModal">
	
	<!-- Modal -->
	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">
		
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Account</h4>
				</div>
				<div class="modal-body">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Account</h4>
					<p>Some text in the modal.</p>
					<p><input type="text" placeholder="ID"></p>
					<p><input type="text" placeholder="PW"></p>
					<p><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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