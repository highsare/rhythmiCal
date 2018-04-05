	var game = new Phaser.Game(1024, 576, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
	var reg = {};//음악 로드시 저장
	var player;//주인공
	var right;//오른쪽발걸음
	var typewriter = new Typewriter(); // 글자 타이핑 효과
	var npc1;
	var npc2;
	function preload() {
		
		// 배경화면 로드
		game.load.image("background", "resources/loof_forest.png"); 
	    // 캐릭터 움직이 시트 로드
		game.load.spritesheet('player', 'resources/spaceman.png', 16, 16);
	    //글자  나올때 소리 로드
	    //this.load.audio('track', ['resources/pencilsketching.mp3']);
	
	    //비트맵형 글자폰트 로드
	    game.load.bitmapFont('carrier_command', 'resources/carrier_command.png', 'resources/carrier_command.xml');
	    
	    //npc 이미지 로드
		npc1 = this.load.spritesheet('npc1', 'resources/234.png', 300,380);
	    npc2 = this.load.spritesheet('npc2', 'resources/123.png', 300,380);
	    
	}

	function create() {
		
	   //글자 나올때 소리 추가
	    reg.track = game.add.audio('track');
	  //배경화면 추가
	   var image = game.add.image(0, 0, "background");image.width = game.width;image.height = game.height;
	    
	    ///스프라이트생성
	    player = game.add.sprite(100, 500, 'player', 1);
	    player.smoothed = false;
	    player.scale.set(4);

	    ///오른쪽으로 달려나오는 캐릭터 의 움직임 정의
	    right = player.animations.add('right', [1,2], 10, true);
	   
	   	//캐릭터 이미지시트에있는 오른쪽 발걸음 재생
	    right.play(10,true);
	   	
	   	//실제 캐릭터 화면에서 오른쪽으로 이동
	    var moveToRight =  game.add.tween(player).to({x: 300, y: 500}, 1000, Phaser.Easing.Quadratic.Out, true);
	    
	   	//움직임이 끝나면 animaiontStopped함수 실행  
	   	moveToRight.onComplete.add(animationStopped, this);
		//움직임 enable 정의
	   	game.physics.enable(player, Phaser.Physics.ARCADE);
		
	   		   	
		//대화할 npc1 생성
		this.npc1 = this.add.sprite(100, 100, 'npc1');
	    this.physics.arcade.enableBody(this.npc1);
	    this.npc1.anchor.setTo(0, 0);
	    //대화할 npc2 생성       
	    this.npc2 = this.add.sprite(game.width-100, 100, 'npc2');
	    this.physics.arcade.enableBody(this.npc2);
	    this.npc2.anchor.setTo(1, 0);
	    
	    //so, we change the characers' color to black/grey
	    //N.B. to reset the tint, use tint = 0xffffff
		//this.npc1.tint=0xffffff;
		this.npc2.alpha = 0;
		this.npc1.alpha = 0;
		//이미지가 시트로 있으면 몇번째 시트를 사용할 것인가 초기화
        this.npc1.frame=1;
	    this.npc2.frame=1;
	    // 1씩 증가하면서 대화문 돌릴꺼임
        this.storyOrder=0;
                
        //대화문 어레이 생성
        this.storyText = new Array();
        
        //대화문 어레이에 저장
        this.storyText[0]="gogogogogogoogogoogogoogogo";
   		this.storyText[1]="WHY?WHY?WHY?WHY?WHY?WHY?WHY?WHY?WHY?WHY?WHY?WHY?";
        this.storyText[2]="IT TIME TO GO MEN";
        this.storyText[3]="sure?";
        this.storyText[4]="WHAT AR YOU WAITNG FOR";
        this.storyText[5]="but ........................";
        this.storyText[6]="iam YOURS TAKE ME IN";
        this.storyText[7]="hmmmmm?";
        this.storyText[8]="YOU KNOW IAM VERY POWERFUL KNIFE";
        
        //화자순서 어레이 생성
        this.storyNPCSequence = new Array();
        
        //대화할 순서 저장
        this.storyNPCSequence[0]=1;
        this.storyNPCSequence[1]=2;
        this.storyNPCSequence[2]=1;
        this.storyNPCSequence[3]=2
        this.storyNPCSequence[4]=1
        this.storyNPCSequence[5]=2;
        this.storyNPCSequence[6]=1;
        this.storyNPCSequence[7]=2;
        this.storyNPCSequence[8]=1;
        
      //대화할 때 이미지 시트에서 몇번째 이미지를 로드 할건가 저장
        this.storyNPCFrame = new Array();
        
        this.storyNPCFrame[0]=1;//아직 이미지시트가 없으므로 첫번쨰 프레임만 불러오도록
        this.storyNPCFrame[1]=1;
        this.storyNPCFrame[2]=1;
        this.storyNPCFrame[3]=1;
        this.storyNPCFrame[4]=1;
        this.storyNPCFrame[5]=1;
        this.storyNPCFrame[6]=1;
        this.storyNPCFrame[7]=1;
        this.storyNPCFrame[8]=1;
        
        //var styleDescritpion = {font: '35px Arial', fill: '#ffffff', align: 'center', fontWeight: 'bold', stroke: '#ffffff', strokeThickness: 0};
    	
        //this.textArea = this.add.text(0, 0, "", styleDescritpion);
        //텍스트 속성 정의
        this.textArea = this.add.bitmapText(0, 0, 'carrier_command','',35);
    	this.textArea.anchor.set(0.5);
    	this.textArea.fixedToCamera = true;
    	this.textArea.cameraOffset.x = game.width/2;
    	this.textArea.cameraOffset.y = game.height-200;
    	this.world.bringToTop(this.textArea);
        
        //3초에 한번씩 function실행
 		this.game.time.events.loop(3000, function () {
   		
   		//모든 화자 이미지 투명화
		this.npc1.alpha=0;
		this.npc2.alpha=0;
		
		//대화순서에 따라서 투명도 100으로 나타냄
		if(this.storyNPCSequence[this.storyOrder]==1) this.npc1.alpha=100;
		if(this.storyNPCSequence[this.storyOrder]==2) this.npc2.alpha=100;
		
		//대화순서 되면 가장 위로 올림
		if(this.storyNPCSequence[this.storyOrder]==1) this.npc1.bringToTop();
		if(this.storyNPCSequence[this.storyOrder]==2) this.npc2.bringToTop();
		
		//대화순서에 따라서 이미지시트가 있다면 몇변째 프레임을 쓸것인지 어레이에서 불러와서 넣음
		if(this.storyNPCSequence[this.storyOrder]==1) this.npc1.frame=this.storyNPCFrame[this.storyOrder];
		if(this.storyNPCSequence[this.storyOrder]==2) this.npc2.frame=this.storyNPCFrame[this.storyOrder];
	

   		//텍스트 화면에 대화문 어레이에서 문자 불러와서 붙여줌
   		this.textArea.text = this.storyText[this.storyOrder];
   		
   		//대화문 순서 1씩 증가 시킴
   		this.storyOrder = Math.abs(this.storyOrder + 1);
   		
   		//캔버스 에서 가장 z값이 가장 위 에 텍스트 나타나도록 함.
   		this.world.bringToTop(this.textArea);
   }
   , this);
	   	
	}
	
	function animationStopped(sprite, animation) {
		
		//글자 나오는 곳 뒷배경
		//this.add.image(150, 0, "textBox");
	    
		//캐릭터 발걸음 정지
		right.stop();
	    
		//글자 타이핑효과 정의
		typewriter.init(game, {
	      x: 150,
	      y: 10,
	      time: 10,
	      fontFamily: "carrier_command",
	      fontSize: 20,
	      maxWidth: 500,
	      //타이핑 소리 줌
	     // sound: reg.track,
	      text: "Welcome ! coffee is the thing i like the best. let me drink some cup of a coffee......"
	    });
		//타이핑 시작
	    typewriter.start();
	    
	}
	function update() {
		//Ajax로 컨트롤러에게 계속 [다음으로 넘어가는지] 묻는다
		
		//if 위에가 예스면
		//밑에 함수를 실행하는데 다음 배열의 데이터로 실행한다.

	}

	function render() {
		//캐릭터의 이미지시트에서 몇번째인가 확인한다.
	    game.debug.text(player.frame, 32, 32);

	}
	
	//배경음 재생 함수
	
	//텍스트 오버레이 함수
	function dialogue(){

        
	}
	//애니메이팅 함수
	
	//배경 이미지 그리는 함수

