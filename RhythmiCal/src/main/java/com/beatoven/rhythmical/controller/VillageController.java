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
	@RequestMapping(value = "readMotionList", method = RequestMethod.GET)
	public String readMotionList(HttpSession session) {
		logger.debug("readMotionList() 진입");
//		Member loginMember = (Member) session.getAttribute("loginMember");
//		String jsonMotionList = "";
//		try {jsonMotionList = villageDAO.readMotionList(loginMember);}
//		catch (Exception e) {e.printStackTrace();}
		String json = "{'motion': [{'name': 'down', 'effect': 'sun', 'lane': 'C'},{'name': 'left', 'effect': 'moon', 'lane': 'B'},{'name': 'right', 'effect': 'star', 'lane': 'A'}]}";

//		return jsonMotionList;
		return json.replaceAll("'", "\"");
	}
	
	// 설정된 모션 값 저장하기
	@ResponseBody
	@RequestMapping(value = "saveMotionList", method = RequestMethod.POST)
	public int saveMotionList(HttpSession session, String jsonText) {
		logger.debug("saveMotionList() 진입");
		System.out.println(jsonText);
		
		// 세션으로부터 로그인된 멤버 객체 받기
		Member loginMember = (Member) session.getAttribute("loginMember");
		
		// 해쉬맵 생성, 로그인된 멤버 객체 및 설정한 모션 리스트를 추가 
		HashMap<String, String> map = new HashMap<>();
//		map.put("id", loginMember.getId());
		map.put("jsonText", jsonText);
		
		// DAO를 통해 DB로 연결
		int result = 0;
//		try {result = villageDAO.saveMotionList(map);}
//		catch (Exception e) {e.printStackTrace();}
		return result;
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
		if (mList.size() >= 4) {
			return false;
		} else {
			rdmnum = rdm;
			System.out.println(rdmnum);
			return true;
		}
	}
	
}
