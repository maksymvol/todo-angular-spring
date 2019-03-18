package com.example.todoApp;

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
	ApplicationRunner init(TaskRepository repository) {
		return args -> {
			Stream.of("Task 1", "Some task 2", "Another task 3", "task... 4").forEach(name -> {
				Task task = new Task();
				task.setName(name);
				task.setList(1);
				task.setChecked(false);
				repository.save(task);
			});
			repository.findAll().forEach(task -> System.out.println("id = " + task.getId() + " name = " + task.getName()));
		};
	}

}
