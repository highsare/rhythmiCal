package com.beatoven.rhythmical.dao;

import java.util.ArrayList;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.beatoven.rhythmical.interfaces.SystemInterface;
import com.beatoven.rhythmical.vo.Save;

/*기타 데이터 엑세스 오브젝트*/

@Repository
public class SystemDAO implements SystemInterface{
	
	@Inject
	SqlSession session;
	
	@Override
	public ArrayList<Save> getsaveList() {
		
		ArrayList<Save> saveList = null;
		try {
			saveList = session.getMapper(SystemInterface.class).getsaveList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveList;
		
	}
	
	

}
