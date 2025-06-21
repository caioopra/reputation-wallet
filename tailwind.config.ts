/** @type {import('tailwindcss').Config} */
// previous version
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',   // Adjust this if you are using a different structure
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
