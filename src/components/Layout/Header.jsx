import React from 'react';
import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa'; // Using a currency-related icon

const Header = () => {
    return (
        <motion.header
            className="w-full bg-white shadow-sm sticky top-0 z-50"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
        >
            <div className="container max-w-2xl mx-auto px-4 py-5 flex items-center justify-center">
                <FaCoins className="text-3xl text-brand-primary mr-3" />
                <h1 className="text-2xl font-semibold text-brand-text-primary">
                    Quick<span className="text-brand-primary">Convert</span>
                </h1>
            </div>
        </motion.header>
    );
};

export default Header;