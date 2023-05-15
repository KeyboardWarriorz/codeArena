package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class Tier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tier_id")
    Integer tierId;
    @Column(name = "tier_name")
    String tierName;
    @Column(name = "tier_low")
    Integer tierLow;
    @Column(name = "tier_higth")
    Integer tierHigth;
}
