package com.arbaz.WorkYantra360.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arbaz.WorkYantra360.dto.EmployeeDTO;
import com.arbaz.WorkYantra360.entities.Employee;
import com.arbaz.WorkYantra360.exceptions.ResourceNotFoundException;
import com.arbaz.WorkYantra360.mappers.EmployeeMapper;
import com.arbaz.WorkYantra360.repositories.EmployeeRepository;
import com.arbaz.WorkYantra360.services.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Override
	public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
		Employee employee = EmployeeMapper.mapToEmployee(employeeDTO);
		
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDTO(savedEmployee);
	}

	@Override
	public EmployeeDTO getEmployeeById(Long id) {
		Employee employee = employeeRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
		return EmployeeMapper.mapToEmployeeDTO(employee);
	}

	@Override
	public List<EmployeeDTO> getAllEmployees() {
		List<Employee> employees = employeeRepository.findAll();
		return employees.stream()
				.map((employee) -> EmployeeMapper.mapToEmployeeDTO(employee))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
		Employee employee = employeeRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
		
		employee.setFirstName(employeeDTO.getFirstName());
		employee.setLastName(employeeDTO.getLastName());
		employee.setEmail(employeeDTO.getEmail());
		
		Employee updatedEmployee = employeeRepository.save(employee);
		
		return EmployeeMapper.mapToEmployeeDTO(updatedEmployee);
	}

	@Override
	public void deleteEmployee(Long id) {
		Employee employee = employeeRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
		
		employeeRepository.delete(employee);
	}
	

}
