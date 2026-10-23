import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";

export default () => {
  const features = [
    {
      icon: "bi-people",
      title: "Employee Directory",
      description:
        "View and manage employee information from one organized place.",
      color: "purple",
    },
    {
      icon: "bi-person-plus",
      title: "Easy Onboarding",
      description:
        "Add new employees quickly with a simple and intuitive form.",
      color: "blue",
    },
    {
      icon: "bi-pencil-square",
      title: "Effortless Updates",
      description:
        "Keep employee records accurate by updating details whenever needed.",
      color: "orange",
    },
    {
      icon: "bi-shield-check",
      title: "Centralized Records",
      description:
        "Keep employee data organized and easier to maintain.",
      color: "green",
    },
  ];

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-badge">
            <span className="landing-badge-dot"></span>
            Employee management, simplified
          </div>

          <h1>
            Manage your people.
            <br />
            <span>Power your workplace.</span>
          </h1>

          <p className="landing-hero-description">
            Meet WorkYantra360 — a simple, modern way to organize employee
            records, manage information, and keep your workforce running
            smoothly.
          </p>

          <div className="landing-hero-actions">
            <Link to="/employees" className="landing-primary-btn">
              Explore Employees
              <i className="bi bi-arrow-right"></i>
            </Link>

            <Link to="/add-employee" className="landing-secondary-btn">
              <i className="bi bi-plus-circle"></i>
              Add Employee
            </Link>
          </div>

          <div className="landing-trust-note">
            <i className="bi bi-check-circle-fill"></i>
            Simple workflows. Organized employee records.
          </div>
        </div>

        <div className="landing-hero-visual">
          <div className="landing-glow"></div>

          <div className="landing-dashboard">
            <div className="landing-dashboard-top">
              <div>
                <span className="landing-dashboard-label">WORKSPACE</span>
                <h3>Overview</h3>
              </div>
              <div className="landing-dashboard-menu">
                <i className="bi bi-three-dots"></i>
              </div>
            </div>

            <div className="landing-welcome-card">
              <div>
                <span>YOUR WORKSPACE</span>
                <h3>Everything in one place.</h3>
                <p>Stay organized and keep moving forward.</p>
              </div>
              <div className="landing-welcome-icon">
                <i className="bi bi-buildings"></i>
              </div>
            </div>

            <div className="landing-metric-grid">
              <div className="landing-metric">
                <div className="landing-metric-icon purple">
                  <i className="bi bi-people"></i>
                </div>
                <span>Employee records</span>
                <strong>Manage</strong>
                <small>View your directory</small>
              </div>

              <div className="landing-metric">
                <div className="landing-metric-icon blue">
                  <i className="bi bi-person-plus"></i>
                </div>
                <span>New employees</span>
                <strong>Add</strong>
                <small>Create a record</small>
              </div>
            </div>

            <div className="landing-activity">
              <div className="landing-activity-heading">
                <span>Quick actions</span>
                <i className="bi bi-lightning-charge"></i>
              </div>

              <Link to="/employees" className="landing-activity-row">
                <div className="landing-activity-icon">
                  <i className="bi bi-card-list"></i>
                </div>
                <span>View employee directory</span>
                <i className="bi bi-arrow-up-right"></i>
              </Link>

              <Link to="/add-employee" className="landing-activity-row">
                <div className="landing-activity-icon add">
                  <i className="bi bi-person-add"></i>
                </div>
                <span>Register an employee</span>
                <i className="bi bi-arrow-up-right"></i>
              </Link>
            </div>
          </div>

          <div className="landing-floating-card">
            <div className="landing-floating-icon">
              <i className="bi bi-check-lg"></i>
            </div>
            <div>
              <strong>Stay organized</strong>
              <span>Your team, in one place</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-section-heading">
          <span className="landing-section-eyebrow">BUILT FOR SIMPLICITY</span>
          <h2>Everything you need to manage employees</h2>
          <p>
            Spend less time managing records and more time focusing on your
            work.
          </p>
        </div>

        <div className="landing-feature-grid">
          {features.map((feature) => (
            <article className="landing-feature-card" key={feature.title}>
              <div className={`landing-feature-icon ${feature.color}`}>
                <i className={`bi ${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link to="/employees" className="landing-feature-link">
                Explore feature <i className="bi bi-arrow-right"></i>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-cta-icon">
          <i className="bi bi-rocket-takeoff"></i>
        </div>
        <div className="landing-cta-content">
          <h2>Ready to organize your workforce?</h2>
          <p>Start managing employee records with WorkYantra360 today.</p>
        </div>
        <Link to="/employees" className="landing-cta-btn">
          Get Started <i className="bi bi-arrow-right"></i>
        </Link>
      </section>
    </div>
  );
}
