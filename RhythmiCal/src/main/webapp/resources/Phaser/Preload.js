/** 항상 가장 처음 실행되는 state입니다.
 * 시작화면에서의 접근이 신규 유저의 접근인지 기존 유저의 접근인지에 따라 준비하는 데이터가 상이합니다.
 * 1.신규 유저의 접근
 * 		게임의 기초 초기화 데이터를 로드한 뒤 인트로 start
 * 2.기존 유저의 접근
 * 		ID 컬럼 조회 후 세이브 데이터에 기초하여 데이터 초기화
 * 		그 후 마을 start
 */
var isLogo = true;
var Preload = function(game){};

Preload.prototype = {
	preload : function(){
		alert("Preload");
		game.world.removeAll();
		//로고 이미지 불러오기
		//로딩 이미지 등 불러오기
		
	},
	create: function(){
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.input.onDown.add(gofull, this);
		
		//로고 혹은 로딩 화면 생성
		if (isLogo) {
			//로고 띄우기
		}else {
			//로딩 띄우기
		}
		
		game.time.events.loop(Phaser.Timer.SECOND * 3, requestState, this);
	},
	requestUserInfo: function(){
		$.ajax({
			url:"requestUserInfo"
			,type: "post"
			,success: function(userInfo){
			},error: function(){
			}
		});
	}
}

function setResources (state){
	if (state == "Intro") {
		//Intro assets
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
		
		//인트로 실행
		game.state.start("Intro");
	}else if (state == "Tutorial"){
		//Totorial assets
		// debug
		game.load.image('arrow', 'assets/sprites/arrow.png');
		// load background image
		game.load.image('stageBG','resources/Images/stage/stageBG_1.png');
		// load bitmapFont
	    game.load.bitmapFont('neo_font', 'resources/neo_font/neo_font.png', 'resources/neo_font/neo_font.fnt');
	    // load rhythmi spritesheet
		game.load.spritesheet('rhythmi', 'resources/Images/tutorial/rhythmiWithEyes.png', 50, 50, 16);
		// load dialog image
	    game.load.image("dialog", "resources/Images/tutorial/dialog.png");
		
	    //튜토리얼 실행
		game.state.start("Tutorial");
	}else if (state == "Story") {
		//Story assets , contentNum required
		
		
		game.state.start("Story");
	}else if (state == "Stage") {
		//Stage assets , contentNum required
		
		game.state.start("Stage");
	}else if (state == "Village") {
		//Village assets
		
		game.state.start("Village");
	}else if (state == "Ending") {
		//Ending assets
		//배경음악
		game.load.audio('ending_music',"resources/endingsrc/endingmusic.mp3");
		//비트맵형 글자폰트 로드
		game.load.bitmapFont('neo_font', 'resources/neo_font/neo_font.png','resources/neo_font/neo_font.fnt');
		
		game.load.spritesheet("propose00",	"resources/endingsrc/propose00.png", 500, 283,2);
		game.load.spritesheet("propose01",	"resources/endingsrc/propose01.png", 500, 283,2);
		game.load.image("propose02","resources/endingsrc/propose02.png",500,283);
		game.load.image("propose03","resources/endingsrc/propose03.png",500,283);
		game.load.spritesheet("propose04",	"resources/endingsrc/propose04.png", 500, 283,2);
		
		game.state.start("Ending");
	}else if (state == "HallOfFame"){
		//HallOfFame assets
		
		//HallOfFame.jsp로 이동
	}
}
function gofull() {
	  if (game.scale.isFullScreen) {
	      game.scale.stopFullScreen();
	  }
	  else {
	      game.scale.startFullScreen(false);
	  }
	}
