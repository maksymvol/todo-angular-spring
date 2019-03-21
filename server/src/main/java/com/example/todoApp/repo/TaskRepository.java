package com.example.todoApp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface TaskRepository extends JpaRepository<Task, Long> {

    Task findByName(String name);

    List<Task> findByChecked(boolean checked);
}
