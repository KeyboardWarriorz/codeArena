package com.kw.service;

import com.kw.entity.User;

public interface UserService {
	public User loginCheck(User user);
	
    boolean checkNickname(String nickname);

    boolean checkId(String userId);
    
    public void signup(User user);
}
