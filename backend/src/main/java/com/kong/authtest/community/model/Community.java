package com.kong.authtest.community.model;

import com.kong.authtest.comment.model.Comment;
import com.kong.authtest.common.baseEntity.BaseEntity;
import com.kong.authtest.common.commonValidation.Content;
import com.kong.authtest.community.dto.CommunityDtoPutRequest;
import com.kong.authtest.likes.model.CommunityLike;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.user.model.User;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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

    @NotNull
    private String title;

    @ManyToOne
    private User user;

    @ManyToOne
    private Tale tale;

    @OneToMany(mappedBy = "community", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL)
    private List<CommunityLike> communityLikeList = new ArrayList<>();

    public Community addUser(User user) {
        this.user = user;
        return this;
    }

    public Community addTale(Tale tale) {
        this.tale = tale;
        return this;
    }

    public Community updateCommunity(CommunityDtoPutRequest communityDtoPutRequest) {
        this.content = new Content(communityDtoPutRequest.getContent());
        this.title = communityDtoPutRequest.getTitle();
        return this;
    }
}
