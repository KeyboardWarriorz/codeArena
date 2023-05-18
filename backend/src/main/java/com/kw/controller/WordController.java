package com.kw.controller;

import com.kw.entity.User;
import com.kw.repository.UserWordRepository;
import com.kw.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kw.entity.UserWord;
import com.kw.entity.Word;
import com.kw.response.responseApi;
import com.kw.service.WordService;

@RestController
@RequiredArgsConstructor
public class WordController {

	private final WordService wordService;

	private String searchingName; //사용자가 드래그한 단어
	private String description; //드래그한 단어에 해당하는 설명

	/**
	 * 드래그한 단어를 DB에 저장
	 * request: user_id, word, content
	 * status 201 : "단어 등록 성공" / status 401 : "이미 등록된 단어" /  status 500 : "단어 등록 실패"
	 */
	@PostMapping("/word")
	public ResponseEntity<responseApi<String>> insert(@RequestParam String userId) {
		responseApi<String> response = new responseApi<String>();

		// 1. 사용자 User_Word DB에 같은 내용이 이미 존재하는 지 확인한다.
		Long now = wordService.selectByName(searchingName, userId);

		// 2-1. 이미 있다면 "이미 등록된 단어" 메시지를 전달
		if(now > 0){
			response.setStatusCode(401);
			response.setMessage("이미 등록된 단어");
		}else{ // 2-2. 없다면 공용 Word DB에서 정보(word_id) 가져와 User_Word DB에 값을 저장한다.
			wordService.insert(searchingName, userId);
			response.setStatusCode(200);
			response.setMessage("단어 등록 성공");
		}
		return ResponseEntity.ok(response); // 기존에 보고 있던 페이지에 그대로
	}

	/**
	 * 단어에 대한 설명 가져오기
	 * request: name
	 * status 200 : "단어 조회 성공" / status 500 : "단어 검색 실패"
	 */
	@GetMapping("/word")
	public ResponseEntity<responseApi<String>> selectByName(String name) {
		responseApi<String> response = new responseApi<String>();
		searchingName = name; //드래그한 단어를 저장

		// 1. 공용 Word DB에 해당하는 단어가 이미 있는 지 확인한다.
		Word word = wordService.selectByWordName(name);

		// 2-1. 만약 없다면 ChatGPT를 통해 값을 가져온다.
		if (word == null) {
			description = wordService.getWordDefinition(name);

			if(description == null) { //chatGPT에서 가져온 값이 없다면
				response.setStatusCode(500);
				response.setMessage("단어 조회 실패");
			} else {
				response.setStatusCode(200);
				response.setMessage("단어 조회 성공");
				response.setData(description); // 단어 전송

				// 2-1-1. 공용 Word DB에 저장한다.
				wordService.insert(new Word(null, name, description)); //저장
			}
		} else { // 2-2. 이미 있다면 공용 Word DB에서 가져온 값을 가져온다.
			response.setStatusCode(200);
			response.setMessage("단어 조회 성공");
			response.setData(word.getDescription()); // 단어 전송
		}
		return ResponseEntity.ok(response);
	}


}
