package com.beatoven.rhythmical.dao;

import java.util.ArrayList;
import javax.inject.Inject;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import com.beatoven.rhythmical.interfaces.HomeInterface;
import com.beatoven.rhythmical.vo.HonorPost;
import com.beatoven.rhythmical.vo.Member;

/*메인화면 관련 오브젝트*/

@Repository
public class HomeDAO implements HomeInterface {
	
	@Inject
	SqlSession session;
	
	@Override
	public int signupMember(Member member) {
		// TODO : minah
		int result = 0;
		try {
			result = session.getMapper(HomeInterface.class).signupMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public Member loginMember(Member member) {
		// TODO : minah
		Member loginMember = null;
		try {
			loginMember = session.getMapper(HomeInterface.class).loginMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return loginMember;
	}

	@Override
	public ArrayList<HonorPost> readHonorPost() {
		// TODO : minah
		ArrayList<HonorPost> honorPostList = null;
		try {
			honorPostList = session.getMapper(HomeInterface.class).readHonorPost();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return honorPostList;
	}
}
