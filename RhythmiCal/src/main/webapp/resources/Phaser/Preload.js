/** 항상 가장 처음 실행되는 state입니다.
 * 시작화면에서의 접근이 신규 유저의 접근인지 기존 유저의 접근인지에 따라 준비하는 데이터가 상이합니다.
 * 1.신규 유저의 접근
 * 		게임의 기초 초기화 데이터를 로드한 뒤 인트로 start
 * 2.기존 유저의 접근
 * 		ID 컬럼 조회 후 세이브 데이터에 기초하여 데이터 초기화
 * 		그 후 마을 start
 */
var isNewbie;

var Preload = function(game){};

Preload.prototype = {
	preload : function(){
		this.requestUserInfo();
		if(isNewbie){
			//신규 유저의 초기화 작업
		}else{
			//기존 유저의 초기화 작업
		}
	},
	create: function(){
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.input.onDown.add(this.gofull, this);
		game.time.events.loop(Phaser.Timer.SECOND * 3, this.startNext, this);
	},
	requestUserInfo: function(){
		$.ajax({
			url:"requestUserInfo"
			,type: "post"
			,success: function(userInfo){
				//기존유저인지 신규인지 받음
				isNewbie = userInfo;
			},error: function(){
			}
		});
	},
	startNext:function(){
		if(isNewbie){
			//game.state.start("Intro");
			requestState();
		}else{
			//game.state.start("Village");
		}
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
	}
}
