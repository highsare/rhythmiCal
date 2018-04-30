/** 항상 가장 처음 실행되는 state입니다.
 * 시작화면에서의 접근이 신규 유저의 접근인지 기존 유저의 접근인지에 따라 준비하는 데이터가 상이합니다.
 * 1.신규 유저의 접근
 * 		게임의 기초 초기화 데이터를 로드한 뒤 인트로 start
 * 2.기존 유저의 접근
 * 		ID 컬럼 조회 후 세이브 데이터에 기초하여 데이터 초기화
 * 		그 후 마을 start
 */
var isLogo = true;
var Preload = function(game){};

Preload.prototype = {
	preload : function(){
		alert("Preload");
		game.world.removeAll();
		//로고 이미지 불러오기
		//로딩 이미지 등 불러오기
		setResources("Stage");
	},
	create: function(){
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.input.onDown.add(gofull, this);
		
		//로고 혹은 로딩 화면 생성
		if (isLogo) {
			//로고 띄우기
		}else {
			//로딩 띄우기
		}
		
		game.time.events.loop(Phaser.Timer.SECOND * 3, requestState, this);
	},
	requestUserInfo: function(){
		$.ajax({
			url:"requestUserInfo"
			,type: "post"
			,success: function(userInfo){
			},error: function(){
			}
		});
	}
}

function getStageInfo(stageNum){
	$.ajax({
		url : "getStage" // a.jsp 의 제이슨오브젝트값을 가져옴
		,type : "post"
		,dataType : "json" // 데이터 타입을 제이슨 꼭해야함, 다른방법도 2가지있음
		,cache : false // 이걸 안쓰거나 true하면 수정해도 값반영이 잘안댐
		,success : function(stageInfo) {
			//BGM 길이를 가져와야함
			bgImgName = stageInfo[0].bgImgName;
			musicName = stageInfo[0].musicName;
			beat = stageInfo[1];
			monsterlistA = stageInfo[2];
			monsterlistB = stageInfo[3];
			monsterlistC = stageInfo[4];
			multiNum = stageInfo[5];
			
			game.state.start("Stage");
		}
	});
}

function setResources (state){
	if (state == "Intro") {
		//Intro assets
		//인트로 실행
		game.state.start("Intro");
		
		
	}else if (state == "Tutorial"){
		//Totorial assets
	    //튜토리얼 실행
		game.state.start("Tutorial");
		
		
	}else if (state == "Story") {
		//Story assets , contentNum required
	    //스토리 실행
		game.state.start("Story");
		
		
	}else if (state == "Stage") {
		//Stage assets , contentNum required
		getStageInfo(contentNum);
		
	}else if (state == "Village") {
		//Village assets
		
		
		
		
		
		
		//마을 실행
		game.state.start("Village");
		
		
		
		
		
		
		
		
	}else if (state == "Ending") {
		//Ending assets
		//엔딩 크레딧 실행
		game.state.start("Ending");
		
	}else if (state == "HallOfFame"){
		//HallOfFame.jsp로 이동
	}
	
}
