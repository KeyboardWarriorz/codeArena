package com.kw.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Enumeration;
import java.util.Objects;


@RequiredArgsConstructor
@Component
public class JwtInterceptor implements HandlerInterceptor {
    private final JwtUtil jwtUtil;
    @Value("${remote.url}")
    private String remote_url;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // 요청 전에 처리할 작업을 여기에 구현합니다.
        // 예를 들어, 토큰의 유효성 검사, 인증, 권한 검사 등을 수행할 수 있습니다.


        System.out.println("prehandle called");
        System.out.println(request.getMethod());
        if ((request.getMethod().equals("OPTIONS")&&request.getHeader("Access-Control-Request-Method")!=null)||request.getHeader("Authorization")!=null) {
            System.out.println("preflight");
            System.out.println(request.getParameter("Authorization"));
            response.setHeader("Access-Control-Allow-Credentials", "true");
            return true;
        }

        // 토큰 검사 로직 예시:
        response.setHeader("Access-Control-Allow-Origin", remote_url);
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Max-Age", "3600");
        String accessToken = request.getHeader("access_token");
        System.out.println("accessToken = "+accessToken);

        if (accessToken != null && jwtUtil.validateToken(accessToken)) {
            System.out.println("if1");
            // 토큰이 유효한 경우 요청을 진행합니다.
            return true;
        } else {
            // 토큰이 유효하지 않은 경우 요청을 거부하거나 다른 처리를 수행할 수 있습니다.
            System.out.println("else1");
            String refreshToken = request.getHeader("refresh_token");
            System.out.println("refreshToken = "+refreshToken);

            if (refreshToken != null && jwtUtil.validateToken(refreshToken)) {
                System.out.println("if2");
                // 토큰이 유효한 경우 요청을 진행합니다.
                response.setHeader("refreshToken", jwtUtil.generateToken("refresh"));
                return true;
            }
        }
        response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
        return false;
    }

}
