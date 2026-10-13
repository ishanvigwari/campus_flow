package com.eduplacement.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StudentRegistrationRequest {
    private String name;
    private String email;
    private String password;
    private String major;
    private Integer graduationYear;
    private BigDecimal gpa;
    private String phoneNumber;
    private String skills;
}
