package com.example.todoApp.controllers;

import com.example.todoApp.repo.Task;
import com.example.todoApp.repo.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin()
public class TaskController {
    private TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/lists")
    public Collection<Task> tasksInCurrentList() {
        return taskRepository.findAll().stream()
                .filter(task -> task.getList() == 1)
                .collect(Collectors.toList());
    }

    @PostMapping("/lists")
    public Task post(@RequestBody Task task){
        taskRepository.save(task);
        return taskRepository.findByName(task.getName());
    }
}
