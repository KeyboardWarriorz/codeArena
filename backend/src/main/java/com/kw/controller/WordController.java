package com.kw.controller;

import com.kw.entity.UserWord;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kw.entity.Word;
import com.kw.service.WordService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/word")
public class WordController {

    private final WordService wordService;
    private String description; //드래그한 단어에 해당하는 설명

    /**
     * 드래그한 단어를 DB에 저장
     * request: user_id, word, content
     * status 201 : "단어 등록 성공" / status 401 : "이미 등록된 단어" /  status 500 : "단어 등록 실패"
     */
    @PostMapping()
    public ResponseEntity<?> insert(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String userId = request.get("user_id");

        // 1. 사용자 User_Word DB에 같은 내용이 이미 존재하는 지 확인한다.
        UserWord userWord = wordService.checkNameByUserId(name, userId);

        // 2-1. 이미 있다면 "이미 등록된 단어" 메시지를 전달
        if (userWord != null) {
            return ResponseEntity.status(409).body("이미 등록된 단어");
        }

        // 2-2. 없다면 공용 Word DB에서 정보(word_id) 가져와 User_Word DB에 값을 저장한다.
        try {
            wordService.insertUserWord(name, userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("단어 등록 실패");
        }
        return ResponseEntity.status(201).body("단어 등록 성공");
    }

    /**
     * 단어에 대한 설명 가져오기
     * request: name
     * status 200 : "단어 조회 성공" / status 500 : "단어 검색 실패"
     */
    @GetMapping("{name}")
    public ResponseEntity<?> selectByName(@PathVariable("name") String name) {
        Map<String, Object> response = new HashMap<>();
        // 1. 공용 Word DB에 해당하는 단어가 이미 있는 지 확인한다.
        Word word = wordService.selectByWordName(name);
        // 2-1. 만약 없다면 ChatGPT를 통해 값을 가져온다.
        if (word == null) {
            description = wordService.getWordDefinition(name);

            if (description == null) { //chatGPT에서 가져온 값이 없다면
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("단어 조회 실패");
            } else {
                // 2-1-1. 공용 Word DB에 저장한다.
                wordService.insertWord(new Word(null, name, description)); //저장
                response.put("statusCode", 200);
                response.put("message", "단어 조회 성공");
                response.put("data", description); // 단어 전송
                response.put("name", name);
            }
        } else { // 2-2. 이미 있다면 공용 Word DB에서 가져온 값을 가져온다.
            response.put("statusCode", 200);
            response.put("message", "단어 조회 성공");
            response.put("name", name);
            response.put("data", word.getDescription()); // 단어 전송
        }
        return ResponseEntity.ok(response);
    }

    /**
     * 단어장 삭제
     * request: user_id, word_id
     * status 201: "단어 삭제 성공" / status 500 : "단어 삭제 실패"
     */
    @PostMapping("/delete")
    public ResponseEntity<?> deleteWord(@RequestBody Map<String, String> request) {
        // 1. Json에서 사용자 아이디와 단어 아이디 조회
        String userId = request.get("user_id");
        Long wordId = Long.parseLong(request.get("word_id"));

        Integer code = wordService.deleteWord(userId, wordId);
        if (code == 0) { //삭제에 실패했을 때
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("단어 삭제 실패");
        }

        return ResponseEntity.status(201).body("단어 삭제 성공");
    }

}
