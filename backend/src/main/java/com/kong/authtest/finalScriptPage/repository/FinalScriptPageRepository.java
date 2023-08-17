package com.kong.authtest.finalScriptPage.repository;

import com.kong.authtest.finalScriptPage.domain.FinalScriptPage;
import com.kong.authtest.tale.model.Tale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FinalScriptPageRepository extends JpaRepository<FinalScriptPage,Long> {
    List<FinalScriptPage> findByTale(Tale tale);
}
