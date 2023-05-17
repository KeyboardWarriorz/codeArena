package com.kw.service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kw.dto.MypageDTO;
import com.kw.dto.UserDTO;
import com.kw.entity.Article;
import com.kw.entity.User;
import com.kw.repository.ArticleRepository;
import com.kw.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class UserServieImpl implements UserService {

	@Autowired
	private UserRepository userRep;
	
	@Autowired
	private ArticleRepository articleRep;
	

	@Override
	public User loginCheck(User user) {
		// 아이디에 해당하는 회원정보를 조회한다.
		User test = userRep.findById(user.getUserId()).orElse(null);
		// 조회된 결과가 null이면 throw new RuntimeException("존재하지 않는 ID로 로그인할수 없습니다.");
		if (test == null) {
			return null;
		} else {
			// 조회된결과가 있으면 비밀번호 일치확인 후 틀리면 throw new RuntimeException("비밀번호를 다시 확인해주세요.");
			if (!test.getUserPw().equals(user.getUserPw())) {
				return null;
			}
		}
		// 일치하면 조회된 회원정보 리턴
		return test;
	}
	
	
    @Transactional
    @Override
    public boolean checkNickname(String nickname) {
        return userRep.existsByNickname(nickname);
    }
    
    
    @Transactional
    @Override
    public boolean checkId(String userId) {
    	return userRep.existsByuserId(userId);
    };
    
    @Override
    public void signup(User user) {
    	List<String> myList = Arrays.asList("Junseo", "Seongwhan", "Sunyeong", "Eunhyo", "Jieun");

        Random random = new Random();
        int randomIndex = random.nextInt(myList.size());
        
        user.setProfileImage(myList.get(randomIndex));
    	userRep.save(user);
    }
    
    @Override 
    public UserDTO selectUser(String userId) {
    	User user = userRep.findById(userId).orElse(null);
    	
    	UserDTO dto = new UserDTO(user.getUserId(), user.getNickname(), user.getPoint(),user.getProfileImage());

    	return dto;
    }
    
    @Override
    public void addUserPoint(String userId, Integer point){
    	User user = userRep.findByUserId(userId);
    	user.setPoint(user.getPoint()+point);
    	System.out.println(user);
    	userRep.save(user);
    }

}
