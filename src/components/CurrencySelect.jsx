import React from 'react';
import { motion } from 'framer-motion';

const CurrencySelect = ({ id, value, onChange, currencies, disabled = false }) => {
    const currencyOptions = Object.entries(currencies)
        .map(([code, name]) => ({
            value: code,
            label: `${code} - ${name}`
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    return (
        <motion.select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="text-base"
        >
            <option value="" disabled>Select currency</option>
            {currencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </motion.select>
    );
};

export default CurrencySelect;