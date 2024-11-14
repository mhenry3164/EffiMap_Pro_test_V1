/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}', // Ensures Tailwind scans all relevant files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Custom primary color for your brand
        secondary: '#F59E0B', // Example of secondary color
      },
      spacing: {
        18: '4.5rem', // Custom spacing if you need more than the default spacing scale
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom fonts (if any)
      },
    },
  },
  plugins: [
    // Example: require('@tailwindcss/forms'), // Uncomment when using plugins
  ],
};
