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

	@Override
	public String getStateName(String id) {
		String stateName = "";
		try {
			stateName = session.getMapper(SystemInterface.class).getStateName(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return stateName;
	}

	@Override
	public int addStateNum(String id) {
		try {
			session.getMapper(SystemInterface.class).addStateNum(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int saveLife(Save save) {
		//try {
			
		//} catch (Exception e) {
		//	e.printStackTrace();
		//}
		return session.getMapper(SystemInterface.class).saveLife(save);
		
	}

	@Override
	public int getContentNum(String id) {
		int contentNum = 0;
		try {
			contentNum = session.getMapper(SystemInterface.class).getContentNum(id);
		}
		catch(Exception e){}
		return contentNum;
	}

	@Override
	public int makeSave(Save save) {
		/*try {
			session.getMapper(SystemInterface.class).makeSave(save);
		}
		catch (Exception e) {
			e.printStackTrace();
		};*/
		return session.getMapper(SystemInterface.class).makeSave(save);
	}
}
