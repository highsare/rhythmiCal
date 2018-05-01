package com.beatoven.rhythmical.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.beatoven.rhythmical.dao.SystemDAO;
import com.beatoven.rhythmical.vo.Member;

// TODO StateController 검증 필


@Controller
public class StateController {
	int cnt = 0;
	
	@Inject
	SystemDAO systemDAO;
	
	@ResponseBody
	@RequestMapping(value="requestState", method = RequestMethod.POST)
	public String requestState(HttpSession session) {
		//DAO를 활용해 Save 테이블의 StateNum++
		Member member = (Member)session.getAttribute("loginMember");
		systemDAO.addStateNum(member.getId());
		//Save 테이블의 StateNum과 같은 스테이트의 정보 반환
		return systemDAO.getStateName(member.getId());
	}
	
	@ResponseBody
	@RequestMapping(value="requestContentNum")
	public int requestContentNum(HttpSession session) {
		Member member = (Member)session.getAttribute("loginMember");
		//DAO를 활용해 현재 Save테이블과 State 테이블을 조인하여 컨텐츠 넘버 반환
		return systemDAO.getContentNum(member.getId());
	}
}
