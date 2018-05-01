/** 멀티플레이어 추가, 모션 설정, 저장 등 여러가지 정비가 가능한 장소입니다.
 * 기존 유저 접속시 시작 지점이며 스토리와 함께 굉장히 자주 호출됩니다.
 * 1.DB에서 데이터 받음
 * 2.데이터 초기화
 * 3.용병소에서는 코드를 발급하여 멀티플레이를 지원한다.
 * 4.비토벤의 집에서는 저장 및 종료가 가능하다.
 * 5.작업실에서는 다음 스테이지를 위해 들고갈 모션의 설정이 가능하다.
 * 6.마을 입구에서 다음 스테이지를 시작할 수 있다.
 * 7.이 부분에서는 입력 컨트롤러가 가상 콘솔로 변화한다.
 */

var text1,text2,message,exit,p_back,m_back;
var cursors;
var point;
var image;
var x = 103;
var y = 204;
var inout = 0;
var player1,player2,player3,player4;
var isEntered = false;
var villCnt = 0;
var tween;
var key1;
var bgd;
var textboard, start;
var neon,board,rdm;
var e_select,sprite;
var key; // 키보드 버튼
var depth; // 작업소 깊이
var square,squareX, squareY; // 스퀘어의 위치(좌표)를 나타내는 변수
var buttonX=810, buttonY=500; // 모션, 효과, 레인 스프라이트의 위치(좌표)를 나타내는 변수
var buttonFocus; // 현재 버튼이 몇 번에 있는가
var motion; // 모션을 담는 배열
var m_back; // 서브메뉴 배경
var turn1, turn2, turn3, turn4, turn5, turn6; // 모션(1~3) 및 레인(4~6)을 교체할 카운터
var button1, button2, button3, lane1, lane2, lane3; 
var singleLane, doubleLane; // 싱글레인 및 더블레인 배열
var temp;
var descText; // 모션 설명하는 비트맵 텍스트 변수
var desctextX = 1180;
var desctextY = 550;
var descBackground;
var beatoven_walk;
var btnSound, doorOpen, doorClose, multiPlus; // 버튼 클릭, 문 열기, 문 닫기 사운드, 멀티 추가 사용
var descArray = [ '[찌르기]\nTriple Attack:\n공격력이\n3배로 증가'
				, '[올려치기]\nKnock Down:\n적을 잠시\n뒤로 가게 하는 효과'
				, '[내려치기]\nStun:\n적을 잠시 \n멈추게 하는 효과'
				, '[좌로치기]\n2 lanes:\n두 개의 레인에\n동시 공격'
				, '[우로치기]\n2 lanes:\n두 개의 레인에\n동시 공격'];

var Village = function(game){};

Village.prototype = {  
preload : function() {
   game.world.removeAll();
   // 깊이를 1로 초기화  
   depth = 0;
   start = null;
   
   // 진주 이미지   
   // 마을 이미지
   game.load.image('menu_super_back', 'resources/Images/town/townImg/menu_0_background.png' );
   game.load.image('beverlyills', 'resources/Images/town/townImg/menu_0_beverlyills.png' );
   game.load.image('studio', 'resources/Images/town/townImg/menu_1_studio.png' );
   game.load.image('mercenary', 'resources/Images/town/townImg/menu_2_mercenary.png' );
   game.load.image('nextstage', 'resources/Images/town/townImg/menu_3_nextstage.png' );
   game.load.image('home', 'resources/Images/town/townImg/menu_4_home.png' );
   game.load.image('border', 'resources/Images/town/townImg/border.png'); 
   game.load.image('textboard','resources/Images/town/townImg/textboard.png')
   game.load.image('myroom','resources/Images/town/townImg/myroom.png' ) // 내방 이미지
   game.load.image('hand','resources/Images/town/townImg/hand.png' ); //스마트폰 들고있는 이미지 로드
   game.load.image('finish','resources/Images/town/townImg/black.png' ); //종료시 fade out될 검정 배경 이미지 로드
   game.load.image('select','resources/Images/town/townImg/select.png' );//선택 빨간 테두리
   game.load.image('menu_sub_back','resources/Images/town/townImg/menu_back.png' ); //Enter 눌렀을 때 서브메뉴 배경
   game.load.image('pub','resources/Images/town/townImg/mercenery.png' ); //용병소 이미지
   game.load.image('worksplace', 'resources/Images/town/townImg/office.png'); //작업소 이미지
   game.load.image('exit','resources/Images/town/townImg/exit.png' ); //내방에서의 종료 버튼 이미지
   game.load.image('exit_push', 'resources/Images/town/townImg/exit_push.png');
   game.load.image('e_select','resources/Images/town/townImg/exit_line.png' ); //종료 버튼 감싸고 있는 선택 이미지
   game.load.image('board','resources/Images/town/townImg/board.png' );
   game.load.image('neon','resources/Images/town/townImg/neonboard.png' );
   game.load.image('front','resources/Images/town/townImg/front.png' );
   game.load.image('player_back','resources/Images/town/townImg/player_back.png' );
   game.load.image('start', 'resources/Images/town/townImg/start.png');
   game.load.image('start_push', 'resources/Images/town/townImg/start_push.png');
   game.load.image('mm','resources/Images/town/townImg/mm.png');
   game.load.spritesheet('beatoven_walk', 'resources/Images/town/townImg/beatoven_walk.png', 32, 32, 6); // 비토벤 스프라이트시트
   
   game.load.audio('townBGM','resources/Audios/bgm/village/bgm_village.mp3');	//마을브금
   game.load.audio('btnSound','resources/Audios/effectSound/village/effect_village_button_click.mp3'); //버튼 클릭
   game.load.audio('door_open','resources/Audios/effectSound/village/effect_village_door_open.wav'); // 문여는 소리
   game.load.audio('door_close','resources/Audios/effectSound/village/effect_village_door_close.mp3'); //문닫는소리
   game.load.audio('multi_plus','resources/Audios/effectSound/village/effect_village_multi_plus.mp3');
   
   game.load.bitmapFont('neo_font', 'resources/neo_font/neo_font.png', 'resources/neo_font/neo_font.fnt');
   
   //멀티 플레이어 표시
   game.load.image('player1','resources/Images/town/townImg/player1.png');
   game.load.image('player2','resources/Images/town/townImg/player2.png');
   game.load.image('player3','resources/Images/town/townImg/player3.png');
   game.load.image('player4','resources/Images/town/townImg/player4.png');
   
   
   // 레인 스프라이트 로드
   game.load.spritesheet('A', 'resources/Images/town/produceRoom/A.png', 100, 100);
   game.load.spritesheet('B', 'resources/Images/town/produceRoom/B.png', 100, 100);
   game.load.spritesheet('C', 'resources/Images/town/produceRoom/C.png', 100, 100);
   game.load.spritesheet('AB', 'resources/Images/town/produceRoom/AB.png', 100, 100);
   game.load.spritesheet('BC', 'resources/Images/town/produceRoom/BC.png', 100, 100);
   game.load.spritesheet('CA', 'resources/Images/town/produceRoom/CA.png', 100, 100);
   
   // 모션 및 효과 스프라이트 로드
   game.load.spritesheet('motion_effect', 'resources/Images/town/produceRoom/motion_effect.png', 60, 120);
   
   // 모션 설명 배경이미지
   game.load.spritesheet('descBackground', 'resources/Images/town/produceRoom/descText_background.png', 100, 80);
   
   // 네모 테두리 로드
   game.load.spritesheet('square', 'resources/Images/town/produceRoom/square.png', 100, 100);
},
create: function() {
   //마을 배경
   bgd = game.add.image(0, 0, 'mm');
   bgd.alpha = 0.5;
   bgd.scale.set(1);
   
   //마을BGM
   var townbgm = game.add.audio('townBGM');
   townbgm.loopFull();
   townbgm.play("",0,0.2);
   
   //버튼 클릭, 문 열기, 문 닫기 사운드 추가 
   btnSound = game.add.audio('btnSound');
   doorOpen = game.add.audio('door_open');
   doorClose = game.add.audio('door_close');
   multiPlus = game.add.audio('multi_plus');
   
   //메뉴 이미지 지정한 좌표에 출력
   var superMenu = game.add.image(60, 70, 'menu_super_back'); superMenu.scale.set(0.9); superMenu.alpha = 0.8;
   var beveryills = game.add.image(135, 20, 'beverlyills'); beveryills.scale.set(0.9);
   var studio = game.add.image(133, 223, 'studio'); studio.scale.set(0.9);
   var mercenary = game.add.image(137, 335, 'mercenary'); mercenary.scale.set(0.9);
   var home = game.add.image(133, 552, 'home'); home.scale.set(0.9);
   var nextstage = game.add.image(133, 442, 'nextstage'); nextstage.scale.set(0.9);
   
   //첫 메뉴를 가리키고 있는 빨간색 테두리 출력
   point = game.add.image(x, y, 'select');
   point.scale.set(0.9);
    
   p_back = game.add.image(80, 710, 'player_back');
   p_back.scale.set(0.85);
   p_back.alpha = 0.8;
   
   player1 = game.add.image(130, 765, 'player1');
   player1.scale.set(0.4);
   
   var text = game.add.bitmapText(130,720, 'neo_font', 'PLAYER CONNECTION', 35);
   
   playerCount();
},
update: function() {
	   // 게임 실행 중에 항상 key 값을 받는다. 입력한 키에 따라 readKey()가 키 별 string을 반환한다. (누르는 시점에만 반환된다.)
	   villCnt++
	   if (villCnt % 6 == 0) {
	      readKey();
	   }
	   if (villCnt % 12 == 0) {
	      villCnt = 0;
	      multiconnection();      
	   }
	}
}

/*
 * readKey(): 키보드 키를 읽어들이는 메소드
 */
function readKey() {
    $.ajax({
      url: 'requestConsole'
      ,success: function(inputKey) {

        console.log(inputKey);

         if (inputKey != "NOTHING") {
            switch (depth) {
            // 버튼을 움직이는 단계
            case 0:
               console.log('depth: 0');
               moveMenu(inputKey);
               break;
            case 1:
               console.log('depth: 1');
               moveButtonFocus(inputKey); // 버튼 상하좌우 이동
               break;
            // 모션을 움직이는 단계
            case 2:
               console.log('depth: 2'); 
               moveContent(buttonFocus,inputKey); // 모션 및 레인 좌우 이동
               break;
            case 3:
               console.log('depth: 3');
               goHome(inputKey);
               break;
            case 4:
               console.log('depth: 4');
               gamestart(inputKey);
               break;
            }
         }
      }
      ,error: function(){}
   });
   return ""; 
}
 
 

/*
 * Motion(int index, String name, String effect, String lane, boolean selected): Motion 객체 생성자
 */
function Motion(name, effect, lane) {
    // parameter of constructor
    this.name = name;
    this.effect = effect;
    this.lane = lane;
    // getter
    this.getName = function() {return this.name;}
    this.getEffect = function() {return this.effect;}
    this.getLane = function() {return this.lane;}
    // toString
    this.toString = function() {'name: ' + this.name + '\n' + 'effect: ' + this.effect + '\n' + 'lane: ' + this.lane + '\n';}
}

/*
 * moveMenu(inputKey): 작업소/용병소/겜시작/겜종료 메뉴를 이동시키는 메소드
 */
function moveMenu(inputKey) {
   console.log('moveMenu(inputKey) 진입');
   //화살표 이미지
   tween = game.add.tween(point);

   //버튼 사운드 재생
   playBtnSound();
   
   //키보드 별 분기처리
   switch (inputKey) {
   case 'up':
      if (y > 204) {
          y -= 112; 
          tween.to({y: y}, 300, Phaser.Easing.Exponential.Out, true, 0);
      } break;
   case 'down':
      if (y < 540) {
         y += 112; 
         tween.to({y: y}, 300, Phaser.Easing.Exponential.Out, true, 0);
      } break;
   case 'esc':
	   isnull();
	   if (point == null) {
		   point = game.add.image(x, y, 'select'); point.scale.set(0.9);
	   }
       playDoorClose();
       break;
   case 'enter':
      isEntered = true;
      playDoorOpen();
      if (point != null) {
         point.destroy(); 
         point = null;
      } 
   
      // 화살표가 멈춰있는 위치에서 엔터를 눌렀을 때 분기 처리.
      switch (y) {
         case 204: console.log('작업소');
            createStudio();
            break;
         case 316: console.log('용병소');
            createMercenary(inputKey);
            break;
         case 428: console.log('겜시작');
         	frontoftown();
            break;
         case 540: console.log('겜종료');
            myroom();
            depth = 3;
            break;
      }
      break;
   }
}

/*
 * logoutMember(): 게임 종료 시 AJAX를 통해 서버의 세션을 무효화하는 메소드
 */
function logoutMember() {
   $.ajax({
      url: 'logoutMember'
      ,type: 'post'
      ,success: function() {alert('logoutMember() - ajax success');}
      ,error: function() {alert('logoutMember() - ajax error');}
   });
}
/*
 * createStudio(): 작업소 화면을 만드는 메소드 
 */
function createStudio() {
   // 작업소 화면 표시
   m_back = game.add.image(750,75,'menu_sub_back');
   m_back.alpha = 0.8;
   image = game.add.image(810, 120, 'worksplace');
   border = game.add.image(805, 120, 'border');

   // 버튼 포커스를 1로 초기화
   buttonFocus = 1;
  
   // 싱글레인 및 더블레인 배열 초기화
   singleLane = ['A', 'B', 'C'];
   doubleLane = ['AB', 'BC', 'CA'];
  
   // 중상하좌우 모션 객체 생성 후 모션 배열에 저장
   var Point = new Motion('point', 'fire', singleLane);
   var Up = new Motion('up', 'water', singleLane);
   var Down = new Motion('down', 'sun', singleLane);
   var Left = new Motion('left', 'moon', doubleLane);
   var Right = new Motion('right', 'star', doubleLane);
   motion = [Point, Up, Down, Left, Right];
   
   // 모션 및 효과 스프라이트 객체 먼저 생성
   	button1 = game.add.button(buttonX, buttonY, 'motion_effect'); button1.scale.set(1.7);
   	button2 = game.add.button(buttonX+100, buttonY, 'motion_effect'); button2.scale.set(1.7);
  	button3 = game.add.button(buttonX+200, buttonY, 'motion_effect'); button3.scale.set(1.7);
  	
  	// 모션 설명창 추가
  	descBackground = game.add.image(1140, 508, 'descBackground'); descBackground.smoothed = false; descBackground.scale.set(3.6);
  
   // AJAX를 통해 DB(table save)로부터 모션 리스트를 읽음
   $.ajax({
      url: 'readMotionList'
      ,type : 'post' 
      // 성공하면 가져온 모션 리스트를 표시
      ,success: function(jsonText) {
         alert('readMotionList success');
         if (jsonText == '000') {
        	  alert('저장된 모션이 없습니다!');
        	  turn1 = 0; //'point'
	   		  turn2 = 1; //'up'
	   		  turn3 = 2; //'down'
	   		  button1.frame = turn1;
	       	  button2.frame = turn2;
	       	  button3.frame = turn3;
	   		  lane1 = game.add.sprite(buttonX, buttonY+200, 'A'); turn4 = 0;
              lane2 = game.add.sprite(buttonX+100, buttonY+200, 'B'); turn5 = 1;
              lane3 = game.add.sprite(buttonX+200, buttonY+200, 'C'); turn6 = 2;
            //descText 뭔가 초기화 해야함
              descText = game.add.bitmapText(desctextX, desctextY, 'neo_font', descArray[turn1], 30);
         }
         else {
        	 alert('저장된 모션이 있습니다!' + jsonText);
        	 var motionList = JSON.parse(jsonText);
        	 turn1 = parseInt(motionList.button[0].turn);
        	 turn2 = parseInt(motionList.button[1].turn);
        	 turn3 = parseInt(motionList.button[2].turn);
        	 alert('turn1: ' + turn1 + ' turn2: ' + turn2 + ' turn3: ' + turn3);
        	 button1.frame = turn1;
        	 button2.frame = turn2;
        	 button3.frame = turn3;
        	 descText = game.add.bitmapText(desctextX, desctextY, 'neo_font', descArray[parseInt(turn1)], 30);
        	 lane1 = game.add.sprite(buttonX, buttonY+200, motionList.button[0].lane);
        	 lane2 = game.add.sprite(buttonX+100, buttonY+200, motionList.button[1].lane);
        	 lane3 = game.add.sprite(buttonX+200, buttonY+200, motionList.button[2].lane);
        	 if (lane1.key == 'A' || lane1.key == 'AB') {turn4 = 0;} else if (lane1.key == 'B' || lane1.key == 'BC') {turn4 = 1;} else {turn4 = 2;}
        	 if (lane2.key == 'A' || lane2.key == 'AB') {turn5 = 0;} else if (lane2.key == 'B' || lane2.key == 'BC') {turn5 = 1;} else {turn5 = 2;}
        	 if (lane3.key == 'A' || lane3.key == 'AB') {turn6 = 0;} else if (lane3.key == 'B' || lane3.key == 'BC') {turn6 = 1;} else {turn6 = 2;}
         }
      }
      // 실패하면 기본값을 표시
      ,error: function() {
          alert('readMotionList error');
      }
   });
	 
	// 스퀘어 생성
   squareX = 810; squareY = 500;
   square = game.add.sprite(squareX, squareY, 'square');
   square.bringToTop();
   
   //moveButtonFocus()로 넘어간다.  
   depth = 1;
}
 
function moveSquare(direction) {
   var destination;
   if (direction == "UP") {
      destination = -200;
      squareY += (squareY + destination) < 500? 0:destination;
   }else if(direction == "DOWN"){
      destination = 200;
      squareY += (squareY + destination) > 700? 0:destination;
   }else if(direction == "LEFT"){
      destination = -100;
      squareX += (squareX + destination) < 720? 0:destination;
   }else if(direction == "RIGHT"){
      destination = 100;
      squareX += (squareX + destination) > 1100? 0:destination;
   }
   game.add.tween(square).to({ y: squareY }, 300, Phaser.Easing.Exponential.Out, true, 0);
   game.add.tween(square).to({ x: squareX }, 200, Phaser.Easing.Exponential.Out, true, 0);
   
   playBtnSound();
   square.bringToTop();
}

/*
 * moveButtonFocus(): 버튼을 상하좌우 이동시키는 메소드. (depth 1에서 출발)
 */
function moveButtonFocus(inputKey) {
   console.log('moveButtonFocus 진입');
   switch (inputKey) {
      case 'up':
         if (squareY == 200) {return;} // 맨 상단에 있을 경우 상단이동 금지
         else {
            moveSquare("UP");
            buttonFocus = buttonFocus-3; return;
         } break;
      case 'down':
         if (squareY == 400) {return;} // 맨 하단에 있을 경우 하단이동 금지
         else {
            moveSquare("DOWN");
            buttonFocus = buttonFocus+3; return;
         } break;
      case 'left':
         if (squareX == 1000) {return;} // 맨 좌측에 있을 경우 좌측이동 금지
         else {
            moveSquare("LEFT");
            buttonFocus = buttonFocus-1; return;
         } break;
      case 'right':
         if (squareX == 1200) {return;} // 맨 우측에 있을 경우 우측이동 금지
         else {
            moveSquare("RIGHT");
            buttonFocus = buttonFocus+1; return;
         } break;
      case 'enter': 
    	    playBtnSound();
            depth = 2; 
            break;
      case 'esc': 
        isEntered = false;
        
        // 레인 설정에 중복값이 있을 경우 에러를 알림
        if (lane1.key == lane2.key || lane2.key == lane3.key || lane3.key == lane1.key) {
           // TODO : 텍스트 하나 써서 띄울 것.
           text1 = game.add.bitmapText(810, 420,'neo_font' ,'레인을 중복되게 선택할 수 없습니다!', 40);
        }
        // 없을 경우 작업소를 나갈 때 현재의 모션 값을 디비에 저장
        else {
           saveMotionList();
           isnull();
           point = game.add.image(x, y, 'select'); point.scale.set(0.9);
           playBtnSound();
           playDoorClose();
           depth = 0; // 깊이를 0으로 하여 moveMenu()로 이동 
        }
        break;
   }
}

/*
 * saveMotionList(): 작업소를 나갈 때 현재의 모션 값을 디비에 저장
 */
function saveMotionList() {
   // 현재 떠 있는 모션, 효과, 레인 스프라이트의 이름을 읽어 json String으로 만듬
   var jsonText = "{'button': [{'turn': '" + turn1 + "', 'lane': '" + lane1.key + "'},"
             + "{'turn': '" + turn2 + "', 'lane': '" + lane2.key + "'},"
             + "{'turn': '" + turn3 + "', 'lane': '" + lane3.key + "'}]}";
   
   // ajax를 통해 jsonText를 DB(table save)에 저장 (돌아오는 result는 int값으로, 성공 시 1/실패 시 0)
   $.ajax({
      url: 'saveMotionList'
      , type: 'post'
      , data: {jsonText: jsonText}
      , success: function(result) {alert('saveMotionList success (' + result + ')');}
      , error: function(result){alert('saveMotionList error (' + result + ')');}
   });   
}
 
/*
 * moveContent(int buttonFocus,inputKey): 모션을 좌우 이동시키는 메소드 (depth 2에서 출발) 
 */
function moveContent(buttonFocus, inputKey) {
  console.log('moveContent() 진입');
  playBtnSound();
	switch(buttonFocus) {
         // 모션 1 변경
      case 1: 
         switch (inputKey) {
            case 'left':
               if(turn1 == 0) return;
               temp = turn1;
            	turn1--;
               minusAgain1:
               while (turn1 == turn2 || turn1 == turn3) {
                  if(turn1 != 0) {
                     turn1--;
                     continue minusAgain1;
                  } else {
                     turn1 = temp;
                     return;
                  }
               }
	            button1.frame = turn1;
	            lane1.destroy(); lane1 = game.add.sprite(buttonX, buttonY+200, motion[turn1].getLane()[0]);
	            descText.destroy(); descText = game.add.bitmapText(desctextX, desctextY, 'neo_font' , descArray[turn1], 30);
	            turn4 = 0;
	            square.bringToTop();
               break;
            case 'right':
               if(turn1 == 4) return;
               temp = turn1;
            	turn1++;
               plusAgain1:
               while (turn1 == turn2 || turn1 == turn3) {
                  if(turn1 != 4) {
                     turn1++;
                     continue plusAgain1;
                  } else {
                     turn1 = temp;
                     return;
                  }
               }
	            button1.frame = turn1;
	            lane1.destroy();
	            lane1 = game.add.sprite(buttonX, buttonY+200, motion[turn1].getLane()[0]);
	            descText.destroy(); descText = game.add.bitmapText(desctextX, desctextY, 'neo_font' , descArray[turn1], 30);
	            turn4 = 0;
	            square.bringToTop();
               break;
            case 'enter': 
               //이 모션으로 선택했다는 효과 주기
               depth = 1; 
               break;
            case 'esc': depth = 1; break;
            default: break;
         } break;
      // 모션 2 변경
      case 2: 
         switch (inputKey) {
            case 'left':
            if(turn2 == 0) return;
               temp = turn2;
            	turn2--;
               minusAgain2:
               while (turn2 == turn1 || turn2 == turn3) {
                  if(turn2 != 0) {
                     turn2--;
                     continue minusAgain2;
                  } else {
                     turn2 = temp;
                     return;
                  }
               }
	            button2.frame = turn2;
	            lane2.destroy(); lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[0]);
	            descText.destroy(); descText = game.add.bitmapText(desctextX, desctextY, 'neo_font' , descArray[turn2], 30);
	            turn5 = 0;
	            square.bringToTop();
               break;
            case 'right': 
             if(turn2 == 4) return;
              temp = turn2;
            	turn2++;
               plusAgain2:
               while (turn2 == turn1 || turn2 == turn3) {
                  if(turn2 != 4) {
                     turn2++;
                     continue plusAgain2;
                  } else {
                     turn2 = temp;
                     return;
                  }
               }
	            button2.frame = turn2;
	            lane2.destroy(); lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[0]);
	            descText.destroy(); descText = game.add.bitmapText(desctextX, desctextY, 'neo_font' , descArray[turn2], 30);
	            turn5 = 0;
	            square.bringToTop();
               break;
            case 'enter':
               //이 모션으로 선택
               depth = 1;
               break;
            case 'esc': depth = 1; break;
            default: break;
         } break;
      // 모션 3 변경
      case 3: 
         switch (inputKey) {
            case 'left':
               if(turn3 == 0) return;
                  temp = turn3;
               	  turn3--;
                  minusAgain3:
                  while (turn3 == turn1 || turn3 == turn2) {
                     if(turn3 != 0) {
                        turn3--;
                        continue minusAgain3;
                     } else {
                        turn3 = temp;
                        return;
                     }
                  }
	               button3.frame = turn3;
	               lane3.destroy(); lane3 = game.add.sprite(buttonX+200, buttonY+200, motion[turn3].getLane()[0]);
	               descText.destroy(); descText = game.add.bitmapText(desctextX, desctextY, 'neo_font' , descArray[turn3], 30);
	               turn6 = 0;
	               square.bringToTop();
                  break;
            case 'right':
               if(turn3 == 4) return;
                  temp = turn3;
               	  turn3++;
                  plusAgain3:
                  while (turn3 == turn1 || turn3 == turn2) {
                     if(turn3 != 4) {
                        turn3++;
                        continue plusAgain3;
                     } else {
                        turn3 = temp;
                        return;
                     }
                  }
	               button3.frame = turn3;
	               lane3.destroy(); lane3 = game.add.sprite(buttonX+200, buttonY+200, motion[turn3].getLane()[0]);
	               descText.destroy(); descText = game.add.bitmapText(desctextX, desctextY, 'neo_font' , descArray[turn3], 30);
	               turn6 = 0;
	               square.bringToTop();
                  break;
            case 'enter':
               //이 모션으로 선택했다는 효과 주기
               depth = 1; 
               break;
            case 'esc': depth = 1; break;
            default: break;
         } break;
      // 레인 1 변경
      case 4: 
         switch (inputKey) {
            case 'left':
               if (turn4 <= 0) {turn4 = 0; return;} turn4 = turn4-1;
               lane1.destroy();
               lane1 = game.add.sprite(buttonX, buttonY+200, motion[turn1].getLane()[turn4]);
               square.bringToTop();
               break;
            case 'right': 
               if (turn4 >= 2) {turn4 = 2; return;} turn4 = turn4+1;
               lane1.destroy();
               lane1 = game.add.sprite(buttonX, buttonY+200, motion[turn1].getLane()[turn4]);
               square.bringToTop();
               break;
            case 'enter': 
                   //이 레인으로 선택했다는 효과 주기
               depth = 1; 
               break;
            case 'esc': depth = 1; break;
            default: break;
         } break;         
      // 레인 2 변경
      case 5:
         switch (inputKey) {
            case 'left': 
               if (turn5 <= 0) {turn5 = 0; return;} turn5 = turn5-1;
               lane2.destroy();
               lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[turn5]);
               square.bringToTop();
               break;
            case 'right':
               if (turn5 >= 2) {turn5 = 2; return;} turn5 = turn5+1;
               lane2.destroy();
               lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[turn5]);
               square.bringToTop();
               break;
            case 'enter': 
               //이 레인으로 선택했다는 효과 주기
               depth = 1; 
               break;
            case 'esc': depth = 1; break;
            default: break;
         } break;
      // 레인 3 변경
      case 6: 
         switch (inputKey) {
            case 'left': 
               if (turn6 <= 0) {turn6 = 0; return;} turn6 = turn6-1;
               lane3.destroy();
               lane3 = game.add.sprite(buttonX+200, buttonY+200, motion[turn2].getLane()[turn6]);
               square.bringToTop();
               break;
            case 'right': 
               if (turn6 >= 2) {turn6 = 2; return;} turn6 = turn6+1;
               lane3.destroy();
               lane3 = game.add.sprite(buttonX+200, buttonY+200, motion[turn2].getLane()[turn6]);
               square.bringToTop();
               break;
            case 'enter':
               //이 레인으로 선택했다는 효과 주기
               depth = 1; 
               break;
            case 'esc': depth = 1; break;
            default: break;
         } break;
	}
}

/*
 * createMercenary(): 용병소 화면을 만드는 메소드
 */
function createMercenary(inputKey) {
	m_back = game.add.image(750,75,'menu_sub_back');
	m_back.alpha = 0.8;
	image = game.add.image(810, 120, 'pub');
	border = game.add.image(805, 120, 'border');
   // 난수 발급
   board = game.add.image(810, 520, 'board');

   sendRdm();
   
   neon = game.add.image(795, 440, 'neon');
   neon.scale.set(2);
   message = game.add.bitmapText(810, 460,'neo_font' ,'주인장: 한겜허쉴?', 40);
}

function multiconnection() {
    $.ajax({
      url: 'multiconnection'
      ,type: 'post'
      ,success: function(result) {
         if (result != null) {
            switch (result.length) {
            case 2:
				if (player2 == null) {
					player2 = game.add.image(330, 765, 'player2');
					player2.scale.set(0.4);
					if (text1 != null) {
						text1.destroy();
					}
					multiPlus.play();
					sendRdm();
				}
        	
				if (player3 != null) {player3.destroy();}
				if (player4 != null) {player4.destroy();}
				
				break;
            case 3:
				if (player3 == null) {
            		player3 = game.add.image(480, 765, 'player3');
					player3.scale.set(0.4);
					if (text1 != null) {
						text1.destroy();
					}
					multiPlus.play();
					sendRdm();
				}
            	
				if (player4 != null) {player4.destroy();}
				
				break;
            case 4:
				if (player4 == null) {
					player4 = game.add.image(630, 765, 'player4');
					player4.scale.set(0.4);
					if (text1 != null) {
						text1.destroy();
					}
					multiPlus.play();
					sendRdm();
				}
				
				break;
            default:
				if (player2 != null) {player2.destroy();}
				if (player3 != null) {player3.destroy();}
				if (player4 != null) {player4.destroy();}
				
				break;
            }
         }
      }
      ,error: function() {alert('update() - multiconnection error');}
   });
}

function sendRdm() {
 // 난수 발급
	rdm = Math.floor(Math.random() * 9999) + 1000;
	 
	$.ajax({
	     url: 'sendRdm'
	     ,type: 'post'
	     ,data: {
	        rdm: rdm
	     }
	     ,dataType: 'json'
	     ,success: function(result) {
	        console.dir(result);
	     }
	     ,error: function() {alert('createMercenary - sendRdm error');}
	});

   // 난수를 보여줄 텍스트
	text1 = game.add.bitmapText(1090, 630,'neo_font' ,rdm, 60);
}


function myroom() {
   console.log('myroom 진입');
   m_back = game.add.image(750,75,'menu_sub_back');
   m_back.alpha = 0.8;
   image = game.add.image(810, 120, 'myroom');
   border = game.add.image(805, 120, 'border');
   
   exit = game.add.image(940, 580, 'exit');
   exit.scale.set(0.8);
   e_select = game.add.sprite(940, 580, 'e_select');
   e_select.scale.set(0.8);
   textboard = game.add.image(810,450,'textboard');
   textboard.scale.set(2);
   text2 = game.add.bitmapText(950, 480,'neo_font' ,"게임을 종료합니다", 50);
   // 깊이를 3으로 변경 > update에서 depth에 따른 case문을 통해 goHome(inputKey)를 호출 
   /* depth = 3; */
}

function goHome(inputKey) {
   if (inputKey == 'esc') {
	   isnull(); 
	   point = game.add.image(x, y, 'select'); point.scale.set(0.9);
	   playDoorClose();
	   depth = 0; 
	}
   else if (inputKey == 'enter') {
	  exit.destroy();
	  e_select.destroy();
	  exit = game.add.image(920,580,'exit_push');
	  exit.scale.set(0.8);	
      // 게임 종료. 검정 화면 준비.   
      sprite = game.add.sprite(0, 0, 'finish');
      // 원래 사이즈 보다 확대 하고 alph로 투명도 조절.moveButtonFocus
      sprite.scale.set(5);
       sprite.anchor.setTo(0.5, 0.5);
       sprite.alpha = 0;
      
       //화면에서 검정화면으로 조정.
      game.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
   
      logoutMember();
   }
}

function frontoftown() {
	m_back = game.add.image(750,75,'menu_sub_back');
	m_back.alpha = 0.8;
	
    image = game.add.image(810, 120, 'front');
    beatoven_walk = game.add.sprite(840,230, 'beatoven_walk'); 
	beatoven_walk.scale.set(4); 
	beatoven_walk.smoothed = false; 
	
    border = game.add.image(810, 120, 'border');
    textboard = game.add.image(810, 450,'textboard');
    textboard.scale.set(2);
    text2 = game.add.bitmapText(950, 480,'neo_font' ,"게임을 시작합니다.", 50);
    start = game.add.image(935, 580,'start');
    start.scale.set(0.89);
    e_select = game.add.sprite(940, 580, 'e_select');
    e_select.scale.set(0.8);
    depth = 4;
}

function gamestart(inputKey) {
	if (inputKey == 'esc') {
		isnull(); 
		point = game.add.image(x, y, 'select'); point.scale.set(0.9);
		playDoorClose();
		depth = 0; 
	}
	   else if (inputKey == 'enter') {
		start.destroy();
		e_select.destroy();
		var startpush = game.add.image(970, 595,'start_push'); 
		startpush.scale.set(0.89);
		alert('Next Stroy Or Game Start');
		 
		var walk = beatoven_walk.animations.add('walk');
		beatoven_walk.play('walk',3,true); //속도
		
		game.add.tween(beatoven_walk).to({x: 1800}, 5000, Phaser.Easing.Linear.None, true, 0);
	
		
		// 게임 종료. 검정 화면 준비.   
	    sprite = game.add.sprite(0, 0, 'finish');
	    
	    // 원래 사이즈 보다 확대 하고 alph로 투명도 조절.moveButtonFocus
	    sprite.scale.set(5);
	    sprite.anchor.setTo(0.5, 0.5);
	    sprite.alpha = 0;
	    
	    //화면에서 검정화면으로 조정.
	    game.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
		
		
	   }
}
function playerCount() {
	$.ajax({
	      url: 'playerCount'
	      ,type: 'post'
	      ,success: function(result) {
	         console.log(result.length);
	         
			if (result != null) {
				switch (result.length) {
				case 2:
					player2 = game.add.image(330, 765, 'player2');
					player2.scale.set(0.4);	
					break;
				case 3:
					player3 = game.add.image(480, 765, 'player3');
					player2 = game.add.image(330, 765, 'player2');
					player3.scale.set(0.4);	player2.scale.set(0.4);
					break;
				case 4:
					player4 = game.add.image(630, 765, 'player4');
					player3 = game.add.image(480, 765, 'player3');
					player2 = game.add.image(330, 765, 'player2');
					player4.scale.set(0.4);	player3.scale.set(0.4);	
					player2.scale.set(0.4);	
					break;
				default:
					break;
				}
	         }
	      }
	      ,error: function() {alert('update() - playerCount error');}
	   });
}

function playBtnSound() {
     btnSound.play();
}

function playDoorOpen() {
    doorOpen.play();
}

function playDoorClose() {
    doorClose.play();
}

function isnull() {
	if (text1 != null) {text1.destroy();}
	if (image != null) {image.destroy();}
	if (m_back != null) {m_back.destroy();}
	if (border != null) {border.destroy();}
	if (textboard != null) {textboard.destroy();}
	if (start != null) {start.destroy();}
	if (neon != null) {neon.destroy();}
	if (board != null) {board.destroy();}
	if (message != null) {message.destroy();}
	if (exit != null) {exit.destroy();}
	if (text2!= null) {text2.destroy();}
	if (e_select!= null) {e_select.destroy();}
	if (button1 != null) {button1.destroy();}
	if (beatoven_walk != null) {beatoven_walk.destroy();}
	if (button2 != null) {button2.destroy();}
	if (button3 != null) {button3.destroy();}
	if (lane1 != null) {lane1.destroy();}
	if (lane2 != null) {lane2.destroy();}
	if (lane3 != null) {lane3.destroy();}
	if (square != null) {square.destroy();}
	if (descBackground != null) {descBackground.destroy();}
	if (descText != null) {descText.destroy();}
 }
  