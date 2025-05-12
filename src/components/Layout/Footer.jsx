import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="w-full text-center py-6 mt-auto">
            <p className="text-sm text-brand-text-secondary">
                &copy; {currentYear} QuickConvert. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
                Exchange rates provided by{' '}
                <a
                    href="https://www.frankfurter.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                >
                    Frankfurter API
                </a>
                .
            </p>
        </footer>
    );
};

export default Footer;