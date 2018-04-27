/** 게임의 스토리 진행을 담당하는 중요한 화면입니다.
 * 미연시식 UI를 제공하며 호출되는 빈도가 가장 높습니다.
 * 1.DB에서 데이터와 함께 초기화 됨
 * 2.데이터 초기화
 * 3.텍스트, 배경음, 효과음 등 실행
 * 4.그 후 적절한 STATE 실행 ( 초기화 될 당시에 포함되어 있습니다)
 */
//스토리 넘버
var storynum = 1;
	var reg = {};//음악 로드시 저장
	var typewriter = new Typewriter(); // 글자 타이핑 효과
	var cursors;
	var dialogueBG;
	var storyOrder;
	var npc;
	//npc 나타날 곳
	var left=100, right=1100;
	var switchingleftright;
	//대화문 어레이 생성
	var storyText;
	//대화문 테이블
	var arr;
	//캐릭터 이름
	var characterName;
	//배경음악
	var bgMusicName;
	//소리 효과
	var soundEffect;
	//배경이미지
	var bgImgName;
	//배경 정보
	var bgInfo;
	//실제쓰인 배경과 그 효과
	var backimag,hikari;
	var Story = function(game){};
Story.prototype = {
	preload: function() {
		this.loadStoryContents();
		
		
		//배경음악 일단 다 로드
		game.load.audio('숲속',"resources/Audios/bgm/story/숲속.mp3");
		game.load.audio('레코드판',"resources/Audios/bgm/story/레코드판.mp3");
		game.load.audio('마을',"resources/Audios/bgm/story/마을.mp3");
		game.load.audio('비토벤의 집',"resources/Audios/bgm/story/비토벤의 집.mp3");
		game.load.audio('적의 막사',"resources/Audios/bgm/story/적의 막사.mp3");
		game.load.audio('노비토의 막사',"resources/Audios/bgm/story/노비토의 막사.mp3");
		game.load.audio('Dok3의 집',"resources/Audios/bgm/story/Dok3의 집.mp3");
		
		//음향효과
		game.load.audio('노크소리',"resources/Audios/bgm/story/노크소리.mp3");
		game.load.audio('잔잔한 음악',"resources/Audios/bgm/story/잔잔한 음악.mp3");
		
		// 배경화면 로드
		game.load.spritesheet("숲속", "resources/Images/story/bgimg/숲속.png",1600,900);
		game.load.spritesheet("레코드판", "resources/Images/story/bgimg/레코드판.png",1600,900);
		game.load.spritesheet("마을", "resources/Images/story/bgimg/마을.png",1600,900);
		game.load.spritesheet("비토벤의 집", "resources/Images/story/bgimg/비토벤의 집.png",1600,900);
		game.load.spritesheet("적의 막사", "resources/Images/story/bgimg/적의 막사.png",1600,900);
		game.load.spritesheet("노비토의 막사", "resources/Images/story/bgimg/노비토의 막사.png",1600,900);
		game.load.spritesheet("Dok3의 집", "resources/Images/story/bgimg/Dok3의 집.png",1600,900);
		
		//npc 이미지 로드
		game.load.image('???', 'resources/Images/story/npc/???.png',300,300);
		game.load.image('Dok3', 'resources/Images/story/npc/Dok3.png');
		game.load.image('그녀', 'resources/Images/story/npc/그녀.png');
		game.load.image('나보', 'resources/Images/story/npc/나보.png');
		game.load.image('노비토', 'resources/Images/story/npc/노비토.png');
		game.load.image('리드미', 'resources/Images/story/npc/리드미.png');
		game.load.image('마을 사람 1', 'resources/Images/story/npc/마을 사람 1.png');
		game.load.image('마을 사람 2', 'resources/Images/story/npc/마을 사람 2.png');
		game.load.image('마을 사람들', 'resources/Images/story/npc/마을 사람들.png');
		game.load.image('마을 소년', 'resources/Images/story/npc/마을 소년.png');
		game.load.image('부사관', 'resources/Images/story/npc/부사관.png');
		game.load.image('비토벤', 'resources/Images/story/npc/비토벤.png');
		game.load.image('월량풍', 'resources/Images/story/npc/월량풍.png');
		game.load.image('적군a', 'resources/Images/story/npc/적군a.png');
		game.load.image('적군b', 'resources/Images/story/npc/적군b.png');

		
		
		
	    //비트맵형 글자폰트 로드
	    game.load.bitmapFont('neo_font', 'resources/neo_font/neo_font.png', 'resources/neo_font/neo_font.fnt');
	    
	    //텍스트 박스
	    game.load.image("textbox", "resources/Images/story/textbox.png"); 
	    
	},
	create: function() {
		
		
		cursors = game.input.keyboard.createCursorKeys();
		typethetext("STORY1 ",game.world.centerX-150, game.world.centerY- 50,90);
		
		//2초있다가  스토리 시작
		game.time.events.add(2000, function () {  //글자 나올때 소리 추가
		
			//카메라 페이드 인
			game.camera.flash(0x000000, 500);   
		
			typewriter.destroy();
			
		   	storyOrder = 0;
		   	
	   		this.dialogueExport(storyOrder);
		   	
		   	
	}, this);
	  
	   	
	},
	update: function() {
	
		//앱에서 o누르면????   키보트 아래 누르면 다음 대화 
		if(cursors.down.isDown || game.input.activePointer.leftButton.isDown == true) {
			//어레이가 다 담겼다면 그때 적용되게끔  	
			if (typeof storyOrder !== "undefined"){
				//대화에서  번째가 마지막이 아니라면 다음 대화로
				  	if (storyOrder != arr.length-1) {
						storyOrder += 1;
					  	this.dialogueExport(storyOrder);
					  	//마지막 대화라면 빠져나가기
					}else if (storyOrder == arr.length-1){
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
	    game.debug.text("현재 storyOrder 확인 = "+ storyOrder, 32, 132);
	    
	    game.debug.text(storynum +"스토리 대화 갯 수 = " + arr.length, 32, 162);
	},
	
	//페이드 아웃하기
	 outfromstory: function(){
		//2초뒤 페이드 아웃
		game.camera.fade('#000000',1000);
		//게임 시작
		game.camera.onFadeComplete.add(this.gotostage,this);
	},
<<<<<<< HEAD
=======
	
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
>>>>>>> a9dc7ce071205d53b8feb602d661d78ac8a28f2c
		
		dialogueExport: function(storyOrder){
			alert(storyOrder);
	        
	 		//대화문이 있으면 삭제
	 		if(typeof typewriter !== "undefined"){
	 			typewriter.destroy();
	 		}
	   		//만약 dialogueBG가 있다면 삭제
	 		if(typeof dialogueBG !== "undefined"){
	 			dialogueBG.destroy();
	 		}//만약 backimage가 있다면 삭제
	 		if(typeof backimage !== "undefined"){
	 			backimage.destroy();
	 		}
	 		
	 		
	 		//배경음악
	 		if(storyOrder == 0){
	 			bgMusicName = arr[storyOrder].bgImgName;
		 		this.music = game.add.sound(bgMusicName);
				this.music.play();
				//음악 반복
				this.music.loopFull();
				console.log("배경 음악 재생 = " + bgMusicName);
	 		}
	 		//배경음악 바뀜
	 		else if(bgMusicName != arr[storyOrder].bgImgName){
	 			this.music.stop();
	 			bgMusicName = arr[storyOrder].bgImgName;
		 		this.music = game.add.sound(bgMusicName);
				this.music.play();
				this.music.loopFull();
				console.log("배경 음악 재생 = " + bgMusicName);
	 		}
	 		//음악 효과
	 		if(arr[storyOrder].bgMusicName != "null"){
	 			this.music = game.add.sound(arr[storyOrder].bgMusicName).play();
	 			
	 			console.log("음악 효과 재생 =" + arr[storyOrder].bgMusicName);
	 		}
	 		
			//배경이미지
			bgImgName = arr[storyOrder].bgImgName;
		    backimage = game.add.sprite(0, 0, bgImgName,2);
		    hikari = backimage.animations.add('hikari');
		    hikari.play(2,true);
		    console.log("배경이미지 = " + bgImgName);
		    
		    //대화할 npc 생성
		 if(storyOrder == 0){
			 characterName = arr[storyOrder].characterName;
			 switchingleftright = left
			    npc = game.add.sprite(switchingleftright, 300, characterName);
			    console.log("npc 등장 = " + characterName);
		 }else if(characterName == arr[storyOrder].characterName){
			 	npc = game.add.sprite(switchingleftright, 300, characterName);
			    console.log("npc 등장 = " + characterName);
		 }else if(characterName != arr[storyOrder].characterName){
			 
			 if(switchingleftright == left){ 
				 switchingleftright = right;
			 }else if(switchingleftright == right){
				 switchingleftright = left;
			 }
			    characterName = arr[storyOrder].characterName;
			    npc = game.add.sprite(switchingleftright, 300, characterName);
			    console.log("npc 등장 = " + characterName);
		    }
		    //텍스트박스
			dialogueBG = game.add.sprite(50,650,'textbox');
			dialogueBG.width = 1500;

			typethetext(arr[storyOrder].characterName + " : "+ arr[storyOrder].content + "  >>", 100, 700,50);
			
			//배경 장소 정보 좌상단에 띄우기
	 		//if(storyOrder == 0){
	 			bgInfo = game.add.bitmapText(50, 50, 'neo_font',arr[storyOrder].bgImgName,50);
	 			console.log("배경 정보  = " + arr[storyOrder].bgImgName);
	 		/*}else if( bgImgName != arr[storyOrder].bgImgName ){
	 			bgInfo.destroy(); 
	 			bgInfo = game.add.bitmapText(50, 50, 'neo_font',arr[storyOrder].bgImgName,50);
	 			console.log("배경 정보  = " + arr[storyOrder].bgImgName);
	 		}*/
	 		
		},
	
		//타이핑효과 함수 (텍스트값,x위치 , y위치)
		typethetext: function (txt, xvalue, yvalue, size) {
			//글자 타이핑효과 정의
			typewriter.init(game, {
				x : xvalue,
				y : yvalue,
				time :  50 ,
				fontFamily : "neo_font",
				fontSize : size || 35,
				maxWidth : 1600,
				//타이핑 소리 줌
				// sound: reg.track,
				text : txt
			});
			//타이핑 시작
			typewriter.start();

		},
		//DB에서 대화문 불러오기
		loadStoryContents: function(){ 
			$.ajax({
				url : 'loadStoryContents', 
				type : 'post',
				dataType : 'json',
				data: {storynum : storynum},
				/*cache : false,
				async : false,*/
				success:function(arrtest){
					storyText = new Array();
					arr = new Array();
					arr = arrtest;
					console.log(" 스토리 대화문 컬럼 수 = " + arr.length);
					
				},error: function(){
					alert("대화문 임포트 에러");
				}

			});
			
		
		},

		//게임으로 이동 
		 gotostage: function(){
			//모든 게임 elements 날리기.
			game.world.removeAll()
			this.music.stop();
			
			//game.state.start('Ending');
			//game.state.start('stage'+i);  //예를 들어 stage1 
			
		}
		
}