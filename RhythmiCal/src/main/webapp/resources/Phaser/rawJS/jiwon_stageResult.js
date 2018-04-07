//create game
var game = new Phaser.Game(1024, 576, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });


//preload
function preload() {
   game.load.spritesheet('msgclear', 'resources/jiwon_stageResult/clear.png', 32, 32, 5);
   game.load.spritesheet('msgfail', 'resources/jiwon_stageResult/fail.png', 32, 32, 4);
}


//비트에 따른 반복을 담을 변수
var timeloop;


//현재비트를 담을 변수
var currentBeat = 0;


function create() {
	
	//게임물리 아케이드로 적용
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//비트에 따른 반복적 함수 호출
	timeloop = game.time.events.loop(Phaser.Timer.SECOND, monsterAttackStart, this);
}


//스테이지 결과 표시하기
function stageResult(result){
	
	
	//스테이지 클리어 또는 실패 시 결과 안내 이미지를 위한 변수
	var item;
	var tween;
	
	
	if (result) {
		
		
		//스테이지결과 안내 생성
		for (var i = 0; i < 5; i++) {

			
			//글자 하나를 선택
			item = game.add.sprite(190 + 80 * i, -50, 'msgclear', i);
			
			//글자 크기를 조절
			item.scale.set(4);
			
			//안티앨리어싱 제거
			item.smoothed = false;
			
			//글자 앵커
			item.anchor.setTo(0.5, 0.5);
			
			//글자에 움직임 부여
			tween = game.add.tween(item).to( { y: 245 }, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i);
			
		}
	} else {
		
		
		//스테이지결과 안내 생성
		for (var i = 0; i < 4; i++) {

			
			//글자 하나를 선택
			item = game.add.sprite(190 + 80 * i, -50, 'msgfail', i);
			
			//글자 크기를 조절
			item.scale.set(4);
			
			//안티앨리어싱 제거
			item.smoothed = false;
			
			//글자 앵커
			item.anchor.setTo(0.5, 0.5);
			
			//글자에 움직임 부여
			tween = game.add.tween(item).to( { y: 245 }, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i);
			
		}
	}
	
	
	//시간 반복을 멈춘다.
	game.time.events.remove(timeloop);
}