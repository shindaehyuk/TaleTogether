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
    public ResponseEntity<UserCreateResponse> addUser(@RequestBody @Valid final UserCreateRequest createRequest) {
        UserCreateResponse userCreateResponse = userService.addUser(createRequest);
        if(userCreateResponse == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userCreateResponse);

    }

    @PatchMapping("/update-user")
    public ResponseEntity<UserUpdateResponse> updateUser(final Authentication authentication,
                                                         @RequestBody @Valid UserUpdateRequest userUpdateRequest) {
        UserDtoResponse userDtoResponse = userService.userDetail((String) authentication.getPrincipal());
        return ResponseEntity.ok(userService.updateUser(userDtoResponse.getUserId(), userUpdateRequest));
    }

    @PostMapping("/check-duplicate")
    public ResponseEntity<Boolean> checkValidate(@RequestBody UserDuplicateCheckRequest userDuplicateCheckRequest) {
        boolean duplicated = userService.CheckDuplicated(userDuplicateCheckRequest);
        if(duplicated){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(duplicated);
    }

    @PatchMapping("/update-password")
    public ResponseEntity<UserUpdatePasswordResponse> updateMemberPassword(final Authentication authentication,
                                                                           @RequestBody @Valid UserUpdatePasswordRequest userUpdatePasswordRequest) {
        UserDtoResponse userDtoResponse = userService.userDetail((String) authentication.getPrincipal());
        return ResponseEntity.ok(userService.updateUserPassword(userDtoResponse.getUserId(), userUpdatePasswordRequest));
    }

    @DeleteMapping("/delete-user")
    public ResponseEntity<Boolean> deleteMember(final Authentication authentication) {
        UserDtoResponse userDtoResponse = userService.userDetail((String) authentication.getPrincipal());
        return ResponseEntity.ok(userService.userDelete(userDtoResponse.getUserId()));
    }


    @GetMapping("/get")
    public ResponseEntity<UserDtoResponse> getUser(final Authentication authentication) {
        UserDtoResponse userDtoResponse = userService.userDetail((String) authentication.getPrincipal());
        return ResponseEntity.ok().body(userDtoResponse);
    }

}
