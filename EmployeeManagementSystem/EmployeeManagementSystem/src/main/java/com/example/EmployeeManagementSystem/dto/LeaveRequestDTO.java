package com.example.EmployeeManagementSystem.dto;

public class LeaveRequestDTO {
    private String email;
    private String startDate;
    private String endDate;
    private String reason;

    public LeaveRequestDTO(String email, String startDate, String endDate, String reason) {
        this.email = email;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
    }

    public LeaveRequestDTO() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
