package com.beatoven.rhythmical;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	String consoleBox = "";
	boolean isUsed = false;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
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
		System.out.println(member.toString());
		//TODO : minah - signupMember
		return "singupMember";
	}
	
	//로그인(세션에 값 저장)
	@RequestMapping(value = "loginMember", method = RequestMethod.POST)
	public String loginMember() {
		//TODO : minah - loginMember
		return null;
	}
	
	//명예의 전당 글 불러오기
	public String readHonorPost() {
		//TODO : minah - readHonorPost
		return null;
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
		
		return "";
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
			}else {
				System.out.println("Console requested"+consoleBox);
				isUsed = true;
				return consoleBox;	
			}
		}
		return "NOTHING";
	}
}
