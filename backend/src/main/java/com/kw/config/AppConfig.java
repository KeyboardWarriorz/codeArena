package com.kw.config;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.querydsl.jpa.impl.JPAQueryFactory;

@Configuration      //bean을 쓰려면 무조건 등록 필수 (환경설정을 돕는 클래스)
public class AppConfig {

    @PersistenceContext  //EntityManager는 각 서비스마다 새롭게 생성해서 주입
    private EntityManager em;

    @Bean   //생성
    public JPAQueryFactory queryFactory() {
        return new JPAQueryFactory(em);
    }

}