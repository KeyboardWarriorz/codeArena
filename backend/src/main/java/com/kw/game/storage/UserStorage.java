package com.kw.game.storage;

import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
@Component
public class UserStorage {

    private Set<String> users = new HashSet<>();



    public Set<String> getUsers() {
        return users;
    }

    public void setUser(String userName) throws Exception {
        if (users.contains(userName)) {
            throw new Exception("User already exists with userName: " + userName);
        }
        users.add(userName);
    }
}
