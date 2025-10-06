import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import LoadingSpinner from './UI/LoadingSpinner';
import ErrorMessage from './UI/ErrorMessage';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Helper function to fetch historical data
const fetchHistoricalData = async (fromCurrency, toCurrency) => {
    const date = new Date();
    const toDate = date.toISOString().split('T')[0];
    date.setMonth(date.getMonth() - 1); // 1 month ago
    const fromDate = date.toISOString().split('T')[0];


    const response = await fetch(`https://api.frankfurter.app/${fromDate}..${toDate}?from=${fromCurrency}&to=${toCurrency}`);
    if (!response.ok) {
        throw new Error('Failed to fetch historical data');
    }
    const data = await response.json();
    return data;
};


const HistoricalChart = ({ fromCurrency, toCurrency }) => {
    const { data: historicalData, isLoading, error } = useQuery({
        queryKey: ['historical', fromCurrency, toCurrency],
        queryFn: () => fetchHistoricalData(fromCurrency, toCurrency),
        enabled: !!fromCurrency && !!toCurrency, // Only run query if currencies are selected
    });

    if (isLoading) return <div className="flex justify-center mt-4"><LoadingSpinner /></div>;
    if (error) return <ErrorMessage message={error.message} />;

    const chartData = {
        labels: historicalData ? Object.keys(historicalData.rates) : [],
        datasets: [
            {
                label: `Exchange Rate (${fromCurrency} to ${toCurrency})`,
                data: historicalData ? Object.values(historicalData.rates).map(rate => rate[toCurrency]) : [],
                fill: false,
                borderColor: '#007AFF',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Historical Exchange Rate (Last 30 Days)`,
            },
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 10, // Limit number of visible dates on mobile
                }
            }
        }
    };

    return <div className="mt-6"><Line data={chartData} options={options} /></div>;
};

export default HistoricalChart;