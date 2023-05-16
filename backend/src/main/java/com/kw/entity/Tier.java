package com.kw.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tier {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "tier_id")
    @SequenceGenerator(name ="tier_id" , allocationSize = 1 , sequenceName = "tier_id")
    private Long tierId;

    private String tierName;

    private Integer tierLow;

    private Integer tierHigh;
}
