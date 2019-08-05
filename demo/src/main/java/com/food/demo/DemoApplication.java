package com.food.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.food.demo.component.UpAndDown;
import com.food.demo.component.UpAndDown;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(DemoApplication.class, args);
		
		UpAndDown test = new UpAndDown();
		test.test();
	}

}
