package com.example.todoApp.controllers;

import com.example.todoApp.repo.List;
import com.example.todoApp.repo.ListRepository;
import com.example.todoApp.repo.Task;
import com.example.todoApp.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
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
    public List post(@RequestBody List list) {
        listRepository.save(list);
        return listRepository.findByName(list.getName());
    }

    //TODO TASKS

    @GetMapping("/tasks")
    public Collection<Task> tasksInCurrentList() {
        return taskRepository.findAll();
    }

    @PostMapping("/tasks")
    public Task post(@RequestBody Task task) {
        taskRepository.save(task);
        return taskRepository.findByName(task.getName());
    }

    @RequestMapping(value = "/tasks/{id}", method = RequestMethod.DELETE)
    public Task delete(@PathVariable("id") Long itemId) {
        Task task = taskRepository.findById(itemId).orElse(new Task());
        taskRepository.deleteById(itemId);
        return task;
    }
}
