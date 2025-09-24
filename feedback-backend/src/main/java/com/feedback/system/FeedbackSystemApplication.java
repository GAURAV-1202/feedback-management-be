package com.feedback.system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class FeedbackSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(FeedbackSystemApplication.class, args);
        System.out.println("🚀 Feedback Management System is running!");
        System.out.println("📊 API Documentation: http://localhost:8080/api/feedbacks/health");
        System.out.println("💾 Database Console (H2): http://localhost:8080/h2-console");
    }
}