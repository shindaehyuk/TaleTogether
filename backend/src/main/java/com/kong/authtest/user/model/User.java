package com.kong.authtest.user.model;

import com.kong.authtest.comment.model.Comment;
import com.kong.authtest.community.model.Community;
import com.kong.authtest.likes.model.CommunityLike;
import com.kong.authtest.tale.model.Tale;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "USER")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String password;

    private String userId;

    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Tale> taleList = new ArrayList<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Community> communityList = new ArrayList<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CommunityLike> communityLikeList = new ArrayList<>();
    

    public void update(User user) {
        this.userId = user.getUserId();
        this.name = user.getName();
    }

    public void updatePassword(User user) {
        this.password = password;
    }
}
