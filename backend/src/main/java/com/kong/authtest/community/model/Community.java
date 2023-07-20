package com.kong.authtest.community.model;

import com.kong.authtest.comment.model.Comment;
import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;
    private String content;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "community", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Comment> commentList = new ArrayList<>();

    public Community addUser(User user){
        this.user = user;
        return this;
    }
}
