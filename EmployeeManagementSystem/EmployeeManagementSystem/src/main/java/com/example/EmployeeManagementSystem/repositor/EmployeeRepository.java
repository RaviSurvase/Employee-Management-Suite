package com.example.EmployeeManagementSystem.repositor;

import com.example.EmployeeManagementSystem.entity.Employee;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {



    @Query(value = "SELECT * FROM employee_management_system WHERE first_name LIKE CONCAT(:firstName, '%')", nativeQuery = true)
    List<Employee> findByFirstName(@Param("firstName") String firstName);
    @Query(value = "SELECT * FROM employee_management_system WHERE last_name LIKE CONCAT(:lastName, '%')", nativeQuery = true)
    List<Employee> findByLastNameStartingWith(@Param("lastName") String lastName);

    @Query(value = "SELECT * FROM employee_management_system WHERE department LIKE CONCAT(:department, '%')", nativeQuery = true)
    List<Employee> findByDepartmentStartingWith(@Param("department") String department);

    @Query(value = "SELECT * FROM employee_management_system WHERE designation LIKE CONCAT(:designation, '%')", nativeQuery = true)
    List<Employee> findByDesignationStartingWith(@Param("designation") String designation);


    @Query(value = "SELECT * FROM employee_management_system WHERE DATE_FORMAT(dob, '%m-%d') = DATE_FORMAT(CURDATE(), '%m-%d') AND dob_mail_drop_or_not = 'notDrop'",
            nativeQuery = true)
    List<Employee> findEmployeesWithBirthdayToday();

    @Modifying
    @Transactional
    @Query(value = "UPDATE employee_management_system e SET e.dob_mail_drop_or_not = 'drop' WHERE e.email = :mail", nativeQuery = true)
    void markMailAsDropped(@Param("mail") String mail);



    default Employee findByEmailOrThrow(String email) {
        return findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with email: " + email));
    }

    Optional<Employee> findByEmail(String email);


    public List<Employee> findByLastName(String lastName);

    public List<Employee> findByDepartment(String dept);

    public List<Employee> findByDesignation(String designation);

    @Query(value = """
            SELECT 
                profile,
                emp_id, 
                CONCAT(first_name, ' ', last_name) , 
                joining_date, 
                contact_no, 
                email, 
                reason,
                start_date,
                end_date,
                leave_count, 
                past_leaves_info 
            FROM employee_management_system 
            WHERE leave_status = 100
            """, nativeQuery = true)
    List<Object[]> getLeavesApplicationRaw();


    @Modifying
    @Transactional
    @Query(value = "UPDATE employee_management_system SET leave_status = 102, leave_count = leave_count - :days WHERE emp_id = :id", nativeQuery = true)
    int updateLeaveStatusApprove(@Param("id") Long id, @Param("days") int days);


    @Modifying
    @Transactional
    @Query(value = "UPDATE employee_management_system SET leave_status = 103, reason = :reason WHERE emp_id = :id", nativeQuery = true)
    int updateLeaveStatusReject(@Param("id") Long id, @Param("reason") String reason);


}
