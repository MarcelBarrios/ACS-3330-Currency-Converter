/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'sans-serif'], // Using Inter font from Google Fonts
            },
            colors: {
                'brand-primary': '#007AFF',    // A nice blue (similar to Apple's blue)
                'brand-secondary': '#34C759', // A complementary green
                'brand-background': '#F2F2F7', // Light gray background
                'brand-text-primary': '#1C1C1E', // Dark text
                'brand-text-secondary': '#8A8A8E', // Lighter/placeholder text
            }
        },
    },
    plugins: [],
}