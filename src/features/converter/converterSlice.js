import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    amount: '1',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    conversionResult: null,
    lastUpdated: null,
    isLoading: false,
    error: null,
};

const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        setFromCurrency: (state, action) => {
            state.fromCurrency = action.payload;
            state.conversionResult = null;
        },
        setToCurrency: (state, action) => {
            state.toCurrency = action.payload;
            state.conversionResult = null;
        },
        swapCurrencies: (state) => {
            const temp = state.fromCurrency;
            state.fromCurrency = state.toCurrency;
            state.toCurrency = temp;
            state.conversionResult = null;
        },
        setConversionResult: (state, action) => {
            state.conversionResult = action.payload.result;
            state.lastUpdated = action.payload.date;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            state.conversionResult = null;
        },
        clearResult: (state) => {
            state.conversionResult = null;
            state.lastUpdated = null;
            state.error = null;
        }
    },
});

export const {
    setAmount,
    setFromCurrency,
    setToCurrency,
    swapCurrencies,
    setConversionResult,
    setLoading,
    setError,
    clearResult,
} = converterSlice.actions;

export const selectConverterState = (state) => state.converter;

export default converterSlice.reducer;