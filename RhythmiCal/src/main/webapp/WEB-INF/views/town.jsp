<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="resources/JavaScriptResource/phaser-2.10.2.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>town.jsp</title>
</head>
<body>
<script>
var game = new Phaser.Game(1600, 900, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

var text1,text2;
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

var key; // 키보드 버튼
var depth; // 작업소 깊이
var square,squareX, squareY; // 스퀘어의 위치(좌표)를 나타내는 변수
var buttonX=1000, buttonY=450; // 모션, 효과, 레인 스프라이트의 위치(좌표)를 나타내는 변수
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
	game.load.image('menuwin','resources/Images/town/townImg/vmenu.png' ); //마을 메뉴 이미지 로드
	game.load.image('myroom','resources/Images/town/townImg/myroom.png' ) // 내방 이미지
	game.load.image('click2','resources/Images/town/townImg/click2.png' ); //두번째 메뉴 이미지 로드(임의)
	game.load.image('hand','resources/Images/town/townImg/hand.png' ); //스마트폰 들고있는 이미지 로드
	game.load.image('finish','resources/Images/town/townImg/black.png' ); //종료시 fade out될 검정 배경 이미지 로드
	game.load.image('back','resources/Images/town/townImg/v_back.png' ); //마을 배경 이미지
	game.load.image('select','resources/Images/town/townImg/select.png' );//선택 흰 테두리
	game.load.image('menu_back','resources/Images/town/townImg/menu_back.png' );//Enter 눌렀을 때 서브메뉴 배경
	game.load.image('pub','resources/Images/town/townImg/pub.PNG' ); //용병소 이미지
	game.load.image('worksplace', 'resources/Images/town/townImg/office.png'); //작업소 이미지
	game.load.image('exit','resources/Images/town/townImg/exit.png' ); //내방에서의 종료 버튼 이미지
	game.load.image('e_select','resources/Images/town/townImg/exit_line.png' ); //종료 버튼 감싸고 있는 선택 이미지
	
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
	//메뉴 이미지 지정한 이미지에 출력
	var back = game.add.image(100, 80, 'menuwin');
	back.scale.set(2);
	//첫 메뉴를 가리키고 있는 흰테두리출력
	point = game.add.image(x, y, 'select');
	point.scale.set(1.98);
	//키보드 사용 설정 해줌
	cursors = game.input.keyboard.createCursorKeys();
}

/*
 * readKey(): 키보드 키를 읽어들이는 메소드
 */
															//앱과 연동 시 var inputKey 지우고, 주석 살리고, update에서 깊이별 분기문 지워야 한다.
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
	    	y -= 112; alert(y);
	    	tween.to({y: y}, 300, Phaser.Easing.Exponential.Out, true, 0);
		} break;
	case 'down':
		if (y < 540) {
			y += 112; alert(y);
			tween.to({y: y}, 300, Phaser.Easing.Exponential.Out, true, 0);
		} break;
	case 'esc': 
  		isEntered = false;
  		if (point == null) {
  			point = game.add.image(x,y,'select');	
  			point.scale.set(1.98);
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
			case 204: alert('작업소');
				isnull();
				createStudio();
				break;
			case 316: alert('용병소');
				isnull();
				createMercenary();
				break;
			case 428: alert('겜시작');
				isnull();
				image = game.add.image(600, 80, 'click2');
				key1.onDown.add(cancel, this);
				break;
			case 540: alert('겜종료');
				isnull();
				myroom();
			    logoutMember();
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
		success: function() {alert('success');},
		error: function() {alert('error');}
	})
}

/*
 * createStudio(): 작업소 화면을 만드는 메소드 
 */
function createStudio() {
	image = game.add.image(770, 120, 'worksplace');

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
	squareX = 1000; squareY = 450;
	square = game.add.sprite(squareX, squareY, 'square');
	
	// AJAX를 통해 DB(table save)로부터 모션 리스트를 읽음
	$.ajax({
		url: 'readMotionList',
		dataType: 'json',
		// 성공하면 가져온 모션 리스트를 표시
		success: function(json) {
			var motionList = $.parseJSON(json);
			// 첫 번째 모션
			motion1 = game.add.sprite(buttonX, buttonY, motionList[0].name);
			effect1 = game.add.sprite(buttonX, buttonY+100, motionList[0].effect);
			lane1 = game.add.sprite(buttonX, button+200, motionList[0].lane);
			
			// 두 번째 모션
			motion2 = game.add.sprite(buttonX+100, buttonY, motionList[1].lane);
			effect2 = game.add.sprite(buttonX+100, buttonY+100, motionList[1].lane);
			lane2 = game.add.sprite(buttonX+100, buttonY+200, motionList[1].lane);
			
			// 세 번째 모션
			motion3 = game.add.sprite(buttonX+200, buttonY, motionList[2].lane);
			effect3 = game.add.sprite(buttonX+200, buttonY+100, motionList[2].lane);
			lane3 = game.add.sprite(buttonX+200, buttonY+200, motionList[2].lane);
	   },
	   // 실패하면 기본값을 표시
	   error: function() {
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
  			point = game.add.image(x,y,'select');	
  			point.scale.set(1.98);
  		} 
  		
  		 depth = 0; 
  		 break;
   }
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
	      case 'left': 
	         if (turn2 == 0) {return;} turn2 = turn2-1;
	         if (motion[turn2].getName() == motion1.key || motion[turn2].getName() == motion3.key) {return;}
	         else {
		         motion2 = game.add.sprite(buttonX+100, buttonY, motion[turn2].getName());
	             effect2 = game.add.sprite(buttonX+100, buttonY+100, motion[turn2].getEffect());
	             lane2 = game.add.sprite(buttonX+100, buttonY+200, motion[turn2].getLane()[0]);
	         } break;
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
	image = game.add.image(770, 120, 'pub');
		
	// 난수 발급
	var rdm = Math.floor(Math.random() * 9999) + 1000;
	image = game.add.image(800, 350, 'hand');

	$.ajax({
		url: 'sendRdm',
		type: 'post',
		data: {
			rdm: rdm
		},
		success: function(result) {
			if (result == true){
				alert('생성된 코드를 모바일에서 입력해주세요.');
			} else {
				alert('더이상 추가 불가');
			}
		},
		error: function() {alert('error');}
	})

	// 난수를 보여줄 텍스트
	text1 = game.add.text(1070, 450, rdm, 
			{ font: "40px Arial", fill: "#000000", align: "center" });
	// 스마트 폰에서 입력한 값과 값을 비교해서 맞으면 연결 시켜주는 작업 필요.	
}

function update() {
   // 게임 실행 중에 항상 key 값을 받는다. 입력한 키에 따라 readKey()가 키 별 string을 반환한다. (누르는 시점에만 반환된다.) 
   readKey();
}

function myroom() {
	image = game.add.image(770, 120, 'myroom');
	exit = game.add.image(900, 550, 'exit');
	exit.scale.set(0.8);
	text2 = game.add.text(940, 520, "게임을 종료합니다", 
			{ font: "40px Arial", fill: "#FFFFFF", align: "center" });
	
	
 	if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
		
		var e_select = game.add.sprite(900, 550, 'e_select');
		e_select.scale.set(0.8);
		// 게임 종료. 검정 화면 준비.
		var sprite = game.add.sprite(0, 0, 'finish');
		// 원래 사이즈 보다 확대 하고 alph로 투명도 조절.
		sprite.scale.set(5);
	    sprite.anchor.setTo(0.5, 0.5);
	    sprite.alpha = 0;
		
	    //화면에서 검정화면으로 조정.
		game.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
	} 
}


function isnull() {
	if (text1 != null) {text1.kill();}
	if (image != null) {image.kill();}
	if (m_back== null) {m_back = game.add.image(720,80,'menu_back');}
	
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