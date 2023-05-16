package com.kw.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * (CONTROLLER에서) 사용 예시
 */
//@GetMapping("/example")
//public ResponseEntity<ApiResponse<String>> getExampleApiResponse() {
//    ApiResponse<String> response = new ApiResponse<>();
//
//    response.setMessage("Success");
//    response.setStatusCode(HttpStatus.OK.value());
//    response.setData("Hello, world!");
//     if (Data == null){   //null이면 상태코드나 msg 바꾸시면 됩니다
//      response.setStatusCode(500);
//      }
//    return ResponseEntity.ok(response);
//}

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class responseApi<T> {
    private String message;
    private T data;
    private int statusCode;


    public responseApi(String message, int statusCode, T data) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }


}