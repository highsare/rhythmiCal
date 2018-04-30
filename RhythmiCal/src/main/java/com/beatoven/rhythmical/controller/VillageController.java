package com.beatoven.rhythmical.controller;

import java.util.ArrayList;
import java.util.HashMap;
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
		System.out.println("readMotionList() 진입");
		// TODO : 현재 아직 로그인 안한 상태로 디버깅하기 때문에 loginMember의 id를 kimminah1로 만들고 테스트함. 나중에 주석 정리할 것.
		
		Member loginMember = (Member) session.getAttribute("loginMember");
		String jsonMotionList = "";
		try {jsonMotionList = villageDAO.readMotionList(loginMember);}
		catch (Exception e) {e.printStackTrace();}
		System.out.println(jsonMotionList);
//		String json = "{'motion': [{'name': 'down', 'effect': 'sun', 'lane': 'C'},{'name': 'left', 'effect': 'moon', 'lane': 'B'},{'name': 'right', 'effect': 'star', 'lane': 'A'}]}";
		
		return jsonMotionList.replaceAll("'", "\"");
	}
	
	// 설정된 모션 값 저장하기
	@ResponseBody
	@RequestMapping(value = "saveMotionList", method = RequestMethod.POST)
	public int saveMotionList(HttpSession session, String jsonText) {
		System.out.println("saveMotionList() 진입 - jsonText: " + jsonText);
		// TODO : 여기도 readMotionList와 마찬가지로 kimminah1로 설정한 loginMember 지우고, 로그인 디비 구현하면 제대로 세션에서 꺼내오도록 할 것.
		
		// 세션으로부터 로그인된 멤버 객체 받기
		Member loginMember = (Member) session.getAttribute("loginMember");
		
		// 해쉬맵 생성, 로그인된 멤버 객체 및 설정한 모션 리스트를 추가 
		HashMap<String, String> map = new HashMap<>();
		
		// 마을 테스트를 위해 주석 처리 해놓았음. 테스트할 시 로그인 상태가 아니므로 loginMember에 null이 들어가면서 오류가 뜨기 때문.
//		마을 테스트를 위해 주석 처리 해놓았음. 테스트할 시 로그인 상태가 아니므로 loginMember에 null이 들어가면서 오류가 뜨기 때문.
		map.put("id", loginMember.getId());
		map.put("jsonText", jsonText);
		
		// DAO를 통해 DB로 연결
		int result = 0;
		try {result = villageDAO.saveMotionList(map);}
		catch (Exception e) {e.printStackTrace();}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value="loginMultiApp",method = RequestMethod.POST)
	public String loginApp(Member member) {
		String result = "";
		if (mList.size() < 3) {
			if (member.getCode().equals(String.valueOf(rdmnum))) {
				mList.add("player"+cnt);
				if (cnt <=4) {
					cnt++;
				}
				result = "player" + (cnt-1);
				System.out.println(mList);
				System.out.println(result);
			}
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value="multiconnection",method = RequestMethod.POST)
	public ArrayList<String> multiconnection() {
		return mList;
	}
	
	@ResponseBody
	@RequestMapping(value="playerCount",method = RequestMethod.POST)
	public ArrayList<String> playerCount() {
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
