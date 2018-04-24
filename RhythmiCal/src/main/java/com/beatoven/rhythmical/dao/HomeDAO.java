package com.beatoven.rhythmical.dao;

import java.util.ArrayList;
import javax.inject.Inject;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import com.beatoven.rhythmical.interfaces.HomeInterface;
import com.beatoven.rhythmical.vo.FamePost;
import com.beatoven.rhythmical.vo.Member;

/*메인화면 관련 오브젝트*/

@Repository
public class HomeDAO implements HomeInterface {
	
	@Inject
	SqlSession session;
	
	// 회원가입
	@Override
	public int signupMember(Member member) {
		int result = 0;
		try {
			result = session.getMapper(HomeInterface.class).signupMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	// 로그인
	@Override
	public Member loginMember(Member member) {
		Member loginMember = null;
		try {
			loginMember = session.getMapper(HomeInterface.class).loginMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return loginMember;
	}

	// 명예의 전당 글 불러오기
	@Override
	public ArrayList<FamePost> readFamePost(RowBounds rowBounds) {
		ArrayList<FamePost> famePostList = null;
		try {
			famePostList = session.getMapper(HomeInterface.class).readFamePost(rowBounds);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return famePostList;
	}
	
	// 멤버가 기존 멤버인지 신규 멤버인지 확인
	@Override
	public int isNewbie(Member member) {
		int dbValue = 0;
		try {
			dbValue = session.getMapper(HomeInterface.class).isNewbie(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dbValue;
	}
}
