/**
 * 
 */

//다음 state를 실행하는 함수 ( .js의 끝에 요청된다)
function requestState(){
	$.ajax({
		url: 'requestState'
		,type: 'POST'
		,success : function(state){
			alert(state);
			if (state == "Intro") {
				game.state.start("Intro");
				setResources("Intro");
			}else if (state == "Tutorial"){
				game.state.start("Tutorial");
				setResources("Tutorial");
			}else if (state == "Story") {
				requestContentNum("Story");
			}else if (state == "Stage") {
				requestContentNum("Stage");
			}else if (state == "Village") {
				game.state.start("Village");
				setResources("Village");
			}else if (state == "Ending") {
				game.state.start("Ending");
				setResources("Ending");
			}else if (state == "HallOfFame"){
				game.state.start("HallOfFame");
				setResources("HallOfFame");
			}
		},error : function(){}
	});
}

//contentNum가 필요한 state의 경우 요청을 받음
function requestContentNum(state){
	$.ajax({
		url:'requestContentNum'
		,type:'POST'
		,success : function(num){
			//Stage.js의 전역변수 contentNum에 현재 state의 contentNum을 전달한다.
			contentNum = num;
			setResources(state);
		},error: function(){}
	})
}