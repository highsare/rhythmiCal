package com.beatoven.rhythmical.controller;

import java.io.Console;
import java.util.ArrayList;
import java.util.HashMap;

import java.util.Iterator;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.beatoven.rhythmical.dao.VillageDAO;
import com.beatoven.rhythmical.vo.Member;

/*마을에서 호출되는 모든 서버로의 요청은 이곳에서 진행됩니다.*/

@Controller
public class VillageController {
	private static final Logger logger = LoggerFactory.getLogger(VillageController.class);
	
	@Inject
	VillageDAO villageDAO;
	int cnt = 2;
	int rdmnum;
	
	public ArrayList<String> mList = HomeController.multiList;
	
	// 설정된 모션 값 읽어오기
	@ResponseBody
	@RequestMapping(value = "readMotionList", method = RequestMethod.POST)
	public String readMotionList(HttpSession session) {
		logger.debug("readMotionList() 진입");
		Member loginMember = (Member) session.getAttribute("loginMember");
		String jsonMotionList = "";
		try {jsonMotionList = villageDAO.readMotionList(loginMember);}
		catch (Exception e) {e.printStackTrace();}
		return jsonMotionList;
	}
	
	@ResponseBody
	@RequestMapping(value="loginMultiApp",method = RequestMethod.POST)
	public boolean loginApp(Member member,HttpSession session) {
		if (member.getCode().equals(String.valueOf(rdmnum))) {
				mList.add("player"+cnt);
				cnt++;
				return true;
		}
		return false;
	}
	
	@ResponseBody
	@RequestMapping(value="multiconnection",method = RequestMethod.POST)
	public ArrayList<String> multiconnection() {
		return mList;
	}
	
	
	@ResponseBody
	@RequestMapping(value = "sendRdm", method = RequestMethod.POST)
	public boolean sendRdm(int rdm) {
		if (mList.size() >4) {
			return false;
		} else {
			rdmnum = rdm;
			System.out.println(rdmnum);
			return true;
		}
	}
	
}
