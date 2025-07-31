package com.example.EmployeeManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Base64;
import java.util.Date;

@Entity
@Table(name = "employee_management_system")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empId;
    private String firstName;
    private String lastName;
    private String department;
    private Double salary;
    @Column(name = "email")
    private String email;

    private Long contactNo;
    private LocalDate joiningDate;
    private LocalDate dob;
    private String designation;
    private Long exp;
    private String address;
    private String gender;
    private String statusActiveOrNot;
    private String profile;
    @Column(name = "reporting_manager")
    private String reportingManager;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "leave_count")
    private Integer leaveCount;

    @Column(name = "past_leaves_info")
    private String pastLeavesInfo;

    @Column(name = "reason")
    private String reason;

    @Column(name = "leave_status")
    private Integer leaveStatus;
    @Column(name = "dobMailDropOrNot", columnDefinition = "varchar(20) DEFAULT 'notDrop'")
    private String dobMailDropOrNot;

    public Employee() {
    }

    public Employee(Long empId, String firstName, String lastName, String department,
                    Double salary, String email, Long contactNo, LocalDate joiningDate,
                    LocalDate dob, String designation, Long exp, String address, String gender,
                    String statusActiveOrNot, String profile, String reportingManager,
                    LocalDate startDate, LocalDate endDate, Integer leaveCount, String pastLeavesInfo,
                    String reason, Integer leaveStatus, String dobMailDropOrNot) {
        this.empId = empId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.department = department;
        this.salary = salary;
        this.email = email;
        this.contactNo = contactNo;
        this.joiningDate = joiningDate;
        this.dob = dob;
        this.designation = designation;
        this.exp = exp;
        this.address = address;
        this.gender = gender;
        this.statusActiveOrNot = statusActiveOrNot;
        this.profile = profile;
        this.reportingManager = reportingManager;
        this.startDate = startDate;
        this.endDate = endDate;
        this.leaveCount = leaveCount;
        this.pastLeavesInfo = pastLeavesInfo;
        this.reason = reason;
        this.leaveStatus = leaveStatus;
        this.dobMailDropOrNot = dobMailDropOrNot;
    }

    public String getDobMailDropOrNot() {
        return dobMailDropOrNot;
    }

    public void setDobMailDropOrNot(String dobMailDropOrNot) {
        this.dobMailDropOrNot = dobMailDropOrNot;
    }

    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getContactNo() {
        return contactNo;
    }

    public void setContactNo(Long contactNo) {
        this.contactNo = contactNo;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Long getExp() {
        return exp;
    }

    public void setExp(Long exp) {
        this.exp = exp;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getStatusActiveOrNot() {
        return statusActiveOrNot;
    }

    public void setStatusActiveOrNot(String statusActiveOrNot) {
        this.statusActiveOrNot = statusActiveOrNot;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getReportingManager() {
        return reportingManager;
    }

    public void setReportingManager(String reportingManager) {
        this.reportingManager = reportingManager;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getLeaveCount() {
        return leaveCount;
    }

    public void setLeaveCount(Integer leaveCount) {
        this.leaveCount = leaveCount;
    }

    public String getPastLeavesInfo() {
        return pastLeavesInfo;
    }

    public void setPastLeavesInfo(String pastLeavesInfo) {
        this.pastLeavesInfo = pastLeavesInfo;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Integer getLeaveStatus() {
        return leaveStatus;
    }

    public void setLeaveStatus(Integer leaveStatus) {
        this.leaveStatus = leaveStatus;
    }
}

