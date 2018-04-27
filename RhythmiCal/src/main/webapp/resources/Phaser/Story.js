/** 게임의 스토리 진행을 담당하는 중요한 화면입니다.
 * 미연시식 UI를 제공하며 호출되는 빈도가 가장 높습니다.
 * 1.DB에서 데이터와 함께 초기화 됨
 * 2.데이터 초기화
 * 3.텍스트, 배경음, 효과음 등 실행
 * 4.그 후 적절한 STATE 실행 ( 초기화 될 당시에 포함되어 있습니다)
 */
	var reg = {};//음악 로드시 저장
	var player1;//주인공
	var right;//오른쪽발걸음
	var typewriter = new Typewriter(); // 글자 타이핑 효과
	var npc1;
	var npc2;
	var dialogueBG;
	var cursors;
	var storyOrder;
	var npc1, npc2;
	var storyText, storyNPCSequence;
	var music;
var Story = function(game){};

Story.prototype = {
	preload: function() {
		//배경음악
		game.load.audio('story_music',"resources/Audios/bgm/story_bgm_1.mp3");
		// 배경화면 로드
		game.load.spritesheet("story_1_back", "resources/Images/story/story_1_back.png",1600,900); 
	    // 캐릭터 움직이 시트 로드
		game.load.spritesheet('player1', 'resources/Images/characters/beatoven_1.png', 32, 32);
	    //비트맵형 글자폰트 로드
	    game.load.bitmapFont('neo_font', 'resources/neo_font/neo_font.png', 'resources/neo_font/neo_font.fnt');
	    //npc 이미지 로드
		npc1 = game.load.spritesheet('npc1', 'resources/Images/story/234.png',300,300);
	    npc2 = game.load.spritesheet('npc2', 'resources/Images/story/234.png',300,300);
	    
	    //텍스트 박스
	    game.load.image("textbox", "resources/Images/story/textbox.png"); 
	    
	},
	create: function() {
		this.music = game.add.sound('story_music');
		this.music.play();
		
		
		cursors = game.input.keyboard.createCursorKeys();
		this.dialogueImport();
	   //스테이지 1
	typethetext("STAGE1 ",game.world.centerX-150, game.world.centerY- 50,90);
	//2초있다가  스토리 시작
	game.time.events.add(2000, function () {  //글자 나올때 소리 추가
		//카메라 페이드 인
		game.camera.flash(0x000000, 500);   
	
		typewriter.destroy();
		
		var txt="어느 숲 속"
    	typethetext(txt,10,10,45,1);

		// reg.track = game.add.audio('track');
		  //배경화면 추가
		   var backimage = game.add.sprite(0, 0, "story_1_back",2);
		   var hikari = backimage.animations.add('hikari');
		   hikari.play(2,true);
		    ///스프라이트생성
		    player1 = game.add.sprite(0,830, 'player1', 1);
		    player1.smoothed = false;
		    player1.scale.set(5);
		    player1.anchor.setTo(0,1);
		    
		    ///오른쪽으로 달려나오는 캐릭터 의 움직임 정의
		    right = player1.animations.add('right', [1,2,3,4,5,6,1], 10, true);
		   
		   	//캐릭터 이미지시트에있는 오른쪽 발걸음 재생
		    right.play(10,true);
		   	
		   	//실제 캐릭터 화면에서 오른쪽으로 이동
		    var moveToRight =  game.add.tween(player1).to({x: game.width/3, y: 830}, 3000, Phaser.Easing.Quadratic.Out, true);
		    
		   	//움직임이 끝나면 animaiontStopped함수 실행  
		   	moveToRight.onComplete.add(this.animationStopped, this);
			//움직임 enable 정의
		   	game.physics.enable(player1, Phaser.Physics.ARCADE);
			
		   	storyOrder = 0;
		   	
		   
		   	
		   	
	}, this);
	  
	   	
	},
	update: function() {
		//Ajax로 컨트롤러에게 계속 [다음으로 넘어가는지] 묻는다
		//if 위에가 예스면
		//밑에 함수를 실행하는데 다음 배열의 데이터로 실행한다.
		
		//앱에서 o누르면????   키보트 아래 누르면 다음 대화 
		if(cursors.down.isDown || game.input.activePointer.leftButton.isDown == true) {
			//어레이가 다 담겼다면 그때 적용되게끔  	
			if (typeof storyOrder !== "undefined"){
				//대화에서  번째가 마지막이 아니라면 다음 대화로
				  	if (storyOrder != storyText.length-1) {
						storyOrder += 1;
					  	this.dialogueExport(storyOrder);
					  	//마지막 대화라면 빠져나가기
					}else if (storyOrder == storyText.length-1){
						this.outfromstory();
					}
			  	}
		  //앱에서 x 누르면??? 키보드 오른쪽 누르면 스토리에서 나가기
		 }else if (cursors.right.isDown){
			 this.outfromstory();
		 }
		


	},
	render: function() {
		//현재 대화 몇번째인가 체크 하려고 만듬.
	    game.debug.text("storyOrder = "+ storyOrder, 32, 132);

	},
	animationStopped: function(sprite, animation) {
		
		//캐릭터 발걸음 정지
		right.stop();
		game.time.events.add(1000, function () { 
	   		
	   		this.dialogueExport(storyOrder);
	   	
	   	}, this);
	},
	
	//페이드 아웃하기
	 outfromstory: function(){
		//2초뒤 페이드 아웃
		game.camera.fade('#000000',1000);
		//게임 시작
		game.camera.onFadeComplete.add(this.gotostage,this);
	//모든 elements 삭제
	},
	
	//게임으로 이동 
	 gotostage: function(){
		//모든 게임 elements 날리기.
		game.world.removeAll();
		this.music.stop();
		
		game.state.start('Ending');
		//game.state.start('stage'+i);  //예를 들어 stage1 
		
	},
	//텍스트 오버레이 함수
	 dialogueImport: function(){
		
		  /////////////NPC대화 함수///////////////
		//대화할 npc1 생성
		npc1 = game.add.sprite(100, 300, 'npc1');
	    game.physics.arcade.enableBody(npc1);
	    npc1.anchor.setTo(0, 0);
	    //대화할 npc2 생성       
	    npc2 = game.add.sprite(game.width-100, 300, 'npc2');
	    game.physics.arcade.enableBody(npc2);
	    npc2.anchor.setTo(1, 0);
	    
		npc1.alpha = 0;
		npc2.alpha = 0;
		//이미지가 시트로 있으면 몇번째 시트를 사용할 것인가 초기화
	    // 1씩 증가하면서 대화문 돌릴꺼임
        
                
        //대화문 어레이 생성
        storyText = new Array();
       
        //대화문 어레이에 저장
        storyText[0]="어서와 ";
   		storyText[1]="누구지? 어디서 무슨 소리가 들렸는걸?";
        storyText[2]="여기야 친구 나를 잡아";
        storyText[3]="누구죠?";
        storyText[4]="난 칼이야 리듬을 느끼는 칼";
        storyText[5]="앗";
        storyText[6]="그래 리듬이 느껴지니";
        storyText[7]="내 어꺠가 들썩거리고있어요...";
        storyText[8]="그 리듬에 몸을 맡겨봐 친구  그럼 게임을 시작하지";
        
        //화자순서 어레이 생성
        storyNPCSequence = new Array();
        
        //대화할 순서 저장
        storyNPCSequence[0]=2;
        storyNPCSequence[1]=1;
        storyNPCSequence[2]=2;
        storyNPCSequence[3]=1;
        storyNPCSequence[4]=2;
        storyNPCSequence[5]=1;
        storyNPCSequence[6]=2;
        storyNPCSequence[7]=1;
        storyNPCSequence[8]=2;
  

		},//dialogue저장문 끝
		
		dialogueExport: function(storyOrder){
			
			 // x초에 한번씩 function실행
	        
	 		//대화문이 있으면 삭제
	 		if(typeof typewriter !== "undefined"){
	 			typewriter.destroy();
	 		}
	   		
	   		//만약 dialogueBG가 있다면 삭제
	 		if(typeof dialogueBG !== "undefined"){
	 			dialogueBG.destroy();
	 		}
	   		//모든 화자 이미지 투명화
			npc1.alpha=0;
			npc2.alpha=0;
			
			//대화순서에 따라서 투명도 100으로 나타냄
			if(storyNPCSequence[storyOrder]==1) npc1.alpha=100;
			if(storyNPCSequence[storyOrder]==2) npc2.alpha=100;
			
			//대화순서 되면 가장 위로 올림
			if(storyNPCSequence[storyOrder]==1) npc1.bringToTop();
			if(storyNPCSequence[storyOrder]==2) npc2.bringToTop();
			
			//대화순서에 따라서 이미지시트가 있다면 몇변째 프레임을 쓸것인지 어레이에서 불러와서 넣음
			if(storyNPCSequence[storyOrder]==1) {
				dialogueBG = game.add.sprite(50,650,'textbox');
				dialogueBG.width = 1500;
			}
			if(storyNPCSequence[storyOrder]==2) {
				dialogueBG = game.add.sprite(50,650,'textbox');
				dialogueBG.width = 1500;
			}

	   		//텍스트 화면에 대화문 어레이에서 문자 불러와서 붙여줌
	   		//150, 690  위치에 텍스트 발생
	 
			switch (storyOrder%2) {
					case 0:
						typethetext(storyText[storyOrder], 1500-(50*storyText[storyOrder].length), 710);
						break;
					
					default:
						typethetext(storyText[storyOrder], 150, 710);
						break;
					}


			
			
		},
	
		//타이핑효과 함수 (텍스트값,x위치 , y위치)
		typethetext: function (txt, xvalue, yvalue, size,speed) {
			//글자 타이핑효과 정의
			typewriter.init(game, {
				x : xvalue,
				y : yvalue,
				time : speed || 9,
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
}