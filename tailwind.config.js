/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-eden":
          "linear-gradient(90deg, #5ED37D 9.02%, #CAF84C 107.87%)",
        "gradient-fresh":
          "linear-gradient(90deg, #B6F509 1.7%, #75E327 61.22%, #14D674 98.99%)",
        "gradient-border":
          "linear-gradient(90.82deg, #14D674 1.73%, #CAFF00 32.62%, #9CF015 66.57%, #01BC5A 98.96%)"
      },
      colors: {
        brand: {
          blue: "#171b47",
          green: "#0cd479",
          darkgreen: "#70E32B",
          lime: "#caff00",
          completed: "#9DFF61",
          gray: "#9B9B9B",
          textGray: "#696969",
          hover: "#E5FFB1",
          gradient: "linear-gradient(90deg, #B6F509 1.7%, #75E327 61.22%, #14D674 98.99%)"
        },
        indigo: {
          600: "#181d45",
          700: "#171b47",
        },

      },
    },
  },
  plugins: [],
};
