package com.kong.authtest.tale.repository;

import com.kong.authtest.tale.model.Tale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaleRepository extends JpaRepository<Tale, Long> {
}
