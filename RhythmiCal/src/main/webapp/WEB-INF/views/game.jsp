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
</head>
<body>

<script type="text/javascript" src="resources/Phaser/rawJS/typewriter.js"></script>
<script type="text/javascript" src="resources/Phaser/rawJS/Rho_story.js"></script>
<<script type="text/javascript" src="resources/Phaser/stage/monsters.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/notes.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/beatoven.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/motionAndBeat.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/stageResult.js"></script>
<script type="text/javascript" src="resources/Phaser/stage/Stage.js"></script>

<script type="text/javascript">
	//var game = new Phaser.Game(1600,900, Phaser.CANVAS, 'RhythmiCal', {preload: preload, create: create, render: render, update: update});
	var game = new Phaser.Game(1600,900, Phaser.CANVAS, 'RhythmiCal', "game");
	
	//game.state.add("Intro",Intro);
	//game.state.add("preload",preload);
	//game.state.add("Tutorial",Tutorial);
	//game.state.add("Village",Village);
	game.state.add("story",Rho_story);
	game.state.add("stage",Stage);
	//game.state.add("Ending",Ending);
	
	game.state.start("stage");
</script>

</body>
</html>