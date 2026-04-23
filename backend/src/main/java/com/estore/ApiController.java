package com.estore;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/status")
    public Map<String, Object> getStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "E-Store API is running");
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from E-Store API!";
    }
}
