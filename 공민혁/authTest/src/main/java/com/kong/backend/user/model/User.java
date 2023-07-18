package com.kong.backend.user.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User {

    @Id
    private String id;
    private String department;
    private String name;
    private String password;
    private String position;
}
