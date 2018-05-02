/**
 * 
 */
var typewriter = new Typewriter(); // 글자 타이핑 효과
var txt;
var scrollingtext;
var fontsize;
var endinglogo;
var propose00, propose01, propose02, propose03, propose04;

var Ending = function(game) {};

Ending.prototype = {

	preload:function() {	
		//배경음악
		game.load.audio('ending_music',"resources/Audios/bgm/ending/bgm_ending.mp3");
		//비트맵형 글자폰트 로드
		game.load.bitmapFont('neo_font', 'resources/neo_font/neo_font.png','resources/neo_font/neo_font.fnt');
		
		game.load.spritesheet("propose00",	"resources/Images/ending/propose00.png", 500, 283,2);
		game.load.spritesheet("propose01",	"resources/Images/ending/propose01.png", 500, 283,2);
		game.load.image("propose02","resources/Images/ending/propose02.png",500,283);
		game.load.spritesheet("propose03","resources/Images/ending/propose03.png",500,283);
		game.load.spritesheet("propose04",	"resources/Images/ending/propose04.png", 500, 283,2);
	},
	create:function() {
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	game.input.onDown.add(gofull, this);
	game.add.audio('ending_music').play();
	
	//오른쪽 스크롤
	this.scrolltextonside();
	
	//왼쪽 에니메이션
	
	//1장면
	propose00 = game.add.sprite(100, 300, 'propose00');
	//propose00.scale.setTo(1, 1);
	propose00.alpha=0;
	var singing = propose00.animations.add('singing');
	propose00.play('singing', 3, true);
	game.add.tween(propose00).to( { alpha : 1 }, 3000, Phaser.Easing.Linear.None, true,1000);
	
	//2장면
	game.time.events.add(10000, function () {  
		//카메라 페이드 인
	propose00.destroy();
	propose01 = game.add.sprite(100,300,'propose01');
	var blink = propose01.animations.add('blink');
	propose01.play('blink',3,true);
	
	//3장면
	game.time.events.add(7000, function () {   
		propose01.destroy();
		propose02 = game.add.image(100,300,'propose02'); 
	
	//4장면
	game.time.events.add(4000, function () {   
		propose02.destroy();
		propose03 = game.add.image(100,300,'propose03'); 
		var suprise = propose03.animations.add('suprise');
		propose03.play('suprise',3,true);
		//5장면
		game.time.events.add(5000, function () {   
			propose03.destroy();
			propose04 = game.add.sprite(100,300,'propose04');
			var wedding = propose04.animations.add('wedding');
			propose04.play('wedding',3,true);
				game.add.tween(propose04).to( { alpha : 0 }, 3000, Phaser.Easing.Linear.None, true,7000);
				
			});
		});
	});
	
	});
	
	},
	update:function() {
		//Ajax로 컨트롤러에게 계속 [다음으로 넘어가는지] 묻는다
	},
	render:function() {
		//캐릭터의 이미지시트에서 몇번째인가 확인한다.
	},
	scrolltextonside:function(){
			//______왼쪽 스크롤
		if (language == "KOREAN") {
			txt = "[프로젝트: 리드미칼] \n\n";
			txt += "조장: 문희재 \n\n";
			txt += "조원: 김민아 \n\n";
			txt += "조원: 김지원 \n\n";
			txt += "조원: 노정훈 \n\n";
			txt += "조원: 이진주 \n\n";
			txt += "\n\n";
			txt += "[출연]\n\n"; //ㅋㅋㅋㅋㅋㅋㅋㅋㅋ
			txt += "주인공: 비토벤\n\n";
			txt += "칼: 리드미\n\n";
			txt += "마왕: 노비토\n\n";
			txt += "중간보스1: 나보\n\n";
			txt += "중간보스2: 월량풍\n\n";
			txt += "마을소년: 어린왕자\n\n";
			txt += "촌장: Dok3\n\n";
			txt += "노비토짝사랑: 그녀\n\n";
			txt += "주민1: 직장인아저씨\n\n";
			txt += "주민2: 멜로디온아저씨\n\n";
			txt += "주민3: 팔긴아저씨\n\n";
			txt += "주민4: 안경아줌마\n\n";
			txt += "몬스터1: 꼬맹이\n\n";
			txt += "몬스터2: 초록괴물\n\n";
			txt += "몬스터3: 팬더괴물";
		}else{
			txt += "「プロジェクト：リズミカル」\n\n";
			txt += "チーム長：ムン　ヒジェ\n\n";
			txt += "チーム員：キム　ミナ\n\n";
			txt += "チーム員：キム　ジワン\n\n";
			txt += "チーム員：ノ　ジョンフン\n\n";
			txt += "チーム員：イ　ジンジュ\n\n";
			txt += "\n\n";
			txt += "「出演」\n\n";
			txt += "主人公：ビトベン\n\n";
			txt += "刀：リズミ\n\n";
			txt += "魔王：ノビと\n\n";
			txt += "住民１：サラリーマンのおじいさん\n\n";
			txt += "住民２：メロディアンのおじいさん\n\n";
			txt += "住民３：腕の長いおじいさん\n\n";
			txt += "住民４：メガネのおばあさん\n\n";
			txt += "モンスター１：チビ\n\n";
			txt += "モンスター２：緑モンスター\n\n";
			txt += "モンスター３：パンダモンスター\n\n";
			
		}
		
		//엔터 갯수 해서 올라가는 글 높이 구할라고..
		var countn = 1;
		var i =0;
		for(i = 0 ; i < txt.length ; i++ ){
			if(txt.charAt(i)==="\n"){
				countn++;
			}
			
		}
		fontsize = 32;
		//크래딧 텍스트 스크롤링
		credittext = game.add.bitmapText(game.world.width/2, game.world.height, 'neo_font',txt,fontsize);    
		scrollingtext = game.add.tween(credittext).to( { y:-(countn*fontsize) }, 1000*countn, Phaser.Easing.Linear.None, true);
		scrollingtext.onComplete.add(function(){
			fontsize = 70;
			txt += "Team Beatoven\n";
			if (language == "KOREAN") {
				txt += "감사합니다!";
			}else {
				txt += "ありがとうございます！";
			}
			endinglogo = game.add.bitmapText(game.world.centerX- txt.length*fontsize/2, game.world.height, 'neo_font',txt,fontsize);    
			game.add.tween(endinglogo).to( { y: game.world.height/2}, 1000* 3, Phaser.Easing.Linear.None, true);
			game.time.events.add(2000, function() {
				game.camera.flash(0x000000, 500);
				document.location.href = 'hallOfFame';
			}, self);
		});
	}
}