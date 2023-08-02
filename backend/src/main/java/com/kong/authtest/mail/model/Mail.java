package com.kong.authtest.mail.model;

import com.kong.authtest.comment.model.Comment;
import com.kong.authtest.common.baseEntity.BaseEntity;
import com.kong.authtest.common.commonValidation.Content;
import com.kong.authtest.community.dto.CommunityDtoPutRequest;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.user.model.User;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;


@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mailId;

    @Email
    private String email;

    private String code;
}