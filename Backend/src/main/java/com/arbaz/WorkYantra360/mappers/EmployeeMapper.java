package com.arbaz.WorkYantra360.mappers;

import com.arbaz.WorkYantra360.dto.EmployeeDTO;
import com.arbaz.WorkYantra360.entities.Employee;

public class EmployeeMapper {
	public static EmployeeDTO mapToEmployeeDTO(Employee employee) {
		return new EmployeeDTO(
			employee.getId(),
			employee.getFirstName(),
			employee.getLastName(),
			employee.getEmail()
		);
	}
	
	public static Employee mapToEmployee(EmployeeDTO employeeDTO) {
		return new Employee(
			employeeDTO.getId(),
			employeeDTO.getFirstName(),
			employeeDTO.getLastName(),
			employeeDTO.getEmail()
		);
	}
}