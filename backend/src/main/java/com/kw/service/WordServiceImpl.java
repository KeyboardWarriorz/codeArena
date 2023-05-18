package com.kw.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.transaction.Transactional;

import com.kw.entity.User;
import com.kw.repository.UserRepository;
import com.kw.repository.UserWordRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kw.entity.UserWord;
import com.kw.entity.Word;
import com.kw.repository.WordRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class WordServiceImpl implements WordService {
	private final WordRepository wordRep;
	private final UserWordRepository userWordRep;
	private final UserRepository userRep;

	@Value("${openai.api.key}")
	private String OPENAI_API_KEY;
	private final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

	
	/**
	 * 단어에 대한 설명 가져오기
	 * */
	@Override
	public Word selectByWordName(String name) {
		return wordRep.selectByWordName(name);
	}

	/**
	 * 공용 Word DB에서 word_id 조회하기
	 * */
	@Override
	public Word selectByName(String name){
		return wordRep.selectByName(name);
	}

	/**
	 * 사용자 단어 DB에 값이 있는 지 조회하기
	 * */
	@Override
	public Long selectByName(String name, String userId){
		return wordRep.selectByName(name, userId);
	}

	/**
	 * 사용자 단어 DB에 등록하기
	 * */
	@Override
	public void insert(String name, String userId) {
		Word word = selectByName(name); //검색한 단어에 해당하는 word 조회
		User user = userRep.findByUserId(userId);
		UserWord userWord = new UserWord(null, user, word);
		userWordRep.save(userWord);
	}

	/**
	 * 공용 단어 DB에 저장하기
	 * */
	@Override
	public void insert(Word word) {
		wordRep.save(word);
	}

	/**
	 * chatGPT로부터 단어에 해당하는 내용을 받아오기
	 * */
	@Override
	public String getWordDefinition(String word){

		//사용자의 단어 사전의 저장할 내용이라 100자 이내로 제한
		String[] messages = { "{\"role\": \"system\", \"content\": \"You are a helpful assistant.\"}",
				"{\"role\": \"user\", \"content\": \"" + word + "에 대한 설명을 100자 이내로 답변\"}" };

		String model = "gpt-3.5-turbo"; //gpt 3.5 turbo 모델 사용
		double temperature = 0.5;
		int n = 1;

		try {
			URL url = new URL(OPENAI_API_URL);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Authorization", "Bearer " + OPENAI_API_KEY);
			connection.setRequestProperty("Content-Type", "application/json");
			connection.setDoOutput(true);

			String data = "{\"model\": \"" + model + "\", \"temperature\": " + temperature + ", \"n\": " + n
					+ ", \"messages\": [" + String.join(",", messages) + "]}";

			try (OutputStream outputStream = connection.getOutputStream()) {
				byte[] input = data.getBytes("utf-8");
				outputStream.write(input, 0, input.length);
			}

			try (BufferedReader bufferedReader = new BufferedReader(
					new InputStreamReader(connection.getInputStream(), "utf-8"))) {
				StringBuilder response = new StringBuilder();
				String responseLine;
				while ((responseLine = bufferedReader.readLine()) != null) {
					response.append(responseLine.trim());
				}
				
				String content = null;
				//chatGPT로부터 가져온 값이 비어있지 않을 때
				if(response.toString() != null) {
					ObjectMapper objectMapper = new ObjectMapper();
					JsonNode rootNode = objectMapper.readTree(response.toString());
					content = rootNode.get("choices").get(0).get("message").get("content").asText(); //content만 가져오기 
				}
            
				return content; //content 값을 반환 
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null; //조회에 실패했을 때 null을 반환 

	} //getWordDefinition end

}
