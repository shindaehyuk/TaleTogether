package com.kong.authtest.comment.model;

import com.kong.authtest.share.model.Share;
import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commentId;
    private String content;

    @ManyToOne
    private Share share;
    @ManyToOne
    private User user;

    public Comment addUserAndShare(User user, Share share){
        this.user = user;
        this.share = share;
        return this;
    }
}
