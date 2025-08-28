require("module-alias/register");
require("dotenv").config();
const { Problem } = require("@/models");
(async () => {
  await Problem.create({
    title: "Factorial",
    description:
      "Given a non-negative integer n, return the factorial of n.\n\nFactorial of n is defined as n! = n × (n-1) × ... × 1, and 0! = 1.",
    difficulty: "Medium",
    testCases: [
      {
        input: "n = 0",
        expected_output: "1",
        explanation: "0! = 1",
      },
      {
        input: "n = 5",
        expected_output: "120",
        explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120",
      },
      {
        input: "n = 7",
        expected_output: "5040",
        explanation: "7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5040",
      },
    ],
    template: `
    function factorial(n) {
      // TODO: Implement your logic here
    }
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    
    rl.on('line', function (line) {
      const n = Number(line.trim());
      console.log(factorial(n));
      rl.close();
    });`,
  });
})();
