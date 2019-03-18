package com.example.todoApp;

import com.example.todoApp.repo.List;
import com.example.todoApp.repo.ListRepository;
import com.example.todoApp.repo.Task;
import com.example.todoApp.repo.TaskRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class TodoAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoAppApplication.class, args);
	}

	@Bean
	ApplicationRunner init(TaskRepository taskRepository, ListRepository listRepository) {
		return args -> {
			Stream.of("Task", "Some_task", "Another_task", "task...").forEach(name -> {
				Task task = new Task();
				task.setName(name);
				task.setList(1);
				task.setChecked(false);
				taskRepository.save(task);
			});
			Stream.of("Work", "Personal", "Test").forEach(name -> {
				List list = new List(name, false);
				listRepository.save(list);
			});
		};
	}

}
