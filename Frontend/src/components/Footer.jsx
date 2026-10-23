import React from 'react';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-container">

                <div className="footer-brand">
                    <span className="footer-brand-name">
                        WorkYantra<span>360</span>
                    </span>
                    <p className="footer-tagline">
                        Simplifying Employee Management
                    </p>
                </div>

                <div className="footer-copyright">
                    <span>
                        &copy; 2026 All rights reserved.
                    </span>
                    <span className="footer-divider">|</span>
                    <span>
                        Developed by{' '}
                        <a
                            href="https://linkedin.com/in/arbazzkhann"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            Arbaz Khan
                            <i className="bi bi-box-arrow-up-right"></i>
                        </a>
                    </span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;