package com.beatoven.rhythmical.interfaces;

import org.apache.ibatis.annotations.Mapper;

/*메인화면 관련 인터페이스*/

@Mapper
public interface HomeInterface {

	//TODO : minah
	//회원가입
	public String signupMember();
	
	//TODO : minah
	//로그인
	public String loginMember();
	
	//TODO : minah
	//명예의 전당 글 읽기
	public String readHonorPost();
	
}
