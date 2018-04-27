package com.beatoven.rhythmical.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.beatoven.rhythmical.vo.State;

@Controller
public class StateController {
	boolean flag = true;

	@ResponseBody
	@RequestMapping(value="requestState")
	public String stateControll() {
		State state = new State();
		//DAO를 활용해 Save 테이블의 StateNum++
		
		if (flag) {
			state.setState("Intro");
			flag = false;
		}else {
			state.setState("Story");
		}
		//Save 테이블의 StateNum과 같은 스테이트의 정보 반환
		return state.getState();
	}
	
	@ResponseBody
	@RequestMapping(value="requestContentNum")
	public int requestContentNum() {
		int contentNum = 0;
		//DAO를 활용해 현재 Save테이블과 State 테이블을 조인하여 컨텐츠 넘버 반환
		return contentNum;
	}
}
