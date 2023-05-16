package com.kw.service;

import com.kw.dto.MypageDTO;
import com.kw.dto.UserDTO;
import com.kw.entity.User;

public interface UserService {
	public User loginCheck(User user);
	
    boolean checkNickname(String nickname);

    boolean checkId(String userId);
    
    public void signup(User user);
    
//    public MypageDTO Mydata(String userId);
}
