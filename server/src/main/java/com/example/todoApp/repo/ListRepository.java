package com.example.todoApp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ListRepository extends JpaRepository<List, Long> {

    List findByName(String name);
}
