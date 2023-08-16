package com.kong.authtest.likes.model;

import com.kong.authtest.community.model.Community;
import com.kong.authtest.user.model.User;
import lombok.*;

import javax.persistence.*;

@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class CommunityLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;

    public CommunityLike addUser(User user){
        this.user = user;
        return this;
    }

    public CommunityLike addCommunity(Community community){
        this.community = community;
        return this;
    }
}
