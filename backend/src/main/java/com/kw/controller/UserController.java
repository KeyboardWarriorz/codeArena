package com.kw.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.kw.config.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kw.dto.MypageDTO;
import com.kw.dto.SolvedDTO;
import com.kw.dto.UserDTO;
import com.kw.dto.WordDTO;
import com.kw.entity.User;
import com.kw.service.SolvedService;
import com.kw.service.UserService;
import com.kw.service.WordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
	private final JwtUtil jwtUtil;
	private final UserService userService;
	private final SolvedService solvedService;
	private final WordService wordService;

	/**
	 * 로그인하기
	 */
	@PostMapping("/login")
	public ResponseEntity<?> loginCheck(@RequestBody User user, HttpSession session) {
		// 서비스호출 하고 성공하면 리턴한 User를 받아서
		System.out.println("chekcing login");
		User dbuser = userService.loginCheck(user);
		System.out.println(dbuser);
		if (dbuser == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 혹은 비밀번호를 다시 입력해주세요.");
			// HttpSession에 정보를 저장한다. - 뷰에서 사용하고 있음 ${loginUser}- 아이디 / ${loginName} - 이름
		}
		UserDTO dto = userService.selectUser(dbuser.getUserId());
		UserDTO userDTO = new UserDTO(dbuser.getUserId(), dbuser.getNickname(), dbuser.getPoint(), dbuser.getProfileImage(),dto.getTier(),jwtUtil.generateToken("access"),jwtUtil.generateToken("refresh"));
		System.out.println(userDTO);
		return new ResponseEntity(userDTO, HttpStatus.OK);
	}

	/**
	 * 로그아웃
	 */
	@RequestMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		// 모든 세션의 정보를 삭제한다.
		System.out.println("logout called");
		session.invalidate();
		return new ResponseEntity(HttpStatus.OK);
	}

	/**
	 * 닉네임 중복
	 */
	@GetMapping("/check/nickname/{nickname}")
	public ResponseEntity<?> checkNickname(@PathVariable("nickname") String nickname) {
		if (userService.checkNickname(nickname)) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("닉네임 중복");
		}

		return new ResponseEntity(HttpStatus.OK);
	}

	/**
	 * 아이디 중복
	 */
	@GetMapping("/check/userid/{userId}")
	public ResponseEntity<?> checkEmail(@PathVariable("userId") String userId) {

		if (userService.checkId(userId)) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("아이디 중복");
		}

		return new ResponseEntity(HttpStatus.OK);
	}

	/**
	 * 회원가입
	 */
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody User user) {
		if (user == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패");
		}
		user.setPoint(0);
		userService.signup(user);
		return new ResponseEntity(HttpStatus.OK);
	}

	/**
	 * 회원 정보 조회
	 */

	@GetMapping("/mypage/{userId}")
	public ResponseEntity<?> getUserPage(@PathVariable("userId") String userId) {

		UserDTO user = userService.selectUser(userId);
		List<SolvedDTO> success_solved = solvedService.selectSolved_user(userId, 1);
		List<SolvedDTO> failed_solved = solvedService.selectSolved_user(userId, 2);
		List<WordDTO> user_word = wordService.UserWordList3(userId);

		MypageDTO dto = new MypageDTO(user, success_solved, failed_solved, user_word);

		return new ResponseEntity<>(dto, HttpStatus.OK);
	}

	/**
	 * 유저 포인트 추가
	 */
	@PostMapping("/point")
	public ResponseEntity<?> addPoint(HttpServletRequest request) {
		String user_id = request.getParameter("user_id");
		Integer point = Integer.parseInt(request.getParameter("point"));
		try {
			userService.addUserPoint(user_id, point);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(HttpStatus.OK);
	}

	/**
	 * 비밀번호 변경
	 * */
	@PostMapping("/password/{userId}")
	public ResponseEntity<?> ChangePw(@PathVariable("userId") String userId, @RequestBody Map<String, String> map) {
		if (!userService.checkPassword(userId,map.get("now_pw"))) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호가 맞지 않습니다.");
		}
		userService.ChangePw(userId, map.get("change_pw"));
		return ResponseEntity.status(HttpStatus.OK).body("비밀번호 변경을 성공했습니다.");
	}

	/**
	 * 단어목록 조회
	 * */
	@GetMapping("/word/{userId}")
	public ResponseEntity<?> getUserWord(@PathVariable("userId") String userId) {

		UserDTO user = userService.selectUser(userId);
		List<WordDTO> user_word = wordService.UserWordList(userId);

		MypageDTO dto = new MypageDTO(user,user_word);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}

	/**
	 * 프로필 변경
	 * */
	@PostMapping("/profile")
	public ResponseEntity<?> ChangeProfile(@RequestBody Map<String, String> request){
		String profileImage = request.get("profileImage");
		String userId = request.get("user_id");
		try {
			userService.changeProfile(userId, profileImage);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 변경 실패");
		}
		return ResponseEntity.status(HttpStatus.OK).body("프로필 변경 성공");
	}

}