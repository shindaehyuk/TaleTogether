package com.kong.authtest.tale.model;

import com.kong.authtest.images.model.Images;
import com.kong.authtest.story.model.Story;
import com.kong.authtest.user.model.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Tale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taleId;
    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "tale", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Story> storyList = new ArrayList<>();

    @OneToMany(mappedBy = "tale", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Images> imagesList = new ArrayList<>();

    public Tale addUser(User user){
        this.user = user;
        return this;
    }
}
