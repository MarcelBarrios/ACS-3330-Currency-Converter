import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = "md", color = "brand-primary" }) => {
    const sizeClasses = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-4",
        lg: "w-12 h-12 border-4",
    };
    const borderColorClass = color === "brand-primary" ? "border-brand-primary" : "border-gray-500";

    return (
        <motion.div
            className={`${sizeClasses[size]} ${borderColorClass} border-t-transparent border-solid rounded-full animate-spin`}
            role="status"
            aria-label="Loading..."
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
        >
            <span className="sr-only">Loading...</span>
        </motion.div>
    );
};

export default LoadingSpinner;