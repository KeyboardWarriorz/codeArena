package com.codeWarrior.codeArena.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @Column(name = "user_id")
    String userId;
    @Column(name = "user_pw")
    String userPw;
    String nickname;
    Integer point;
}
