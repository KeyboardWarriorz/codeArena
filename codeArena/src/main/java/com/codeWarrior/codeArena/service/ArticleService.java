package com.codeWarrior.codeArena.service;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface ArticleService {

	ResponseEntity selectAll(Pageable pageable);

}
