package com.codeWarrior.codeArena.reponse;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ApiResponse<T> {

    private static final String SUCCESS_STATUS = "success";
    private static final String FAIL_STATUS = "fail";
    private static final String ERROR_STATUS = "error";

    private String status;
    private T data;
    private String message;

    public static <T> ApiResponse<T> createSuccess(T data, String message) {
        return new ApiResponse<>(SUCCESS_STATUS, data, message);
    }

    public static ApiResponse<?> createSuccessWithNoContent() {
        return new ApiResponse<>(SUCCESS_STATUS, null, null);
    }

    // Hibernate Validator에 의해 유효하지 않은 데이터로 인해 API 호출이 거부될때 반환
//    public static ApiResponse<?> createFail(BindingResult bindingResult) {
//        Map<String, String> errors = new HashMap<>();
//
//        List<ObjectError> allErrors = bindingResult.getAllErrors();
//        for (ObjectError error : allErrors) {
//            if (error instanceof FieldError) {
//                errors.put(((FieldError) error).getField(), error.getDefaultMessage());
//            } else {
//                errors.put( error.getObjectName(), error.getDefaultMessage());
//            }
//        }
//        return new ApiResponse<>(FAIL_STATUS, errors, null);
//    }

    // 예외 발생으로 API 호출 실패시 반환
    public static ApiResponse<?> createError(String message) {
        return new ApiResponse<>(ERROR_STATUS, null, message);
    }

    private ApiResponse(String status, T data, String message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}