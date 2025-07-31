package com.example.EmployeeManagementSystem.controller;

import com.example.EmployeeManagementSystem.dto.LeaveApplicationDTO;
import com.example.EmployeeManagementSystem.entity.Employee;
import com.example.EmployeeManagementSystem.gmail.sendGmails;
import com.example.EmployeeManagementSystem.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private sendGmails  sendGmails;

    @PutMapping("/update_emp_data/{empId}")
    public String updateEmpData(@PathVariable Long empId, @RequestBody Employee employee) {
        return employeeService.updateEmployeeData(empId, employee);
    }

    @PutMapping("/update_leave_approve_status/{empId}/{days}")
    public void updateLeaveApproveStatus(@PathVariable Long empId, @PathVariable int days) {


        employeeService.updateLeaveApproveStatus(empId, days);
        Employee employee=employeeService.findByEmpId(empId);
        sendGmails.sendLeaveApprovalEmail(employee);
    }
    @PutMapping("/update_leave_reject_status/{empId}")
    public ResponseEntity<?> rejectLeave(@PathVariable Long empId, @RequestBody String reason) {
        employeeService.rejectLeave(empId, reason);
        Employee employee=employeeService.findByEmpId(empId);
        sendGmails.sendLeaveRejectionEmail(employee);
        return ResponseEntity.ok("Leave rejected");
    }
    @PostMapping("/add_new_emp_data")
    public String addNewEmpData(@RequestBody Employee employee) {
        sendGmails.sendJoiningDatesMails(employee);
        System.out.println("function call");
        return employeeService.addNewEmployeeData(employee);
    }

    @DeleteMapping("/delete_by_emp_id")
    public String deleteByEmpId(@RequestParam Long empId) {
        return employeeService.deleteByEmpId(empId);
    }


    @GetMapping("/get_application_leaves")
    public ResponseEntity<List<LeaveApplicationDTO>> getLeaveApplications() {
        return ResponseEntity.ok(employeeService.getLeaveApplications());
    }


    @GetMapping("/get_emp_data_by_empid/{empId}")
    public Employee getDataById(@PathVariable Long empId) {
        return employeeService.findByEmpId(empId);
    }

    @GetMapping("/get_all_emp_data")
    public List<Employee> getAllEmpData() {
        return employeeService.getAllEmployeeData();
    }


    @GetMapping("/get_emp_data_by_firstname/{firstname}")
    public List<Employee> searchEmpDataByFirstName(@PathVariable String firstname) {
        return employeeService.findByEmpFirstName(firstname);
    }
    @GetMapping("/get_emp_data_by_lastname/{lastName}")
    public List<Employee> searchEmpDataByLastName(@PathVariable String lastName) {
        return employeeService.findByEmpLastName(lastName);
    }
    @GetMapping("/get_emp_data_by_depa/{department}")
    public List<Employee> searchByDepartment(@PathVariable String department) {
        return employeeService.findByDepartment(department);
    }
    @GetMapping("/get_emp_data_by_designation/{designation}")
    public List<Employee> searchByDesignation(@PathVariable String designation) {
        return employeeService.findByDesignation(designation);
    }

    @GetMapping("/get_emp_data_by_lastname")
    public List<Employee> getEmpDataByLastName(@RequestParam String empLastName) {
        return employeeService.findByLastName(empLastName);
    }

    @GetMapping("/get_emp_data_by_depname")
    public List<Employee> getEmpDataByDeparmentName(@RequestParam String empDepName) {
        return employeeService.findByEmpDepName(empDepName);
    }

    @GetMapping("/get_emp_data_by_des")
    public List<Employee> getEmpDataByDesignation(@RequestParam String empDesName) {
        return employeeService.findByEmpDesignation(empDesName);
    }
}
