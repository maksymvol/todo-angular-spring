package com.example.todoApp.controllers;

import com.example.todoApp.repo.Task;
import com.example.todoApp.repo.TaskRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

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

    @RequestMapping("/json")
    public void json() {
        //get json data from file "people.json" in our resources

//        For Windows
//        URL url = this.getClass().getClassLoader().getResource("people.json");
//        File jsonFile = new File(url.getFile());

        File jsonFile = null;
        try {
            jsonFile = ResourceUtils.getFile("classpath:tasks.json");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            List<Task> tasks = objectMapper.readValue(jsonFile, new TypeReference<List<Task>>() {});
            taskRepository.saveAll(tasks);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
