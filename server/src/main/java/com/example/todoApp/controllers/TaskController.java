package com.example.todoApp.controllers;

import com.example.todoApp.repo.List;
import com.example.todoApp.repo.ListRepository;
import com.example.todoApp.repo.Task;
import com.example.todoApp.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin()
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private ListRepository listRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/lists")
    public Collection<List> getLists() {
        return listRepository.findAll();
    }

    @PostMapping("/lists")
    public Task post(@RequestBody List list) {
        listRepository.save(list);
        return listRepository.findByName(list.getName());
    }

    //TODO TASKS

    /*@GetMapping("/lists")
    public Collection<Task> tasksInCurrentList() {
        return taskRepository.findAll().stream()
                .filter(task -> task.getList() == 1)
                .collect(Collectors.toList());
    }

    @PostMapping("/lists")
    public Task post(@RequestBody Task task) {
        taskRepository.save(task);
        return taskRepository.findByName(task.getName());
    }*/
}
