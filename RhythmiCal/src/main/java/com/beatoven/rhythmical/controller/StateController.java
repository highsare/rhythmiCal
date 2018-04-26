package com.beatoven.rhythmical.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.beatoven.rhythmical.vo.State;

@Controller
public class StateController {

	@ResponseBody
	@RequestMapping(value="requestState")
	public String stateControll() {
		State state = null;
		
		//DAO를 활용해 Save 테이블의 StateNum++ 
		
		//Save 테이블의 StateNum을 활용해서  데이터를 받아옴
		if (state != null) {
			if (state.getState().contains("Intro")) {
				
			}else if(state.getState().contains("Tutorial")) {
				
			}else if(state.getState().contains("Story")) {
				//contentNum
			}else if(state.getState().contains("Stage")) {
				//contentNum
			}else if(state.getState().contains("Village")) {
				
			}else if(state.getState().contains("Ending")) {
				
			}else if(state.getState().contains("HallOfFame")) {
				
			}
		}
		
		return state.getState();
	}
}
