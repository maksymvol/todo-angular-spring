package com.example.todoApp.controllers;

import com.example.todoApp.repo.List;
import com.example.todoApp.repo.ListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ListController {

    private final ListRepository listRepository;

    @Autowired
    public ListController(ListRepository listRepository) {
        this.listRepository = listRepository;
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

    @RequestMapping(value = "/lists/{id}", method = RequestMethod.DELETE)
    public List delete(@PathVariable("id") Long itemId) {
        List list = listRepository.findById(itemId).orElse(new List());
        listRepository.deleteById(itemId);
        return list;
    }

    @RequestMapping(value = "/lists/{id}", method = RequestMethod.PATCH)
    public List patch(@RequestBody List updatedList, @PathVariable("id") Long itemId) {
        listRepository.save(updatedList);
        return updatedList;
    }
}
