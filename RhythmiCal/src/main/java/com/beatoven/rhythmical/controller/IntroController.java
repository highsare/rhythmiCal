package com.beatoven.rhythmical.controller;

import org.springframework.stereotype.Controller;

/*인트로 화면에서 호출되는 모든 서버로의 요청은 이곳에서 진행됩니다.*/

@Controller
public class IntroController {

	@RequestMapping("intro")
	public String introPage() {
		return "intro";
	}
	
}
