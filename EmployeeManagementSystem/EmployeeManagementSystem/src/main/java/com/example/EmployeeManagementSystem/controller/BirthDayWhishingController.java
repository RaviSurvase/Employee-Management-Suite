package com.example.EmployeeManagementSystem.controller;

import com.example.EmployeeManagementSystem.entity.Employee;
import com.example.EmployeeManagementSystem.gmail.sendGmails;
import com.example.EmployeeManagementSystem.repositor.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
//@CrossOrigin(origins = "*")
public class BirthDayWhishingController {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private sendGmails sendMail;

    @GetMapping("/send_bady_gmail")
    public String sendGmail() {
        LocalDate today = LocalDate.now();
        List<Employee> employees = employeeRepository.findEmployeesWithBirthdayToday();
        for (Employee emp : employees) {
            if (emp.getEmail() != null && emp.getFirstName() != null) {
                try {
                    sendMail.sendBirthdayWish(emp.getEmail(), emp.getFirstName());
                    employeeRepository.markMailAsDropped(emp.getEmail());
                }
                catch (MailException ex) {

                    System.err.println("Failed to send mail to " + emp.getFirstName()+" "+emp.getLastName() + ": " + ex.getMessage());
                }
            }

        }
        return "GMAIL Send";
    }
}
