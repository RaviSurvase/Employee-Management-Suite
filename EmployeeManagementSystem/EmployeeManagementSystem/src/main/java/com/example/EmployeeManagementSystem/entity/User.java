package com.example.EmployeeManagementSystem.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private Long contactNo;
    private String gender;
    private LocalDate dob;
    private Long exp;
    private String address;
    private String userName;
    private String password;
    @Column(name = "con_password")
    private String conPassword;

    private Long empId;
    private String role;
    private String profile;

    @Column(name = "leave_count")
    private Integer leaveCount;

    @Column(name = "past_leaves_info")
    private String pastLeavesInfo;

    @Column(name = "longleave_status")
    private Long longleaveStatus;
    @Column(name = "status", columnDefinition = "TINYINT(1) DEFAULT 0")
    private boolean status;

    public User() {
    }

    public User(Long userId, String firstName, String lastName, String email,
                Long contactNo, String gender, LocalDate dob, Long exp, String address,
                String userName, String password, String conPassword, Long empId, String role,
                String profile, Integer leaveCount,
                String pastLeavesInfo, Long longleaveStatus, boolean status) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contactNo = contactNo;
        this.gender = gender;
        this.dob = dob;
        this.exp = exp;
        this.address = address;
        this.userName = userName;
        this.password = password;
        this.conPassword = conPassword;
        this.empId = empId;
        this.role = role;
        this.profile = profile;
        this.leaveCount = leaveCount;
        this.pastLeavesInfo = pastLeavesInfo;
        this.longleaveStatus = longleaveStatus;
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConPassword() {
        return conPassword;
    }

    public void setConPassword(String conPassword) {
        this.conPassword = conPassword;
    }

    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
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

    public Long getLongleaveStatus() {
        return longleaveStatus;
    }

    public void setLongleaveStatus(Long longleaveStatus) {
        this.longleaveStatus = longleaveStatus;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
