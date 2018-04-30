package com.beatoven.rhythmical.controller;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.beatoven.rhythmical.dao.StoryDAO;
import com.beatoven.rhythmical.vo.Member;
import com.beatoven.rhythmical.vo.Story;

/*스토리에서 호출되는 모든 서버로의 요청은 이곳에서 진행됩니다.*/

@Controller
public class StoryController {

	@Inject
	StoryDAO storyDao;
	//대사 가져오기 테스트
	@ResponseBody
	@RequestMapping(value = "loadStoryContents", method = RequestMethod.POST)
	public ArrayList<Story> loadStoryContents (int storyNum) {
		
		//Story DB접근
		ArrayList<Story> getStoryDB = storyDao.selectStory(storyNum);
		
	
		return getStoryDB;
	}
}
