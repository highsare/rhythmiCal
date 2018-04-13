<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="resources/JS/phaser-2.10.2.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>마을</title>
</head>
<body>
<script>
var game = new Phaser.Game(1600, 900, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
// 키보드 버튼
var key;
// 작업소 깊이
var depth;

function preload() {
	// 네모 테두리 로드
	game.load.spritesheet('square', 'resources/phaser/square.png', 95, 95);
	
	// 레인 스프라이트 로드
	game.load.spritesheet('A', 'resources/phaser/A.png', 90, 90);
	game.load.spritesheet('B', 'resources/phaser/B.png', 90, 90);
	game.load.spritesheet('C', 'resources/phaser/C.png', 90, 90);
	game.load.spritesheet('AB', 'resources/phaser/AB.png', 90, 90);
	game.load.spritesheet('BC', 'resources/phaser/BC.png', 90, 90);
	game.load.spritesheet('CA', 'resources/phaser/CA.png', 90, 90);
	
	// 모션 스프라이트 로드
	game.load.spritesheet('point', 'resources/phaser/point.png', 90, 90);
	game.load.spritesheet('up', 'resources/phaser/up.png', 90, 90);
	game.load.spritesheet('down', 'resources/phaser/down.png', 90, 90);
	game.load.spritesheet('left', 'resources/phaser/left.png', 90, 90);
	game.load.spritesheet('right', 'resources/phaser/right.png', 90, 90);
	
	// 효과 스프라이트 로드
	game.load.spritesheet('fire', 'resources/phaser/fire.png', 90, 90);
	game.load.spritesheet('water', 'resources/phaser/water.png', 90, 90);
	game.load.spritesheet('sun', 'resources/phaser/sun.png', 90, 90);
	game.load.spritesheet('moon', 'resources/phaser/moon.png', 90, 90);
	game.load.spritesheet('star', 'resources/phaser/star.png', 90, 90);
}

var x, y; // 스퀘어의 위치(좌표)를 나타내는 변수
var buttonFocus; //현재 버튼이 몇 번에 있는가
var motion;
var turn; // 모션 및 레인을 교체할 카운터
var motion1, motion2, motion3, effect1, effect2, effect3, lane1, lane2, lane3; // 9개의 스프라이트 버튼
var singleLane, doubleLane; // 싱글레인 및 더블레인 배열
var saveMotion1, saveMotion2, saveMotion3;
function create() {
	// 버튼 포커스를 1로 초기화
	buttonFocus = 1;
	// 순서를 0으로 초기화
	turn = 0;
	// 작업소 깊이를 1로 초기화
	depth = 1;
	// 키보드를 받는 변수 생성
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
	
    // 중상하좌우 모션 객체 생성 후 모션 배열에 저장
	var point = new Motion(null, 'point', 'fire');
    var up = new Motion(null, 'up', 'water');
    var down = new Motion(null, 'down', 'sun');
    var left = new Motion(null, 'left', 'moon');
    var right = new Motion(null, 'right', 'star');
    motion = [point, up, down, left, right];
    
 	// 싱글레인 및 더블레인 배열 초기화
    singleLane = ['A', 'B', 'C'];
    doubleLane = ['A', 'B', 'C', 'AB', 'BC', 'CA'];
    
	// 스퀘어 생성
	x = 1000; y = 200;
	square = game.add.sprite(x, y, 'square');
	
	// DB로부터 값을 가져온다. (ArrayList를 반환하는 별도의 서버 연결 함수를 만들어서 값을 받기로 하자.)
	
	// 가져온 ArrayList가 null인지 null이 아닌지 확인한다.
		// null일 경우 > 초기 값을 띄운다.
			// 첫 번째 모션
			motion1 = game.add.sprite(1000, 200, 'point');
			effect1 = game.add.sprite(1000, 300, 'fire');
			lane1 = game.add.sprite(1000, 400, 'A');
			
			// 두 번째 모션
			motion2 = game.add.sprite(1100, 200, 'up');
			effect2 = game.add.sprite(1100, 300, 'water');
			lane2 = game.add.sprite(1100, 400, 'A');
		
			// 세 번째 모션
			motion3 = game.add.sprite(1200, 200, 'down');
			effect3 = game.add.sprite(1200, 300, 'sun');
			lane3 = game.add.sprite(1200, 400, 'A');
	
		// null이 아닐 경우 > 가져온 값을 띄운다.
}

/*
 * Motion(index, name, effect, lane): Motion 객체 생성자
 */
function Motion(index, name, effect, lane) {
	// setter
	this.index = index;
	this.name = name;
    this.effect = effect;
    this.lane = lane;
    // getter
    this.getIndex = function() {return this.index;}
    this.getName = function() {return this.name;}
    this.getEffect = function() {return this.effect;}
    this.gerLane = function() {return this.lane;}
}

/*
 * readKey(): 키보드 키를 읽어들이는 메소드
 */
function readKey() {
	if (upKey.isDown) {return 'up';}
    else if (downKey.isDown) {return 'down';}
    else if (leftKey.isDown) {return 'left';}
    else if (rightKey.isDown) {return 'right';}
    else if (enterKey.isDown) {return 'enter';}
    else if (escKey.isDown) {return 'esc';}
    else {return null;}
}

/*
 * moveButtonFocus(): 버튼을 상하좌우 이동시키는 메소드. (depth 1에서 출발)
 */
function moveButtonFocus() {
	console.log('moveButtonFocus 진입');
	switch (key) {
		case 'up':
			if (y == 200) {return;} // 맨 상단에 있을 경우 상단이동 금지
			else {
				square.kill();
				y = y-200;
				square = game.add.sprite(x, y, 'square');
				buttonFocus = buttonFocus-3;
				return;
			}
			break;
		case 'down':
			if (y == 400) {return;} // 맨 하단에 있을 경우 하단이동 금지
			else {
				square.kill();
				y = y+200;
				square = game.add.sprite(x, y, 'square');
				buttonFocus = buttonFocus+3;
				return;
			}
		case 'left':
			if (x == 1000) {return;} // 맨 좌측에 있을 경우 좌측이동 금지
			else {
				square.kill();
				x = x-100;
				square = game.add.sprite(x, y, 'square');
				buttonFocus = buttonFocus-1;
				return;
			}
			break;
		case 'right':
			if (x == 1200) {return;} // 맨 우측에 있을 경우 우측이동 금지
			else {
				square.kill();
				x = x+100;
				square = game.add.sprite(x, y, 'square');
				buttonFocus = buttonFocus+1;
				return;
			}
			break;
		case 'enter': 
			depth = 2; // 하위 메뉴로 이동
			break; 
		case 'esc': 
			depth = 1; // 상위 메뉴로 이동
			break;
	}
}

/*
 * moveContent(buttonFocus): 모션을 좌우 이동시키는 메소드 (depth 2에서 출발) 
 */
function moveContent(buttonFocus) {
	console.log('moveContent() 진입');
	switch(buttonFocus) {
		case 1: 
			switch (key) {
			case 'left':
				if (turn == 0) {return;}
				turn = turn-1;
				motion1 = game.add.sprite(1000, 200, motion[turn].getName()); 
				effect1 = game.add.sprite(1000, 300, motion[turn].getEffect());
				
				break;
			case 'right':
				if (turn >= 4) {turn = 3;}
				turn = turn+1;
				motion1 = game.add.sprite(1000, 200, motion[turn].getName()); 
				effect1 = game.add.sprite(1000, 300, motion[turn].getEffect());
				break;
			case 'enter': 
				//이 모션으로 저장
				
				//이 모션과 효과를 별도의 저장 리스트에 이식
				
				//turn을 1 줄임 
				depth = 1; //깊이를 1로 변경
				break;
			default:  
				break;
			}
			break;
		case 2: 
			switch (key) {
			case 'left': 
				if (turn == 0) {return;}
				turn = turn-1;
				motion2 = game.add.sprite(1100, 200, motion[turn].getName());
				effect2 = game.add.sprite(1100, 300, motion[turn].getEffect());
				break;
			case 'right': 
				if (turn >= 4) {turn = 3;}
				turn = turn+1;
				motion2 = game.add.sprite(1100, 200, motion[turn].getName());
				effect2 = game.add.sprite(1100, 300, motion[turn].getEffect());
				break;
			case 'enter':
				//이 모션으로 저장
				//이 모션과 효과를 리스트에서 뺌
				//turn을 1 줄임 
				depth = 1; //깊이를 1로 변경
				break;
			default:  
				break;
			}
			break;
		case 3: 
			switch (key) {
			case 'left': 
				if (turn == 0) {return;}
				turn = turn-1;
				motion3 = game.add.sprite(1200, 200, motion[turn].getName());
				effect3 = game.add.sprite(1200, 300, motion[turn].getEffect());
				break;
			case 'right': 
				if (turn >= 4) {turn = 3;}
				turn = turn+1;
				motion3 = game.add.sprite(1200, 200, motion[turn].getName());
				effect3 = game.add.sprite(1200, 300, motion[turn].getEffect());
				break;
			case 'enter':
				//이 모션으로 저장
				//이 모션과 효과를 리스트에서 뺌
				//turn을 1 줄임 
				depth = 1; //깊이를 1로 변경
				break;
			default:  
				break;
			}
			break;
		// 레인 6가지
		case 4: 
			switch (key) {
			case 'left':
				if (turn <= 0) {turn = 0; return;} turn = turn-1;
				if (motion1.key == 'point' || motion1.key == 'up' || motion1.key == 'down') {
					lane1 = game.add.sprite(1000, 400, doubleLane[turn]);	
				}
				else {
					lane1 = game.add.sprite(1000, 400, singleLane[turn]);
				}
				break;
			case 'right': 
				if (motion1.key == 'point' || motion1.key == 'up' || motion1.key == 'down') {
					if (turn >= 5) {turn = 5; return;} turn = turn+1;
					lane1 = game.add.sprite(1000, 400, doubleLane[turn]);	
				}
				else {
					if (turn >= 2) {turn = 2; return;} turn = turn+1;
					lane1 = game.add.sprite(1000, 400, singleLane[turn]);
				}
				break;
			case 'enter':
				//이 레인으로 저장
				//이 레인을 리스트에서 뺌
				//turn을 1 줄임 
				depth = 1; //깊이를 1로 변경
				break;
			default:  
				break;
			}
			break;			
		case 5:
			switch (key) {
			case 'left': 
				if (turn <= 0) {turn = 0; return;} turn = turn-1;
				if (motion2.key == 'point' || motion2.key == 'up' || motion2.key == 'down') {
					lane2 = game.add.sprite(1100, 400, doubleLane[turn]);
				}
				else {
					lane2 = game.add.sprite(1100, 400, singleLane[turn]);
				}
				break;
			case 'right':
				if (motion2.key == 'point' || motion2.key == 'up' || motion2.key == 'down') {
					if (turn >= 5) {turn = 5; return;} turn = turn+1;
					lane2 = game.add.sprite(1100, 400, doubleLane[turn]);
				}
				else {
					if (turn >= 2) {turn = 2; return;} turn = turn+1;
					lane2 = game.add.sprite(1100, 400, singleLane[turn]);	
				}
				break;
			case 'enter':
				//이 레인으로 저장
				//이 레인을 리스트에서 뺌
				//turn을 1 줄임 
				depth = 1; //깊이를 1로 변경
				break;
			default:  
				break;
			}
			break;
		case 6: 
			switch (key) {
			case 'left': 
				alert(turn);
				if (turn <= 0) {turn = 0; return;} turn = turn-1;
				if (motion3.key == 'point' || motion3.key == 'up' || motion2.key == 'down') {
					lane3 = game.add.sprite(1200, 400, doubleLane[turn]);
				}
				else {
					lane3 = game.add.sprite(1200, 400, singleLane[turn]);
				}
				break;
			case 'right': 
				alert(turn);
				if (motion3.key == 'point' || motion3.key == 'up' || motion3.key == 'down') {
					if (turn >= 5) {turn = 5; return;} turn = turn+1;
					lane3 = game.add.sprite(1200, 400, doubleLane[turn]);
				}
				else { 
					if (turn >= 2) {turn = 2; return;} turn = turn+1;
					lane3 = game.add.sprite(1200, 400, singleLane[turn]);
				}
				break;
			case 'enter':
				//이 레인으로 저장
				//이 레인을 리스트에서 뺌
				//turn을 1 줄임 
				depth = 1; //깊이를 1로 변경
				break;
			default:  
				break;
			}
			break;0
	}
}

var square;
function update() {
	// 게임 실행 중에 항상 key 값을 받는다. 입력한 키에 따라 readKey()가 키 별 string을 반환한다. (누르는 시점에만 반환된다.) 
	key = readKey();
	
	// 깊이에 따라 단계별 메소드 실행
	switch (depth) {
		// 버튼을 움직이는 단계
		case 1:
			console.log('depth: 1');
			moveButtonFocus(); // 버튼 상하좌우 이동
			break;
		
		// 모션을 움직이는 단계
		case 2:
			console.log('depth: 2'); 
			moveContent(buttonFocus); // 모션 및 레인 좌우 이동
			break;
	}
}
</script>
</body>
</html>