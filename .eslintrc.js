module.exports = {
  "env": {
    "es2021": true,
  },
  "rules": {
    "semi": ["error"],
    "quotes": ["error", "double"],
    "arrow-parens": ["error", "always"],
    "comma-spacing": ["error", { after: true }],

    "no-unsafe-optional-chaining": ["error"],
    //
    "no-unused-vars": ["error", { "varsIgnorePattern": "_" }],
    //unused variable
    "space-infix-ops": ["error"],
    //space before and after mathematical operators
    "no-magic-numbers": ["warn"],
    //no direct use of numbers in logic
    "constructor-super": ["error"],
    //use of super when inheriting other class
    "func-call-spacing": ["error"],
    //use of space between function name and round brackets
    "class-methods-use-this": ["error"],
    //use of this inside class
  },
};
