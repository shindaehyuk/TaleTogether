package com.kong.authtest.user.controller;

import com.kong.authtest.user.dto.*;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("/api/users")
@RequiredArgsConstructor
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

}
