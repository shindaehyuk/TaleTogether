package com.kong.authtest.user.controller;

import com.auth0.jwt.JWT;
import com.kong.authtest.auth.util.JwtTokenUtil;
import com.kong.authtest.user.dto.*;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.kong.authtest.auth.util.JwtTokenUtil.HEADER_STRING;

@Controller
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<?> addUser(@RequestBody @Valid final UserCreateRequest createRequest) {
        UserCreateResponse userCreateResponse = userService.addUser(createRequest);
        if(userCreateResponse == null){
            return ResponseEntity.badRequest().body("join 에러");
        }
        return ResponseEntity.ok(userCreateResponse);

    }

    @PatchMapping("/update-user")
    public ResponseEntity<?> updateUser(final Authentication authentication,
                                                         @RequestBody @Valid UserUpdateRequest userUpdateRequest) {
        try {
            UserDtoResponse userDtoResponse = userService.userDetail((String) authentication.getPrincipal());
            return ResponseEntity.ok(userService.updateUser(userDtoResponse.getUserId(), userUpdateRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("updateUser 오류");
        }
    }

    @PostMapping("/check-duplicate")
    public ResponseEntity<?> checkValidate(@RequestBody UserDuplicateCheckRequest userDuplicateCheckRequest) {
        boolean duplicated = userService.CheckDuplicated(userDuplicateCheckRequest);
        if(duplicated){
            return ResponseEntity.badRequest().body("checkValidate가 true임다");
        }
        return ResponseEntity.ok(false);
    }

    @PatchMapping("/update-password")
    public ResponseEntity<?> updateMemberPassword(final Authentication authentication,
                                                                           @RequestBody @Valid UserUpdatePasswordRequest userUpdatePasswordRequest) {
        try {
            UserDtoResponse userDtoResponse = userService.userDetail((String) authentication.getPrincipal());

            return ResponseEntity.ok(userService.updateUserPassword(userDtoResponse.getUserId(), userUpdatePasswordRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("updatePassword 오류");
        }
    }

    @DeleteMapping("/delete-user")
    public ResponseEntity<?> deleteMember(final Authentication authentication) {
        try {
            UserDtoResponse userDtoResponse = userService.userDetail((String) authentication.getPrincipal());

            return ResponseEntity.ok(userService.userDelete(userDtoResponse.getUserId()));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("deleteMember 오류");
        }
    }


    @GetMapping("/get")
    public ResponseEntity<?> getUser(final Authentication authentication) {
        try {
            UserDtoResponse userDtoResponse = userService.userDetail((String) authentication.getPrincipal());
            return ResponseEntity.ok().body(userDtoResponse);
        }catch (Exception e){
            return ResponseEntity.badRequest().body("getUser 오류");
        }
    }

}
