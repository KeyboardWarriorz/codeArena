package com.codeWarrior.codeArena.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Tier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer tier_id;
    String tier_name;
    Integer tier_low;
    Integer tier_higth;
}
