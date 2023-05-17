package com.kw.game.controller;

import com.kw.game.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class UsersController {
    @Autowired
    private UserService userService;
    @GetMapping("/registration/user/{userName}")
    public ResponseEntity<Void> registerUser(@PathVariable String userName) {
        System.out.println("handling register user request: " + userName);
        try {
            userService.registerUser(userName);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
