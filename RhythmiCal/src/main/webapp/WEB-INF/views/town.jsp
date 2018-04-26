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

var text1,text2,messange,exit,p_back;
var cursors;
var point;
var image;
var x = 103;
var y = 204;
var inout = 0;
var isEntered = false;
var tween;
var key1;
var bgd;
var neon,board;
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

function preload() {
	// 키보드를 받는 변수 생성
		leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
		
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
	game.load.image('border', 'resources/Images/town/townImg/border.png'); //임시
	
	game.load.image('myroom','resources/Images/town/townImg/myroom.png' ) // 내방 이미지
	game.load.image('click2','resources/Images/town/townImg/click2.png' ); //두번째 메뉴 이미지 로드(임의)
	game.load.image('hand','resources/Images/town/townImg/hand.png' ); //스마트폰 들고있는 이미지 로드
	game.load.image('finish','resources/Images/town/townImg/black.png' ); //종료시 fade out될 검정 배경 이미지 로드
	game.load.image('back','resources/Images/town/townImg/v_back.png' ); //마을 배경 이미지
	game.load.image('select','resources/Images/town/townImg/select.png' );//선택 흰 테두리
	game.load.image('menu_sub_back','resources/Images/town/townImg/menu_back.png' ); //Enter 눌렀을 때 서브메뉴 배경
	game.load.image('pub','resources/Images/town/townImg/pub.png' ); //용병소 이미지
	game.load.image('worksplace', 'resources/Images/town/townImg/office.png'); //작업소 이미지
	game.load.image('exit','resources/Images/town/townImg/exit.png' ); //내방에서의 종료 버튼 이미지
	game.load.image('e_select','resources/Images/town/townImg/exit_line.png' ); //종료 버튼 감싸고 있는 선택 이미지
	game.load.image('eachmenu','resources/Images/town/townImg/eachmenuimg.png' );
	game.load.image('board','resources/Images/town/townImg/board.png' );
	game.load.image('neon','resources/Images/town/townImg/neonboard.png' );
	game.load.image('front','resources/Images/town/townImg/front.png' );
	game.load.image('player_back','resources/Images/town/townImg/player_back.png' );
	
	game.load.bitmapFont('neo_font', 'resources/neo_font/neo_font.png', 'resources/neo_font/neo_font.fnt');
	
	//멀티 플레이어 표시
	game.load.image('player1','resources/Images/town/townImg/player1.png');
	game.load.image('player2','resources/Images/town/townImg/player2.png');
	game.load.image('player3','resources/Images/town/townImg/player3.png');
	game.load.image('player4','resources/Images/town/townImg/player4.png');
	
	// 네모 테두리 로드
	game.load.spritesheet('square', 'resources/Images/town/produceRoom/square.png', 95, 95);
	
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
}

function create() {
	//마을 배경
	bgd = game.add.image(0, 0, 'back');
	bgd.alpha = 0.5;
	bgd.scale.set(1);
	
	//메뉴 이미지 지정한 좌표에 출력
	var superMenu = game.add.image(60, 70, 'menu_super_back'); superMenu.scale.set(0.9); superMenu.alpha = 0.8;
	var beveryills = game.add.image(135, 20, 'beverlyills'); beveryills.scale.set(0.9);
	var studio = game.add.image(133, 223, 'studio'); studio.scale.set(0.9);
	var mercenary = game.add.image(137, 335, 'mercenary'); mercenary.scale.set(0.9);
	var home = game.add.image(133, 440, 'home'); home.scale.set(0.9);
	var nextstage = game.add.image(133, 552, 'nextstage'); nextstage.scale.set(0.9);
	var worksplace = game.add.image(810, 120, 'worksplace'); worksplace.scale.set(0.9); //임시
	var border = game.add.image(805, 120, 'border'); border.scale.set(0.9); //임시
	
	//첫 메뉴를 가리키고 있는 빨간색 테두리 출력
	point = game.add.image(x, y, 'select');
	point.scale.set(0.9);
<<<<<<< HEAD
	
	var player = game.add.image(130, 770, 'player1');
=======
	 
	p_back = game.add.image(80, 710, 'player_back');
	p_back.scale.set(0.85);
	p_back.alpha = 0.8;
	
	var player = game.add.image(130, 765, 'player1');
>>>>>>> d5f49342fe805828195a6a0669b25bc811fcb3ae
	var text = game.add.bitmapText(130,720, 'neo_font', 'PLAYER CONNECTION', 35);
	player.scale.set(0.4);
	
	//키보드 사용 설정 해줌
	cursors = game.input.keyboard.createCursorKeys();
}

/*
 * readKey(): 키보드 키를 읽어들이는 메소드
 */
function readKey() {
    $.ajax({
      url: 'requestConsole', 
      success: function(inputKey) {
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
            }
         }
      }
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
	//화살표 이미지
	tween = game.add.tween(point);
	
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
  		isEntered = false;
  		if (point == null) {
  			point = game.add.image(x, y, 'select');
  			point.scale.set(0.9);
  		} 
		break;
	case 'enter':
		isEntered = true;
		if (point != null) {
			point.kill();
		   	point = null;			
		}
	   	
	   	
	   	// 화살표가 멈춰있는 위치에서 엔터를 눌렀을 때 분기 처리.
		switch (y) {
			case 204: console.log('작업소');
				isnull();
				createStudio();
				break;
			case 316: console.log('용병소');
				isnull();
				createMercenary();
				break;
			case 428: console.log('겜시작');
				isnull();
				image = game.add.image(810, 120, 'front');
				break;
			case 540: console.log('겜종료');
				isnull();
				myroom(inputKey);
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
		url: 'logoutMember',
		type: 'post',
		success: function() {alert('logoutMember() - ajax success');},
		error: function() {alert('logoutMember() - ajax error');}
	})
}

/*
 * createStudio(): 작업소 화면을 만드는 메소드 
 */
function createStudio() {
<<<<<<< HEAD
=======
	// 작업소 화면 표시
<<<<<<< HEAD
=======
	image = game.add.image(770, 120, 'worksplace');
>>>>>>> 62b4590b0e2d2124dfbb2bfe56cfdc668f9a84de
>>>>>>> d5f49342fe805828195a6a0669b25bc811fcb3ae
	image = game.add.image(810, 120, 'worksplace');

	// 버튼 포커스를 1로 초기화
	buttonFocus = 1;
	// 순서를 0으로 초기화
	turn = 0;
	turn1 = 0; //'point'
	turn2 = 1; //'up'
	turn3 = 2; //'down'																			//DB 값 불러오면 turn1, 2, 3도 모션에 맞게 세팅해줘야 함!
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
	
	// 스퀘어 생성
	squareX = 810; squareY = 500;
	square = game.add.sprite(squareX, squareY, 'square');
	
	// AJAX를 통해 DB(table save)로부터 모션 리스트를 읽음
	$.ajax({
		url: 'readMotionList',
		// 성공하면 가져온 모션 리스트를 표시
		success: function(jsonText) {
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
	   },
	   // 실패하면 기본값을 표시
	   error: function() {
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
	   }
	});
	  
	//moveButtonFocus()로 넘어간다.  
	depth = 1;
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
            square.kill();
            squareY = squareY-200;
            square = game.add.sprite(squareX, squareY, 'square');
            buttonFocus = buttonFocus-3; return;
         } break;
      case 'down':
         if (squareY == 400) {return;} // 맨 하단에 있을 경우 하단이동 금지
         else {
            square.kill();
            squareY = squareY+200;
            square = game.add.sprite(squareX, squareY, 'square');
            buttonFocus = buttonFocus+3; return;
         } break;
      case 'left':
         if (squareX == 1000) {return;} // 맨 좌측에 있을 경우 좌측이동 금지
         else {
            square.kill();
            squareX = squareX-100;
            square = game.add.sprite(squareX, squareY, 'square');
            buttonFocus = buttonFocus-1; return;
         } break;
      case 'right':
         if (squareX == 1200) {return;} // 맨 우측에 있을 경우 우측이동 금지
         else {
            square.kill();
            squareX = squareX+100;
            square = game.add.sprite(squareX, squareY, 'square');
            buttonFocus = buttonFocus+1; return;
         } break;
      case 'enter': 
    	   	 depth = 2; 
    	  	 break;
      case 'esc': 
  		isEntered = false;
  		if (point == null) {
  			point = game.add.image(x, y, 'select');
  			point.scale.set(0.9);
  		}
<<<<<<< HEAD
  		
  		// 레인 설정에 중복값이 있을 경우 에러를 알림
  		if (lane1.key == lane2.key || lane2.key == lane3.key || lane3.key == lane1.key) {
  			// TODO : 텍스트 하나 써서 띄울 것.
  			text1 = game.add.bitmapText(810, 420,'neo_font' ,'레인을 중복되게 선택할 수 없습니다!', 40);
  		}
  		// 없을 경우 작업소를 나갈 때 현재의 모션 값을 디비에 저장
  		else {
  			saveMotionList();
  			// 깊이를 0으로 하여 moveMenu()로 이동
  	  		depth = 0; 
  		}
=======
  		// 작업소를 나갈 때 현재의 모션 값을 디비에 저장
  		saveMotionList();
		// 깊이를 0으로 하여 moveMenu()로 이동
  		depth = 0; 
>>>>>>> d5f49342fe805828195a6a0669b25bc811fcb3ae
  		break;
   }
}

/*
 * saveMotionList(): 작업소를 나갈 때 현재의 모션 값을 디비에 저장
 */
function saveMotionList() {
	// 현재 떠 있는 모션, 효과, 레인 스프라이트의 이름을 읽어 json String으로 만듬
<<<<<<< HEAD
	var jsonText = "{'motion': [{'name': '" + motion1.key + "', 'effect': '" + effect1.key + "', 'lane': '" + lane1.key + "'},"
				 + "{'name': '" + motion2.key + "', 'effect': '" + effect2.key + "', 'lane': '" + lane2.key + "'},"
				 + "{'name': '" + motion3.key + "', 'effect': '" + effect3.key + "', 'lane': '" + lane3.key + "'}]}";
=======
	var jsonText = "{'motion': [{'name': '" + motion1.key 
						  + "', 'effect': '" + effect1.key 
						  + "', 'lane': '" + lane1 
						  + "'},{'name': '" + motion2.key 
						  + "', 'effect': '" + effect2.key 
						  + "', 'lane': '" + lane2.key 
						  + "'},{'name': '" + motion3.key 
						  + "', 'effect': '" + effect3.key 
						  + "', 'lane': '" + lane3.key 
						  + "'}]}";
>>>>>>> d5f49342fe805828195a6a0669b25bc811fcb3ae
	
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
function moveContent(buttonFocus,inputKey) {
   console.log('moveContent() 진입');
   switch(buttonFocus) {
   // 모션 1 변경
   case 1: 
      switch (inputKey) {
	      case 'left':
	         if (turn1 == 0) {return;} turn1 = turn1-1;
	         if (motion[turn1].getName() == motion2.key || motion[turn1].getName() == motion3.key) {return;}
	         else {
	        	 motion1 = game.add.sprite(buttonX, buttonY, motion[turn1].getName()); 
	             effect1 = game.add.sprite(buttonX, buttonY+100, motion[turn1].getEffect());
	             lane1 = game.add.sprite(buttonX, buttonY+200, motion[turn1].getLane()[0]);
	         } break;
	      case 'right':
	         if (turn1 >= 4) {turn1 = 3;} turn1 = turn1+1;
	         if (motion[turn1].getName() == motion2.key || motion[turn1].getName() == motion3.key) {return;}
		     else {
		    	 motion1 = game.add.sprite(buttonX, buttonY, motion[turn1].getName()); 
		         effect1 = game.add.sprite(buttonX, buttonY+100, motion[turn1].getEffect());
		         lane1 = game.add.sprite(buttonX, buttonY+200, motion[turn1].getLane()[0]);
			 } break;
	      case 'enter': 
	         //이 모션으로 선택했다는 효과 주기
	         break;
	      case 'esc': depth = 1; break;
	      default: break;
      } break;
   // 모션 2 변경
   case 2: 
      switch (inputKey) {
<<<<<<< HEAD
	      case 'left':
			if (turn2 == 0) {return;} turn2 = turn2-1;
			if (motion[turn2].getName() == motion1.key || motion[turn2].getName() == motion3.key) {return;}
			else {
			 motion2 = game.add.sprite(buttonX+100, buttonY, motion[turn2].getName());
			    effect2 = game.add.sprite(buttonX+100, buttonY+100, motion[turn2].getEffect());
			    lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[0]);
			} break;	
	    	  
	    	  	/* temp = turn2;
	    	  	minusAgain:
	    	  	turn2--;
	    	  	if (motion[turn2].getName() == motion1.key || motion[turn2].getName() == motion3.key) {
		    	  	if(turn2 != 0) {
		    	  		continue minusAgain;
		    	  	} else {
		    	  		turn2 = temp;
		    	  		return;
		    	  	}
      		} else {
				motion2 = game.add.sprite(buttonX+100, buttonY, motion[turn2].getName());
				effect2 = game.add.sprite(buttonX+100, buttonY+100, motion[turn2].getEffect());
				lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[0]);
      		} break; */
=======
	      case 'left': 
	         if (turn2 == 0) {return;} turn2 = turn2-1;
	         if (motion[turn2].getName() == motion1.key || motion[turn2].getName() == motion3.key) {return;}
	         else {
		         motion2 = game.add.sprite(buttonX+100, buttonY, motion[turn2].getName());
	             effect2 = game.add.sprite(buttonX+100, buttonY+100, motion[turn2].getEffect());
	             lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[0]);
	         } break;
>>>>>>> d5f49342fe805828195a6a0669b25bc811fcb3ae
	      case 'right': 
	         if (turn2 >= 4) {turn2 = 3;} turn2 = turn2+1;
	         if (motion[turn2].getName() == motion1.key || motion[turn2].getName() == motion3.key) {return;}
		     else {
		         motion2 = game.add.sprite(buttonX+100, buttonY, motion[turn2].getName());
		         effect2 = game.add.sprite(buttonX+100, buttonY+100, motion[turn2].getEffect());
		         lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[0]);
		     } break;
	      case 'enter':
	         //이 모션으로 선택
	         break;
	      case 'esc': depth = 1; break;
	      default: break;
      } break;
   // 모션 3 변경
   case 3: 
      switch (inputKey) {
	      case 'left': 
	         if (turn3 == 0) {return;} turn3 = turn3-1;
	         if (motion[turn3].getName() == motion1.key || motion[turn3].getName() == motion2.key) {return;}
	         else {
	        	 motion3 = game.add.sprite(buttonX+200, buttonY, motion[turn3].getName());
	             effect3 = game.add.sprite(buttonX+200, buttonY+100, motion[turn3].getEffect());
	             lane3 = game.add.sprite(buttonX+200, buttonY+200, motion[turn3].getLane()[0]);
	         } break;
	      case 'right': 
	         if (turn3 >= 4) {turn3 = 3;} turn3 = turn3+1;
	         if (motion[turn3].getName() == motion1.key || motion[turn3].getName() == motion2.key) {return;}
	         else {
	        	 motion3 = game.add.sprite(buttonX+200, buttonY, motion[turn3].getName());
	             effect3 = game.add.sprite(buttonX+200, buttonY+100, motion[turn3].getEffect());
	             lane3 = game.add.sprite(buttonX+200, buttonY+200, motion[turn3].getLane()[0]);	
	        	 } break;
	      case 'enter':
	         //이 모션으로 선택했다는 효과 주기
	         break;
	      case 'esc': depth = 1; break;
	      default: break;
      } break;
   // 레인 1 변경
   case 4: 
      var Motion = findMotion(motion1.key);
      switch (inputKey) {
	      case 'left':
	         if (turn4 <= 0) {turn4 = 0; return;} turn4 = turn4-1;
	        	 lane1 = game.add.sprite(buttonX, buttonY+200, Motion.getLane()[turn4]); break;
	      case 'right': 
	         if (turn4 >= 2) {turn4 = 2; return;} turn4 = turn4+1;
	        	 lane1 = game.add.sprite(buttonX, buttonY+200, Motion.getLane()[turn4]); break;
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
	        	 lane2 = game.add.sprite(buttonX+100, buttonY+200, Motion.getLane()[turn5]); break;
	      case 'right':
	         if (turn5 >= 2) {turn5 = 2; return;} turn5 = turn5+1;
	        	 lane2 = game.add.sprite(buttonX+100, buttonY+200, Motion.getLane()[turn5]); break;
	      case 'enter': 
	    	  	 //이 레인으로 선택했다는 효과 주기
	         break;
	      case 'esc': depth = 1; break;
	      default: break;
      } break;
   // 레인 3 변경
   case 6: 
      var Motion = findMotion(motion3.key);
      switch (inputKey) {
	      case 'left': 
	         if (turn6 <= 0) {turn6 = 0; return;} turn6 = turn6-1;
	        	 lane3 = game.add.sprite(buttonX+200, buttonY+200, Motion.getLane()[turn6]); break;
	      case 'right': 
	         if (turn6 >= 2) {turn6 = 2; return;} turn6 = turn6+1;
	        	 lane3 = game.add.sprite(buttonX+200, buttonY+200, Motion.getLane()[turn6]); break;
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
function createMercenary() {
	image = game.add.image(810, 120, 'pub');
	
	// 난수 발급
	var rdm = Math.floor(Math.random() * 9999) + 1000;
	board = game.add.image(810, 480, 'board');
	board.scale.set(1.8);

	$.ajax({
		url: 'sendRdm',
		type: 'post',
		data: {
			rdm: rdm
		},
		dataType: 'json',
		success: function(result) {
			console.dir(result);
			/* if (result == "true"){
				consle.log('성공');
			} else {
				text1 = game.add.bitmapText(1060, 600,'neo_font' ,'더이상 추가 불가', 60);
			} */
		},
		error: function() {alert('createMercenary - sendRdm error');}
	})

	// 난수를 보여줄 텍스트
	text1 = game.add.bitmapText(1060, 600,'neo_font' ,rdm, 60);
	
	
	neon = game.add.image(795, 400, 'neon');
	neon.scale.set(2);
	messange = game.add.bitmapText(810, 420,'neo_font' ,'주인장: 한겜허쉴?', 40);
	
	// 스마트 폰에서 입력한 값과 값을 비교해서 맞으면 연결 시켜주는 작업 필요.	
	
}

function update() {
   // 게임 실행 중에 항상 key 값을 받는다. 입력한 키에 따라 readKey()가 키 별 string을 반환한다. (누르는 시점에만 반환된다.) 
   readKey();
   multiconnection();
}

function multiconnection() {
<<<<<<< HEAD
	$.ajax({
		url: 'multiconnection',
		type: 'post',
		success: function(result) {
			console.log(result.length);
			if (result != null) {
				switch (result.length) {
				case 2:
					var player2 = game.add.image(220, 770, 'player2');
					player2.scale.set(0.4);
					break;
				case 3:
					var player3 = game.add.image(270, 770, 'player3');
					player3.scale.set(0.4);
					break;
				case 4:
					var player4 = game.add.image(320, 770, 'player4');
					player4.scale.set(0.4);
					break;
				default:
					break;
=======
	 $.ajax({
			url: 'multiconnection',
			type: 'post',
			success: function(result) {
				console.log(result.length);
				if (result != null) {
					switch (result.length) {
					case 2:
						var player2 = game.add.image(220, 770, 'player2');
						player2.scale.set(0.4);
						break;
					case 3:
						var player3 = game.add.image(310, 770, 'player3');
						player3.scale.set(0.4);
						break;
					case 4:
						var player4 = game.add.image(400, 770, 'player4');
						player4.scale.set(0.4);
						break;
					default:
						break;
					}
>>>>>>> d5f49342fe805828195a6a0669b25bc811fcb3ae
				}
			}
		},
		error: function() {alert('update() - multiconnection error');}
	})
}

function myroom() {
	//alert('myroom 진입');
	image = game.add.image(810, 120, 'myroom');
	exit = game.add.image(900, 550, 'exit');
	exit.scale.set(0.8);
	text2 = game.add.text(940, 520, "게임을 종료합니다", 
			{ font: "40px Arial", fill: "#FFFFFF", align: "center" });
	// 깊이를 3으로 변경 > update에서 depth에 따른 case문을 통해 goHome(inputKey)를 호출 
 	depth = 3;
}

function goHome(inputKey) {
	if (inputKey == 'esc') {depth = 0;}
	else if (inputKey == 'enter') {
		e_select = game.add.sprite(900, 550, 'e_select');
		e_select.scale.set(0.8);
		// 게임 종료. 검정 화면 준비.
		sprite = game.add.sprite(0, 0, 'finish');
		// 원래 사이즈 보다 확대 하고 alph로 투명도 조절.
		sprite.scale.set(5);
	    sprite.anchor.setTo(0.5, 0.5);
	    sprite.alpha = 0;
		
	    //화면에서 검정화면으로 조정.
		game.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
	
		logoutMember();
	}
}

function isnull() {
	if (text1 != null) {text1.kill();}
	if (image != null) {image.kill();}
<<<<<<< HEAD
	if (m_back== null) {m_back = game.add.image(750,75,'menu_sub_back');}
	
=======
	if (m_back== null) {m_back = game.add.image(750,75,'menu_back');}
>>>>>>> d5f49342fe805828195a6a0669b25bc811fcb3ae
	if (neon != null) {neon.kill();}
	if (board != null) {board.kill();}
	if (messange != null) {messange.kill();}
	if (exit != null) {exit.kill();}
	if (text2!= null) {text2.kill();}
	if (e_select!= null) {e_select.kill();}
	if (motion1 != null) {motion1.kill();}
	if (motion2 != null) {motion2.kill();}
	if (motion3 != null) {motion3.kill();}
	if (effect1 != null) {effect1.kill();}
	if (effect2 != null) {effect2.kill();}
	if (effect3 != null) {effect3.kill();}
	if (lane1 != null) {lane1.kill();}
	if (lane2 != null) {lane2.kill();}
	if (lane3 != null) {lane3.kill();}
	if (square != null) {square.kill();}
}

</script>
</body>
</html>