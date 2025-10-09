module.exports = {
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' }, // মাঝের সময় উপরে যাবে
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite', // duration 3s, smooth, continuous
      },
    },
  },
}
