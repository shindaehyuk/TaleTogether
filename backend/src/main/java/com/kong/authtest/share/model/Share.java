package com.kong.authtest.share.model;

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
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long shareId;
    private String content;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "share", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Comment> commentList = new ArrayList<>();

    public Share addUser(User user){
        this.user = user;
        return this;
    }
}
