package com.kong.authtest.story.model;

import com.kong.authtest.tale.model.Tale;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storyId;
    private String story;
    private int sequence;

    @ManyToOne
    @JoinColumn(name = "tale_id")
    private Tale tale;

    public Story addTale(Tale tale){
        this.tale = tale;
        return this;
    }

}
