package com.example.todoApp.controllers;

import com.example.todoApp.repo.List;
import com.example.todoApp.repo.ListRepository;
import com.example.todoApp.repo.Task;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
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

    @RequestMapping("/json1")
    public void json() {
        //get json data from file "people.json" in our resources

//        For Windows
//        URL url = this.getClass().getClassLoader().getResource("people.json");
//        File jsonFile = new File(url.getFile());

        File jsonFile = null;
        try {
            jsonFile = ResourceUtils.getFile("classpath:lists.json");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            java.util.List<List> lists = objectMapper.readValue(jsonFile, new TypeReference<java.util.List<List>>() {});
            listRepository.saveAll(lists);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
