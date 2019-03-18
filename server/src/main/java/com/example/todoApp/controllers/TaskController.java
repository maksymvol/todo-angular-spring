package com.example.todoApp.controllers;

import com.example.todoApp.repo.Task;
import com.example.todoApp.repo.TaskRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class TaskController {
    private TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Task> tasksInCurrentList() {
        return taskRepository.findAll().stream()
                .filter(task -> task.getList() == 1)
                .collect(Collectors.toList());
    }
}
