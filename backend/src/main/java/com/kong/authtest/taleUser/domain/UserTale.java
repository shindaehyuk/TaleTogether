package com.kong.authtest.taleUser.domain;


import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.user.model.User;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
public class UserTale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tale tale;

    @ManyToOne
    private User user;

}
