package com.example.EmployeeManagementSystem.service;

import com.example.EmployeeManagementSystem.dto.LeaveApplicationDTO;
import com.example.EmployeeManagementSystem.entity.Employee;
import com.example.EmployeeManagementSystem.repositor.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public String addNewEmployeeData(Employee employee) {
        employeeRepository.save(employee);
        return "New Employee Data Added Successfully";
    }


    public List<Employee> getAllEmployeeData() {
        return employeeRepository.findAll();
    }

    public Employee findByEmpId(Long empId) {

        return employeeRepository.findById(empId).orElse(null);
    }

    public String deleteByEmpId(Long empId) {
        if (employeeRepository.existsById(empId)) {
            employeeRepository.deleteById(empId);
            return "Record Delete Successfully";
        } else {
            return "Record Not Found, Plz Provide Valid empId";
        }
    }

    public String updateEmployeeData(Long empId, Employee newEmployee) {
        Employee existingEmp = employeeRepository.findById(empId).orElse(null);
        if (existingEmp == null) {
            return "Employee Id does not match with any record to the updation fail";
        }
        if (newEmployee.getFirstName().equals(null) &&
                newEmployee.getLastName().equals(null) &&
                newEmployee.getAddress().equals(null) &&
                newEmployee.getEmail().equals(null) &&
                newEmployee.getContactNo() == 0 &&
                newEmployee.getDob().equals(null) &&
                newEmployee.getDesignation().equals(null) &&
                newEmployee.getExp() == 0 &&
                newEmployee.getGender().equals(null) &&
                newEmployee.getProfile().equals(null) &&
                newEmployee.getReportingManager().equals(null) &&
                newEmployee.getStatusActiveOrNot().equals(null) &&
                newEmployee.getSalary() == 0) {
            return "No New Record Provie For Updation";
        }
        if (newEmployee.getFirstName() != null) {
            existingEmp.setFirstName(newEmployee.getFirstName());
        }
        if (newEmployee.getLastName() != null) {
            existingEmp.setLastName(newEmployee.getLastName());
        }
        if (newEmployee.getDepartment() != null) {
            existingEmp.setDepartment(newEmployee.getDepartment());
        }
        if (newEmployee.getEmail() != null) {
            existingEmp.setEmail(newEmployee.getEmail());
        }
        if (newEmployee.getContactNo() != null) {
            existingEmp.setContactNo(newEmployee.getContactNo());
        }
        if (newEmployee.getJoiningDate() != null) {
            existingEmp.setJoiningDate(newEmployee.getJoiningDate());
        }
        if (newEmployee.getDob() != null) {
            existingEmp.setDob(newEmployee.getDob());
        }
        if (newEmployee.getDesignation() != null) {
            existingEmp.setDesignation(newEmployee.getDesignation());
        }
        if (newEmployee.getExp() != 0) {
            existingEmp.setExp(newEmployee.getExp());
        }
        if (newEmployee.getAddress() != null) {
            existingEmp.setAddress(newEmployee.getAddress());
        }
        if (newEmployee.getGender() != null) {
            existingEmp.setGender(newEmployee.getGender());
        }
        if (newEmployee.getStatusActiveOrNot() != null) {
            existingEmp.setStatusActiveOrNot(newEmployee.getStatusActiveOrNot());
        }
        if (newEmployee.getProfile() != null) {
            existingEmp.setProfile(newEmployee.getProfile());
        }
        if (newEmployee.getReportingManager() != null) {
            existingEmp.setReportingManager(newEmployee.getReportingManager());
        }
        if (newEmployee.getSalary() != 0) {
            existingEmp.setSalary(newEmployee.getSalary());
        }
        employeeRepository.save(existingEmp);
        return "Data Update Successfully";
    }

    public List<Employee> findByEmpFirstName(String firstName) {
        return employeeRepository.findByFirstName(firstName);
    }

    public List<Employee> findByEmpLastName(String lastName) {
        return employeeRepository.findByLastNameStartingWith(lastName);
    }

    public List<Employee> findByDepartment(String dept) {
        return employeeRepository.findByDepartmentStartingWith(dept);
    }

    public List<Employee> findByDesignation(String des) {
        return employeeRepository.findByDesignationStartingWith(des);
    }

    public List<Employee> findByLastName(String lastName) {
        return employeeRepository.findByLastName(lastName);
    }

    public List<Employee> findByEmpDepName(String empDeptName) {
        return employeeRepository.findByDepartment(empDeptName);
    }

    public List<Employee> findByEmpDesignation(String designation) {
        return employeeRepository.findByDesignation(designation);
    }

    public List<LeaveApplicationDTO> getLeaveApplications() {
        List<Object[]> results = employeeRepository.getLeavesApplicationRaw();

        return results.stream().map(row -> new LeaveApplicationDTO(
                (String) row[0],                                   // profile
                ((Number) row[1]).longValue(),                     // emp_id
                (String) row[2],                                   // full_name
                row[3] != null ? ((java.sql.Date) row[3]).toLocalDate() : null,  // joining_date
                ((Number) row[4]).longValue(),                     // contact_no
                (String) row[5],                                   // email
                (String) row[6],                                   // reason
                row[7] != null ? ((java.sql.Date) row[7]).toLocalDate() : null,  // start_date
                row[8] != null ? ((java.sql.Date) row[8]).toLocalDate() : null,  // end_date
                row[9] != null ? ((Number) row[9]).intValue() : 0,               // leave_count
                (String) row[10]                                  // past_leaves_info
        )).toList();
    }


    public void updateLeaveApproveStatus(Long id, int day) {
        employeeRepository.updateLeaveStatusApprove(id, day);
    }

    public void rejectLeave(Long empId, String reason) {
        employeeRepository.updateLeaveStatusReject(empId, reason);
    }


}
