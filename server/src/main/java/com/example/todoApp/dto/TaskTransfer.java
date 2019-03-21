package com.example.todoApp.dto;

import com.example.todoApp.repo.Task;
import com.example.todoApp.repo.TodoList;

public class TaskTransfer {
    private Long id;

    private String name;

    private Long list;

    private boolean checked;

    private TaskTransfer(Long id, String name, TodoList list, boolean checked) {
        this.id = id;
        this.name = name;
        this.list = list.getId();
        this.checked = checked;
    }

    public TaskTransfer() {
    }

    public static Task toTask(TaskTransfer transfer, TodoList list) {
        Task task = new Task();
        task.setTodoList(list);
        task.setName(transfer.getName());
        task.setChecked(transfer.isChecked());
        task.setId(transfer.getId());
        return task;
    }

    public static TaskTransfer toTransfer(Task task) {
        return new TaskTransfer(task.getId(), task.getName(), task.getTodoList(), task.isChecked());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getList() {
        return list;
    }

    public void setList(Long list) {
        this.list = list;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
