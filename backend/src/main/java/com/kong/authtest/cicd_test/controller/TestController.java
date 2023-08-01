package com.kong.authtest.cicd_test.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test/cicd")
    public String test() {
        return "test";
    }
}
