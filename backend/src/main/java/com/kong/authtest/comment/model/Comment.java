package com.kong.authtest.comment.model;

import com.kong.authtest.comment.dto.CommentDtoPutRequest;
import com.kong.authtest.common.baseEntity.BaseEntity;
import com.kong.authtest.common.commonValidation.Content;
import com.kong.authtest.community.model.Community;
import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Embedded
    private Content content;

    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Comment addUserAndCommunity(User user, Community community) {
        this.user = user;
        this.community = community;
        return this;
    }

    public Comment updateComment(CommentDtoPutRequest commentDtoPutRequest) {
        this.content = new Content(commentDtoPutRequest.getContent());
        return this;
    }

}
