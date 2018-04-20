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

var game = new Phaser.Game(1600, 900, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

var text1;
var cursors;
var point;
var image;
var y = 204;
var x = 103;
var inout = 0;
var isEntered = false;
var tween;
var key1;
var bgd;

function preload() {
	//마을 메뉴 이미지 로드
	game.load.image('menuwin','resources/images/town/townImg/vmenu.png' )
	//마을 이미지 로드
	game.load.image('click','resources/imagestown/townImg//myroom.png' )
	//스마트폰 들고있는 이미지 로드
	game.load.image('hand','resources/images/town/townImg/hand.png' )
	//종료시 fade out될 검정 배경 이미지 로드
	game.load.image('finish','resources/images/town/townImg/black.png' )
	//마을 배경 이미지
	game.load.image('back','resources/images/town/townImg/v_back.png' )
	//선택 흰 테두리
	game.load.image('select','resources/images/town/townImg/select.png' )
	//Enter 눌렀을 때 서브메뉴 배경
	game.load.image('menu_back','resources/images/town/townImg/menu_back.png' )
	//용병소 이미지
	game.load.image('pub','resources/images/town/townImg/pub.PNG' )
	//작업소 이미지 
	game.load.image('worksplace', 'resources/images/town/townImg/office.png')
	//내방에서의 종료 버튼 이미지
	game.load.image('exit','resources/images/town/townImg/exit.png' )
	//종료 버튼 감싸고 있는 선택 이미지
	game.load.image('e_select','resources/images/town/townImg/exit_line.png' )
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

function update() {
	//화살표 이미지
	tween = game.add.tween(point);
	
	//윗키를 눌렀을 때
    if (cursors.up.isDown && !isEntered) {	
        if (y>204) {
        		y -= 112; alert(y);
        		tween.to({ y: y }, 300, Phaser.Easing.Exponential.Out, true, 0);
		}
    }
	//아래키를 눌렀을 때
	else if (cursors.down.isDown && !isEntered){
		if (y<540) {
			y += 112; alert(y);
			tween.to({ y: y }, 300, Phaser.Easing.Exponential.Out, true, 0);
		}
	}
	// 엔터를 눌렀을 때.
	else if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER) && !isEntered) {
		isEntered = true;
	   	point.kill();
	   	point = null;
	   	
	   	//취소키 (1번이라고 가정)
	   	key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	   	
	   	// 화살표가 멈춰있는 위치에서 엔터를 눌렀을 때 분기 처리.
		switch (y) {
			case 204: alert('작업소');
				// null인지 확인하기.
				isnull();
				office();
				key1.onDown.add(cancel, this);
				break;
			case 316: alert('316');
				isnull();
				image = game.add.image(600, 80, 'click2');
				key1.onDown.add(cancel, this);
				break;
			case 428: alert('428');
				isnull();
				key1.onDown.add(cancel, this);
				// 스마트 폰에서 입력한 값과 값을 비교해서 맞으면 연결 시켜주는 작업 필요.
				break;
			case 540:
				isnull();
				// 게임 종료. 검정 화면 준비.
				var sprite = game.add.sprite(0, 0, 'finish');
				// 원래 사이즈 보다 확대 하고 alph로 투명도 조절.
				sprite.scale.set(5);
			    sprite.anchor.setTo(0.5, 0.5);
			    sprite.alpha = 0;
			    //화면에서 검정화면으로 조정.
				game.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
			    //로컬로 이동해서 로그아웃 등을 해주는 작업 필요.
			break;
		}
	}
}

function isnull() {
	if (text1 != null) {text1.kill();}
	if (image != null) {image.kill();}
}

function cancel(){
	isEntered = false;
	
	if (point == null) {
		point = game.add.image(x,y,'select');	
		point.scale.set(1.98);
	} 
	else {
		return;
	}
	
	if (m_back== null) {
		m_back = game.add.image(720,80,'menu_back');
	}
	
function office() {
	
	image = game.add.image(770, 120, 'pub');
	
	// 난수 발급
	var rdm = Math.floor(Math.random() * 9999) + 1000;
	image = game.add.image(800, 350, 'hand');
	
	// 난수를 보여줄 텍스트
	text1 = game.add.text(1070, 450, rdm, 
			{ font: "40px Arial", fill: "#000000", align: "center" });
}
}