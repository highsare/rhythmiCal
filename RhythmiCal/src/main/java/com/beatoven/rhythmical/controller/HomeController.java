package com.beatoven.rhythmical.controller;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.beatoven.rhythmical.dao.HomeDAO;
import com.beatoven.rhythmical.vo.FamePost;
import com.beatoven.rhythmical.vo.Member;

@Controller
public class HomeController {
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Inject
	HomeDAO homeDAO;
	
	String consoleBox = "";
	boolean isUsed = false;
	
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
	public int signupMember(Member member) {
		logger.debug("signupMember() 진입 - member: " + member);
		int result = 0;
		try {
			result = homeDAO.signupMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	//로그인(세션에 값 저장)
	@RequestMapping(value = "loginMember", method = RequestMethod.POST)
	public Member loginMember(HttpSession session, Member member) {
		logger.debug("loginMember() 진입 - member: " + member);
		Member loginMember = null;
		try {
			loginMember = homeDAO.loginMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		session.setAttribute("loginedMember", loginMember);
		return loginMember;
	}
	
	//로그아웃
	@ResponseBody
	@RequestMapping(value = "logoutMember", method = RequestMethod.POST)
	public String logoutMember(HttpSession session) {
		logger.debug("logoutMember() 진입");
		session.invalidate();
		return "";
	}
	
	
	//명예의 전당 글 불러오기
	public ArrayList<FamePost> readFamePost() {
		logger.debug("readFamePost() 진입");
		
		ArrayList<FamePost> famePostList = null;
		try {
			famePostList = homeDAO.readFamePost();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return famePostList;
	}
	
	@RequestMapping("game")
	public String toGamePage() {
		return "game";
	}
	
	@RequestMapping(value = "town", method = RequestMethod.GET)
	public String townTest() {
		return "town";
	}
	
	@ResponseBody
	@RequestMapping(value="loginApp",method = RequestMethod.POST)
	public String loginApp(Member member) {
		System.out.println("loginApp 들어옴!");
		return "logIn";
	}
	
	@ResponseBody
	@RequestMapping(value = "sendConsole", method = RequestMethod.POST)
	public String receiveConsole(String request, String order) {
		consoleBox = order;
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
}
