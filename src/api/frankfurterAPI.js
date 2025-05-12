import axios from 'axios';

const API_BASE_URL = 'https://api.frankfurter.app';

export const fetchCurrencies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/currencies`);
        return response.data;
    } catch (error) {
        console.error("Error fetching currencies:", error);
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch currencies");
    }
};

export const fetchConversionRate = async (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) {
        return {
            amount: parseFloat(amount),
            base: fromCurrency,
            date: new Date().toISOString().split('T')[0],
            rates: { [toCurrency]: parseFloat(amount) },
            convertedAmount: parseFloat(amount)
        };
    }
    try {
        const response = await axios.get(`${API_BASE_URL}/latest`, {
            params: {
                amount: parseFloat(amount),
                from: fromCurrency,
                to: toCurrency,
            },
        });
        return {
            ...response.data,
            convertedAmount: response.data.rates[toCurrency]
        };
    } catch (error) {
        console.error("Error fetching conversion rate:", error);
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch conversion rate");
    }
};