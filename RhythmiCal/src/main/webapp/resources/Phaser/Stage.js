/**실제로 게임이 이루어지는 화면입니다.
 *DB에서 받아온 데이터를 기초해서 각기 다른 스테이지를 만들어냅니다. 
 *1.DB에서 적절한 데이터와 함께 호출됨
 *2.데이터 초기화
 *3.게임의 실행
 *4.종료 후 적절한 STATE START
 */

var game = new Phaser.Game(1024, 576, Phaser.CANVAS, 'phaser-example', {preload: preload, create: create, render: render, update: update});

var text = 0;
var explosions;
var bmpText;


var syuzincou;
var anim;
var key;


//음표스프라이트
var sprites;
//음표배경화면
var noteBgGroup;
//멀티유저번호
var userNumber;
//생성뒤 사라진 음표스프라이트 갯수 
var rip=0;


//attackLine Info
var lineXLocation = [978, 886, 794, 702, 610, 518, 426, 334, 242, 150];
var lineYLocation = [100, 292, 484];

//monster
var monster1;
var monster2;
var monster3;

//Beat counter
var currentBeat = 0;


function preload(){
	//  콤보 효과음 로드
	game.load.audio('comboSound', 'resources/phaser/sounds_collect_coin.mp3');
	
	//  숫자(0~9) 스프라이트
	game.load.spritesheet('number0', 'resources/Images/number_0.png', 32, 32, 20);
	game.load.spritesheet('number1', 'resources/Images/number_1.png', 32, 32, 20);
	game.load.spritesheet('number2', 'resources/Images/number_2.png', 32, 32, 20);
	game.load.spritesheet('number3', 'resources/Images/number_3.png', 32, 32, 20);
	game.load.spritesheet('number4', 'resources/Images/number_4.png', 32, 32, 20);
	game.load.spritesheet('number5', 'resources/Images/number_5.png', 32, 32, 20);
	game.load.spritesheet('number6', 'resources/Images/number_6.png', 32, 32, 20);
	game.load.spritesheet('number7', 'resources/Images/number_7.png', 32, 32, 20);
	game.load.spritesheet('number8', 'resources/Images/number_8.png', 32, 32, 20);
	game.load.spritesheet('number9', 'resources/Images/number_9.png', 32, 32, 20);
	
	//  생명력 이미지
	game.load.image('life', 'resources/Images/trebleclef.png');
	
	game.load.spritesheet('beatoben', 'resources/Images/beatoben.png', 32, 32, 16); // 비토벤 스프라이트시트
	
	//음표그림4개 로드   1:빨강, 2:파랑, 3:초록, 4:노랑
	for(var i=1; i<=4;i++){
	game.load.image('note'+i, 'resources/Images/note'+i+'.png');
	}
	//음표배경 로드
	game.load.image('noteBG', 'resources/Images/noteBG.png');
	game.load.image('imgO', 'resources/Images/imgO.png');
	game.load.image('imgX', 'resources/Images/imgX.png');
	
	game.load.spritesheet('mummy', 'resources/Images/metalslug_mummy37x45.png', 37, 45, 18);
}

function create(){
	//  배경색
    game.stage.backgroundColor = '#6688ee';
    
    
    //  텍스트
    text = game.add.text(game.world.centerX, game.world.centerY, 'Combo: 0', { font: "64px Arial", fill: "#ffffff", align: "center" });
    text.anchor.setTo(0.5, 0.5);
    text.inputEnabled = true;
    text.events.onInputDown.add(down, this); // TODO : 현재는 onInputDown으로(마우스로 클릭했을 시) 공격을 받았으나 이후 모션 인식으로 변경해야 함

    //  콤보 효과음 설정
    comboSound = game.add.audio('comboSound');
    comboSound.addMarker('comboSound', 0, 1);
    
    // 스프라이트 시트에서 2번째 이미지를 먼저 시작한다.
	syuzincou = game.add.sprite(100,game.world.centerY, 'beatoben',1); 
	syuzincou.scale.set(4); 
	syuzincou.smoothed = false;  
	
	//1번 버튼을 눌렀을 때
	key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key.onDown.add(pressdownone, this); 
    
	
	//하나씩 나타나는 음표를 그룹으로 주기
	sprites = game.add.group();
	
    //음표 뒤에 배경생성    game.width/2-150, 500 위치에 생성
    var noteBG = sprites.create(game.width/2-150, 500 , 'noteBG');
    
    //음표 흐르는 거 배경을 그룹으로 주기
    noteBgGroup = game.add.group();
    //그룹에  noteBG이미지 넣기
    noteBgGroup.add(noteBG);
    
    
	//createMonster
	monster1 = new Monster(game, 0, 1, 0, 100);
	monster2 = new Monster(game, 1, 1, 0, 292);
	monster3 = new Monster(game, 2, 2, 0, 484);
	
	//background
	game.stage.backgroundColor = '#1873CE';
	
	
	//physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
    
	//Timer functions here
	//game.time.events.loop(Phaser.Timer.SECOND, loopFunction, this);
	
	
    //1초마다 움직이는 루프
    game.time.events.loop(Phaser.Timer.SECOND, updateCurrentTime, this);
    //1초마다 실행
    game.time.events.loop(Phaser.Timer.SECOND, jumpchar, this);
    //Phaser.Timer.SECOND 초 마다 creatNotes함수 실행
    game.time.events.loop(Phaser.Timer.SECOND, createNotes, this);
    //loop depend by beat
	game.time.events.loop(Phaser.Timer.SECOND, start, this);
}

//나중에 이곳으로 모은다.
function loopFunction(){
	
}

function render(){
    game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);
    game.debug.text("Group size: " + sprites.total, 32, 96);
    game.debug.text("Destroyed: " + rip, 32, 128);
    game.debug.text("유저 넘버: " + userNumber+"등장!", game.width/2+150, 500);
}

function update(){
	addLife();
}

//Monster Entity
function Monster(game, attackLine, speed, lineXIndex, startYOnAttackLine){
	
	this.game = game;
	this.attackLine = attackLine;
	this.speed = speed;
	this.health = 1;
	this.lineXIndex = lineXIndex;
	this.monsterSprite = game.add.sprite(1075, startYOnAttackLine, 'mummy', 5);
	this.monsterSprite.scale.set(2);
    this.monsterSprite.smoothed = false;
    this.anim = this.monsterSprite.animations.add('walk');
    this.monsterSprite.animations.play('walk', 20, true);

    //physics
	game.physics.enable(this.monsterSprite, Phaser.Physics.ARCADE);
}

//Monster Entity prototype damage
Monster.prototype.damage = function(){
	
	
	this.health -= 1;	
	
	
	if (this.health <= 0) {
		this.monsterSprite.kill();
	}
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

/*
 * addLife(): 생명력을 증가시키는 함수. 생명력을 나타내는 변수 life는 콤보가 (카운터 % 20 == 0)일 때 1 증가하도록 되어있음 
 */
var life = 3; //생명력. DB에서 불러와야 하는 값이며, 현재 임의로 상수를 주었다. // TODO
function addLife() {
	for (var f = 1; f <= life; f++) {
		var image = game.add.image(f * 30, 30, 'life');
	}
}

//버튼 1번 눌렀을 때
function pressdownone () {
	anim = syuzincou.animations.add('attack');
	anim.play('attack',10, false); //속도
	
}

function jumpchar () {
	//1번 점프 점프
    game.add.tween(syuzincou).to({ y: 250 }, 400, Phaser.Easing.Quadratic.InOut, true, 0, 0, true);
    
    //1초마다 스프라이트 점프 이미지
    anim = syuzincou.animations.add('jump',[0,1],2,false);
    anim.play('jump');
}

//노트의 스피드를 추후 셋팅한다.
function createNotes() {
	//1~4번중 랜덤으로 번호 생성해서 userNumber에 할당
	userNumber = 'note' + game.rnd.integerInRange(1,4); //ex: note3
	//랜덤유저 음표 생성(생성하는 위치)
	var note = game.add.sprite(game.width/2+150,500,userNumber);
	game.add.tween(note).to({x:game.width/2-150},3000,'Linear',true,0).onComplete.add(function(note){
		note.kill();
	},note);
}

function checkNotes(sprite) {
	//특정 위치에 도달하면 사라짐
    try {
    	if(sprite.x == game.width/2){
    		//도달한 스프라이트의 속성을 구하는 방법은?
    		//console.log(sprite.번호 +"범위에 들어갔다?!");
    		
    		//도달하면  발생하는 매소드
    		var notePop =game.add.sprite(game.width/2+20,520,'imgX');
    		notePop.anchor.setTo(0.5,0.5);
    		notePop.scale.setTo(1,1);
    		//이벤트 발생시킴  ( o, x )
    		game.time.events.add(0, function() {    
    			//y좌표까지 이동
    			game.add.tween(notePop).to({y: 450}, 500, Phaser.Easing.Linear.None, true);    
    			//그러면서 투명도0 까지 변화면서 사라짐
    			game.add.tween(notePop).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);}
    		, this);
    	}
    	
    	//해당 범위를 지나면 음표 삭제
        if (sprite.x < game.width/2-150)
        {
            rip++;
            sprites.remove(sprite, true);
        }
    }
    catch (e)
    {
        console.log(sprite);
    }

}

//start
function start(){
	
	//start monster2
	commandJump(monster2);
	
	//start monster1 beat 2
	if (currentBeat >= 2) {
		commandJump(monster1);
	}
	
	//start monster3 beat 3
	if (currentBeat >= 5) {
		commandJump(monster3);
	}
	
	if (currentBeat == 7) {
		hitMonster(monster1);
	}

	//add 1 currentBeat
	currentBeat += 1;
}




//commandJump monster unit
//this method have method arriveDestination. arriveDestination is check unit current x location and kill unit 
function commandJump(unit){
	
	//check unit current x location and kill when last jump
	arriveDestination(unit);
	

	//if monster unit speed = 2 jump to lineXindex = 1
	if (unit.speed == 2 && unit.lineXIndex == 0) {
		unit.lineXIndex = 1;
	}

	//attackLine -> absolute value //lineXIndex -> absolute value
	singleJump(unit, lineYLocation[unit.attackLine], lineXLocation[unit.lineXIndex]);
}



//singleJump
function singleJump (unit, maximumHightOnAttackLine, destinationOnlineXLocation) {
	
	//move Y
	game.add.tween(unit.monsterSprite).to({ y: maximumHightOnAttackLine - 100 }, 300, "Sine.easeInOut", true, 0, 0, true);
	//move X
	game.add.tween(unit.monsterSprite).to({ x: destinationOnlineXLocation }, 600, 'Linear', true, 0);
	
	//update Monster unit X value
	if (unit.speed == 1) {
		unit.lineXIndex += 1;
	} else if (unit.speed == 2) {
		unit.lineXIndex += 2;
	}
}


//monster unit damage
function hitMonster(unit, damage){
	
	
	unit.damage();
}

//monster arrive destination //kill monster and reduce damage beathoven
function arriveDestination(unit){
	
	if (unit.speed == 1) {
		if (unit.lineXIndex > 10) {
			unit.monsterSprite.kill();
		}
	} else if (unit.speed == 2) {
		if (unit.lineXIndex > 12) {
			unit.monsterSprite.kill();
		}					
	}
}