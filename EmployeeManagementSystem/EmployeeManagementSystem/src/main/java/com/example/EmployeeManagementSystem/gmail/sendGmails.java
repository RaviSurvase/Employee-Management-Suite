package com.example.EmployeeManagementSystem.gmail;

import com.example.EmployeeManagementSystem.dto.LeaveRequestDTO;
import com.example.EmployeeManagementSystem.entity.Employee;
import com.example.EmployeeManagementSystem.repositor.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class sendGmails {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    EmployeeRepository employeeRepository;
      public void sendBirthdayWish(String toEmail,String employeeName){
          SimpleMailMessage message=new SimpleMailMessage();
          message.setTo(toEmail);
          message.setSubject("Happy Birthday!");
          message.setText("Dear "+employeeName+"\n\t\t Wish you happy birthday!!!\n\n"+"Best regard,\n Innovative Pvt.!");
          javaMailSender.send(message);
      }

    public void sendWelcomeMail(String toEmail, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Welcome to Innovative Pvt!");
        message.setText("Dear " + name + ",\n\n" +
                        "Welcome to the team at Innovative Pvt.!\n" +
                        "We’re excited to have you on board.\n\n" +
                        "Please be patient — we will be sending your official joining date shortly.\n\n" +
                        "Best regards,\n" +
                        "HR Department");

        javaMailSender.send(message);
    }
    public void sendJoiningDatesMails(Employee employee){

          SimpleMailMessage message=new SimpleMailMessage();
          message.setTo(employee.getEmail());
          message.setSubject("Your Joining Date at Innovative Pvt.");
          message.setText(
                  "Dear " + employee.getFirstName()+" "+employee.getLastName() + ",\n\n" +
                          "\t\tWe’re happy to inform you that your official joining date is: " + employee.getJoiningDate() + ".\n\n" +
                          "Please make sure to report by 9:30 AM on your first day.\n\n" +
                          "Best regards,\n" +
                          "HR Department"
          );
        javaMailSender.send(message);
    }

    public void sendLeaveMail(LeaveRequestDTO leaveRequestDTO){
        Employee employee = employeeRepository.findByEmailOrThrow(leaveRequestDTO.getEmail());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(leaveRequestDTO.getEmail());
        message.setSubject("Leave Application Submitted");
        message.setText(
                "Dear " + employee.getFirstName()+" "+employee.getLastName() + ",\n\n" +
                        "Your leave application has been submitted successfully.\n" +
                        "Leave Period: " + leaveRequestDTO.getStartDate() + " to " + leaveRequestDTO.getEndDate() + "\n\n" +
                        "We will notify you once it is reviewed.\n\n" +
                        "Best regards,\n" +
                        "HR Department"
        );
        javaMailSender.send(message);
    }


    public void sendLeaveApprovalEmail(Employee employee) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(employee.getEmail());
        message.setSubject("Leave Approved");

        message.setText(
                "Dear " + employee.getFirstName()+" "+employee.getLastName() + ",\n\n" +
                        "Good news! Your leave from " + employee.getStartDate() + " to " + employee.getEndDate() + " has been approved.\n\n" +
                        "Enjoy your time off!\n\n" +
                        "Best regards,\n" +
                        "HR Department"
        );

        javaMailSender.send(message);
    }
    public void sendLeaveRejectionEmail(Employee employee) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(employee.getEmail());
        message.setSubject("Leave Rejected");

        message.setText(
                "Dear " + employee.getFirstName()+" "+employee.getLastName() + ",\n\n" +
                        "Unfortunately, your leave request from " + employee.getStartDate() + " to " + employee.getEndDate() + " has been rejected.\n\n" +
                        "Reason: " + employee.getReason() + "\n\n" +
                        "If you have any questions, please contact HR or your manager.\n\n" +
                        "Best regards,\n" +
                        "HR Department"
        );

        javaMailSender.send(message);
    }



}
