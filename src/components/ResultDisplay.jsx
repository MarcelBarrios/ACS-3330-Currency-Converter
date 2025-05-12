import React from 'react';
import { motion } from 'framer-motion';

const ResultDisplay = ({ amount, fromCurrency, toCurrency, convertedAmount, rateDate, allCurrencies }) => {
    if (convertedAmount === null || convertedAmount === undefined) {
        return null;
    }

    const formatCurrencyValue = (val) => {
        return parseFloat(val).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        });
    };

    const fromCurrencyName = allCurrencies[fromCurrency] || fromCurrency;
    const toCurrencyName = allCurrencies[toCurrency] || toCurrency;

    const rate = (convertedAmount / amount);

    return (
        <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-3 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <p className="text-lg text-brand-text-secondary">
                {formatCurrencyValue(amount)} {fromCurrencyName} (<span className="font-semibold">{fromCurrency}</span>) equals
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-brand-primary">
                {formatCurrencyValue(convertedAmount)} {toCurrencyName} (<span className="font-semibold">{toCurrency}</span>)
            </p>
            <div className="text-sm text-brand-text-secondary pt-2">
                <p>
                    1 {fromCurrency} = {formatCurrencyValue(rate)} {toCurrency}
                </p>
                {rateDate && (
                    <p className="mt-1">
                        Rate from: {new Date(rateDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default ResultDisplay;