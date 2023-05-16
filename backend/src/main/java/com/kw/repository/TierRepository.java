package com.kw.repository;

import com.kw.entity.Tier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface TierRepository extends JpaRepository<Tier, Integer>, QuerydslPredicateExecutor<Tier> {
}
