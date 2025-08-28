require("module-alias/register");
require("dotenv").config();
const { Problem } = require("@/models");
const { v4: uuidv4 } = require("uuid");
(async () => {
  await Problem.create({
    title: "Add Two Numbers",
    description:
      "Given two integers a and b, return their sum.\n\nYou only need to compute a + b and return the result as an integer.",
    difficulty: "Easy",
    testCases: [
      {
        input: "a = 1, b = 2",
        expected_output: "3",
        explanation: "1 + 2 = 3",
      },
      {
        input: "a = -5, b = 7",
        expected_output: "2",
        explanation: "-5 + 7 = 2",
      },
      {
        input: "a = 100, b = 200",
        expected_output: "300",
        explanation: "100 + 200 = 300",
      },
    ],
    template: `
      function addTwoNumbers(a, b) {
      // TODO: Implement your logic here
      return a + b;
    }
    
    // Boilerplate for Judge0 to handle stdin
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    
    rl.on('line', function (line) {
      const [a, b] = line.trim().split(' ').map(Number);
      console.log(addTwoNumbers(a, b));
      rl.close();
    });`,
  });
})();
