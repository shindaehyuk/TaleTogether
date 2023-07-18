package com.kong.authtest.share.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long shareId;
    private String content;

}
