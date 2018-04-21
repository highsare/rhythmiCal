	var game = new Phaser.Game(1600, 900, Phaser.CANVAS, 'phaser-example',
				{
					preload : preload,
					create : create,
					update : update,
					render : render
				});

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
		
		
		function preload() {

			//배경음악
			game.load.audio('intro_music',
					"resources/introsrc/Forest_of_Fear.mp3");

			// intro_src_로드
			game.load.image("intro_1_mountain",
					"resources/introsrc/intro_1_mountain.png", 1600, 900);
			game.load.image("intro_1_village",
					"resources/introsrc/intro_1_village.png", 1600, 900);
			game.load.image("intro_1_tree",
					"resources/introsrc/intro_1_tree.png", 1600, 900);
			game.load.spritesheet("intro_1_flyingbird",
					"resources/introsrc/intro_1_flyingbird_32x32.png", 32, 32,
					2);
			
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

			//비트맵형 글자폰트 로드
			game.load.bitmapFont('neo_font', 'resources/neo_font/neo_font.png',
					'resources/neo_font/neo_font.fnt');

		}

		function create() {

			game.add.audio('intro_music').play();

			typethetext("인트로", game.world.centerX - 150,
					game.world.centerY - 50, 90);
			//몇초있다가  스토리 시작
			game.time.events.add(800, function() { //글자 나올때 소리 추가
				//카메라 페이드 인
				game.camera.flash(0x000000, 500);
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
				typethetext("음악이 세상 무엇보다 소중했던 세계가 있었다.", 250, 800, 50, 100)

				//움직임 enable 정의
				game.physics.enable(bird, Phaser.Physics.ARCADE);

			});//한 장면 끝

			//_________두번째 장면 시작
			game.time.events.add(7000, function() {
				game.camera.flash(0x000000, 500);
				typewriter.destroy();
				mountain.destroy();
				village.destroy();
				bird.destroy();
				tree.destroy();
				
				//두번째 장면 배경화면
				intro2back = game.add.sprite(0, 0, 'intro_2_back');
				intro2back.smoothed = false;
				intro2back.anchor.setTo(0, 0);
				var pika = intro2back.animations.add('pika');
				intro2back.play('pika', 6, true);
				
				//노는 애들 01
				dancingpeople01 = game.add.sprite(0, 300, 'intro_2_dancing01');
				dancingpeople01.smoothed = false;
				dancingpeople01.scale.setTo(8, 8);
				var dance = dancingpeople01.animations.add('dance');
				dancingpeople01.play('dance', 12, true);
				
				//노는 애들 02
				dancingpeople02 = game.add.sprite(500, 300, 'intro_2_dancing02');
				dancingpeople02.smoothed = false;
				dancingpeople02.scale.setTo(8, 8);
				var dance = dancingpeople02.animations.add('dance');
				dancingpeople02.play('dance', 12, true);
				
				//노는 애들 03
				dancingpeople03 = game.add.sprite(300, 300, 'intro_2_dancing03');
				dancingpeople03.smoothed = false;
				dancingpeople03.scale.setTo(8, 8);
				var dance = dancingpeople03.animations.add('dance');
				dancingpeople03.play('dance', 12, true);
				
				//노는 애들 04
				dancingpeople04 = game.add.sprite(800, 300, 'intro_2_dancing04');
				dancingpeople04.smoothed = false;
				dancingpeople04.scale.setTo(8, 8);
				var dance = dancingpeople04.animations.add('dance');
				dancingpeople04.play('dance', 12, true);
				
				//마왕 등장
				mawang = game.add.image(game.width,0, "intro_2_mawang");
				//mawang.anchor.setTo(0, 0);
				game.add.tween(mawang).to({ x : 260 ,y:0}, 500, Phaser.Easing.Linear.None, true,1000);
				
				//자막
				typethetext("음악이 너무 싫었던 마왕... 그 이름 노.비.토", 250, 800, 50, 100)
			});//두번째 장면 끝

		}

		/* function animationStopped(sprite, animation) {
			
			//캐릭터 발걸음 정지
			right.stop();
		    var txt="밑에 함수를 실행하는데 다음 배열의 데이터로 실행한다."
		    
		    //타이핑메소드로 전달
			typethetext(txt,10,10,45);
					
		    
		} */
		function update() {
			//Ajax로 컨트롤러에게 계속 [다음으로 넘어가는지] 묻는다

			//if 위에가 예스면
			//밑에 함수를 실행하는데 다음 배열의 데이터로 실행한다.

		}

		function render() {
			//캐릭터의 이미지시트에서 몇번째인가 확인한다.
			// game.debug.text(player.frame, 32, 32);

		}

		//타이핑효과 함수 (텍스트값,x위치 , y위치)
		function typethetext(txt, xvalue, yvalue, size, speed) {
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