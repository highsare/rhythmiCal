





//preload
function preload() {
	game.load.spritesheet('attackEffect', 'resources/jiwon_attackEffect/attackeffect.png', 32, 32, 5);
}


//몬스터가 점프할 곳과 공격라인의 절대값의 배열
var lineXLocation = [978, 886, 794, 702, 610, 518, 426, 334, 242, 150];
var lineYLocation = [100, 292, 484];


//이펙트 테스트용 키를 담을 변수
var key1;
var key2;
var key3;


function create() {
	
	//게임물리 아케이드로 적용
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	key1.onDown.add(add1, this);
	key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	key2.onDown.add(add2, this);
	key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
	key3.onDown.add(add3, this);
}

//변수를 받아서 이미지를 띄어주는 메소드
function popupImage(x, y, imageName, fps, loop) {

	
	var popUpImage = game.add.sprite(x, y, imageName);
	popUpImage.scale.set(10);
	popUpImage.smoothed = false;
	popUpImage.animations.add('popup');
	popUpImage.animations.play('popup', fps, loop, true);
}


function attackEffectOnAttackLine(attackLine){

	
	popupImage(300 ,lineYLocation[attackLine] - 200, 'attackEffect', 7, false);
}


function add1(){
	attackEffectOnAttackLine(0);
}
function add2(){
	attackEffectOnAttackLine(1);
}
function add3(){
	attackEffectOnAttackLine(2);
}