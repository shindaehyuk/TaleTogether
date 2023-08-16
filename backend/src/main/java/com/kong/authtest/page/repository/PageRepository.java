package com.kong.authtest.page.repository;

import com.kong.authtest.page.model.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<Page, Long> {
}
