package com.kw.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
@Component
public class JwtUtil {
    // 비밀 키
    private static final String SECRET_KEY = "your-secret-key";

    // 토큰 유효 기간 (60분)
    private static final long ACCESS_EXPIRATION_TIME = 60 * 60 * 1000;
    private static final long REFRESH_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    // JWT 토큰 생성
    public static String generateToken(String type) {
        Date now = new Date();
        Date expiration;
        if (type.equals("access")) {
            expiration = new Date(now.getTime() + ACCESS_EXPIRATION_TIME);
        } else {
            expiration = new Date(now.getTime() + REFRESH_EXPIRATION_TIME);
        }
        JwtBuilder builder = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY);
        return builder.compact();
    }





    // 토큰 유효성 검사
    public static boolean validateToken(String token) {
        System.out.println("validate called");
        try {
            Date expiration = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getExpiration();
            Date now = new Date();
            System.out.println(expiration);
            System.out.println(now);
            if (expiration.compareTo(now) > 0) {
                throw new Exception();
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
