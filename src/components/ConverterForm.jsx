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
                    className="text-lg pl-3"
                    style={{
                        borderColor: "rgb(209, 213, 219)",
                        borderWidth: "1px",
                        lineHeight: "2.5rem",
                        borderRadius: "0.5rem",
                    }}
                    inputMode="decimal"
                />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-2 items-end">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
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

                <motion.button
                    type="button"
                    onClick={handleSwapCurrencies}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full text-brand-primary transition-colors duration-150 ease-in-out flex items-center justify-center mx-auto md:mt-6 h-11 w-11"
                    aria-label="Swap currencies"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <FaExchangeAlt size={18} />
                </motion.button>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
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