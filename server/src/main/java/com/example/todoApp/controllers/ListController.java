package com.example.todoApp.controllers;

import com.example.todoApp.repo.Task;
import com.example.todoApp.repo.TaskRepository;
import com.example.todoApp.repo.TodoList;
import com.example.todoApp.repo.ListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/lists")
public class ListController {

    @Autowired
    private ListRepository listRepository;
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public Collection<TodoList> getLists() {
        return listRepository.findAll();
    }

    @PostMapping
    public TodoList post(@RequestBody TodoList todoList) {
        listRepository.save(todoList);
        return listRepository.findByName(todoList.getName());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public TodoList delete(@PathVariable("id") Long itemId) {
        TodoList todoList = listRepository.findById(itemId).orElse(new TodoList());
        listRepository.deleteById(itemId);
        return todoList;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
    public TodoList patch(@RequestBody TodoList updatedTodoList, @PathVariable("id") Long itemId) {
        listRepository.save(updatedTodoList);
        return updatedTodoList;
    }
}
