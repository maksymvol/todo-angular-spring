package com.example.todoApp.repo;

import lombok.NonNull;

import javax.persistence.*;

@Entity
@Table(schema = "todoapp", name = "task")
public class Task {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    @NonNull
    private TodoList todoList;

    private boolean checked;

    public Task() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TodoList getTodoList() {
        return todoList;
    }

    public void setTodoList(TodoList todoList) {
        this.todoList = todoList;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
