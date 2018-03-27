<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<!-- charset -->
<meta charset="UTF-8">
<!-- title -->
<title>Rhythmi-Cal</title>
<!-- Bootstrap CDN -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"><!-- 합쳐지고 최소화된 최신 CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"><!-- 부가적인 테마 -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script><!-- 합쳐지고 최소화된 최신 자바스크립트 -->
<!-- CSS -->
<style>
body {
	background-image: url("resources/background_home.jpg");
	background-repeat: no-repeat;
	background-attachment: fixed;
	-webkit-background-size: cover;
 	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}
.center {
	display: table;
	margin-left: auto;
	margin-right: auto;
	-webkit-background-size: cover;
 	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover; 
}
</style>
</head>
<body>
<div class="center">
	<img src="resources/maplestory.png" style="width: 70%" class="center"><br>
</div>

<div class="center">
	<button type="button" class="btn btn-warning btn-lg">NEW GAME</button>
	<button type="button" class="btn btn-warning btn-lg">LOAD GAME</button>
</div>

<br><br><br><br><br><br>

<div class="center">
	<div class="container">
	  <table class="table">
	      <tr>
	        <td><div class="jumbotron">John</div></td>
	        <td><div class="jumbotron">john@example.com</div></td>
	      </tr>
	      <tr>
	        <td><div class="jumbotron">Mary</div></td>
	        <td><div class="jumbotron">mary@example.com</div></td>
	      </tr>
	      <tr>
	        <td><div class="jumbotron">July</div></td>
	        <td><div class="jumbotron">july@example.com</div></td>
	      </tr>
	  </table>
	</div>
</div>
	

</body>
</html>