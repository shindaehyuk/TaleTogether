package com.kong.authtest.images.model;

import com.kong.authtest.tale.model.Tale;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;
    private String imageName;
    private int sequence;

    @ManyToOne
    @JoinColumn(name = "tale_id")
    private Tale tale;

    public Images addTale(Tale tale){
        this.tale = tale;
        return this;
    }
}
