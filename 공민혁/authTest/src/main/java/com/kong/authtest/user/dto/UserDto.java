package com.kong.authtest.user.dto;

import lombok.Data;

@Data
public class UserDto {
    private int id;
    private String department;
    private String name;
    private String password;
    private String position;
}
