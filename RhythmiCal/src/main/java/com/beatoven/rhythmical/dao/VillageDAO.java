package com.beatoven.rhythmical.dao;

import javax.inject.Inject;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import com.beatoven.rhythmical.interfaces.VillageInterface;
import com.beatoven.rhythmical.vo.Member;

/*마을 데이터 엑세스 오브젝트*/

@Repository
public class VillageDAO implements VillageInterface{

	@Inject
	SqlSession session;
	
	// 설정된 모션 값 읽어오기
	public String readMotionList(Member loginMember) {
		String jsonData = "";
		try {session.getMapper(VillageInterface.class).readMotionList(loginMember);}
		catch (Exception e) {e.printStackTrace();}
		return jsonData;
	}
}
