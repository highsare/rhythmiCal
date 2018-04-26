package com.beatoven.rhythmical.dao;

import java.util.HashMap;

import javax.inject.Inject;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import com.beatoven.rhythmical.interfaces.VillageInterface;

/*마을 데이터 엑세스 오브젝트*/

@Repository
public class VillageDAO implements VillageInterface{

	@Inject
	SqlSession session;
	
	// 설정된 모션 값 읽어오기
	public String readMotionList(Member loginMember) {
		String jsonData = "";
		try {jsonData = session.getMapper(VillageInterface.class).readMotionList(loginMember);}
		catch (Exception e) {e.printStackTrace();}
		return jsonData;
	}
	
	// 설정된 모션 값 저장하기
	public int saveMotionList(HashMap<String, String> map) {
		int result = 0;
		try {result = session.getMapper(VillageInterface.class).saveMotionList(map);}
		catch (Exception e) {e.printStackTrace();}
		return result;
	}
}
