/** 처음 시작한 사람이 보게 되는 화면입니다.
 * 보통 최초 1번 호출되며 스토리와 유사한 진행을 보입니다.
 * 1.인트로 영상 혹은 메인스토리 재생
 * 2.스토리 No.1 시작
 * 3.튜토리얼 스테이트 Starts
*/

var typewriter = new Typewriter(); // 글자 타이핑 효과
//1장면
var mountain;
var village;
var bird
var tree;
//2장면
var intro2back;
var mawang;
var dancingpeople01,dancingpeople02,dancingpeople03,dancingpeople04
//3장면
var intro3back;
var intro3mawang;
var intro3village;

//4장면
var intro4beatoven;
var intro4village;
var intro4mawang;
var intro5beatoven;
var walk; 
var stand;

var Intro = function(game) {};

Intro.prototype = {
	preload:function() {
		//배경음악
		game.load.audio('intro_music',"resources/introsrc/intromusic.mp3");

		// intro_src_로드
		//1번째장면
		game.load.image("intro_1_mountain",
				"resources/introsrc/intro_1_mountain.png", 1600, 900);
		game.load.image("intro_1_village",
				"resources/introsrc/intro_1_village.png", 1600, 900);
		game.load.image("intro_1_tree",
				"resources/introsrc/intro_1_tree.png", 1600, 900);
		game.load.spritesheet("intro_1_flyingbird",
				"resources/introsrc/intro_1_flyingbird_32x32.png", 32, 32,
				2);
		//두번째장면
		game.load.spritesheet("intro_2_back",
				"resources/introsrc/intro_2_back.png", 1600, 900,2);
		game.load.image("intro_2_mawang",
				"resources/introsrc/intro_2_mawang.png", 1600, 900);
		game.load.spritesheet("intro_2_dancing01",
				"resources/introsrc/intro_2_dancing01_60x60.png", 60, 60,12);
		game.load.spritesheet("intro_2_dancing02",
				"resources/introsrc/intro_2_dancing02_60x60.png", 60, 60,9);
		game.load.spritesheet("intro_2_dancing03",
				"resources/introsrc/intro_2_dancing03_60x60.png", 60, 60,11);
		game.load.spritesheet("intro_2_dancing04",
				"resources/introsrc/intro_2_dancing04_60x60.png", 60, 60,6);

		//세번째장면
		game.load.spritesheet("intro_3_back","resources/introsrc/intro_3_back.png",1600,900,2);
		game.load.spritesheet("intro_3_mawang",
				"resources/introsrc/intro_3_mawang.png", 1600, 900,8);
		game.load.image("intro_3_village","resources/introsrc/intro_3_village.png",1600,900);
		
		//네번쨰장면
		game.load.image("intro_4_village","resources/introsrc/intro_4_village.png",1600,900);
		game.load.spritesheet("intro_4_beatoven","resources/introsrc/intro_4_beatoven.png",1600,900);
		game.load.image("intro_4_mawang","resources/introsrc/intro_4_mawang.png",1600,900);
		
		//비트맵형 글자폰트 로드
		game.load.bitmapFont('neo_font', 'resources/neo_font/neo_font.png',
				'resources/neo_font/neo_font.fnt');
		
	},
	create:function() {

		game.add.audio('intro_music').play();

		typethetext("인트로", game.world.centerX - 150,
				game.world.centerY - 50, 90);
		//몇초있다가  스토리 시작
		game.time.events.add(800, function() { //글자 나올때 소리 추가
			//카메라 페이드 인
			game.camera.flash(0x000000, 300);
			typewriter.destroy();
			//배경화면 추가
			mountain = game.add.image(0, 0, "intro_1_mountain");
			mountain.width = game.width;
			mountain.height = game.height;

			//마을 추가
			village = game.add.image(game.world.centerX,
					game.world.centerY, "intro_1_village");
			village.width = game.width;
			village.height = game.height;
			village.anchor.setTo(0.5, 0.5);
			game.add.tween(village.scale).to({
				x : 1.15,
				y : 1.15
			}, 10000, Phaser.Easing.Linear.None, true);

			/// __새______날라가는 새 스프라이트생성
			bird = game.add.sprite(1900, 350, 'intro_1_flyingbird');
			bird.smoothed = false;
			//player.scale.set(4);
			bird.anchor.setTo(0, 0);
			bird.scale.setTo(10, 10);
			///왼쪽에서 날라오는 새 움직임 정의  12프레임 반복true
			var flying = bird.animations.add('flying');
			//새 날개짓 재생
			bird.play('flying', 12, true);
			//실제 캐릭터 화면에서 오른쪽으로 이동    /맨뒤 2초딜레이
			game.add.tween(bird).to({
				x : -500,
				y : 100
			}, 6000, Phaser.Easing.Quadratic.Out, true, 1000);

			//나무
			tree = game.add.image(game.world.centerX,
					game.world.centerY, "intro_1_tree");
			tree.width = game.width;
			tree.height = game.height;
			tree.anchor.setTo(0.5, 0.5);
			game.add.tween(tree).to({
				x : 1000,
				y : 400
			}, 10000, Phaser.Easing.Linear.None, true);
			game.add.tween(tree.scale).to({
				x : 2,
				y : 2
			}, 10000, Phaser.Easing.Linear.None, true);

			//자막
			typethetext("음악이 세상 무엇보다 소중했던 세계가 있었다.", 150, 800, 60, 100)

			//움직임 enable 정의
			game.physics.enable(bird, Phaser.Physics.ARCADE);

		});//한 장면 끝

		//_________두번째 장면 시작
		game.time.events.add(6000, function() {
			game.camera.flash(0x000000, 500);
			typewriter.destroy();
			mountain.destroy();
			village.destroy();
			bird.destroy();
			tree.destroy();
			typewriter.destroy();
			
			//두번째 장면 배경화면
			intro2back = game.add.sprite(0, 0, 'intro_2_back');
			intro2back.smoothed = false;
			intro2back.anchor.setTo(0, 0);
			var pika = intro2back.animations.add('pika');
			intro2back.play('pika', 6, true);
			
			//노는 애들 01
			dancingpeople01 = game.add.sprite(-30, 300, 'intro_2_dancing01');
			dancingpeople01.smoothed = false;
			dancingpeople01.scale.setTo(8, 8);
			var dance = dancingpeople01.animations.add('dance');
			dancingpeople01.play('dance', 12, true);
			game.add.tween(dancingpeople01).to( { x:30, y:300 }, 4000, Phaser.Easing.Linear.None, true);
			game.add.tween(dancingpeople01).to( { x:-300, y:70 }, 500, Phaser.Easing.Linear.None, true,4000);
		    game.add.tween(dancingpeople01.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Linear.None, true,4000);
			
			//노는 애들 03 감자
			dancingpeople02 = game.add.sprite(650, 300, 'intro_2_dancing02');
			dancingpeople02.smoothed = false;
			dancingpeople02.scale.setTo(8, 8);
			var dance = dancingpeople02.animations.add('dance');
			dancingpeople02.play('dance', 12, true);
			game.add.tween(dancingpeople02).to( { x:700, y:320 }, 5000, Phaser.Easing.Linear.None, true);
			game.add.tween(dancingpeople02).to( { x:600, y:70 }, 500, Phaser.Easing.Linear.None, true,4000);
		    game.add.tween(dancingpeople02.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Linear.None, true,4000);
			
			//노는 애들 02 멜로디언
			dancingpeople03 = game.add.sprite(350, 300, 'intro_2_dancing03');
			dancingpeople03.smoothed = false;
			dancingpeople03.scale.setTo(8, 8);
			var dance = dancingpeople03.animations.add('dance');
			dancingpeople03.play('dance', 12, true);
			game.add.tween(dancingpeople03).to( { x:400, y:310 }, 5000, Phaser.Easing.Linear.None, true);
			game.add.tween(dancingpeople03).to( { x:1300, y:300 }, 500, Phaser.Easing.Linear.None, true,4000);
		    game.add.tween(dancingpeople03.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Linear.None, true,4000);
			
			//노는 애들 04 아줌마
			dancingpeople04 = game.add.sprite(1100, 300, 'intro_2_dancing04');
			dancingpeople04.smoothed = false;
			dancingpeople04.scale.setTo(8, 8);
			var dance = dancingpeople04.animations.add('dance');
			dancingpeople04.play('dance', 12, true);
			game.add.tween(dancingpeople04).to( { x:925, y:280 }, 5000, Phaser.Easing.Linear.None, true);
			game.add.tween(dancingpeople04).to( { x:200, y:200 }, 500, Phaser.Easing.Linear.None, true,4000);
		    game.add.tween(dancingpeople04.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Linear.None, true,4000);
			
			//마왕 등장
			mawang = game.add.image(game.width,0, "intro_2_mawang");
			//mawang.anchor.setTo(0, 0);
			game.add.tween(mawang).to({ x : 260 ,y:0}, 500, Phaser.Easing.Linear.None, true,3000);
			
			//자막
			typethetext("음악이 너무 싫었던 마왕... 그 이름 노.비.토", 150, 800, 60, 100)
		});//두번째 장면 끝

		//_________세번째 장면 시작
		game.time.events.add(12400, function() {
			game.camera.flash(0x000000, 500);
			intro2back.destroy();
			dancingpeople01.destroy();
			dancingpeople02.destroy();
			dancingpeople03.destroy();
			dancingpeople04.destroy();
			mawang.destroy();
			typewriter.destroy();
			//세번째 장면 배경화면
			intro3back = game.add.sprite(0, 0, 'intro_3_back');
			intro3back.smoothed = false;
			intro3back.anchor.setTo(0, 0);
			var pika = intro3back.animations.add('pika');
			intro3back.play('pika', 10, true);
		
			//마을
			intro3village = game.add.image(game.world.centerX, game.world.centerY, "intro_3_village");
			intro3village.scale.setTo(1.2,1.2);
			intro3village.anchor.setTo(0.5, 0.5);
			 // game.add.tween(intro3village).to( { angle: -1 }, 2000, Phaser.Easing.Linear.None, true);
		    game.add.tween(intro3village.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true);
			
			//마왕 등장
			intro3mawang = game.add.sprite(100, game.height, 'intro_3_mawang');
			intro3mawang.smoothed = false;
			var musicnasi = intro3mawang.animations.add('musicnasi');
			intro3mawang.anchor.setTo(0, 0);
			var moveToRight =  game.add.tween(intro3mawang).to({ x : 90 ,y : 0}, 1000,  Phaser.Easing.Quadratic.Out, true,500);
			moveToRight.onComplete.add(function(){
				// we need to add margin to the world, so the camera can move
				  var margin = 50;
				  // and set the world's bounds according to the given margin
				  var x = -margin;
				  var y = -margin;
				  var w = game.world.width + margin * 2;
				  var h = game.world.height + margin * 2;
				  // it's not necessary to increase height, we do it to keep uniformity
				  game.world.setBounds(x, y, w, h);
				  // we make sure camera is at position (0,0)
				  game.world.camera.position.set(0);
				  // this is where the magic happens
				game.time.events.add(2000, function() { intro3mawang.play('musicnasi', 2, false)});
				game.time.events.add(1000, function() { addQuake();});
			}, this);
			//right = player.animations.add('right', [1,2,3,4,5,6,2,3], 10, true);
			
			//자막
			typethetext("마왕은 세상으로부터 음악을 빼앗기 시작했다.", 150, 800, 60, 100)
		});//세번째 장면 끝
		 
		
		//_________네번째 장면 시작
		game.time.events.add(20500, function() {
			game.camera.flash(0x000000, 100);
			intro3back.destroy();
			intro3village.destroy();
			intro3mawang.destroy();
			typewriter.destroy();
		

		    //4장면 다가오는 마왕
		    
		    intro4mawang = game.add.image(-100,0,"intro_4_mawang");
		    intro4mawang.anchor.setTo(0, 0);
		    game.add.tween(intro4mawang).to( {x: 0, y: 0 },6000 ,Phaser.Easing.Linear.None,true);
		    //사라짐
		    game.add.tween(intro4mawang).to( {alpha: 0},2000 ,Phaser.Easing.Linear.None,true, 6000 );

			//4장면 마을
			intro4village = game.add.image(-50,0,"intro_4_village");
			game.add.tween(intro4village).to( { x: 0, y: 0 }, 6000, Phaser.Easing.Linear.None, true);
			//사라짐
			game.add.tween(intro4village).to( { alpha:0 }, 2000, Phaser.Easing.Linear.None, true,6000);
		    			    
			//4장면 마을지키는 비토벤
			intro4beatoven = game.add.sprite(300, 0, "intro_4_beatoven");
			intro4beatoven.smoothed = false;
			intro4beatoven.animations.add('walk');
			intro4beatoven.play("walk",9,true);
	
			
			var beatovenappear = game.add.tween(intro4beatoven).to( { x: 	200, y: 0 }, 8000, Phaser.Easing.Linear.None, true);
			
			//자막
			typethetext("비토벤의 마을은 절체절명의 상황을 맞이하는데..", 150, 800, 60, 100);
			
			//비토벤 걸어옴
			beatovenappear.onComplete.add(function(){
				game.add.tween(intro4beatoven).to( { x: -2000, y: 0 }, 3500, Phaser.Easing.Linear.None, true);

			 game.time.events.add(2000, function() { 
				 typewriter.destroy();
				 typethetext("게임시작", game.world.centerX - 150,game.world.centerY - 50, 90,100);});
		    
			});
			
			game.time.events.add(10000, function() {
				//스토리1번으로 보냄
				//game.state.start("");
				requestState();
			});
			
		});//네번째 장면 끝
		
	}
}
function typethetext(txt, xvalue, yvalue, size, speed) {
	//타이핑효과 함수 (텍스트값,x위치 , y위치)
	//글자 타이핑효과 정의
	typewriter.init(game, {
		x : xvalue,
		y : yvalue,
		time : speed,
		fontFamily : "neo_font",
		fontSize : size || 50,
		maxWidth : 1400,
		//타이핑 소리 줌
		// sound: reg.track,
		text : txt
	});
	//타이핑 시작
	typewriter.start();
}
function addQuake() {
  
  // define the camera offset for the quake
  var rumbleOffset = 10;
  
  // we need to move according to the camera's current position
  var properties = {
    x: game.camera.x - rumbleOffset
  };
  
  // we make it a relly fast movement
  var duration = 50;
  // because it will repeat
  var repeat = 1;
  // we use bounce in-out to soften it a little bit
  var ease = Phaser.Easing.Bounce.InOut;
  var autoStart = false;
  // a little delay because we will run it indefinitely
  var delay = 1000;
  // we want to go back to the original position
  var yoyo = true;
  
  var quake = game.add.tween(game.camera)
    .to(properties, duration, ease, autoStart, delay, 4, yoyo);
  
  // we're using this line for the example to run indefinitely
  // quake.onComplete.addOnce(addQuake);
  
  // let the earthquake begins
  quake.start();
}