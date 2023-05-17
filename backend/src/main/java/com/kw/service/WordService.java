package com.kw.service;

import com.kw.entity.UserWord;
import com.kw.entity.Word;

public interface WordService {

	/**
	 * 단어에 대한 설명 가져오기 
	 * */
	Word selectByName(String name);
	
	/**
	 * 사용자 단어 DB에 등록하기 
	 * */
	void insert(UserWord userWord);
	
	/**
	 * 공용 단어 DB에 저장하기 
	 * */
	void insert(Word word);
	
	/**
	 * chatGPT로부터 단어에 해당하는 내용을 받아오기 
	 * */
	String getWordDefinition(String word);
}
