import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <motion.div
            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm flex items-start space-x-3 my-4"
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
        >
            <FaExclamationTriangle className="text-xl text-red-600 mt-0.5" />
            <div>
                <p className="font-medium">Error</p>
                <p className="text-sm">{message || "An unexpected error occurred."}</p>
            </div>
        </motion.div>
    );
};

export default ErrorMessage;