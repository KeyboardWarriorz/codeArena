package com.codeWarrior.codeArena.service;

import com.codeWarrior.codeArena.entity.User;

public interface UserService {
	public User loginCheck(User user);
	
    boolean checkNickname(String nickname);

    boolean checkId(String userId);
}
