<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="resources/JavaScriptResource/phaser-2.10.2.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>마을</title>
</head>
<body>
<script>
var game = new Phaser.Game(1600, 900, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});
var text1,text2,messange,exit,p_back,m_back;
var cursors;
var point;
var image;
var x = 103;
var y = 204;
var inout = 0;
var player1,player2,player3,player4;
var isEntered = false;
var tween;
var key1;
var bgd;
var textboard, start;
var neon,board;
var rdm;
var e_select,sprite;
var key; // 키보드 버튼
var depth; // 작업소 깊이
var square,squareX, squareY; // 스퀘어의 위치(좌표)를 나타내는 변수
var buttonX=810, buttonY=500; // 모션, 효과, 레인 스프라이트의 위치(좌표)를 나타내는 변수
var buttonFocus; // 현재 버튼이 몇 번에 있는가
var motion; // 모션을 담는 배열
var m_back; // 서브메뉴 배경
var turn1, turn2, turn3, turn4, turn5, turn6; // 모션(1~3) 및 레인(4~6)을 교체할 카운터
var motion1, motion2, motion3, effect1, effect2, effect3, lane1, lane2, lane3; // 9개의 스프라이트 버튼
var singleLane, doubleLane; // 싱글레인 및 더블레인 배열

var temp;

function preload() {
   game.world.removeAll();
   // 깊이를 1로 초기화
   depth = 0;
   
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
   game.load.image('pub','resources/Images/town/townImg/pub.png' ); //용병소 이미지
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
   
   game.load.audio('townBGM','resources/Images/town/townbgm.mp3');	//마을브금
   game.load.audio('btnSound','resources/Images/town/button_click.mp3');
   game.load.audio('door','resources/Images/town/door.wav');
   game.load.audio('door_close','resources/Images/town/door_close.mp3');
   
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
   
   // 모션 스프라이트 로드
   game.load.spritesheet('point', 'resources/Images/town/produceRoom/point.png', 100, 100);
   game.load.spritesheet('up', 'resources/Images/town/produceRoom/up.png', 100, 100);
   game.load.spritesheet('down', 'resources/Images/town/produceRoom/down.png', 100, 100);
   game.load.spritesheet('left', 'resources/Images/town/produceRoom/left.png', 100, 100);
   game.load.spritesheet('right', 'resources/Images/town/produceRoom/right.png', 100, 100);
   
   // 효과 스프라이트 로드
   game.load.spritesheet('fire', 'resources/Images/town/produceRoom/fire.png', 90, 90);
   game.load.spritesheet('water', 'resources/Images/town/produceRoom/water.png', 90, 90);
   game.load.spritesheet('sun', 'resources/Images/town/produceRoom/sun.png', 90, 90);
   game.load.spritesheet('moon', 'resources/Images/town/produceRoom/moon.png', 90, 90);
   game.load.spritesheet('star', 'resources/Images/town/produceRoom/star.png', 90, 90);
   
   // 네모 테두리 로드
   game.load.spritesheet('square', 'resources/Images/town/produceRoom/square.png', 95, 95);
	
}

function create() {
   //마을 배경
   bgd = game.add.image(0, 0, 'mm');
   bgd.alpha = 0.5;
   bgd.scale.set(1);
   
   //마을BGM
   var townbgm = game.add.audio('townBGM');
   townbgm.loopFull();
   townbgm.play("",0,0.1);
   
   //메뉴 이미지 지정한 좌표에 출력
   var superMenu = game.add.image(60, 70, 'menu_super_back'); superMenu.scale.set(0.9); superMenu.alpha = 0.8;
   var beveryills = game.add.image(135, 20, 'beverlyills'); beveryills.scale.set(0.9);
   var studio = game.add.image(133, 223, 'studio'); studio.scale.set(0.9);
   var mercenary = game.add.image(137, 335, 'mercenary'); mercenary.scale.set(0.9);
   var home = game.add.image(133, 552, 'home'); home.scale.set(0.9);
   var nextstage = game.add.image(133, 442, 'nextstage'); nextstage.scale.set(0.9);
   //var border = game.add.image(805, 120, 'border'); border.scale.set(0.9); //임시
   
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
 * findMotion(String motionKey): 현재 스프라이트의 객체명 motionKey를 받아, 현재 스프라이트에 맞는 모션 객체를 반환
 */
function findMotion(motionKey) {
   switch (motionKey) {
   case 'point': return motion[0]; break;
   case 'up': return motion[1]; break;
   case 'down': return motion[2]; break;
   case 'left': return motion[3]; break;
   case 'right': return motion[4]; break;
   }
}  
 
/*
 * moveMenu(inputKey): 작업소/용병소/겜시작/겜종료 메뉴를 이동시키는 메소드
 */
function moveMenu(inputKey) {
   console.log('moveMenu(inputKey) 진입');
   //화살표 이미지
   tween = game.add.tween(point);

   //키보드 별 분기처리
   switch (inputKey) {
   case 'up':
      if (y > 204) {
          y -= 112; 
          tween.to({y: y}, 300, Phaser.Easing.Exponential.Out, true, 0);
          
          var btnSound = game.add.audio('btnSound');
          btnSound.play();
          
      } break;
   case 'down':
      if (y < 540) {
         y += 112; 
         tween.to({y: y}, 300, Phaser.Easing.Exponential.Out, true, 0);
         
         var btnSound = game.add.audio('btnSound');
         btnSound.play();
         
      } break;
   case 'esc':
	   isnull();
       if (point == null) {
          point = game.add.image(x, y, 'select');
          point.scale.set(0.9);
          
          var btnSound = game.add.audio('btnSound');
          btnSound.play();
          
          var door_close = game.add.audio('door_close');
          door_close.play();
          
       } break;
   case 'enter':
      isEntered = true;
      
      var btnSound = game.add.audio('btnSound');
      btnSound.play();
      
      var doorSound = game.add.audio('door');
      doorSound.play();
      
      if (point != null) {
         point.kill();
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
   // 순서를 0으로 초기화
   turn = 0;
   turn1 = 0; //'point'
   turn2 = 1; //'up'
   turn3 = 2; //'down'                                                         //DB 값 불러오면 turn1, 2, 3도 모션에 맞게 세팅해줘야 함!
   turn4 = 0; //'A'
   turn5 = 0; //'AB'
   turn6 = 0; //'AB'
   
   // 싱글레인 및 더블레인 배열 초기화
   singleLane = ['A', 'B', 'C'];
   doubleLane = ['AB', 'BC', 'CA'];
   // 중상하좌우 모션 객체 생성 후 모션 배열에 저장
   var Point = new Motion('point', 'fire', doubleLane);
   var Up = new Motion('up', 'water', doubleLane);
   var Down = new Motion('down', 'sun', doubleLane);
   var Left = new Motion('left', 'moon', singleLane);
   var Right = new Motion('right', 'star', singleLane);
   motion = [Point, Up, Down, Left, Right];
   
   // AJAX를 통해 DB(table save)로부터 모션 리스트를 읽음
   $.ajax({
      url: 'readMotionList'
      ,type : 'post'
      // 성공하면 가져온 모션 리스트를 표시
      ,success: function(jsonText) {
         alert('readMotionList success');
         alert(jsonText);
         
         var motionList = JSON.parse(jsonText);
         // 첫 번째 모션
         motion1 = game.add.sprite(buttonX, buttonY, motionList.motion[0].name);
         effect1 = game.add.sprite(buttonX, buttonY+100, motionList.motion[0].effect);
         lane1 = game.add.sprite(buttonX, buttonY+200, motionList.motion[0].lane);
         
         // 두 번째 모션
         motion2 = game.add.sprite(buttonX+100, buttonY, motionList.motion[1].name);
         effect2 = game.add.sprite(buttonX+100, buttonY+100, motionList.motion[1].effect);
         lane2 = game.add.sprite(buttonX+100, buttonY+200, motionList.motion[1].lane);
         
         // 세 번째 모션
         motion3 = game.add.sprite(buttonX+200, buttonY, motionList.motion[2].name);
         effect3 = game.add.sprite(buttonX+200, buttonY+100, motionList.motion[2].effect);
         lane3 = game.add.sprite(buttonX+200, buttonY+200, motionList.motion[2].lane);
         
         // 스퀘어 생성
         squareX = 810; squareY = 500;
         square = game.add.sprite(squareX, squareY, 'square');
         square.bringToTop();
      }
      // 실패하면 기본값을 표시
      ,error: function() {
          alert('readMotionList error');
         // 첫 번째 모션
         motion1 = game.add.sprite(buttonX, buttonY, 'point');
         effect1 = game.add.sprite(buttonX, buttonY+100, 'fire');
         lane1 = game.add.sprite(buttonX, buttonY+200, 'A');
         
         // 두 번째 모션
         motion2 = game.add.sprite(buttonX+100, buttonY, 'up');
         effect2 = game.add.sprite(buttonX+100, buttonY+100, 'water');
         lane2 = game.add.sprite(buttonX+100, buttonY+200, 'A');
         
         // 세 번째 모션
         motion3 = game.add.sprite(buttonX+200, buttonY, 'down');
         effect3 = game.add.sprite(buttonX+200, buttonY+100, 'sun');
         lane3 = game.add.sprite(buttonX+200, buttonY+200, 'A');
         
         // 스퀘어 생성
         squareX = 810; squareY = 500;
         square = game.add.sprite(squareX, squareY, 'square');
         square.bringToTop();
      }
   });
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
              depth = 2; 
             break;
      case 'esc': 
        isEntered = false;
        isnull();
        if (point == null) {
           point = game.add.image(x, y, 'select');
           point.scale.set(0.9);
           var btnSound = game.add.audio('btnSound');
           btnSound.play();
           
           var door_close = game.add.audio('door_close');
           door_close.play();
        }
        
        // 레인 설정에 중복값이 있을 경우 에러를 알림
        if (lane1.key == lane2.key || lane2.key == lane3.key || lane3.key == lane1.key) {
           // TODO : 텍스트 하나 써서 띄울 것.
           text1 = game.add.bitmapText(810, 420,'neo_font' ,'레인을 중복되게 선택할 수 없습니다!', 40);
        }
        // 없을 경우 작업소를 나갈 때 현재의 모션 값을 디비에 저장
        else {
           saveMotionList();
           isnull();
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
   var jsonText = "{'motion': [{'name': '" + motion1.key + "', 'effect': '" + effect1.key + "', 'lane': '" + lane1.key + "'},"
             + "{'name': '" + motion2.key + "', 'effect': '" + effect2.key + "', 'lane': '" + lane2.key + "'},"
             + "{'name': '" + motion3.key + "', 'effect': '" + effect3.key + "', 'lane': '" + lane3.key + "'}]}";
   
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
 철저한 들여쓰기를 생활화합시다..!
 */
function moveContent(buttonFocus,inputKey) {
	 console.log('moveContent() 진입');
	 switch(buttonFocus) {
	 //모션 1 변경
	 case 1:
		 switch (inputKey) {
		 case 'left':
			 if(turn1 == 0) return;
			 temp = turn1;
			 turn1--;
			 minusAgain1:
			 while (motion[turn1].getName() == motion2.key || motion[turn1].getName() == motion3.key) {
				 if(turn1 != 0) {
					 turn1--;
                     continue minusAgain1;
                 }else {
                	 turn1 = temp;
                	 return;
               	 }
			 }
			 motion1.destroy();
			 effect1.destroy();
			 lane1.destroy();
			 motion1 = game.add.sprite(buttonX, buttonY, motion[turn1].getName());
			 effect1 = game.add.sprite(buttonX, buttonY+100, motion[turn1].getEffect());
			 lane1 = game.add.sprite(buttonX, buttonY+200, motion[turn1].getLane()[0]);
			 square.bringToTop();
			 	break;
		 case 'right':
			 if(turn1 == 4) return;
			 temp = turn1;
			 turn1++;
			 plusAgain1:
			 while (motion[turn1].getName() == motion2.key || motion[turn1].getName() == motion3.key) {
				 if(turn1 != 4) {
					 turn1++;
                     continue plusAgain1;
                 } else {
                	 turn1 = temp;
                     return;
                 }
             }
			 motion1.destroy();
			 effect1.destroy();
			 lane1.destroy();
			 motion1 = game.add.sprite(buttonX, buttonY, motion[turn1].getName());
			 effect1 = game.add.sprite(buttonX, buttonY+100, motion[turn1].getEffect());
			 lane1 = game.add.sprite(buttonX, buttonY+200, motion[turn1].getLane()[0]);
			 square.bringToTop();
			 	break;
	 	case 'enter':
	 		//이 모션으로 선택했다는 효과 주기
	 		break;
 		case 'esc': depth = 1; break;
 			default: break;
		}break;
	//모션 2 변경
	case 2:
		switch (inputKey) {
		case 'left':
			if(turn2 == 0) return;
			temp = turn2;
			turn2--;
			minusAgain2:
			while (motion[turn2].getName() == motion1.key || motion[turn2].getName() == motion3.key) {
				if(turn2 != 0) {
					turn2--;
					continue minusAgain2;
				} else {
					turn2 = temp;
					return;
				}
			}
			motion2.destroy();
			effect2.destroy();
			lane2.destroy();
			motion2 = game.add.sprite(buttonX+100, buttonY, motion[turn2].getName());
			effect2 = game.add.sprite(buttonX+100, buttonY+100, motion[turn2].getEffect());
			lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[0]);
			square.bringToTop();
				break;
		case 'right':
			if(turn2 == 4) return;
			temp = turn2;
			turn2++;
			plusAgain2:
			while (motion[turn2].getName() == motion1.key || motion[turn2].getName() == motion3.key) {
				if(turn2 != 4) {
					turn2++;
					continue plusAgain2;
				} else {
					turn2 = temp;
					return;
				}
			}
			motion2.destroy();
            effect2.destroy();
            lane2.destroy();
            motion2 = game.add.sprite(buttonX+100, buttonY, motion[turn2].getName());
            effect2 = game.add.sprite(buttonX+100, buttonY+100, motion[turn2].getEffect());
            lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[0]);
            square.bringToTop();
            	break;
       	case 'enter':
       		//이 모션으로 선택
       		break;
     	case 'esc': depth = 1; break;
            default: break;
		} break;
	//모션 3 변경
	case 3:
		switch (inputKey) {
		case 'left':
			if(turn3 == 0) return;
			temp = turn3;
			turn3--;
			minusAgain3:
			while (motion[turn3].getName() == motion1.key || motion[turn3].getName() == motion2.key) {
				if(turn3 != 0) {
					turn3--;
					continue minusAgain3;
				} else {
					turn3 = temp;
					return;
				}
			}
			motion3.destroy();
			effect3.destroy();
			lane3.destroy();
			motion3 = game.add.sprite(buttonX+200, buttonY, motion[turn3].getName());
			effect3 = game.add.sprite(buttonX+200, buttonY+100, motion[turn3].getEffect());
			lane3 = game.add.sprite(buttonX+200, buttonY+200, motion[turn3].getLane()[0]);
			square.bringToTop();
				break;
		case 'right':
			if(turn3 == 4) return;
			temp = turn3;
			turn3++;
			plusAgain3:
			while (motion[turn3].getName() == motion1.key || motion[turn3].getName() == motion2.key) {
				if(turn3 != 4) {
					turn3++;
					continue plusAgain3;
				} else {
					turn3 = temp;
					return;
				}
			}
			motion3.destroy();
			effect3.destroy();
			lane3.destroy();
			motion3 = game.add.sprite(buttonX+200, buttonY, motion[turn3].getName());
			effect3 = game.add.sprite(buttonX+200, buttonY+100, motion[turn3].getEffect());
			lane3 = game.add.sprite(buttonX+200, buttonY+200, motion[turn3].getLane()[0]);
			square.bringToTop();
				break;
		case 'enter':
			//이 모션으로 선택했다는 효과 주기
			break;
		case 'esc': depth = 1; break;
            default: break;
		} break;
	//레인 1 변경
	case 4:
		var Motion = findMotion(motion1.key);
		switch (inputKey) {
		case 'left':
			if (turn4 <= 0) {turn4 = 0; return;} turn4 = turn4-1;
			lane1.destroy();
			lane1 = game.add.sprite(buttonX, buttonY+200, Motion.getLane()[turn4]);
			square.bringToTop();
				break;
		case 'right':
			if (turn4 >= 2) {turn4 = 2; return;} turn4 = turn4+1;
			lane1.destroy();
			lane1 = game.add.sprite(buttonX, buttonY+200, Motion.getLane()[turn4]);
			square.bringToTop();
				break;
		case 'enter':
			//이 레인으로 선택했다는 효과 주기
			break;
		case 'esc': depth = 1; break;
			default: break;
		} break;
	// 레인 2 변경
	case 5:
		var Motion = findMotion(motion2.key);
		switch (inputKey) {
		case 'left':
			if (turn5 <= 0) {turn5 = 0; return;} turn5 = turn5-1;
			lane2.destroy();
			lane2 = game.add.sprite(buttonX+100, buttonY+200, Motion.getLane()[turn5]);
			square.bringToTop();
				break;
		case 'right':
			if (turn5 >= 2) {turn5 = 2; return;} turn5 = turn5+1;
			lane2.destroy();
			lane2 = game.add.sprite(buttonX+100, buttonY+200, Motion.getLane()[turn5]);
			square.bringToTop();
				break;
		case 'enter':
			//이 레인으로 선택했다는 효과 주기
			break;
		case 'esc': depth = 1; break;
			default: break;
		}
	//레인 3 변경
	case 6:
		var Motion = findMotion(motion3.key);
		switch (inputKey) {
   		case 'left': 
      		if (turn6 <= 0) {turn6 = 0; return;} turn6 = turn6-1;
      		lane3.destroy();
      		lane3 = game.add.sprite(buttonX+200, buttonY+200, Motion.getLane()[turn6]);
      		square.bringToTop();
      		break;
		case 'right': 
			if (turn6 >= 2) {turn6 = 2; return;} turn6 = turn6+1;
			lane3.destroy();
			lane3 = game.add.sprite(buttonX+200, buttonY+200, Motion.getLane()[turn6]);
			square.bringToTop();
			break;
		case 'enter':
			//이 레인으로 선택했다는 효과 주기
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
	
	board = game.add.image(810, 520, 'board');
	sendRdm();
	
	neon = game.add.image(795, 440, 'neon');
	neon.scale.set(2);
	messange = game.add.bitmapText(810, 460,'neo_font' ,'주인장: 한겜허쉴?', 40);
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

var cnt = 0;
function update() {
   // 게임 실행 중에 항상 key 값을 받는다. 입력한 키에 따라 readKey()가 키 별 string을 반환한다. (누르는 시점에만 반환된다.)
   cnt++
   if (cnt % 6 == 0) {
      readKey();
   }
   if (cnt % 12 == 0) {
      cnt = 0;
      multiconnection(); 
   }
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
						text1.kill(); text1 = null;
					}
                    sendRdm();
				}
            	
            	if (player3 != null) {player3.destroy();} 
               break;
            case 3:
            	if (player3 == null) {
            		player3 = game.add.image(480, 765, 'player3');
                    player3.scale.set(0.4);
                    if (text1 != null) {
						text1.kill(); text1 = null;
					}
                    sendRdm();
				}
            	
            	 if (player4 != null) {player4.destroy();} 
               break;
            case 4:
            	if (player4 == null) {
            		player4 = game.add.image(630, 765, 'player4');
                    player4.scale.set(0.4);
                    if (text1 != null) {
						text1.kill(); text1 = null;
					}
                    sendRdm();
				}
               break;
            default:
            	if (player2 != null) {player2.destroy();}
               break;
            }
         }
      }
      ,error: function() {alert('update() - multiconnection error');}
   });
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
	   depth = 0; isnull(); 
	   point = game.add.image(x, y, 'select'); point.scale.set(0.9);
	   var btnSound = game.add.audio('btnSound');
       btnSound.play();
       var door_close = game.add.audio('door_close');
       door_close.play();
	}
   else if (inputKey == 'enter') {
	   exit.kill(); exit = null;
	   e_select.kill(); e_select = null;
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
    border = game.add.image(810, 120, 'border');
    textboard = game.add.image(810,450,'textboard');
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
		depth = 0; isnull(); 
		point = game.add.image(x, y, 'select'); point.scale.set(0.9);
		var btnSound = game.add.audio('btnSound');
        btnSound.play();
        var door_close = game.add.audio('door_close');
        door_close.play();
        
	}
	   else if (inputKey == 'enter') {
		start.kill(); start = null;
		e_select.kill(); e_select = null;
		var startpush = game.add.image(970, 595,'start_push'); 
		startpush.scale.set(0.89);
		alert('Next Stroy Or Game Start');
	   }
}
function playerCount() {
	$.ajax({
	      url: 'playerCount'
	      ,type: 'post'
	      ,success: function(result) {
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

function isnull() {
	if (text1 != null) {text1.kill(); text1 = null;}
	if (image != null) {image.kill(); image = null;}
	if (m_back != null) {m_back.kill(); m_back = null;}
	if (border != null) {border.kill(); border = null;}
	if (textboard != null) {textboard.kill(); textboard = null;}
	if (start != null) {start.kill(); start = null;}
	if (neon != null) {neon.kill(); neon = null;}
	if (board != null) {board.kill(); board = null;}
	if (messange != null) {messange.kill(); messange = null;}
	if (exit != null) {exit.kill(); exit = null;}
	if (text2!= null) {text2.kill(); text2 = null;}
	if (e_select!= null) {e_select.kill(); e_select = null;}
	if (motion1 != null) {motion1.kill(); motion1  = null;}
	if (motion2 != null) {motion2.kill(); motion2 = null;}
	if (motion3 != null) {motion3.kill(); motion3  = null;}
	if (effect1 != null) {effect1.kill(); effect1 = null;}
	if (effect2 != null) {effect2.kill(); effect2 = null;}
	if (effect3 != null) {effect3.kill(); effeect3 = null;}
	if (lane1 != null) {lane1.kill(); lane1 = null;}
	if (lane2 != null) {lane2.kill(); lane2 = null;}
	if (lane3 != null) {lane3.kill(); lane3 = null;}
	if (square != null) {square.kill(); square = null;}
}


</script>
</body>
</html>