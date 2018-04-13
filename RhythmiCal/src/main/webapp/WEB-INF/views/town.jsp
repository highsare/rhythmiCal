<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
var game = new Phaser.Game(1600, 900, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
// 키보드 버튼
var key;
// 작업소 깊이
var depth;
// 선택한 모션을 저장하는 배열
var selectedMotion;

function preload() {
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
   
   selectedMotion = new Array();
   selectedMotion[0] = new Array();
   selectedMotion[1] = new Array();
   selectedMotion[2] = new Array();
}

var x, y; // 스퀘어의 위치(좌표)를 나타내는 변수
var buttonFocus; // 현재 버튼이 몇 번에 있는가
var motion; // 모션을 담는 배열
var turn1, turn2, turn3, turn4, turn5, turn6; // 모션(1~3) 및 레인(4~6)을 교체할 카운터
var motion1, motion2, motion3, effect1, effect2, effect3, lane1, lane2, lane3; // 9개의 스프라이트 버튼
var singleLane, doubleLane; // 싱글레인 및 더블레인 배열
var saveMotion1, saveMotion2, saveMotion3;
function create() {
    // 버튼 포커스를 1로 초기화
    buttonFocus = 1;
    // 순서를 0으로 초기화
    turn = 0;
    turn1 = 0; //'point'
    turn2 = 1; //'up'
    turn3 = 2; //'down'
    turn4 = 0; //'A'
    turn5 = 0; //'AB'
    turn6 = 0; //'AB'
    // 작업소 깊이를 1로 초기화
    depth = 1;
    // 키보드를 받는 변수 생성
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
   
    // 싱글레인 및 더블레인 배열 초기화
    singleLane = ['A', 'B', 'C'];
    doubleLane = ['AB', 'BC', 'CA'];
    
    // 중상하좌우 모션 객체 생성 후 모션 배열에 저장
    var Point = new Motion(null, 'point', 'fire', doubleLane, false);
    var Up = new Motion(null, 'up', 'water', doubleLane, false);
    var Down = new Motion(null, 'down', 'sun', doubleLane, false);
    var Left = new Motion(null, 'left', 'moon', singleLane, false);
    var Right = new Motion(null, 'right', 'star', singleLane, false);
    motion = [Point, Up, Down, Left, Right];
    
    
    
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
 * Motion(int index, String name, String effect, String lane, boolean selected): Motion 객체 생성자
 */
function Motion(index, name, effect, lane, selected) {
    // parameter of constructor
    this.index = index;
    this.name = name;
    this.effect = effect;
    this.lane = lane;
    this.selected = selected;
    
    // getter
    this.getIndex = function() {return this.index;}
    this.getName = function() {return this.name;}
    this.getEffect = function() {return this.effect;}
    this.getLane = function() {return this.lane;}
    this.getSelected = function() {return this.selected;}

    // setter
    this.setLane = function(lane) {this.lane = lane;} //setLane(String lane): 모션 객체에 레인을 세팅하는 함수. 'A','B','C','AB','BC','CA' 등
    this.setSelected = function(selected) {this.selected = selected;} //setSelected(boolean selected): 모션을 선택할 시 true로 세팅하는 함수
    
    // toString
    this.toString = function() {return 'index: ' + this.index + '\n'
                               + 'name: ' + this.name + '\n'
                               + 'effect: ' + this.effect + '\n'
                               + 'lane: ' + this.lane + '\n'
                               + 'selected: ' + this.selected}
}

/*
 * readKey(): 키보드 키를 읽어들이는 메소드
 */
function readKey() {
   $.ajax({
      url: 'requestConsole', 
      success: function(key) {
         if (key != "NOTHING") {
            switch (depth) {
            // 버튼을 움직이는 단계
            case 1:
               console.log('depth: 1');
               moveButtonFocus(key); // 버튼 상하좌우 이동
               break;
            
            // 모션을 움직이는 단계
            case 2:
               console.log('depth: 2'); 
               moveContent(buttonFocus,key); // 모션 및 레인 좌우 이동
               break;
            }
         }
      }
   });
   return "";
}

/*
 * moveButtonFocus(): 버튼을 상하좌우 이동시키는 메소드. (depth 1에서 출발)
 */
function moveButtonFocus(inputKey) {
   console.log('moveButtonFocus 진입');
   switch (inputKey) {
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
 * selectMotion(int x, int y, Motion motionObject): 모션을 선택하는 메소드. 모션을 선택하고 enter를 누를 시 selectMotion[][]에 저장
 */
function selectMotion(x, y, motionObject) {
   //이전에 선택한 값이 있다면 선택 상태를 다시 false로 돌려 놓는다.
   if (selectedMotion[x][y] != null) {selectedMotion[x][y].setSelected(false);}

   //현재의 모션의 선택 상태를 true로 설정하고 selectedMotion[][]에 저장한다.
   motionObject.setSelected(true);
   selectedMotion[x][y] = motion[turn];
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
 * moveContent(int buttonFocus): 모션을 좌우 이동시키는 메소드 (depth 2에서 출발) 
 */
function moveContent(buttonFocus,inputKey) {
   console.log('moveContent() 진입');
   switch(buttonFocus) {
   // 모션 1 변경
   case 1: 
      switch (inputKey) {
      case 'left':
         if (turn1 == 0) {return;} turn1 = turn1-1;
         if (motion[turn1].getSelected()) {return;} //이미 selected된 모션은 표시하지 않고 리턴
         motion1 = game.add.sprite(1000, 200, motion[turn1].getName()); 
         effect1 = game.add.sprite(1000, 300, motion[turn1].getEffect());
         lane1 = game.add.sprite(1000, 300, motion[turn1].getLane()[0]);
         break;
      case 'right':
         if (turn1 >= 4) {turn1 = 3;} turn1 = turn1+1;
         if (motion[turn1].getSelected()) {return;} //이미 selected된 모션은 표시하지 않고 리턴
         motion1 = game.add.sprite(1000, 200, motion[turn1].getName()); 
         effect1 = game.add.sprite(1000, 300, motion[turn1].getEffect());
         lane1 = game.add.sprite(1000, 300, motion[turn1].getLane()[0]);
         break;
      case 'enter': 
         //이 모션으로 선택
         motionToSelect = findMotion(motion1.key);
         selectMotion(0, 0, motionToSelect);
         break;
      case 'esc':
         //깊이를 1로 변경
         depth = 1; 
         break;
      default:  
         break;
      }
      break;
   // 모션 2 변경
   case 2: 
      switch (inputKey) {
      case 'left': 
         if (turn2 == 0) {return;} turn2 = turn2-1;
         if (motion[turn2].getSelected()) {return;} //이미 selected된 모션은 표시하지 않고 리턴
         motion2 = game.add.sprite(1100, 200, motion[turn2].getName());
         effect2 = game.add.sprite(1100, 300, motion[turn2].getEffect());
         break;
      case 'right': 
         if (turn2 >= 4) {turn2 = 3;} turn2 = turn2+1;
         if (motion[turn2].getSelected()) {return;} //이미 selected된 모션은 표시하지 않고 리턴
         motion2 = game.add.sprite(1100, 200, motion[turn2].getName());
         effect2 = game.add.sprite(1100, 300, motion[turn2].getEffect());
         break;
      case 'enter':
         //이 모션으로 선택
         motionToSelect = findMotion(motion2.key);
         selectMotion(0, 1, motionToSelect);
         break;
      case 'esc':
         //깊이를 1로 변경
         depth = 1;
         break;
      default:  
         break;
      }
      break;
   // 모션 3 변경
   case 3: 
      switch (inputKey) {
      case 'left': 
         if (turn3 == 0) {return;}
         turn3 = turn3-1;
         if (motion[turn3].getSelected()) {return;} //이미 selected된 모션은 표시하지 않고 리턴
         motion3 = game.add.sprite(1200, 200, motion[turn3].getName());
         effect3 = game.add.sprite(1200, 300, motion[turn3].getEffect());
         break;
      case 'right': 
         if (turn3 >= 4) {turn3 = 3;}
         turn3 = turn3+1;
         if (motion[turn3].getSelected()) {return;} //이미 selected된 모션은 표시하지 않고 리턴
         motion3 = game.add.sprite(1200, 200, motion[turn3].getName());
         effect3 = game.add.sprite(1200, 300, motion[turn3].getEffect());
         break;
      case 'enter':
         //이 모션으로 선택
         motionToSelect = findMotion(motion3.key);
         selectMotion(0, 2, motionToSelect);
      case 'esc':
         //깊이를 1로 변경
         depth = 1; 
         break;
      default:  
         break;
      }
      break;
   // 레인 1 변경
   case 4: 
      var Motion = findMotion(motion1.key);
      switch (inputKey) {
      case 'left':
         if (turn4 <= 0) {turn4 = 0; return;} turn4 = turn4-1;
         lane1 = game.add.sprite(1000, 400, Motion.getLane()[turn4]);
         break;
      case 'right': 
         if (turn4 >= 2) {turn4 = 2; return;} turn4 = turn4+1;
         lane1 = game.add.sprite(1000, 400, Motion.getLane()[turn4]);
         break;
      case 'enter': //이거 안필요할듯?
         selectedMotion[0][0].setSelected(true);
         break;
      case 'esc': 
         depth = 1; 
         break;
      default: 
         break;
      }
      break;         
   // 레인 2 변경
   case 5:
      var Motion = findMotion(motion2.key);
      switch (inputKey) {
      case 'left': 
         if (turn5 <= 0) {turn5 = 0; return;} turn5 = turn5-1;
         lane2 = game.add.sprite(1100, 400, Motion.getLane()[turn5]);
         break;
      case 'right':
         if (turn5 >= 2) {turn5 = 2; return;} turn5 = turn5+1;
         lane2 = game.add.sprite(1100, 400, Motion.getLane()[turn5]);
         break;
      case 'enter': //이거 안필요할듯?
         selectedMotion[0][1].setSelected(true);
         break;
      case 'esc': 
         depth = 1; //깊이를 1로 변경
         break;
      default:  
         break;
      }
      break;
   // 레인 3 변경
   case 6: 
      var Motion = findMotion(motion3.key);
      switch (inputKey) {
      case 'left': 
         if (turn6 <= 0) {turn6 = 0; return;} turn6 = turn6-1;
         lane3 = game.add.sprite(1200, 400, Motion.getLane()[turn6]);
         break;
      case 'right': 
         if (turn6 >= 2) {turn6 = 2   ; return;} turn6 = turn6+1;
         lane3 = game.add.sprite(1200, 400, Motion.getLane()[turn6]);
         break;
      case 'enter':
         //이 레인으로 저장
         selectedMotion[0][2].setSelected(true);
      case 'esc': 
         //깊이를 1로 변경
         depth = 1; 
         break;
      default:  
         break;
      }
      break;
   }
}

var square;
function update() {
   // 게임 실행 중에 항상 key 값을 받는다. 입력한 키에 따라 readKey()가 키 별 string을 반환한다. (누르는 시점에만 반환된다.) 
   readKey();
   // 깊이에 따라 단계별 메소드 실행
}
</script>
</body>
</html>