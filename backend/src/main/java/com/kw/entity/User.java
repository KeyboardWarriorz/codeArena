package com.kw.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Users")
public class User {
    @Id
    private String userId;
    private String userPw;
    private String nickname;
    private String profileImage;
    private Integer point;
}
