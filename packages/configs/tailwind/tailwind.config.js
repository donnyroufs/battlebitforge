module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/design-system/**/*.{js,ts,jsx,tsx}",
    "../../packages/web-loadouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
};
