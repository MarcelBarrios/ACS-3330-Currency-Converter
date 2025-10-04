import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaExchangeAlt } from 'react-icons/fa';

import CurrencySelect from './CurrencySelect';
import {
    setAmount,
    setFromCurrency,
    setToCurrency,
    swapCurrencies,
    selectConverterState,
    clearResult,
    setError
} from '../features/converter/converterSlice';
import LoadingSpinner from './UI/LoadingSpinner';

const ConverterForm = ({ currencies, onConvert, isConverting }) => {
    const dispatch = useDispatch();
    const { amount, fromCurrency, toCurrency } = useSelector(selectConverterState);

    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        if (newAmount === '' || /^\d*\.?\d*$/.test(newAmount)) {
            dispatch(setAmount(newAmount));
            dispatch(clearResult());
            if (parseFloat(newAmount) <= 0 && newAmount !== '' && newAmount !== '.') {
                dispatch(setError("Amount must be greater than zero."));
            } else {
                dispatch(setError(null));
            }
        }
    };

    const handleFromCurrencyChange = (selectedCurrency) => {
        dispatch(setFromCurrency(selectedCurrency));
    };

    const handleToCurrencyChange = (selectedCurrency) => {
        dispatch(setToCurrency(selectedCurrency));
    };

    const handleSwapCurrencies = () => {
        dispatch(swapCurrencies());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConvert();
    };

    useEffect(() => {
        if (fromCurrency && toCurrency && fromCurrency === toCurrency) {
            dispatch(clearResult());
        }
    }, [fromCurrency, toCurrency, dispatch]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <label htmlFor="amount" className="block text-sm font-medium text-brand-text-primary mb-1">
                    Amount
                </label>
                <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="1.00"
                    className="text-lg w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    inputMode="decimal"
                />
            </motion.div>

            {/* CHANGED: Switched from Grid to a more robust Flexbox layout for responsiveness */}
            <div className="flex flex-col md:flex-row md:items-end md:gap-2">

                {/* 'From' Currency */}
                <motion.div className="flex-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <label htmlFor="fromCurrency" className="block text-sm font-medium text-brand-text-primary mb-1">
                        From
                    </label>
                    <CurrencySelect
                        id="fromCurrency"
                        value={fromCurrency}
                        onChange={handleFromCurrencyChange}
                        currencies={currencies}
                    />
                </motion.div>

                {/* Swap Button */}
                <motion.button
                    type="button"
                    onClick={handleSwapCurrencies}
                    // CHANGED: Adjusted margin/padding and self-alignment for better mobile stacking
                    className="p-2 my-2 md:mb-1 bg-gray-100 hover:bg-gray-200 rounded-full text-brand-primary transition-colors duration-150 ease-in-out flex items-center justify-center self-center md:self-end h-11 w-11"
                    aria-label="Swap currencies"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* CHANGED: The icon now rotates for a better visual cue on desktop */}
                    <FaExchangeAlt size={18} className="md:rotate-90" />
                </motion.button>

                {/* 'To' Currency */}
                <motion.div className="flex-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <label htmlFor="toCurrency" className="block text-sm font-medium text-brand-text-primary mb-1">
                        To
                    </label>
                    <CurrencySelect
                        id="toCurrency"
                        value={toCurrency}
                        onChange={handleToCurrencyChange}
                        currencies={currencies}
                    />
                </motion.div>
            </div>

            <motion.button
                type="submit"
                disabled={isConverting || (fromCurrency === toCurrency && fromCurrency !== '')}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-brand-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                whileHover={{ scale: !isConverting && !(fromCurrency === toCurrency && fromCurrency !== '') ? 1.02 : 1 }}
                whileTap={{ scale: !isConverting && !(fromCurrency === toCurrency && fromCurrency !== '') ? 0.98 : 1 }}
            >
                {isConverting ? (
                    <>
                        <LoadingSpinner size="sm" />
                        <span className="ml-2">Converting...</span>
                    </>
                ) : (
                    'Convert'
                )}
            </motion.button>
        </form>
    );
};

export default ConverterForm;
