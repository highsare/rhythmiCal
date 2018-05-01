<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!-- 게임 Phaser JS가 호출됨 -->
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="resources/JavaScriptResource/phaser-2.10.2.js"></script>
<script type="text/javascript" src="resources/JavaScriptResource/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="resources/JavaScriptResource/typewriter.js"></script>
<style type="text/css">
body{
	background-image: url("resources/Images/mainPage/image_background.gif");	
	background-size: cover;
}
#RhythmiCal {
	position: absolute;
	margin: auto;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 1600px;
	height: 900px;
	border-radius: 3px;
}
</style>
</head>
<body>
<!-- js files here -->
<script type="text/javascript" src="resources/Phaser/State.js"></script>
<script type="text/javascript" src="resources/Phaser/Preload.js"></script>
<script type="text/javascript" src="resources/Phaser/Intro.js"></script>
<script type="text/javascript" src="resources/Phaser/Story.js"></script>
<script type="text/javascript" src="resources/Phaser/Tutorial.js"></script>
<script type="text/javascript" src="resources/Phaser/Village.js"></script>

<script type="text/javascript" src="resources/Phaser/stage/monsters.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/monsterSkill.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/notes.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/beatoven.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/boss.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/townPeople.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/motionAndBeat.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/stageResult.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/Stage.js"></script>

<script type="text/javascript" src="resources/Phaser/Ending.js"></script>
<script type="text/javascript">
	var game = new Phaser.Game(1600, 900, Phaser.CANVAS, 'RhythmiCal', "game");
	
	game.state.add("Preload", Preload);
	game.state.add("Intro", Intro);
	game.state.add("Tutorial", Tutorial);
	game.state.add("Village", Village);
	game.state.add("Story", Story);
	game.state.add("Stage", Stage);
	game.state.add("Ending", Ending);
	
	game.state.start("Stage");
	//game.state.start("Intro");
	//game.state.start("Tutorial");
	//game.state.start("Village");
	//game.state.start("Story");
	//game.state.start("Stage");
	//game.state.start("Ending");
</script>

<div id= "RhythmiCal"></div>
</body>
</html>