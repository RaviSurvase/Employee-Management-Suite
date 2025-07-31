package com.example.EmployeeManagementSystem.controller;

import com.example.EmployeeManagementSystem.dto.UserData;
import com.example.EmployeeManagementSystem.entity.User;
import com.example.EmployeeManagementSystem.gmail.sendGmails;
import com.example.EmployeeManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/get_reg_data")
    public List<User> getAllData() {
        return userService.getAllRegEmp();
    }

    @GetMapping("/get_data_by_userid/{userId}")
    public User getUserDataByUsingUserId(@PathVariable Long userId) {
        return userService.getDataById(userId);
    }

    @Autowired
    private sendGmails sendmail;
    @PostMapping("/reg_user")
    public String userRegistration(@RequestBody User userInfo) {


        System.out.println(userInfo.getAddress());
        System.out.println(userInfo.getExp());
        System.out.println(userInfo.getDob());

        sendmail.sendWelcomeMail(userInfo.getEmail(),userInfo.getFirstName());

        return userService.userRegistration(userInfo);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserData userDtoData) {

        System.out.println("Login attempt: " + userDtoData.getUserName() + " " + userDtoData.getPassword());
        User u = userService.login(userDtoData);
        if (u != null) {
            return ResponseEntity.ok(u);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid userName or password");
        }
    }


    @PutMapping("/update_user_status/{user}")
    public int updateUserId(@PathVariable Long user) {
        return userService.updateUserStaus(user);
    }

}
