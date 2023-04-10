/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        column: '0px 0px 4px 2px rgba(0, 0, 0, 0.1)',
        // '4px 4px 6px -1px rgb(0 0 0 / 0.1), -2px -2px 6px -1px rgb(0 0 0 / 0.1)',
      },
      minWidth: {
        250: '250px',
      },
    },
  },
  plugins: [],
};
