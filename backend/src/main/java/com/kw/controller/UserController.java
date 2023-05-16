package com.kw.controller;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kw.entity.User;
import com.kw.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	/**
	 * 로그인하기
	 * */
	@PostMapping("/login")
	public ResponseEntity<?> loginCheck(@RequestBody User user, HttpSession session) {
		//서비스호출 하고 성공하면 리턴한 User를 받아서  
		User dbuser = userService.loginCheck(user); 
		
		if(dbuser != null) {			
			//HttpSession에 정보를 저장한다. - 뷰에서 사용하고 있음 ${loginUser}- 아이디 / ${loginName} - 이름
			session.setAttribute("loginUser", dbuser.getUserId());
			session.setAttribute("loginName", dbuser.getNickname());
			return new ResponseEntity(dbuser,HttpStatus.OK);
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 혹은 비밀번호를 다시 입력해주세요.");
	}
	
	/**
	 * 로그아웃
	 * */
	@RequestMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		//모든 세션의 정보를 삭제한다.
		session.invalidate();
		return new ResponseEntity(HttpStatus.OK);
	}
	

	/**
	 * 닉네임 중복
	 * */
	@GetMapping("/check/nickname/{nickname}")
	public ResponseEntity<?> checkNickname(@PathVariable("nickname") String nickname) {
	    if(userService.checkNickname(nickname)) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("닉네임 중복");
	    }

	    return new ResponseEntity(HttpStatus.OK);
	}

	/**
	 * 아이디 중복
	 * */
	@GetMapping("/check/userid/{userId}")
	public ResponseEntity<?> checkEmail(@PathVariable("userId") String userId) {

	    if(userService.checkId(userId)) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("아이디 중복");
	    }

	    return new ResponseEntity(HttpStatus.OK);
	}
	
	/**
	 * 회원가입
	 * */
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody User user){
		if (user == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패");
		}
		user.setPoint(0);
		userService.signup(user);
		return new ResponseEntity(HttpStatus.OK);
	}
}
