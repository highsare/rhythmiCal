package com.beatoven.rhythmical.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/*시스템 관련 요청은 이곳에서 진행됩니다.*/

@Controller
public class SystemController {
	@ResponseBody
	@RequestMapping(value="setLanguage", method = RequestMethod.POST)
	public String setLanguage(HttpSession session) {
		String language = (String) session.getAttribute("language");
		System.out.println(language);
		return language;
	}
}
