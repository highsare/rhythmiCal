package com.beatoven.rhythmical.controller;

import java.util.ArrayList;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.beatoven.rhythmical.dao.StageDAO;
import com.beatoven.rhythmical.dao.SystemDAO;
import com.beatoven.rhythmical.dao.VillageDAO;
import com.beatoven.rhythmical.vo.Member;
import com.beatoven.rhythmical.vo.Monster;
import com.beatoven.rhythmical.vo.Save;
import com.beatoven.rhythmical.vo.Stage;

/*스테이지에서 호출되는 모든 서버로의 요청은 이곳에서 진행됩니다.*/

@Controller
public class StageController {
	
	private String motionBox;
	private String playerBox;
	private boolean isUsed = false;

	@Inject
	StageDAO stageDAO;
	
	@Inject
	SystemDAO sysDAO;
	
	@Inject
	VillageDAO villDAO;
	
	//모션 값 받아오기
	@ResponseBody
	@RequestMapping(value="sendMotion", method = RequestMethod.POST)
	public String receiveMotion(String request,String motion, String player) {
		motionBox = motion;
		playerBox = player;
		
		//코드도 저장해놓는다. 1p code = null;
		System.out.println(playerBox);
		System.out.println(motionBox);
		return "received";
	}
	
	//모션 값 페이저로 전달
	@ResponseBody
	@RequestMapping(value="requestMotion", method = RequestMethod.POST)
	public String requestMotion() {
		if(motionBox != null && playerBox != null) {
			if (isUsed) {
				System.out.println("[Motion empty]");
				motionBox = null;
				playerBox = null;
				isUsed = false;
			}else {
				System.out.println("Motion requested "+motionBox);
				isUsed = true;
				return playerBox+"/"+motionBox;
			}
		}
		return "NOTHING";
	}
	
	//생명력 변동시 저장
	@ResponseBody
	@RequestMapping(value="saveLife", method = RequestMethod.POST)
	public int saveLife(String life,HttpSession session) {
		//담아보낼 save 객체 생성
		Save save = new Save();
		Member member = (Member)session.getAttribute("loginMember");
		//세션에서 아이디를 활용하여 id 세팅
		save.setId(member.getId());
		save.setLife(Integer.parseInt(life));
		save.setMotionlist(villDAO.readMotionList(member));
		//변동될 생명력 세팅
		//쿼리 실행
		return sysDAO.saveLife(save);
	}
	
	@ResponseBody
	@RequestMapping(value="getLife",method = RequestMethod.POST)
	public int getLife(HttpSession session) {
		Member member = (Member)session.getAttribute("loginMember");
		System.out.println(member);
		return sysDAO.getLife(member.getId());
	}
	
	//stageNum을 통해서 stage생성에 필요한 정보를 받아온다.
	@ResponseBody
	@RequestMapping(value="getStage", method = RequestMethod.POST)
	public ArrayList<Object> getStage(String stageNum) {
		//phaser로 보내줄 stage정보를 담을 arraylist
		ArrayList<Object> stageInfo = new ArrayList<>();
		//phaser로 보내줄 각 라인별로 나눈 array
		ArrayList<Monster> monsterlistA = new ArrayList<>();
		ArrayList<Monster> monsterlistB = new ArrayList<>();
		ArrayList<Monster> monsterlistC = new ArrayList<>();
		
		
		//monster종류를 받아와서 리스트를 작성한다.
		ArrayList<Monster> monsterTable = stageDAO.getMonsterTable();
		
		//DB : stage 정보를 받아온다.
		int integerStageNum = Integer.parseInt(stageNum);
		Stage stage = stageDAO.getStage(integerStageNum);
		
		//DB : music beat정보를 받아온다.
		int beat = stageDAO.getBPM(stage.getBgmName());
		
		//String Stream으로 된 몬스터리스트를 받는다.
		String monsterlistStream = "00002/10002/20002/00004/14004/20004/00006/15006/20006/00008/17008/20008/00010/17010/20010/00012/10012/20012/00014/15014/20014/00016/15016/20016/00018/10018/20018/00020/17020/20020/00022/14022/20022/00024/14024/20024/00026/15026/20026/00028/12028/20028/00030/17030/20030/00032/10032/20032/00034/14034/20034/00036/15036/20036/00038/10038/20038/00040/17040/20040/00042/10042/20042/00044/14044/20044/00046/15046/20046/00048/10048/20048/00050/17050/20050";
		
		//구분기호 /로 나눠서 String 배열에 저장한다.
		String monsterlistSplit[] = monsterlistStream.split("/");
		
		//1개씩 불러오면서 나눈다.
		for (String monsterUnit : monsterlistSplit) {
			int attackline = Integer.parseInt(monsterUnit.substring(0, 1));
			int monsterNum = Integer.parseInt(monsterUnit.substring(1, 2));
			String appearanceBeat = monsterUnit.substring(2, 5);
			//몬스터종류를 조회해서 몬스터를 셋팅한다.
			for (Monster m : monsterTable) {
				if (m.getMonsterNum() == monsterNum) {
					Monster tempMonster = new Monster(
							m.getMonsterNum()
							, m.getMonsterName()
							, m.getSpeed()
							, m.getHealth()
							, m.getSkill()
							, m.getSkillPercentage()
							, m.getSoundEffectNum()
							, m.getDeadSoundNum()
							, Integer.parseInt(appearanceBeat)
							, attackline);
					if (tempMonster.getAttackline() == 0) {
						monsterlistA.add(tempMonster);
					} else if (tempMonster.getAttackline() == 1) {
						monsterlistB.add(tempMonster);
					} else if (tempMonster.getAttackline() == 2) {
						monsterlistC.add(tempMonster);
					}
				}
			}//for end monsterTable을 조회하는 for문
		}//for end 분할돼 들어간 배열을 돌리는
		
	
		stageInfo.add(stage);	//index 0
		stageInfo.add(beat);	//index 1
		stageInfo.add(monsterlistA);	//index 2
		stageInfo.add(monsterlistB);	//index 3
		stageInfo.add(monsterlistC);	//index 4
		stageInfo.add(HomeController.multiList.size());
		for (Monster string : monsterlistA) {
			System.out.println(string);
		}
		return stageInfo;
	}
	
}
