package com.kw.game.service;

import com.kw.game.storage.UserStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserStorage userStorage;
    public void registerUser(String userName) throws Exception{
        userStorage.setUser(userName);
    }
}
