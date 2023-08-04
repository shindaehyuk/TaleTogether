package com.kong.authtest.user.controller;

import com.kong.authtest.user.dto.*;
import com.kong.authtest.user.model.User;
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

    @PatchMapping("/update/member/{userId}")
    public ResponseEntity<UserUpdateResponse> updateUser(@PathVariable String userId,
                                                         @RequestBody @Valid final UserUpdateRequest userUpdateRequest) {
        return ResponseEntity.ok(userService.updateUser(userId, userUpdateRequest));

    }

    @GetMapping("/member/check-duplicate")
    public ResponseEntity<Boolean> checkValidate(@RequestBody UserDuplicateCheckRequest userDuplicateCheckRequest) {
        return ResponseEntity.ok(userService.CheckDuplicated(userDuplicateCheckRequest));
    }

    @PatchMapping("/update-password/member/{userId}")
    public ResponseEntity<UserUpdatePasswordResponse> updateMemberPassword(@PathVariable String userId,
                                                                           @RequestBody @Valid final UserUpdatePasswordRequest userUpdatePasswordRequest) {
        return ResponseEntity.ok(userService.updateUserPassword(userId, userUpdatePasswordRequest));
    }

    @DeleteMapping("/delete-member/{userId}")
    public ResponseEntity<Boolean> deleteMember(@PathVariable String userId) {
        return ResponseEntity.ok(userService.userDelete(userId));
    }


    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserInfo(@PathVariable("userId") String userId) {
        User user = userService.getUserByUserId(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(user);
    }

}
