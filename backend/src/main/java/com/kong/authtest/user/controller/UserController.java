package com.kong.authtest.user.controller;

import com.auth0.jwt.JWT;
import com.kong.authtest.auth.util.JwtTokenUtil;
import com.kong.authtest.user.dto.*;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
        return ResponseEntity.ok(userService.addUser(createRequest));
    }

    @PatchMapping("/update-user/{userId}")
    public ResponseEntity<UserUpdateResponse> updateUser(@PathVariable String userId,
                                                         @RequestBody @Valid UserUpdateRequest userUpdateRequest) {
        return ResponseEntity.ok(userService.updateUser(userId, userUpdateRequest));

    }

    @PostMapping("/check-duplicate")
    public ResponseEntity<Boolean> checkValidate(@RequestBody UserDuplicateCheckRequest userDuplicateCheckRequest) {
        return ResponseEntity.ok(userService.CheckDuplicated(userDuplicateCheckRequest));
    }

    @PatchMapping("/update-password/{userId}")
    public ResponseEntity<UserUpdatePasswordResponse> updateMemberPassword(@PathVariable String userId,
                                                                           @RequestBody @Valid UserUpdatePasswordRequest userUpdatePasswordRequest) {
        return ResponseEntity.ok(userService.updateUserPassword(userId, userUpdatePasswordRequest));
    }

    @DeleteMapping("/delete-user/{userId}")
    public ResponseEntity<Boolean> deleteMember(@PathVariable String userId) {
        return ResponseEntity.ok(userService.userDelete(userId));
    }


    @GetMapping("/get/{userId}")
    public ResponseEntity<UserDtoResponse> getUserInfo(@PathVariable("userId") String userId) {
        return ResponseEntity.ok().body(userService.userDetail(userId));
    }

    @GetMapping("/get")
    public ResponseEntity<UserDtoResponse> getUser(@RequestHeader(HEADER_STRING) String token) {
        // 토큰에서 "Bearer " 제거
        token = token.replace(JwtTokenUtil.TOKEN_PREFIX, "");
        UserDtoResponse userDtoResponse = userService.userDetail(JWT.decode(token).getSubject());

        log.info(userDtoResponse.getUserId());
        return ResponseEntity.ok().body(userDtoResponse);
    }

}
