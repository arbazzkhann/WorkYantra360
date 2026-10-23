import React, { useEffect, useState } from "react";
import { deleteEmployeeById, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import "../css/ListEmployee.css";

export default function ListEmployee() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    //! Fetch employees when component mounts
    useEffect(() => {
        getAllEmployees();
    }, []);

    //! Get all employees
    const getAllEmployees = async () => {
        try {
            setError("");
            const res = await listEmployees();
            setEmployees(res.data);
        } catch (err) {
            console.error("Error fetching employees:", err);
            setError("Unable to load employees. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    //! Navigate to update page
    const updateEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    };

  //! Delete employee
    const deleteEmployee = async (id) => {
        const confirmed = window.confirm(
        "Are you sure you want to delete this employee?",
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);
            await deleteEmployeeById(id);
            await getAllEmployees();
        } catch (err) {
            console.error("Error deleting employee:", err);
            setError("Unable to delete employee. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    //! Search employees by name, email or ID
    const filteredEmployees = employees.filter((emp) => {
        const search = searchTerm.toLowerCase().trim();

        return (
        String(emp.id ?? "")
            .toLowerCase()
            .includes(search) ||
        (emp.firstName ?? "").toLowerCase().includes(search) ||
        (emp.lastName ?? "").toLowerCase().includes(search) ||
        (emp.email ?? "").toLowerCase().includes(search)
        );
    });

  return (
    <section className="employee-page">
      <div className="employee-page-header">
        <div>
          <span className="employee-eyebrow">WORKYANTRA360 / DIRECTORY</span>

          <h1 className="employee-page-title">Employee Management</h1>

          <p className="employee-page-subtitle">
            Manage your employees and keep your workforce organized.
          </p>
        </div>

        <button
          type="button"
          className="employee-add-btn"
          onClick={() => navigate("/add-employee")}
        >
          <i className="bi bi-plus-lg"></i>
          Add Employee
        </button>
      </div>

      {/* Employee summary */}
      <div className="employee-summary-grid">
        <div className="employee-summary-card">
          <div className="summary-icon summary-icon-purple">
            <i className="bi bi-people-fill"></i>
          </div>

          <div>
            <p className="summary-label">Total Employees</p>
            <h3 className="summary-value">{employees.length}</h3>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="summary-icon summary-icon-blue">
            <i className="bi bi-person-check-fill"></i>
          </div>

          <div>
            <p className="summary-label">Matching Records</p>
            <h3 className="summary-value">{filteredEmployees.length}</h3>
          </div>
        </div>
      </div>

      {/* Employee table */}
      <div className="employee-table-card">
        <div className="employee-table-toolbar">
          <div>
            <h2 className="employee-table-title">All Employees</h2>
            <p className="employee-table-description">
              View and manage your employee records.
            </p>
          </div>

          <div className="employee-search">
            <i className="bi bi-search"></i>

            <input
              type="search"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search employees by ID, name or email"
            />

            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="employee-alert" role="alert">
            <i className="bi bi-exclamation-circle"></i>
            <span>{error}</span>

            <button type="button" onClick={getAllEmployees} disabled={loading}>
              Retry
            </button>
          </div>
        )}

        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>EMPLOYEE ID</th>
                <th>EMAIL ADDRESS</th>
                <th className="actions-heading">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="employee-state">
                    <span className="employee-spinner"></span>
                    <p>Loading employees...</p>
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="employee-state">
                    <div className="employee-empty-icon">
                      <i className="bi bi-people"></i>
                    </div>

                    <h3>
                      {searchTerm
                        ? "No matching employees"
                        : "No employees found"}
                    </h3>

                    <p>
                      {searchTerm
                        ? "Try another name, email or employee ID."
                        : "Add your first employee to get started."}
                    </p>

                    {!searchTerm && (
                      <button
                        type="button"
                        className="employee-add-btn empty-add-btn"
                        onClick={() => navigate("/add-employee")}
                      >
                        <i className="bi bi-plus-lg"></i>
                        Add Employee
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="employee-identity">
                        <div className="employee-avatar">
                          {(emp.firstName?.charAt(0) || "E").toUpperCase()}
                        </div>

                        <div className="employee-name">
                          <span>
                            {emp.firstName} {emp.lastName}
                          </span>
                          <small>Employee</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="employee-id">#{emp.id}</span>
                    </td>

                    <td>
                      <span className="employee-email">
                        <i className="bi bi-envelope"></i>
                        {emp.email}
                      </span>
                    </td>

                    <td>
                      <div className="employee-actions">
                        <button
                          type="button"
                          className="employee-action-btn edit-btn"
                          onClick={() => updateEmployee(emp.id)}
                          title="Update employee"
                          aria-label={`Update ${emp.firstName}`}
                        >
                          <i className="bi bi-pencil-square"></i>
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          className="employee-action-btn delete-btn"
                          onClick={() => deleteEmployee(emp.id)}
                          disabled={deletingId === emp.id}
                          title="Delete employee"
                          aria-label={`Delete ${emp.firstName}`}
                        >
                          <i className="bi bi-trash3"></i>
                          <span>
                            {deletingId === emp.id ? "Deleting..." : "Delete"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredEmployees.length > 0 && (
          <div className="employee-table-footer">
            <span>
              Showing <strong>{filteredEmployees.length}</strong> of{" "}
              <strong>{employees.length}</strong> employees
            </span>

            <span className="records-indicator">
              <span></span>
              Records loaded
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
