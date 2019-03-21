package com.example.todoApp.repo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(schema = "todoapp", name = "list")
public class TodoList {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private boolean pinned;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "todoList")
    private Set<Task> tasks = new HashSet<>();

    public Set<Task> getTasks() {
        return tasks;
    }

    public void addTask(Task task) {
        this.tasks.add(task);
    }

    public TodoList() {
    }

    public TodoList(String name, boolean pinned) {
        this.name = name;
        this.pinned = pinned;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isPinned() {
        return pinned;
    }

    public void setPinned(boolean pinned) {
        this.pinned = pinned;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
