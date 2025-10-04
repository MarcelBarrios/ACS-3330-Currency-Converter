import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

import ConverterForm from '../components/ConverterForm';
import ResultDisplay from '../components/ResultDisplay';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

import { fetchCurrencies, fetchConversionRate } from '../api/frankfurterAPI';
import {
    selectConverterState,
    setConversionResult,
    setLoading,
    setError,
    clearResult,
} from '../features/converter/converterSlice';

const ConverterPage = () => {
    const dispatch = useDispatch();
    const { amount, fromCurrency, toCurrency, conversionResult, lastUpdated, error: reduxError } = useSelector(selectConverterState);

    const { data: currencies, isLoading: isLoadingCurrencies, error: currenciesError } = useQuery({
        queryKey: ['currencies'],
        queryFn: fetchCurrencies,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    const conversionMutation = useMutation({
        mutationFn: ({ amt, from, to }) => fetchConversionRate(amt, from, to),
        onMutate: () => {
            dispatch(setLoading(true));
            dispatch(clearResult());
        },
        onSuccess: (data) => {
            dispatch(setConversionResult({ result: data.convertedAmount, date: data.date }));
        },
        onError: (error) => {
            dispatch(setError(error.message || "Failed to convert currency."));
        },
        onSettled: () => {
            dispatch(setLoading(false));
        }
    });

    const handleConvert = useCallback(() => {
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            dispatch(setError("Please enter a valid amount greater than zero."));
            return;
        }
        if (!fromCurrency || !toCurrency) {
            dispatch(setError("Please select both 'From' and 'To' currencies."));
            return;
        }
        if (reduxError) dispatch(setError(null));

        conversionMutation.mutate({ amt: parseFloat(amount), from: fromCurrency, to: toCurrency });
    }, [amount, fromCurrency, toCurrency, conversionMutation, dispatch, reduxError]);

    if (isLoadingCurrencies) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (currenciesError) {
        return <ErrorMessage message={currenciesError.message || "Could not load currency data. Please try again later."} />;
    }

    return (
        <motion.div
            // CHANGED: Adjusted padding for different screen sizes
            className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <ConverterForm
                currencies={currencies || {}}
                onConvert={handleConvert}
                isConverting={conversionMutation.isPending}
            />

            <AnimatePresence mode="wait">
                {conversionMutation.isPending && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-center py-4"
                    >
                        <LoadingSpinner />
                    </motion.div>
                )}

                {reduxError && !conversionMutation.isPending && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ErrorMessage message={reduxError} />
                    </motion.div>
                )}

                {conversionResult !== null && !conversionMutation.isPending && !reduxError && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ResultDisplay
                            amount={parseFloat(amount)}
                            fromCurrency={fromCurrency}
                            toCurrency={toCurrency}
                            convertedAmount={conversionResult}
                            rateDate={lastUpdated}
                            allCurrencies={currencies || {}}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ConverterPage;
