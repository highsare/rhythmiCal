	alert("된다?");
	var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update,render:render });
	//음표스프라이트
	var sprites;
	//음표배경화면
	var noteBgGroup;
	//멀티유저번호
	var userNumber;
	//생성뒤 사라진 음표스프라이트 갯수 
	var rip=0;
	
	function preload() {
		//음표그림4개 로드   1:빨강, 2:파랑, 3:초록, 4:노랑
		for(var i=1; i<=4;i++){
		game.load.image('note'+i, 'resources/note'+i+'.png');
		}
		//음표배경 로드
		game.load.image('noteBG', 'resources/noteBG.png');
		game.load.image('imgO', 'resources/imgO.png');
		game.load.image('imgX', 'resources/imgX.png');
	}

	function create() {
		
	
		
		// Phaser.Timer.SECOND 초 마다 creatNotes함수 실행
	    game.time.events.loop(Phaser.Timer.SECOND, createNotes, this);
		
		//하나씩 나타나는 음표를 그룹으로 주기
		sprites = game.add.group();
		
	   //음표 뒤에 배경생성    game.width/2-150, 500 위치에 생성
	   var noteBG = sprites.create(game.width/2-150, 500 , 'noteBG');
	    
	   //음표 흐르는 거 배경을 그룹으로 주기
	   noteBgGroup = game.add.group();
	   //그룹에  noteBG이미지 넣기
	   noteBgGroup.add(noteBG);
	   
	}

	function createNotes() {
		//1~4번중 랜덤으로 번호 생성해서 userNumber에 할당
		userNumber = 'note' + game.rnd.integerInRange(1,4); //ex: note3
		//랜덤유저 음표 생성(생성하는 위치)
		var note = sprites.create(game.width/2+150, 500 , userNumber);
		
	    //note.play(10, true);

	}

	function update() {
		//스프라이트의 sprite.x 즉 좌표를 설정하고 
		//A value of 0 replaces the value with the new one. A value of 1 adds it, 2 subtracts it, 3 multiplies it and 4 divides it.
	    sprites.setAll('x', -1, true, true, 1);
		//생성되는 스프라이트 모두에게 checkNotes함수를 할당
	    sprites.forEach(checkNotes, this, true); 

	    //음표 그룹을 화면 가장 위에다가 올림 depth
	    game.world.bringToTop(sprites);
	}

	 function checkNotes(sprite) {
		//특정 위치에 도달하면 사라짐
	    try {
	    	if(sprite.x == game.width/2){
	    		//도달한 스프라이트의 속성을 구하는 방법은?
	    		//console.log(sprite.번호 +"범위에 들어갔다?!");
	    		
	    		//도달하면  발생하는 매소드
	    		var notePop =game.add.sprite(game.width/2+20,520,'imgX');
	    		notePop.anchor.setTo(0.5,0.5);
	    		notePop.scale.setTo(1,1);
	    		//이벤트 발생시킴  ( o, x )
	    		game.time.events.add(0, function() {    
	    			//y좌표까지 이동
	    			game.add.tween(notePop).to({y: 450}, 500, Phaser.Easing.Linear.None, true);    
	    			//그러면서 투명도0 까지 변화면서 사라짐
	    			game.add.tween(notePop).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);}, this);
	    	}
	    	
	    	//해당 범위를 지나면 음표 삭제
	        if (sprite.x < game.width/2-150)
	        {
	            rip++;
	            sprites.remove(sprite, true);
	        }
	    }
	    catch (e)
	    {
	        console.log(sprite);
	    }

	} 
	
	 //정보는 화면에 띄움
	 function render() {

		    game.debug.text("Group size: " + sprites.total, 32, 32);
		    game.debug.text("Destroyed: " + rip, 32, 64);
		    game.debug.text("유저 넘버: " + userNumber+"등장!", game.width/2+150, 500);
	
		}

