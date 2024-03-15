/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        8: "200px 180px 300px 150px 250px 180px 250px 125px",
      },
    },
  },
  plugins: [],
};
