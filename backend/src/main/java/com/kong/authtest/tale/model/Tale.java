package com.kong.authtest.tale.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Tale {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long taleId;
    private String story;
    private int id;
}
