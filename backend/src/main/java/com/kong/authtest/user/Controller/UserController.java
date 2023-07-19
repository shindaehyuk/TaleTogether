package com.kong.authtest.user.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kong.authtest.user.dto.UserDto;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ObjectMapper objectMapper;

    @PostMapping("/join")
    public ResponseEntity<Void> addUser(@RequestBody final UserDto userDto) {
        try {
            if (userService.addUser(userDto))
                return ResponseEntity.status(HttpStatus.CREATED.value()).build();
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        System.out.println("중복된 아이디이구욘...");
        return ResponseEntity.internalServerError().build();
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> getUserInfo(@PathVariable() String userId) {
        User user = userService.getUserByUserId(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(user.toString());
    }

//    @PutMapping("/{userId")
//    public ResponseEntity<Void> updateUser(@PathVariable final String userId, @RequestBody final UserDto){
//        return ResponseEntity.ok().build();
//    }
}
