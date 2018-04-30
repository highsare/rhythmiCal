package com.beatoven.rhythmical.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.beatoven.rhythmical.vo.Member;

/**
 * 사용자 로그인 확인 인터셉터. HandlerInterceptorAdapter를 상속받아서 정의.
 */
public class AccessInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = LoggerFactory.getLogger(AccessInterceptor.class);

	//콘트롤러의 메서드 실행 전에 처리
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		logger.debug("AccessInterceptor 실행");
		
		//세션의 로그인 정보 읽기. 로그인 처리시 세션에 저장한 이름 확인할 것.
		HttpSession session = request.getSession();
		Member member = (Member) session.getAttribute("loginMember");
		
		//TODO 이후에 주석처리 해제할것
		//로그인되지 않은 경우 로그인 페이지로 이동. 로그인 페이지 경로 확인할 것.
		/*if (member == null) {
			response.sendRedirect(request.getContextPath());
			return false;
		}*/
		//로그인 된 경우 요청한 경로로 진행
		return super.preHandle(request, response, handler);
	}

}
