package com.beatoven.rhythmical.interfaces;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import com.beatoven.rhythmical.vo.FamePost;
import com.beatoven.rhythmical.vo.Member;

/*메인화면 관련 인터페이스*/

@Mapper
public interface HomeInterface {
	//회원가입
	public int signupMember(Member member);
	
	//로그인
	public Member loginMember(Member member);
	
	//명예의 전당 글 읽기
	public ArrayList<FamePost> readFamePost();
}
