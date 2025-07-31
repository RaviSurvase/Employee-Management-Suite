package com.example.EmployeeManagementSystem.dto;

public class UserData {

    private String userName;
    private String password;

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

    public UserData() {
    }

    public UserData(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }
}
