package com.kong.authtest.taleUser.dto;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserTaleRequest {

    private Long taleId;

    private String userId;
}
