package com.kong.authtest.images.repository;

import com.kong.authtest.images.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagesRepository extends JpaRepository<Images, Long> {
}
