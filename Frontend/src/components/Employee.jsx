import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    createEmployee,
    getEmployeeById,
    updateEmployeeById
} from '../services/EmployeeService';
import '../css/Employee.css';

const Employee = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);
    const [apiError, setApiError] = useState('');

    // Fetch employee details in update mode
    useEffect(() => {
        if (!id) {
            setFetching(false);
            return;
        }

        let active = true;

        const fetchEmployee = async () => {
            setFetching(true);
            setApiError('');

            try {
                const res = await getEmployeeById(id);

                if (active) {
                    setFirstName(res.data.firstName ?? '');
                    setLastName(res.data.lastName ?? '');
                    setEmail(res.data.email ?? '');
                }
            } catch (err) {
                console.error('Error fetching employee:', err);

                if (active) {
                    setApiError(
                        'Unable to load employee details. Please try again.'
                    );
                }
            } finally {
                if (active) {
                    setFetching(false);
                }
            }
        };

        fetchEmployee();

        return () => {
            active = false;
        };
    }, [id]);

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required.';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required.';
        }

        if (!email.trim()) {
            newErrors.email = 'Email address is required.';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            newErrors.email = 'Please enter a valid email address.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Clear a field's error when the user edits it
    const handleFieldChange = (field, value) => {
        const setters = {
            firstName: setFirstName,
            lastName: setLastName,
            email: setEmail
        };

        setters[field](value);

        setErrors((prev) => ({
            ...prev,
            [field]: ''
        }));

        setApiError('');
    };

    // Create or update employee
    const saveOrUpdateEmployee = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const employee = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim()
        };

        setLoading(true);
        setApiError('');

        try {
            if (isEditMode) {
                await updateEmployeeById(id, employee);
            } else {
                await createEmployee(employee);
            }

            navigate('/employees');
        } catch (err) {
            console.error('Error saving employee:', err);

            setApiError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                'Unable to save employee. Please check your details and try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <section className="employee-form-page">
                <div className="employee-form-loading">
                    <span className="employee-form-spinner"></span>
                    <p>Loading employee details...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="employee-form-page">

            {/* Page heading */}
            <div className="employee-form-heading">
                <span className="employee-form-eyebrow">
                    WORKYANTRA360 / EMPLOYEES
                </span>

                <h1>
                    {isEditMode ? 'Update Employee' : 'Add New Employee'}
                </h1>

                <p>
                    {isEditMode
                        ? 'Update employee information using the form below.'
                        : 'Enter the employee details to create a new record.'}
                </p>
            </div>

            {/* Form card */}
            <div className="employee-form-card">

                <div className="employee-form-card-header">
                    <div className="employee-form-icon">
                        <i
                            className={
                                isEditMode
                                    ? 'bi bi-person-gear'
                                    : 'bi bi-person-plus'
                            }
                        ></i>
                    </div>

                    <div>
                        <h2>
                            {isEditMode
                                ? 'Employee Information'
                                : 'Employee Details'}
                        </h2>

                        <p>All fields are required.</p>
                    </div>
                </div>

                <form onSubmit={saveOrUpdateEmployee} noValidate>

                    {apiError && (
                        <div className="employee-form-alert" role="alert">
                            <i className="bi bi-exclamation-circle"></i>
                            <span>{apiError}</span>
                        </div>
                    )}

                    <div className="employee-form-grid">

                        {/* First Name */}
                        <div className="employee-field">
                            <label htmlFor="firstName">
                                First Name <span>*</span>
                            </label>

                            <div
                                className={`employee-input-wrapper ${
                                    errors.firstName ? 'has-error' : ''
                                }`}
                            >
                                <i className="bi bi-person"></i>

                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            'firstName',
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.firstName ? 'input-error' : ''
                                    }
                                    autoComplete="given-name"
                                    maxLength={100}
                                    required
                                    aria-invalid={Boolean(errors.firstName)}
                                    aria-describedby={
                                        errors.firstName
                                            ? 'firstName-error'
                                            : undefined
                                    }
                                />
                            </div>

                            {errors.firstName && (
                                <small
                                    id="firstName-error"
                                    className="employee-field-error"
                                >
                                    {errors.firstName}
                                </small>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className="employee-field">
                            <label htmlFor="lastName">
                                Last Name <span>*</span>
                            </label>

                            <div
                                className={`employee-input-wrapper ${
                                    errors.lastName ? 'has-error' : ''
                                }`}
                            >
                                <i className="bi bi-person"></i>

                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            'lastName',
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.lastName ? 'input-error' : ''
                                    }
                                    autoComplete="family-name"
                                    maxLength={100}
                                    required
                                    aria-invalid={Boolean(errors.lastName)}
                                    aria-describedby={
                                        errors.lastName
                                            ? 'lastName-error'
                                            : undefined
                                    }
                                />
                            </div>

                            {errors.lastName && (
                                <small
                                    id="lastName-error"
                                    className="employee-field-error"
                                >
                                    {errors.lastName}
                                </small>
                            )}
                        </div>

                        {/* Email */}
                        <div className="employee-field employee-field-full">
                            <label htmlFor="email">
                                Email Address <span>*</span>
                            </label>

                            <div
                                className={`employee-input-wrapper ${
                                    errors.email ? 'has-error' : ''
                                }`}
                            >
                                <i className="bi bi-envelope"></i>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            'email',
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.email ? 'input-error' : ''
                                    }
                                    autoComplete="email"
                                    maxLength={254}
                                    required
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={
                                        errors.email
                                            ? 'email-error'
                                            : undefined
                                    }
                                />
                            </div>

                            {errors.email && (
                                <small
                                    id="email-error"
                                    className="employee-field-error"
                                >
                                    {errors.email}
                                </small>
                            )}
                        </div>

                    </div>

                    <div className="employee-form-note">
                        <i className="bi bi-info-circle"></i>
                        <span>
                            Please ensure the information is correct before saving.
                        </span>
                    </div>

                    <div className="employee-form-actions">
                        <button
                            type="button"
                            className="employee-cancel-btn"
                            onClick={() => navigate('/employees')}
                            disabled={loading}
                        >
                            <i className="bi bi-x-lg"></i>
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="employee-save-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="employee-button-spinner"></span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i
                                        className={
                                            isEditMode
                                                ? 'bi bi-check2-circle'
                                                : 'bi bi-person-plus'
                                        }
                                    ></i>
                                    {isEditMode
                                        ? 'Update Employee'
                                        : 'Save Employee'}
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>

            <p className="employee-form-footer-note">
                <i className="bi bi-shield-check"></i>
                WorkYantra360 Employee Management Portal
            </p>

        </section>
    );
};

export default Employee;