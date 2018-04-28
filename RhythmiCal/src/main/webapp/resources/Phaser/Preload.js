/** 항상 가장 처음 실행되는 state입니다.
 * 시작화면에서의 접근이 신규 유저의 접근인지 기존 유저의 접근인지에 따라 준비하는 데이터가 상이합니다.
 * 1.신규 유저의 접근
 * 		게임의 기초 초기화 데이터를 로드한 뒤 인트로 start
 * 2.기존 유저의 접근
 * 		ID 컬럼 조회 후 세이브 데이터에 기초하여 데이터 초기화
 * 		그 후 마을 start
 */
var Preload = function(game){};

Preload.prototype = {
	preload : function(){
		alert("Preload");
		//this.requestUserInfo();
		this.getStageInfo();

	},
	create: function(){
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.input.onDown.add(this.gofull, this);
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
	},
	gofull: function() {
	  if (game.scale.isFullScreen)
	  {
	      game.scale.stopFullScreen();
	  }
	  else
	  {
	      game.scale.startFullScreen(false);
	  }
	},
	getStageInfo: function(/*stageNum*/){
		$.ajax({
			url : "getStage" // a.jsp 의 제이슨오브젝트값을 가져옴
			,type : "post"
			,data : {stageNum:1}
			,cache : false // 이걸 안쓰거나 true하면 수정해도 값반영이 잘안댐
			,success : function(stageInfo) {
				bgImgName = stageInfo[0].bgImgName;
				bgmName = stageInfo[0].bgmName;
				beat = stageInfo[1];
				monsterlistA = stageInfo[2];
				monsterlistB = stageInfo[3];
				monsterlistC = stageInfo[4];
			}
		});
	}
	
}
