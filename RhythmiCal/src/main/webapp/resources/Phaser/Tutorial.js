/** 인트로가 끝난 뒤 호출됩니다. 유저에게 게임의 간단한 진행법을 소개시켜줍니다
 * 1.시작 전에 보정을 권함
 * 2.안내는 리드미가 비토벤을 가르쳐주는 형태
 * 3.기초 UI의 정보 안내
 * 4.박자에 맞추어 모션을 입력하는 방법 안내
 * 5.모션의 종류에 따른 공격의 종류 및 지역 상이의 안내
 * 6.몬스터의 등장 및 체력 등 특징 소개
 * 7.실제 간단한 플레이
 * 8.끝난 뒤 스토리 No.2 호출
 */ 


var leftKey, rightKey;
var typewriter = new Typewriter();
var rhythmi, dialog, text;
var tutorialTextArray = new Array();
var tutorialTextIndex = 0;

var Tutorial = function(game) {};

/*
 * TutorialText(): 튜토리얼 한 화면 당 나타낼 리드미의 위치, 말풍선의 위치, 텍스트 내용을 담는 객체
 */
function TutorialText(rhythmiX, rhythmiY, dialogX, dialogY, text) {
	// field
	this.rhythmiX = rhythmiX;
	this.rhythmiY = rhythmiY;
	this.dialogX = dialogX;
	this.dialogY = dialogY;
	this.text = text;
}

Tutorial.prototype = {
	/*
	 * createTutorialText(): 튜토리얼 객체를 생성하는 메서드. 여기서 리드미 및 말풍선의 위치, 텍스트의 내용을 정의하면 된다.
	 */
	createTutorialText: function() {
		if (language == "JAPANSES") {
			// index 0: 시작
			tutorialTextArray.push(new TutorialText(300, 300, 40, 650, 
				'ビトベン! 準備はいいかい? ククククク'
			  + '\nあいつらと向かう前に知らなやいけねえもんがあるぜ'
			  + '\n今から教えてあげるからちゃんと覚えておけよ! おい!! びびるんじゃねえ!'));
			// index 1: 비토벤의 위치
			tutorialTextArray.push(new TutorialText(147, 407, 40, 650,
				'まず、お前はこちに立って俺をかき回すのだ'
			  + '\nどのように動くのかに関して攻撃の効果が決定されるし,'
			  + '\nどちのレーインから来てくる敵を攻撃するかが決められる!'
			  + '\nまだ分かんないって？やれやれ。。'));
			// index 2: 모션(효과 및 레인 포함) >> 이 때는 잠시 3*3 버튼 이미지를 표시해줘야 할 듯.
			tutorialTextArray.push(new TutorialText(1000, 450, 40, 650,
				'モーションは [突き/アップ/ダウン/ヒダリ/ミギ]の５種,'
			  + '\nそれに各モーションは [強/スタン/ノックバック/広/広]の効果をもっている'
			  + '\nそしてまたレーインをきめらなきゃいｋないのだ'
			  + '\nレーインの範囲はモーション次第!'
			  + '\nこういう整備は戦う前にしっといて！！!'));
			// index 3: 레인
			tutorialTextArray.push(new TutorialText(200, 150, 40, 650,
				'さ、ではレーインとは？'
			  + '\n敵は３つのレーインからくる. つまりレーインはA,B,Cの３つになる!'
			  + '\nもしお前が突きをAに設定したら,'
			  + '\nレーインAにあった敵は全部ダーメージを受ける!'));
			// index 4: 몬스터
			tutorialTextArray.push(new TutorialText(400, 100, 40, 650, 
				'お前が戦うことになる敵だ! 下のグリードはみえるかい? 敵はあれに従ってくる.'
			  + '\nしかし、敵の中、守らないやつもいるかも知らん!'
			  + '\nそして頭の上の体力バーは見えるのかい? 全部、失うと敵は倒れる.'
			  + '\nでも、最後まで倒れなかったらお前の生命力がなくなる!'));
			// index 5: 생명력
			tutorialTextArray.push(new TutorialText(83, 70, 40, 650,
				'ええ？ビトベン?泣いってる？ いいぜ！..お前は死ない! 俺のことを信じろうよ!!!'
			  + '\nククク、このマークはみえるかい?'
			  + '\n２０回連続でコッンボできたら、生命力が上がる！!'
			  + '\nコッンボとは大事だぜ!'));
			// index 6: 음표(황금음표 포함) //TODO : 황금음표
			tutorialTextArray.push(new TutorialText(714, 763, 40, 30, 
				'俺らリズムの力を使うもの、敵と戦うこのにもなる！'
			  + '\nさ、ビトに合わせて俺をかき回せ！'
			  + '\nちなみにノートの色は君と友達を区別する基準! もちろん、順番は大事だぜ！!'
			  + '\nみんなで20コンボできたら生命力が上がるぞ？'));
			// index 7: 용병, 그리고 마무리
			tutorialTextArray.push(new TutorialText(250, 350, 40, 650, 
				'最後、お前はひとりじゃない. お前は最大三人の友だちと一緒に戦える.'
			  + '\n大変なときは村で友達でも呼んで！.'
			  + '\nそして、俺様! この音楽知りリズミがいるから問題なし！ ククククク！！！'
			  + '\nさあ！始めようか！！'));
		}else{
			//KOREAN
			// index 0: 시작
			tutorialTextArray.push(new TutorialText(300, 300, 40, 650, 
				'비토벤! 준비는 됐나? 크크크'
			  + '\n그들과 맞서기 전에 우선 알아둬야 할 것들이 있어.'
			  + '\n지금부터 알려주는 것들은 꼭 명심해야 해! 이봐!! 겁먹지 말라구!'));
			// index 1: 비토벤의 위치
			tutorialTextArray.push(new TutorialText(147, 407, 40, 650,
				'우선 넌 이 쪽에 서서 날 휘둘러 적들을 공격하면 된다.'
			  + '\n네가 어떻게 움직여서 날 휘두르냐에 따라 공격의 효과가 달라지고,'
			  + '\n어느 레인에서 달려오는 적들을 죽일 것인지가 달라지지!'
			  + '\n아직 이해가 잘 안 된다고? 이런.'));
			// index 2: 모션(효과 및 레인 포함) >> 이 때는 잠시 3*3 버튼 이미지를 표시해줘야 할 듯.
			tutorialTextArray.push(new TutorialText(1000, 450, 40, 650,
				'모션은 [찌르기/올려치기/내려치기/좌로치기/우로치기]의 다섯 가지,'
			  + '\n그리고 각각 [1/2/3/4/5]의 효과를 지니고 있지.'
			  + '\n또한 이것들을 각각 어느 줄의 적들을 죽일건가를 설정해야 하는데,'
			  + '\n모션에 따라 한 레인에만 설정이 가능한 것도 있고, 두 레인에 설정 가능한 것도 있다!'
			  + '\n이러한 정비는 반드시 전투를 시작하기 전 마을에서 하고 가도록 해야 한다는거 잊지 말고!'));
			// index 3: 레인
			tutorialTextArray.push(new TutorialText(200, 150, 40, 650,
				'자, 그렇다면 레인은 무엇이냐?'
			  + '\n적의 군대는 세 줄을 이루어 달려올거다. 즉 레인은 A, B, C 세 개로 이루어지지!'
			  + '\n만약 네가 찌르기 모션에 레인 A를 설정하고 게임을 시작했다면,'
			  + '\n날 들고 앞으로 찔렀을 경우 레인 A에서 달려오던 적들이 모두 데미지를 받게 된다!'));
			// index 4: 몬스터
			tutorialTextArray.push(new TutorialText(400, 100, 40, 650, 
				'너가 상대하게 될 적이다! 밑에 그리드가 보이나? 적들은 저 칸에 맞추어 달려온다.'
			  + '\n하지만 적에 따라서는 한 번에 몇 칸을 뛰어버리는 애들도 있으니 조심!'
			  + '\n그리고 적의 머리 위에 있는 체력이 보이나? 한 번 휘두를 때 한 칸씩 사라지지.'
			  + '\n하지만 적이 다가올 때까지 적을 없애지 못한다면 네 생명도 하나씩 사라진다구!'));
			// index 5: 생명력
			tutorialTextArray.push(new TutorialText(83, 70, 40, 650,
				'어..어어 비토벤? 우..울고있는거야? 괜찮아..넌 죽지않아! 나를 믿으라구!!!'
			  + '\n진정해 비토벤. 넌 생각보다 쉽게 죽지않아. 이 위에있는 높은음자리표가 보이나?'
			  + '\nn번 연속으로 콤보 공격에 성공하면 하나의 생명을 얻을 수 있다구!'
			  + '\n여기서 콤보 공격이란, 연속으로 리듬에 맞추어 공격을 하는 것을 의미하지!'));
			// index 6: 음표(황금음표 포함) //TODO : 황금음표
			tutorialTextArray.push(new TutorialText(714, 763, 40, 30, 
				'우리가 또 리듬의 전사가 아닌가? 리듬으로 마왕을 무찔러야 하지 않겠는가?'
			  + '\n자, 비트에 맞게 오른쪽에서 흘러나오는 음표가 가운데에 올 때 날 휘둘러라!'
			  + '\n그리고 음표의 색은 너와 네 용병들을 나타낸다! 물론 자신의 차례에 맞게 쳐야하지!'
			  + '\n모두 힘을 합쳐 연속 공격 20번에 성공하면 생명을 하나 얻게 된다는 거라구!'));
			// index 7: 용병, 그리고 마무리
			tutorialTextArray.push(new TutorialText(250, 350, 40, 650, 
				'마지막. 너는 혼자가 아니야 비토벤. 우리는 최대 세 명의 용병과 함께할 수 있어.'
			  + '\n힘들때면 마을로 돌아가 용병을 구하도록 해.'
			  + '\n그리고 바로 나! 이 음잘알 리드미도 있으니까 너무 겁먹을 필요 없다구. 크크크크'
			  + '\n자.. 그럼 시작해 볼까.'));
		}
	},
	
	/*
	 * preload()
	 */
	preload: function() {
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
	},
	/*
	 * create()
	 */
	create: function() {
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.input.onDown.add(gofull, this);
		
		// debug
		game.physics.startSystem(Phaser.Physics.ARCADE);
	    sprite = game.add.sprite(400, 300, 'arrow');
	    sprite.anchor.setTo(0.5, 0.5);
	    game.physics.enable(sprite, Phaser.Physics.ARCADE);
	    sprite.body.allowRotation = false;
		// create leftKey, rightKey
		leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		// 전체화면 적용
		game.input.onDown.add(setFullScreen, this);
		// 튜토리얼 객체 생성
		this.createTutorialText();
		// 튜토리얼임을 안내
		typeWriterFunction('TutorialText', 550, 400, 90);
		// 2초 후 화면 전환
		game.time.events.add(2000, function() {
			showTutorialText(tutorialTextIndex);
		}, self);
	},
	
	/*
	 * update()
	 */
	update: function() {
		// debug
		sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 500);
		/* changetutorialTextIndex(); */
		if (leftKey.isDown) {
			tutorialTextIndex --;
			if(tutorialTextIndex < 0){ tutorialTextIndex = 0; return;}
			showTutorialText(tutorialTextIndex);	
			return;
		}
		else if (rightKey.isDown) {
			tutorialTextIndex ++;
			if(tutorialTextIndex > 7){ tutorialTextIndex = 7; return;}
			showTutorialText(tutorialTextIndex);
			return;
		}
		else {return;}
	},
	render: function() {
		// debug
	    game.debug.spriteInfo(sprite, 32, 32);
	}
}

/*
 * typeWriterFunction(): 타이핑효과 함수 (텍스트값, x위치, y위치, 텍스트 사이즈)
 */
function typeWriterFunction(text, xvalue, yvalue, size) {
	typewriter.init(game, {
		x: xvalue,
		y: yvalue,
		time: 10,
		fontFamily: "neo_font",
		fontSize: size,
		maxWidth: 1400,
		// sound: reg.track,
		text: text
    });
	//타이핑 시작
	typewriter.start();
}

/*
 * setFullScreen(): 전체화면 메소드
 */
function setFullScreen() {
	if (game.scale.isFullScreen) {game.scale.stopFullScreen();}
	else game.scale.startFullScreen(false);
}

/*
 * changetutorialTextIndex(): 좌, 우 버튼을 누를 때마다 튜토리얼의 순서를 감소 또는 증가시키는 메서드
 */
function changetutorialTextIndex() {
	// TODO : if문 통해 적절하지 않은 tutorialTextIndex 리턴할 범위 지정할 것
}

/*
 * showTutorialText(): 튜토리얼(리드미, 말풍선, 텍스트)을 표시하는 메서드
 */
function showTutorialText(tutorialTextIndex) {
	// console and fade in
	console.log('showTutorialText() 진입');
	game.camera.flash(0x000000, 500);
	// set background image
	game.add.sprite(0,0,'stageBG');
	// 리드미
	if (typeof rhythmi !== "undefined") {rhythmi.destroy();}
	rhythmi = game.add.sprite(tutorialTextArray[tutorialTextIndex].rhythmiX, tutorialTextArray[tutorialTextIndex].rhythmiY, 'rhythmi');
		// 시작과 끝은 리드미를 크게 보여준다
		if (tutorialTextIndex == 0 || tutorialTextIndex == tutorialTextArray.length-1) {rhythmi.smoothed = false; rhythmi.scale.set(5);}
		
	var eyeBlink = rhythmi.animations.add('eyeBlink', null, 12, true);
	eyeBlink.play('eyeBlink');
	
		// 모션을 소개할 때(index 2)에는 모션/효과/레인 버튼을 보여준다
		if (tutorialTextIndex == 2) {
			
		}
	
	// 말풍선
	if (typeof dialog !== "undefined") {dialog.destroy();}
	dialog = game.add.sprite(tutorialTextArray[tutorialTextIndex].dialogX, tutorialTextArray[tutorialTextIndex].dialogY, 'dialog');
	dialog.alpha = 0.8;
	
	// 텍스트
	if (typeof typewriter !== "undefined") {typewriter.destroy();}
	if (tutorialTextArray[tutorialTextIndex].dialogY == 650) {textY = 675;} else textY = 55; //다이얼로그가 아래면 텍스트도 아래, 위면 위
	typeWriterFunction(tutorialTextArray[tutorialTextIndex].text, 80, textY, 30);
}

function gofull() {
	if (game.scale.isFullScreen) {
		game.scale.stopFullScreen();
	}
	else {
		game.scale.startFullScreen(false);
	}
}