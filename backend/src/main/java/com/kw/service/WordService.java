package com.kw.service;

import java.util.List;

import com.kw.dto.WordDTO;
import com.kw.entity.UserWord;
import com.kw.entity.Word;

public interface WordService {

	/**
	 * 단어에 대한 설명 가져오기
	 * */
	Word selectByWordName(String name);

	/**
	 * 공용 Word DB에서 word_id 조회하기
	 * */
	Word selectByName(String name);

	/**
	 * 사용자 단어 DB에 값이 있는 지 조회하기
	 * */
	UserWord checkNameByUserId(String name, String userId);

	/**
	 * 사용자 단어 DB에 등록하기
	 * */
	void insertUserWord(String name, String userId);

	/**
	 * 공용 단어 DB에 저장하기
	 * */
	void insertWord(Word word);

	/**
	 * chatGPT로부터 단어에 해당하는 내용을 받아오기
	 * */
	String getWordDefinition(String word);


	/**
	 * 유저가 등록한 Word들의 List 받아오기
	 * */
	List<WordDTO> UserWordList(String userId);
	
	/**
	 * 유저가 등록한 Word들의 List 3개 받아오기
	 * */
	List<WordDTO> UserWordList3(String userId);

	/**
	 * 사용자 단어장에서 특정 단어 삭제
	 * */
	Integer deleteWord(String userId, Long wordId);
}
