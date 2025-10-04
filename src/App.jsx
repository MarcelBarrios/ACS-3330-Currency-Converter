import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ConverterPage from './pages/ConverterPage';

function App() {
    return (
        <div className="flex flex-col min-h-screen items-center bg-brand-background">
            <Header />
            <motion.main
                // CHANGED: Adjusted padding for better spacing on mobile vs. desktop
                className="flex-grow container max-w-2xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <ConverterPage />
            </motion.main>
            <Footer />
        </div>
    );
}

export default App;
