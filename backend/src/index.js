require('@babel/register')({
  presets: ['@babel/preset-env'],
  ignore: ['node_modules'],
  plugins: ["@babel/plugin-transform-modules-commonjs"]
});

// Import the rest of our application.
module.exports = require('./app/app.js');
