package com.kong.authtest.tale.model;

import com.kong.authtest.common.baseEntity.BaseEntity;
import com.kong.authtest.community.model.Community;
import com.kong.authtest.finalScriptPage.domain.FinalScriptPage;
import com.kong.authtest.gameRoom.domain.GameRoom;
import com.kong.authtest.page.model.Page;
import com.kong.authtest.tale.dto.TaleTitleRequest;
import com.kong.authtest.taleUser.domain.UserTale;
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

    private String title;

    private String titleImage;

    @OneToOne(mappedBy = "tale", cascade = CascadeType.ALL)
    private GameRoom gameRoom;

    @OneToMany(mappedBy = "tale", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Page> pageList = new ArrayList<>();

    @OneToMany(mappedBy = "tale", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Community> communityList = new ArrayList<>();

    @OneToMany(mappedBy = "tale",orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<UserTale> userTaleList = new ArrayList<>();

    @OneToMany(mappedBy = "tale",orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<FinalScriptPage> finalScriptPageList = new ArrayList<>();

    public void setTitle(TaleTitleRequest taleTitleRequest){
        this.title = taleTitleRequest.getTitle();
        this.titleImage = taleTitleRequest.getTitleImage();
    }

}
