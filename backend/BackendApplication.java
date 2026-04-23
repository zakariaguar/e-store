package com.estore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        System.out.println("========================================");
        System.out.println("=== E-Store Backend Started ===");
        System.out.println("=== API available at http://localhost:9090/api ===");
        System.out.println("========================================");
    }

    @GetMapping("/")
    public String home() {
        return "E-Store Backend is running!";
    }
}
