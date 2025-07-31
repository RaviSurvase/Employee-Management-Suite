package com.example.EmployeeManagementSystem.controller;

import com.example.EmployeeManagementSystem.dto.LeaveRequestDTO;
import com.example.EmployeeManagementSystem.entity.Employee;
import com.example.EmployeeManagementSystem.gmail.sendGmails;
import com.example.EmployeeManagementSystem.repositor.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class LeaveController {
    @Autowired
    private EmployeeRepository employeeRepo;
   @Autowired
   private sendGmails sendGmails;

    @PutMapping("/apply-leave")
    public ResponseEntity<?> applyLeave(@RequestBody LeaveRequestDTO request) {
        Employee employee = employeeRepo.findByEmailOrThrow(request.getEmail());


        if (employee == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Email ID not found. Unable to apply leave."));
        }

        employee.setStartDate(LocalDate.parse(request.getStartDate()));
        employee.setEndDate(LocalDate.parse(request.getEndDate()));
        employee.setReason(request.getReason());
        employee.setLeaveStatus(100);

        employeeRepo.save(employee);

        sendGmails.sendLeaveMail(request);
        return ResponseEntity.ok(Map.of("message", "Leave applied successfully."));
    }

   @GetMapping("/get-leave-status")
    public ResponseEntity<?> getLeaveStatus(@RequestParam String email) {
        Optional<Employee> employeeOpt = employeeRepo.findByEmail(email);

        if (employeeOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Email not found."));
        }

        Employee employee = employeeOpt.get();

        Map<String, Object> data = new HashMap<>();
        data.put("available", employee.getLeaveCount());
        data.put("past", employee.getPastLeavesInfo()); //
        return ResponseEntity.ok(data);
    }



}
