package com.example.todoApp.controllers;

import com.example.todoApp.dto.TaskTransfer;
import com.example.todoApp.repo.ListRepository;
import com.example.todoApp.repo.Task;
import com.example.todoApp.repo.TaskRepository;
import com.example.todoApp.repo.TodoList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private ListRepository listRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<TaskTransfer> tasksInCurrentList() {
        return taskRepository.findAll().stream().map(TaskTransfer::toTransfer).collect(Collectors.toList());
    }

    @PostMapping
    public Task post(@RequestBody TaskTransfer transfer) {
        TodoList list = listRepository.findById(transfer.getList()).orElse(null);
        Task task = TaskTransfer.toTask(transfer, list);
        taskRepository.save(task);
        return taskRepository.findByName(task.getName());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public TaskTransfer delete(@PathVariable("id") Long itemId) {
        Task task = taskRepository.findById(itemId).orElse(new Task());
        taskRepository.deleteById(itemId);
        return TaskTransfer.toTransfer(task);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
    public TaskTransfer patch(@RequestBody TaskTransfer transfer, @PathVariable("id") Long itemId) {
        TodoList list = listRepository.findById(transfer.getList()).orElse(null);
        Task task = TaskTransfer.toTask(transfer, list);
        taskRepository.save(task);
        return transfer;
    }
}
