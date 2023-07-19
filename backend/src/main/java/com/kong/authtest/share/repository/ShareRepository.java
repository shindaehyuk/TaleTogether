package com.kong.authtest.share.repository;

import com.kong.authtest.share.model.Share;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShareRepository extends JpaRepository<Share, Long> {
}
