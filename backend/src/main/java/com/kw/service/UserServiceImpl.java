package com.kw.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import com.kw.entity.Tier;
import com.kw.repository.TierRepository;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kw.dto.UserDTO;
import com.kw.entity.User;
import com.kw.repository.ArticleRepository;
import com.kw.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRep;

	@Autowired
	private ArticleRepository articleRep;

	@Autowired
	private TierRepository tierRep;


	/**
	 * 로그인 가능 체크
	 * */
	@Override
	public User loginCheck(User user) {
		// 아이디에 해당하는 회원정보를 조회한다.
		User login = userRep.findById(user.getUserId()).orElse(null);
		// 조회된 결과가 null이면 로그인 불가;
		if (login == null) {
			return null;
		} else {
			// 조회된결과가 있으면 비밀번호 일치확인 후 틀리면 로그인 불가;
			String pw = user.getUserPw();
			if (!login.getUserPw().equals(pw)) {
				return null;
			}
		}
		// 일치하면 조회된 회원정보 리턴
		return login;
	}

	/**
	 * 닉네임 중복 체크
	 * */
    @Transactional
    @Override
    public boolean checkNickname(String nickname) {
        return userRep.existsByNickname(nickname);
    }


	/**
	 * 아이디 중복 체크
	 * */
    @Transactional
    @Override
    public boolean checkId(String userId) {
		return userRep.existsByuserId(userId);
    }

	/**
	 * 회원가입
	 * */
    @Override
    public void signup(User user) {
		// 프로필 이미지 랜덤 지정
		List<String> myList = Arrays.asList("Junseo", "Seongwhan", "Sunyeong", "Eunhyo", "Jieun");

        Random random = new Random();
        int randomIndex = random.nextInt(myList.size());
        
        user.setProfileImage(myList.get(randomIndex));
		userRep.save(user);
    }


	/**
	 * 유저DTO 생성
	 * */
    @Override 
    public UserDTO selectUser(String userId) {
		User user = userRep.findById(userId).orElse(null);
		UserDTO dto = new UserDTO(user.getUserId(), user.getNickname(), user.getPoint(),user.getProfileImage(), getTier(user.getPoint()));
		return dto;
    }

	/**
	 * 유저 포인트 증가
	 * */
    @Override
    public void addUserPoint(String userId, Integer point){
		User user = userRep.findByUserId(userId);
		user.setPoint(user.getPoint()+point);
		System.out.println(user);
		userRep.save(user);
    }


	/**
	 * 비밀번호 체크
	 * */
    @Override
    @Transactional
	public boolean checkPassword(String userId, String pw) {
		User user = userRep.findByUserId(userId);
		pw = hashSHA256(pw);
		System.out.println(pw);
		if (!user.getUserPw().equals(pw)) {
			return false;
		}
		return true;
    }

	/**
	 * 비밀번호 변경
	 * */
    @Override
    public void ChangePw(String userId, String pw) {
		User user = userRep.findByUserId(userId);
		pw = hashSHA256(pw);
		user.setUserPw(pw);
    }

	/**
	 * 프로필 변경
	 * */
	@Override
	public void changeProfile(String userId, String profileImage){
		User user = userRep.findByUserId(userId);
		user.setProfileImage(profileImage);
		userRep.save(user);
	}

	/**
	 * 회원 포인트 조회
	 * */
	@Override
	public Integer selectPoint(String userId){
		User user = userRep.findByUserId(userId);
		return user.getPoint();
	}

	@Override
	public Long getUserRank(String userId) {
		return userRep.getUserRank(userId);
	}

	@Override
	public List<UserDTO> getUserByRank(int num) {
		List<User> list = userRep.getUsersByRank();
		List<UserDTO> ret = new ArrayList<>();
		int i=0;
		for (User user : list) {
			i++;
			ret.add(new UserDTO(user.getNickname(),user.getPoint(),getTier(user.getPoint())));
			if (i == num) {
				break;
			}
		}
		return ret;
	}

	public static String hashSHA256(String input) {
		return DigestUtils.sha256Hex(input);
	}

	public String getTier(int point) {
		List<Tier> list = tierRep.findAll(); //Tier의 정보를 가져온다
		System.out.println(list);
		String tier = "";
		for(Tier t : list){
			if( point >= t.getTierLow() && point < t.getTierHigh()){
				tier = t.getTierName(); //범위에 해당하는 티어
				break;
			}
		}
		return tier;
	}
}
