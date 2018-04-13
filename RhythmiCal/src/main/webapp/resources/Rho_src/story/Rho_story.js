var game = new Phaser.Game(1600, 900, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
	var reg = {};//음악 로드시 저장
	var player;//주인공
	var right;//오른쪽발걸음
	var typewriter = new Typewriter(); // 글자 타이핑 효과
	var npc1;
	var npc2;
	var dialogueBG;
	function preload() {
				
		// 배경화면 로드
		game.load.image("background", "resources/loof_forest.png"); 
	    // 캐릭터 움직이 시트 로드
		game.load.spritesheet('player', 'resources/beatoven.png', 32, 32);
	    //글자  나올때 소리 로드
	    //this.load.audio('track', ['resources/pencilsketching.mp3']);
	
	    //비트맵형 글자폰트 로드
	    game.load.bitmapFont('neo_font', 'resources/neo_font/neo_font.png', 'resources/neo_font/neo_font.fnt');
	    
	    //npc 이미지 로드
		npc1 = this.load.spritesheet('npc1', 'resources/234.png',300,300);
	    npc2 = this.load.spritesheet('npc2', 'resources/234.png',300,300);
	    
	    game.load.image("dialogueLeft", "resources/dialogueLeft.png"); 
	    game.load.image("dialogueRight", "resources/dialogueRight.png"); 
	   
	}

	function create() {

	   //스테이지 1
	typethetext("STAGE1 ",700,400,90);
	//2초있다가  스토리 시작
	game.time.events.add(2000, function () {  //글자 나올때 소리 추가
		//카메라 페이드 인
		game.camera.flash(0x000000, 500);   
		// reg.track = game.add.audio('track');
		  //배경화면 추가
		   var image = game.add.image(0, 0, "background");image.width = game.width;image.height = game.height;
		    
		    ///스프라이트생성
		    player = game.add.sprite(game.width/6,750, 'player', 1);
		    player.smoothed = false;
		    player.scale.set(4);
		    player.anchor.setTo(0,1);
		    player.scale.setTo(10,10);
		    
		    ///오른쪽으로 달려나오는 캐릭터 의 움직임 정의
		    right = player.animations.add('right', [1,2,3,4,5,6,2,3], 10, true);
		   
		   	//캐릭터 이미지시트에있는 오른쪽 발걸음 재생
		    right.play(10,true);
		   	
		   	//실제 캐릭터 화면에서 오른쪽으로 이동
		    var moveToRight =  game.add.tween(player).to({x: game.width/3, y: 750}, 1000, Phaser.Easing.Quadratic.Out, true);
		    
		   	//움직임이 끝나면 animaiontStopped함수 실행  
		   	moveToRight.onComplete.add(animationStopped, this);
			//움직임 enable 정의
		   	game.physics.enable(player, Phaser.Physics.ARCADE);
			
		   	dialogue();}, self);
	  
			
		
	}
	
	
	
	function animationStopped(sprite, animation) {
		
		//캐릭터 발걸음 정지
		right.stop();
	    var txt="밑에 함수를 실행하는데 다음 배열의 데이터로 실행한다."
	    
	    //타이핑메소드로 전달
		typethetext(txt,10,10,45);
				
	    
	}
	function update() {
		//Ajax로 컨트롤러에게 계속 [다음으로 넘어가는지] 묻는다
		
		//if 위에가 예스면
		//밑에 함수를 실행하는데 다음 배열의 데이터로 실행한다.

	}

	function render() {
		//캐릭터의 이미지시트에서 몇번째인가 확인한다.
	   // game.debug.text(player.frame, 32, 32);

	}
	
	//배경음 재생 함수
	
	//텍스트 오버레이 함수
	function dialogue(){
		  /////////////NPC대화 함수///////////////
		//대화할 npc1 생성
		var npc1 = game.add.sprite(100, 300, 'npc1');
	    game.physics.arcade.enableBody(npc1);
	    npc1.anchor.setTo(0, 0);
	    //대화할 npc2 생성       
	    var npc2 = game.add.sprite(game.width-100, 300, 'npc2');
	    game.physics.arcade.enableBody(npc2);
	    npc2.anchor.setTo(1, 0);
	    
	    //so, we change the characers' color to black/grey
	    //N.B. to reset the tint, use tint = 0xffffff
		//this.npc1.tint=0xffffff;
		npc2.alpha = 0;
		npc1.alpha = 0;
		//이미지가 시트로 있으면 몇번째 시트를 사용할 것인가 초기화
        npc1.frame=1;
	    npc2.frame=1;
	    // 1씩 증가하면서 대화문 돌릴꺼임
        var storyOrder=0;
                
        //대화문 어레이 생성
        var storyText = new Array();
       
        //대화문 어레이에 저장
        storyText[0]="어서와 ";
   		storyText[1]="누구지? 어디서 무슨 소리가 들렸는걸?";
        storyText[2]="여기야 친구 나를 잡아";
        storyText[3]="누구죠?";
        storyText[4]="난 칼이야 리듬을 느끼는 칼..";
        storyText[5]="앗";
        storyText[6]="그래 리듬이 느껴지니";
        storyText[7]="내 어꺠가 들썩거리고있어...";
        storyText[8]="그 리듬에 몸을 맡겨봐 친구";
        
        //화자순서 어레이 생성
        var  storyNPCSequence = new Array();
        
        //대화할 순서 저장
        storyNPCSequence[0]=1;
        storyNPCSequence[1]=2;
        storyNPCSequence[2]=1;
        storyNPCSequence[3]=2
        storyNPCSequence[4]=1
        storyNPCSequence[5]=2;
        storyNPCSequence[6]=1;
        storyNPCSequence[7]=2;
        storyNPCSequence[8]=1;
        
      //대화할 때 이미지 시트에서 몇번째 이미지를 로드 할건가 저장
        var storyNPCFrame = new Array();
        
        storyNPCFrame[0]=1;//아직 이미지시트가 없으므로 첫번쨰 프레임만 불러오도록
        storyNPCFrame[1]=1;
        storyNPCFrame[2]=1;
        storyNPCFrame[3]=1;
        storyNPCFrame[4]=1;
        storyNPCFrame[5]=1;
        storyNPCFrame[6]=1;
        storyNPCFrame[7]=1;
        storyNPCFrame[8]=1;
        
        //this.textArea = this.add.text(0, 0, "", styleDescritpion);
        //텍스트 속성 정의
       /*  this.textArea = this.add.bitmapText(0, 0, 'neo_font','',35);
    	this.textArea.anchor.set(0.5);
    	this.textArea.fixedToCamera = true;
    	this.textArea.cameraOffset.x = game.width/2;
    	this.textArea.cameraOffset.y = game.height-200;
    	this.world.bringToTop(this.textArea);
         */
    	
        // x초에 한번씩 function실행
 		game.time.events.loop(3300, function () {
   		//대화타이핑 시작할때 초기화
   		
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
			npc1.frame=storyNPCFrame[storyOrder];
			dialogueBG = game.add.sprite(50,600,'dialogueLeft');
			dialogueBG.width = 1500;
		}
		if(storyNPCSequence[storyOrder]==2) {
			npc2.frame=storyNPCFrame[storyOrder];
			dialogueBG = game.add.sprite(50,600,'dialogueRight');
			dialogueBG.width = 1500;
		}

   		//텍스트 화면에 대화문 어레이에서 문자 불러와서 붙여줌
   		//150, 690  위치에 텍스트 발생
   		typethetext( storyText[storyOrder] , 150,690,45);
   		
   		//대화문 순서 1씩 증가 시킴
   		storyOrder = Math.abs(storyOrder + 1);
   		
   		if (storyOrder == storyText.length){
   			typewriter.destroy();
   			//function() 다음 스테이지로 가는 버튼 생성
   			return;
   		}
   		
   }
   , this);
        
	}
	//애니메이팅 함수
	
	//배경 이미지 그리는 함수
	
	//타이핑효과 함수 (텍스트값,x위치 , y위치)
	function typethetext(txt,xvalue,yvalue,size){
		//글자 타이핑효과 정의
		typewriter.init(game, {
	      x: xvalue,
	      y: yvalue,
	      time: 10,
	      fontFamily: "neo_font",
	      fontSize: size,
	      maxWidth: 1400,
	      //타이핑 소리 줌
	     // sound: reg.track,
	      text: txt
	    });
		//타이핑 시작
	   typewriter.start();
	    
	}