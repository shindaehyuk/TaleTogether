package com.kong.authtest.images.repository;

import com.kong.authtest.images.dto.ImagesDtoResponse;
import com.kong.authtest.images.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImagesRepository extends JpaRepository<Images, Long> {
}
