package com.example.student_list.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.student_list.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService {


    @Value("${jwt.secret}")
    private String secretKey;

    public String getSecretKey() {
        return secretKey;
    }


    public String generateToken(User user) {
        return Jwts.builder()
                .claim("username", user.getUsername())
                .claim("role", user.getRole()) // Теперь метод getRole() доступен
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 часа
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}