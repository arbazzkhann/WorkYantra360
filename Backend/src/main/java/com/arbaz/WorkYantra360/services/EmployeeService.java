package com.arbaz.WorkYantra360.services;

import java.util.List;

import com.arbaz.WorkYantra360.dto.EmployeeDTO;

public interface EmployeeService {
	EmployeeDTO createEmployee(EmployeeDTO employeeDTO);
	
	EmployeeDTO getEmployeeById(Long id);
	
	List<EmployeeDTO> getAllEmployees();
	
	EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);
	
	void deleteEmployee(Long id);
}
