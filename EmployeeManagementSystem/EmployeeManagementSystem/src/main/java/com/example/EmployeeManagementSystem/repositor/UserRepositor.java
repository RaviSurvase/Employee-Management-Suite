package com.example.EmployeeManagementSystem.repositor;

import com.example.EmployeeManagementSystem.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepositor extends JpaRepository<User,Long> {
    public User findByUserName(String userName);
    @Query(value = "SELECT * FROM user WHERE status = 0", nativeQuery = true)
    List<User> findByStatus();

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET status = 1 WHERE user_id = :id", nativeQuery = true)
    int updateUserStatus(@Param("id") Long id);








}
