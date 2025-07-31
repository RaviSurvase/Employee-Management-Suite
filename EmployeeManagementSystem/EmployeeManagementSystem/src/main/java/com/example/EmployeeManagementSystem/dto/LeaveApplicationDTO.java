package com.example.EmployeeManagementSystem.dto;

import jakarta.persistence.Column;

import java.time.LocalDate;
import java.util.Date;

public class LeaveApplicationDTO {
    private String profile;
    private Long empId;
    private String fullName;
    private LocalDate joiningDate;
    private Long contactNo;
    private String email;
    private String rejectReason;
    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;
    @Column(name = "leave_count")
    private Integer leaveCount;
    @Column(name = "past_leaves_info")
    private String pastLeavesInfo;

    public LeaveApplicationDTO() {
    }

    public LeaveApplicationDTO(String profile, Long empId, String fullName, LocalDate joiningDate,
                               Long contactNo, String email, String rejectReason, LocalDate startDate,
                               LocalDate endDate, Integer leaveCount, String pastLeavesInfo) {
        this.profile = profile;
        this.empId = empId;
        this.fullName = fullName;
        this.joiningDate = joiningDate;
        this.contactNo = contactNo;
        this.email = email;
        this.rejectReason = rejectReason;
        this.startDate = startDate;
        this.endDate = endDate;
        this.leaveCount = leaveCount;
        this.pastLeavesInfo = pastLeavesInfo;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public Long getContactNo() {
        return contactNo;
    }

    public void setContactNo(Long contactNo) {
        this.contactNo = contactNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
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
}

