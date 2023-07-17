package com.kong.authtest.user.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kong.authtest.user.dto.UserDto;
import com.kong.authtest.user.repository.UserRepository;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    @PostMapping("join")
    public ResponseEntity<Void> addUser(@RequestBody final UserDto userDto){
        try{
            if(userService.addUser(userDto))
                return ResponseEntity.status(HttpStatus.CREATED.value()).build();
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.internalServerError().build();
    }
//    @PutMapping("/{userId")
//    public ResponseEntity<Void> updateUser(@PathVariable final String userId, @RequestBody final UserDto){
//        return ResponseEntity.ok().build();
//    }
}
