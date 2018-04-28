package com.beatoven.rhythmical.controller;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.beatoven.rhythmical.dao.HomeDAO;
import com.beatoven.rhythmical.dao.SystemDAO;
import com.beatoven.rhythmical.vo.FamePost;
import com.beatoven.rhythmical.vo.Member;
import com.beatoven.rhythmical.vo.Save;

@Controller
public class HomeController {
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Inject
	HomeDAO homeDAO;
	@Inject
	SystemDAO sysDAO;
	
	String consoleBox = "";
	boolean isUsed = false;
	//public static HashMap<String, Object> multiplay = new HashMap<>();
	public static ArrayList<String> multiList = new ArrayList<>(); 
	
	//메인화면
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		model.addAttribute("serverTime", formattedDate);
		return "home";
	}
	
	//회원가입
	@ResponseBody
	@RequestMapping(value = "signupMember", method = RequestMethod.POST)
	public String signupMember(Member member) {
		System.out.println("signupMember() 진입 - member: " + member);
		int result = 0;
		try {
			result = homeDAO.signupMember(member);
			
			//신규 세이브 데이터 생성 & TODO 스테이트 넘버 0 추가 필요
			Save save = new Save(member.getId(), 5, "000", 1);
			int i = sysDAO.makeSave(save);
			System.out.println(i);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (result == 1) {
			System.out.println("signup success");
			return "어서와!";
		} else {
			System.out.println("signup fail");
			return "다시 한 번 확인해줘!";
		}
	}
	
	//로그인(세션에 값 저장)
	@ResponseBody
	@RequestMapping(value = "loginMember", method = RequestMethod.POST)
	public String loginMember(HttpSession session, Member member) {
		System.out.println("loginMember() 진입 - member: " + member);
		Member loginMember = null;
		try {
			loginMember = homeDAO.loginMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (loginMember != null) {
			//로그인 성공
			session.setAttribute("loginMember", loginMember);
			System.out.println("login success");
			return "어서와!";
		} else {
			//로그인 실패
			System.out.println("login fail");
			return "다시 한 번 확인해줘!";
		}
	}
	
	//로그아웃
	@ResponseBody
	@RequestMapping(value = "logoutMember", method = RequestMethod.POST)
	public String logoutMember(HttpSession session) {
		System.out.println("logoutMember() 진입");
		
		// 진주 해야하는 거 .
		/* 플레이어가 각각 종료 했을 때 지워주기랑 플레이어 추가된 상황에서 화면에 보여주기랑 
		 * 안드로이드에서 다 찼을때 다르게 토스트 보여주기*/
		
		session.invalidate();
		return "";
	}
	
	//명예의 전당 글 불러오기
	@ResponseBody
	@RequestMapping(value = "readFamePost", method = RequestMethod.GET)
	public ArrayList<FamePost> readFamePost(int offset) {
		System.out.println("readFamePost() 진입");
		int limit = 1;
		RowBounds rowBounds = new RowBounds(offset, limit); //0, 1은 a / 1, 1은 b / 2, 1은 c
		ArrayList<FamePost> famePostList = null;
		try {
			famePostList = homeDAO.readFamePost(rowBounds);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return famePostList;
	}
	
	// 명예의 전당 글 남기기 페이지로 이동
	@RequestMapping(value = "hallOfFame", method = RequestMethod.GET)
	public String hallOfFame() {
		return "hallOfFame";
	}
	
	// 명예의 전당 글 남기기
	@ResponseBody
	@RequestMapping(value = "writeFamePost", method = RequestMethod.POST)
	public int writeFamePost(HttpSession session, String text) {
		System.out.println("writeFamePost() - text: " + text);
		Member loginMember = (Member) session.getAttribute("loginMember");
		FamePost famePost = new FamePost(loginMember.getId(), text);
		
		int result = 0;
		try {
			result = homeDAO.writeFamePost(famePost);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	// 게임을 만들기 위한 임시 game.jsp
	@RequestMapping("game")
	public String toGamePage() {
		return "game";
	}
	
	// 마을을 만들기 위한 임시 town.jsp
	@RequestMapping(value = "town", method = RequestMethod.GET)
	public String townTest() {
		return "town";
	}
	
	// 튜토리얼을 만들기 위한 임시 tutorial.jsp
	@RequestMapping(value = "tutorial", method = RequestMethod.GET)
	public String tutorialTest() {
		return "tutorial";
	}
	
	@ResponseBody
	@RequestMapping(value="loginApp",method = RequestMethod.POST)
	public boolean loginApp(Member member, HttpSession session) {
		System.out.println(member);
		session.setAttribute("id", member.getId());
		//multiplay.put("player1", member.getId());
		
		boolean flag = true;
		for (String player : multiList) {
			if (player.equals("player1")) {
				flag = false;
			}
		}
		
		if (flag) {
			multiList.add("player1");			
		}
		
		return true;
	}
	
	@ResponseBody
	@RequestMapping(value = "sendConsole", method = RequestMethod.POST)
	public String receiveConsole(String request, String order, HttpSession session) {
		consoleBox = order;
		session.setAttribute("order", consoleBox);
		System.out.println(consoleBox);
		if(order.equals("esc")) {
			return "Rhythmi";
		}
		return "";
	}
	
	@ResponseBody
	@RequestMapping(value = "requestConsole", method = RequestMethod.GET)
	public String requestConsole() {
		if(consoleBox != null) {
			if (isUsed) {
				System.out.println("[Console empty]");
				consoleBox = null;
				isUsed = false;
			} else {
				System.out.println("Console requested"+consoleBox);
				isUsed = true;
				return consoleBox;	
			}
		}
		return "NOTHING";
	}
	
	// 현재 로그인한 멤버가 신규 멤버인지 기존 멤버인지 구분한 후 결과값 리턴 (DB: 신규이면 0, 기존이면 1)
	@ResponseBody
	@RequestMapping(value = "requestUserInfo", method = RequestMethod.POST)
	public boolean requestUserInfo(HttpSession session) {
		System.out.println("requestUserInfo() 진입");
		
		// 세션에서 로그인한 멤버객체 확인
		Member loginMember = (Member) session.getAttribute("loginMember");
		
		// DB 검색: MEMBER 테이블에서 해당 멤버의 isNewbie 컬럼이 0인지 1인지 확인
		int dbValue = 0;
		try {dbValue = homeDAO.isNewbie(loginMember);}
		catch (Exception e) {e.printStackTrace();}
		
		// 0이면 신규이므로 isNewbie=true, 1이면 기존이므로 isNewbie=false
		boolean isNewbie = true;
		switch (dbValue) {
			case 0: isNewbie = true;
				break;
			case 1: isNewbie = false;
				break;
		}
		
		// preload.js로 기존/신규 여부를 반환
		return isNewbie;
	}
}
