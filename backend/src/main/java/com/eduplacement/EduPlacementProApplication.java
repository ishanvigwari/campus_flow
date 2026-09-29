package com.eduplacement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class EduPlacementProApplication {

    public static void main(String[] args) {
        SpringApplication.run(EduPlacementProApplication.class, args);
    }
}
