/**
 * 
 */

function requestState(){
	$.ajax({
		url: 'requestState'
		,type: 'POST'
		,success : function(state){
			alert(state);
			//game.world.removeAll();
			if (state == "Intro") {
				game.state.start("Intro");
			}else if (state == "Tutorial"){
				game.state.start("Tutorial");
			}else if (state == "Story") {
				game.state.start("Story");
			}else if (state == "Stage") {
				game.state.start("Stage");
			}else if (state == "Village") {
				game.state.start("Village");
			}else if (state == "Ending") {
				game.state.start("Ending");
			}else if (state == "HallOfFame"){
				game.state.start("HallOfFame");
			}
		},error : function(){}
	});
}

function requestContentNum(){
	$.ajax({
		url:'requestContentNum'
		,type:'POST'
		,success : function(){
			
		},error: function(){}
	})
}