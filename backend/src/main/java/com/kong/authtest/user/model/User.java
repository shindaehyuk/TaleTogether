package com.kong.authtest.user.model;

import com.kong.authtest.share.model.Share;
import com.kong.authtest.tale.model.Tale;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "USER")
public class User {

    @Id
    private int id;
    private String name;
    private String password;

    @Column(name = "user_id")
    private String userId;
    private String role;

    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Tale> taleList = new ArrayList<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Share> shareList = new ArrayList<>();
}
