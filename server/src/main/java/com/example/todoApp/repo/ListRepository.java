package com.example.todoApp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListRepository extends JpaRepository<TodoList, Long> {

    TodoList findByName(String name);
}
