module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{html,js,svelte,ts}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors here
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}