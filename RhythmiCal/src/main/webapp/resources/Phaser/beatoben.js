/**
 * 
 */

var game = new Phaser.Game(1024, 576, Phaser.AUTO, 'phaser-example', { preload: preload, create: create});

function preload() {
	game.load.spritesheet('beatoben', 'resources/jinju_beatoben/beatoben.png', 32, 32, 16); // 비토벤 스프라이트시트
}

var syuzincou;
var anim;
var key;

function create() {
	//background 's color is green
	game.stage.backgroundColor = '#86E57F';
	
	// 스프라이트 시트에서 2번째 이미지를 먼저 시작한다.
	syuzincou = game.add.sprite(game.world.centerX,game.world.centerY, 'beatoben',1); 
	syuzincou.scale.set(4); 
	syuzincou.smoothed = false;  
	
	//1번 버튼을 눌렀을 때
	key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key.onDown.add(pressdownone, this); 
	
    //1초마다 실행
    game.time.events.loop(Phaser.Timer.SECOND, jumpchar, this);
    
    
}

// 버튼 1번 눌렀을 때
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

