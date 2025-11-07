/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
    extend: {
        colors: {
            primary: {
                DEFAULT: '#2563eb', // Base primary blue
                dark: '#1e40af', // Darker shade for hover or focus
                light: '#3b82f6', // Lighter shade for highlights
            },
            success: '#10b981', // Green for success states
            warning: '#f59e0b', // Amber for warnings
            danger: '#ef4444', // Red for errors or danger
            info: '#06b6d4', // Cyan for info states
        },
    },
};
export const plugins = [];
