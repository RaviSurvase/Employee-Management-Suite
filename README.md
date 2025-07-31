
Project Title: Employee Management System

Technologies Used: ReactJS, Spring Boot, MySQL

Project Description:

-The Employee Management System is a web-based application developed using ReactJS for the frontend, Spring Boot for the backend, and MySQL for data storage. This system is designed to streamline employee onboarding, management, leave handling, and communication within an organization.

Core Functionalities:

Employee Registration & Onboarding: New employees register through the company portal. After registration, the Admin officially adds the employee to the company portal. During this process, the Admin assigns:
Role Salary Joining Date Reporting Manager

Once added, the system automatically sends a welcome email to the employee containing: Joining date Role
Location Salary Reporting Manager Employee ID and Password

Employee Management (Admin Panel): Admin can update and delete employee records. Employees cannot update or delete any records. Admin can sort employee data based on:
Role Department
First Name Last Name

Communication Preferences

Leave Management: Employees can apply for leaves via the system. Admin has the authority to approve or reject leave requests. The system automatically sends an email notification to the employee for each action (apply, approve, reject).
System Automation & Events: Leave Accrual: Every 15 days, the system automatically adds 2 leave days to each employee’s leave balance. If the leave balance is 0, the system restricts leave application and prompts the employee to contact Admin.

Birthday Greetings: On an employee's birthday, the system automatically sends a birthday wish email.

Email Notifications: Automated email notifications are sent for the following events: New employee registration Official onboarding by Admin Leave application Leave approval/rejection Access Control: Admin: Full access to employee data, leave approvals, and system configurations. Employee: Can register, view personal details, apply for leaves, and communicate with Admin.
