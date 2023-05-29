package com.kw.service;

import com.kw.dto.UserDTO;
import com.kw.entity.User;

import java.util.List;

public interface UserService {
    public User loginCheck(User user);

    boolean checkNickname(String nickname);

    boolean checkId(String userId);
    
    public void signup(User user);

    public void addUserPoint(String user_id, Integer point);

    public void addUserPointByNickname(String nickname, Integer point);
    
    public UserDTO selectUser(String userId);
    
    boolean checkPassword(String userId, String pw);
    
    public void ChangePw(String userId, String pw);

    void changeProfile(String userId, String profileImage);

    Integer selectPoint(String userId);

    Long getUserRank(String userId);

    List<UserDTO> getUserByRank(int num);
}
