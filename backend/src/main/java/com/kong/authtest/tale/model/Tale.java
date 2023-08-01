package com.kong.authtest.tale.model;

import com.kong.authtest.common.baseEntity.BaseEntity;
import com.kong.authtest.community.model.Community;
import com.kong.authtest.page.model.Page;
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
public class Tale extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taleId;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "tale", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Page> pageList = new ArrayList<>();

    @OneToOne(mappedBy = "tale", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private Community community;

    public Tale addUser(User user) {
        this.user = user;
        return this;
    }
}
