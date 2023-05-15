package com.codeWarrior.codeArena.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.codeWarrior.codeArena.entity.Article;
import com.codeWarrior.codeArena.repository.ArticleRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ArticleServiceImpl implements ArticleService {
	
	private final ArticleRepository articleRepo;
	
	//private final JPAQueryFactory queryFactory;
	


	@Override
	public List<Article> selectAll() {
		List<Article> list = articleRepo.findAll();
		return list;
	}
}