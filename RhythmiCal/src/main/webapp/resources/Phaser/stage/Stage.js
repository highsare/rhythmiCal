/**실제로 게임이 이루어지는 화면입니다.
 *DB에서 받아온 데이터를 기초해서 각기 다른 스테이지를 만들어냅니다. 
 *1.DB에서 적절한 데이터와 함께 호출됨
 *2.데이터 초기화
 *3.게임의 실행
 *4.종료 후 적절한 STATE START
 */

var game = new Phaser.Game(1600,900, Phaser.CANVAS, 'phaser-example', {preload: preload, create: create, render: render, update: update});

var text = 0;
var explosions;
var bmpText;

//syuzincou => beatoven
var beatoven;
var anim;

//음표스프라이트 sprites =>noteSprites
var noteSprites;
//음표배경화면
var noteBgGroup;
//멀티유저번호
var userNumber;


//attackLine Info
var lineXLocation = [1528.125, 1384.375, 1240.625, 1096.875, 953.125, 809.375, 665.625, 521.875, 378.125, 234.375];
var lineYLocation = [156.25, 456.25, 756.25];

var monstersA;
var monstersB;
var monstersC;

//Beat counter
var currentBeat = 0;
var beatStart;
//image => popUpImage
var popUpImage;

var counter = 0;
var isComboNow = false;

var beatZone = false;
var beat = 0;

var life = 3; //생명력. DB에서 불러와야 하는 값이며, 현재 임의로 상수를 주었다. // TODO
var maxLife = 10;
var lifeArray;

var stageBGM;
var BPM;
var BPMfactor = 60;

function preload(){
	//  콤보 효과음 로드
	game.load.audio('comboSound', 'resources/Audios/effectSound/sounds_collect_coin.mp3');
	game.load.audio('stageBGM','resources/Audios/bgm/55bpm_Mirror_Mirror.mp3');
	
	//  숫자(0~9) 스프라이트
	game.load.spritesheet('number0', 'resources/Images/numbers/number_0.png', 32, 32, 20);
	game.load.spritesheet('number1', 'resources/Images/numbers/number_1.png', 32, 32, 20);
	game.load.spritesheet('number2', 'resources/Images/numbers/number_2.png', 32, 32, 20);
	game.load.spritesheet('number3', 'resources/Images/numbers/number_3.png', 32, 32, 20);
	game.load.spritesheet('number4', 'resources/Images/numbers/number_4.png', 32, 32, 20);
	game.load.spritesheet('number5', 'resources/Images/numbers/number_5.png', 32, 32, 20);
	game.load.spritesheet('number6', 'resources/Images/numbers/number_6.png', 32, 32, 20);
	game.load.spritesheet('number7', 'resources/Images/numbers/number_7.png', 32, 32, 20);
	game.load.spritesheet('number8', 'resources/Images/numbers/number_8.png', 32, 32, 20);
	game.load.spritesheet('number9', 'resources/Images/numbers/number_9.png', 32, 32, 20);
	
	//  생명력 이미지
	game.load.image('life', 'resources/Images/others/trebleclef.png');
	
	game.load.spritesheet('beatoben', 'resources/Images/characters/beatoben.png', 32, 32, 16); // 비토벤 스프라이트시트
	
	//음표그림4개 로드   1:빨강, 2:파랑, 3:초록, 4:노랑
	for(var i=1; i<=4;i++){
	game.load.image('note'+i, 'resources/Images/notes/note'+i+'.png');
	}
	//음표배경 로드
	game.load.image('noteBG', 'resources/Images/notes/noteBG.png');
	game.load.image('imgO', 'resources/Images/notes/imgO.png');
	game.load.image('imgX', 'resources/Images/notes/imgX.png');
	
	game.load.spritesheet('mummy', 'resources/Images/characters/monsters/metalslug_mummy37x45.png', 37, 45, 18);
	game.load.spritesheet('stormlord_dragon', 'resources/Images/characters/monsters/stormlord-dragon96x64.png', 96, 64, 6);
}

function create(){
	
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	game.input.onDown.add(gofull, this);
	
	stageBGM = game.add.audio('stageBGM');
	/*stageBGM.play();*/
	BPM = BPMfactor / 55;
	beatStart = 0;
	
	//  배경색
    game.stage.backgroundColor = '#6688ee';
    
    
    //  텍스트
    text = game.add.text(game.world.centerX, game.world.centerY, 'Combo: 0', { font: "64px Arial", fill: "#ffffff", align: "center" });
    text.anchor.setTo(0.5, 0.5);
    text.inputEnabled = true;
    //text.events.onInputDown.add(down, this); // TODO : 현재는 onInputDown으로(마우스로 클릭했을 시) 공격을 받았으나 이후 모션 인식으로 변경해야 함

    //  콤보 효과음 설정
    comboSound = game.add.audio('comboSound');
    comboSound.addMarker('comboSound', 0, 1);
    
    
    // 스프라이트 시트에서 2번째 이미지를 먼저 시작한다.
	beatoven = game.add.sprite(100,game.world.centerY, 'beatoben',1);
	beatoven.scale.set(4); 
	beatoven.smoothed = false;
	
	//하나씩 나타나는 음표를 그룹으로 주기
	sprites = game.add.group();
	
    //음표 뒤에 배경생성    game.width/2-150, 500 위치에 생성
    var noteBG = sprites.create(game.width/2-150, 750, 'noteBG');
    
    //음표 흐르는 거 배경을 그룹으로 주기
    noteBgGroup = game.add.group();
    
    //그룹에  noteBG이미지 넣기
    noteBgGroup.add(noteBG);
    
    monstersA = new Array();
    monstersB = new Array();
    monstersC = new Array();
    
    for(var i = 0; i < 50; i++){
    	monstersA[i] = new Monster(game, 0, 1, 'stormlord_dragon', 2+i*2);
    }
    for(var i = 0; i < 50; i++){
    	monstersB[i] = new Monster(game, 1, 1, 'mummy', i*3);
    }
    for(var i = 0; i < 50; i++){
    	monstersC[i] = new Monster(game, 2, 2, 'mummy', 1+i*6);
    }
    
	//createMonster (game, attackLine, speed, monsterName, appearanceBeat, startYOnAttackLine)
	/*monstersA[0] = new Monster(game, 0, 1, 0, 12, lineYLocation[0]);
	monstersA[1] = new Monster(game, 0, 1, 0, 17, lineYLocation[0]);
	monstersA[2] = new Monster(game, 0, 1, 0, 14, lineYLocation[0]);
	
	monstersB[0] = new Monster(game, 1, 1, 0, 11, lineYLocation[1]);
	monstersB[1] = new Monster(game, 1, 1, 0, 16, lineYLocation[1]);
	
	monstersC[0] = new Monster(game, 2, 2, 0, 13, lineYLocation[2]);
	monstersC[1] = new Monster(game, 2, 2, 0, 15, lineYLocation[2]);*/
	
	//background
	game.stage.backgroundColor = '#1873CE';
	
	//physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	/*updateLife();*/
	iniLife();

	//Timer functions here
	game.time.events.loop(Phaser.Timer.SECOND * BPM, loopFunction, this);
	
	game.time.events.loop((Phaser.Timer.SECOND / 5) * BPM , toggleBeatZone, this);
}

function render(){
    game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);
    game.debug.text("유저 넘버: " + userNumber+"등장!", game.width/2+150, 500);
    game.debug.text("BeatZone : "+ beatZone, game.width/2, game.height/2+100);
}

function update(){
	if(beatZone){
		motionCheck();
	}else{
		wrongTiming();
	}
}


//나중에 이곳으로 모은다.
function loopFunction(){
	//add 1 currentBeat
	if (currentBeat == 0) {
		stageBGM.play();
	}
	currentBeat += 1;
	console.log(currentBeat);
	start();
	jumpchar();
	createNotes();
}

function gofull() {

  if (game.scale.isFullScreen)
  {
      game.scale.stopFullScreen();
  }
  else
  {
      game.scale.startFullScreen(false);
  }
}
