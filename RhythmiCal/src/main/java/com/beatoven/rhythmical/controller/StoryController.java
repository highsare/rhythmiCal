package com.beatoven.rhythmical.controller;

import java.util.ArrayList;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.beatoven.rhythmical.dao.StoryDAO;
import com.beatoven.rhythmical.vo.Story;

/*스토리에서 호출되는 모든 서버로의 요청은 이곳에서 진행됩니다.*/

@Controller
public class StoryController {

	@Inject
	StoryDAO storyDao;
	
	//대사 가져오는메소드
	@ResponseBody
	@RequestMapping(value = "loadStoryContents", method = RequestMethod.POST)
	public ArrayList<Story> loadStoryContents (String storyNum, String language) {
		//story DB접근
		ArrayList<Story> getStory = new ArrayList<>();
		if (language.equals("JAPANESE")) {
			getStory = storyDao.selectStroyJP(Integer.parseInt(storyNum));
			System.out.println(Integer.parseInt(storyNum));
			System.out.println(getStory);
		}else {
			getStory = storyDao.selectStory(Integer.parseInt(storyNum));
			System.out.println(Integer.parseInt(storyNum));
			System.out.println(getStory);
			
		}
	
		return getStory;
	}
}
