package com.example.EmployeeManagementSystem.gmail;

import com.example.EmployeeManagementSystem.entity.Employee;
import com.example.EmployeeManagementSystem.repositor.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class BirthdayEmailScheduler {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private sendGmails birthdayWish;

    // This will run every day at 12:00 AM
//    @Scheduled(cron = "0 0 0 * * *")
//    @Scheduled(cron = "0 */2 * * * *")
    public void sendBirthdayEmails() {
        LocalDate today = LocalDate.now();
        List<Employee> employees = employeeRepository.findEmployeesWithBirthdayToday();

        for (Employee emp : employees) {
            if (emp.getEmail() != null && emp.getFirstName() != null) {
                birthdayWish.sendBirthdayWish(emp.getEmail(), emp.getFirstName());
            }
        }

        System.out.println("Birthday emails sent at midnight");
    }
}
