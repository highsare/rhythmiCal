package com.beatoven.rhythmical.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/*인트로 화면에서 호출되는 모든 서버로의 요청은 이곳에서 진행됩니다.*/

@Controller
public class IntroController {

	@RequestMapping(value = "intro", method = RequestMethod.GET)
	public String introPage() {
		return "intro";
	}
}
