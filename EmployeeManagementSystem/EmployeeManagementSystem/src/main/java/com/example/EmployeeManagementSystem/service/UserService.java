package com.example.EmployeeManagementSystem.service;

import com.example.EmployeeManagementSystem.dto.UserData;
import com.example.EmployeeManagementSystem.entity.User;
import com.example.EmployeeManagementSystem.repositor.UserRepositor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepositor userRepositor;
    public List<User> getAllRegEmp(){
        return userRepositor.findByStatus();
    }

    public User getDataById(Long userId){
        return userRepositor.findById(userId).orElse(null);
    }

    public String userRegistration(User user){
      User userData=userRepositor.findByUserName(user.getUserName());
        if(userData!=null){
            return "Enter anther user name";
        }else{
            userRepositor.save(user);
            return "User Registration Successful";
        }

    }
    public User login(UserData dto){
        User userNameInfo=userRepositor.findByUserName(dto.getUserName());
        if(userNameInfo!=null){
            if(userNameInfo.getPassword().equals(dto.getPassword())){
                return userNameInfo;
            }
        }
        return null;
    }

    public int updateUserStaus(Long id){

        return userRepositor.updateUserStatus(id);
    }



}
