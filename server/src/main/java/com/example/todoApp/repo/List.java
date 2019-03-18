package com.example.todoApp.repo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class List {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private boolean pinned;

    public List() {
    }

    public List(String name, boolean pinned) {
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
