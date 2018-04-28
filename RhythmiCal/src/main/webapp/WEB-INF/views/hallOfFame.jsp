<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- Road Bootstrap CDN and jQuery-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<title>명예의 전당</title>
<style>
body {
background-image: url("resources/Images/hallOfFame/hallOfFame_background.png");
background-attachment: fixed;
background-repeat: no-repeat;
background-size: cover;
-o-background-size: cover;
-moz-background-size: cover;
-webkit-background-size: cover;
}
.div_background {
}
.form_fame {
	width: 540px;
	left: 50%;
	margin-left: -270px;
	position: absolute;
	height: 100px;
	top: 60%;
	margin-top: -50px;
}
.form_content {
	width: 540px;
}
.center {
	display: table;
	margin-left: auto;
	margin-right: auto;
}
</style>
<script>
$(function() {
	$('#write').click(function() {
		var text = $('#text').val();
		$.ajax({
			url: 'writeFamePost'
			, type: 'post'
			, data: {text: text}
			, success: function(result) {alert(result);}
			, error: function(result) {alert(result);}
		});	
	});
});
</script>
</head>
<body>
<form class="form_fame">
	<h1 class="center" style="color: white;">HALL OF FAME</h1>
	<div class="alert alert-warning"><strong>리드미: 축하한다 비토벤! 너의 승리를 기념하기 위해 명예의 발자국을 남기자구!</strong></div>
	<div class="form-group"><textarea class="form-control" id="text"></textarea></div>
	<button type="submit" class="btn btn-secondary center" id="write">WRITE</button>
</form>
</body>
</html>