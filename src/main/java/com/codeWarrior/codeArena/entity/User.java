package com.codeWarrior.codeArena.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Users")
public class User {
    @Id
    String user_id;
    String user_pw;
    String nickname;
    Integer point;
}
