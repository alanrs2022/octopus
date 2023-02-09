package com.octopus.teraHire.repository;

import com.octopus.teraHire.model.ImageModel;

import java.util.Optional;

import com.octopus.teraHire.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageModel, Long>{
    Optional<ImageModel> findByName(String name);
}
