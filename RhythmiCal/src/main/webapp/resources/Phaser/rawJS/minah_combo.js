/*
 * uploader: 김민아
 * upload date: 2018. 4. 5. 목
 */

var game = new Phaser.Game(1024, 576, Phaser.CANVAS, 'phaser-example', {preload: preload, create: create, render: render, update: update});

function preload() {
	//  콤보 효과음 로드
	game.load.audio('comboSound', 'resources/phaser/sounds_collect_coin.mp3');
	
	//  숫자(0~9) 스프라이트
	game.load.spritesheet('number0', 'resources/phaser/number_0.png', 32, 32, 20);
	game.load.spritesheet('number1', 'resources/phaser/number_1.png', 32, 32, 20);
	game.load.spritesheet('number2', 'resources/phaser/number_2.png', 32, 32, 20);
	game.load.spritesheet('number3', 'resources/phaser/number_3.png', 32, 32, 20);
	game.load.spritesheet('number4', 'resources/phaser/number_4.png', 32, 32, 20);
	game.load.spritesheet('number5', 'resources/phaser/number_5.png', 32, 32, 20);
	game.load.spritesheet('number6', 'resources/phaser/number_6.png', 32, 32, 20);
	game.load.spritesheet('number7', 'resources/phaser/number_7.png', 32, 32, 20);
	game.load.spritesheet('number8', 'resources/phaser/number_8.png', 32, 32, 20);
	game.load.spritesheet('number9', 'resources/phaser/number_9.png', 32, 32, 20);
	
	//  생명력 이미지
	game.load.image('life', 'resources/phaser/trebleclef.png');
}

var text = 0;
var explosions;
var bmpText;
function create() {
	//  배경색
    game.stage.backgroundColor = '#6688ee';
    
	//  1초마다 움직이는 루프
    game.time.events.loop(Phaser.Timer.SECOND, updateCurrentTime, this);
    
    //  텍스트
    text = game.add.text(game.world.centerX, game.world.centerY, 'Combo: 0', { font: "64px Arial", fill: "#ffffff", align: "center" });
    text.anchor.setTo(0.5, 0.5);
    text.inputEnabled = true;
    text.events.onInputDown.add(down, this); // TODO : 현재는 onInputDown으로(마우스로 클릭했을 시) 공격을 받았으나 이후 모션 인식으로 변경해야 함

    //  콤보 효과음 설정
    comboSound = game.add.audio('comboSound');
    comboSound.addMarker('comboSound', 0, 1);
}

/*
 * updateCurrentTime(): currentTime을 업데이트 해주는 메서드.
 * 이 메서드가 실행될 때마다 currentTime에 현재 시간(game.time.now)이 반환됨
 */
var currentTime;
function updateCurrentTime() {
	currentTime = game.time.now;
	console.log(currentTime); // console
}

/*
 * down(item): text를 마우스로 클릭했을 때 실행되는 메서드
 * 클릭한 시간을 파라메터로 가져가서 popupCombo()를 실행시킨다.
 */
function down(item) {
	popupCombo(game.time.now);
}

/*
 * popupCombo(): 콤보 숫자를 나타내는 메서드
 *
 * int clickTime: 클릭 시간(game.time.now)
 */
var counter = 0;
var previousTime;
function popupCombo(clickTime) {
	console.log('counter: ' + counter);
	
	//첫 공격에 시간 저장
	if (counter == 0) {
		previousTime = game.time.now;
		counter++;
		console.log('첫 공격_previousTime: ' + previousTime);
		return;
	}
	
	//콤보 성공 시
	if (clickTime <= currentTime + 500 && clickTime <= previousTime + 1500) { //combo 조건
		//텍스트 변경
		text.setText('Combo: ' + counter);
		
		//콤보가 20의 배수일 경우에는 생명력을 1 증가 (임시로 5를 주었음) // TODO
		if (counter % 5 == 0) {
			life++;
		}
		
	    //숫자 애니메이션 실행
	    		//카운터를 1 감소시키고(2번째 공격부터 콤보을 적용해야 하므로), 세 자리로 나누어 각 자리의 수를 구한다.
	    		var firstNum = parseInt(counter.toString().charAt(0));
	    		var secondNum = parseInt(counter.toString().charAt(1));
	    		var thirdNum = parseInt(counter.toString().charAt(2));
	    		
	    		var number;
	    		var popup;
	    		//한 자리일때
	    		if (isNaN(firstNum) == false && isNaN(secondNum) == true && isNaN(thirdNum) == true) {
	    			popupImage(512, 400, 'number' + firstNum, 30, false);
	    		}
	    		//두 자리일때
	    		else if (isNaN(firstNum) == false && isNaN(secondNum) == false && isNaN(thirdNum) == true) {
	    			popupImage(502, 400, 'number' + firstNum, 30, false);
	    			popupImage(522, 400, 'number' + secondNum, 30, false);
	    		}
	    		//세 자리일때
	    		else if (isNaN(firstNum) == false && isNaN(secondNum) == false && isNaN(thirdNum) == false) {
	    			popupImage(492, 400, 'number' + firstNum, 30, false);
	    			popupImage(512, 400, 'number' + secondNum, 30, false);
	    			popupImage(532, 400, 'number' + thridNum, 30, false);
	    		}
	    	
	    	//카운터를 1 증가시키고, 현재 클릭한 값을 이전 클릭 값이 되도록 함
    		counter++;
    		previousTime = clickTime;
    		
	    //콤보 효과음 실행
	    comboSound.play('comboSound');
	}
	//콤보 실패 시
	else {
		console.log('combo failure');
		counter = 0;
		text.setText('Combo Failure');
	}
}

/* 
 * popupImage(): 이미지를 팝업하는 메서드
 * 
 * int x: x축의 좌표
 * int y: y축의 좌표
 * String imageName: preload()에서 설정한 이미지명
 * int fps: 초당 호출할 프레임 수
 * boolean loop: 반복여부
 */
var image;
function popupImage(x, y, imageName, fps, loop) {
	console.log('popupImage');

	image = game.add.sprite(x, y, imageName);
	image.animations.add('popup');
	image.animations.play('popup', fps, loop);
}

function render() {
    game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);
}

/*
 * addLife(): 생명력을 증가시키는 함수. 생명력을 나타내는 변수 life는 콤보가 (카운터 % 20 == 0)일 때 1 증가하도록 되어있음 
 */
var life = 3; //생명력. DB에서 불러와야 하는 값이며, 현재 임의로 상수를 주었다. // TODO
function addLife() {
	for (var f = 1; f <= life; f++) {
		var image = game.add.image(f * 30, 30, 'life');
	}
}

function update() {
	addLife();
}