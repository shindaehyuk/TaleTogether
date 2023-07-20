package com.kong.authtest.community.model;

import com.kong.authtest.comment.model.Comment;
import com.kong.authtest.common.baseEntity.BaseEntity;
import com.kong.authtest.common.commonValidation.Content;
import com.kong.authtest.user.model.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Community extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;


    @Embedded
    private Content content;
    private String title;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "community", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Comment> commentList = new ArrayList<>();

    public Community addUser(User user) {
        this.user = user;
        return this;
    }
}
