require("module-alias/register");
require("dotenv").config();
const { Problem } = require("@/models");
(async () => {
  // Problem 1: Fibonacci Number
  await Problem.create({
    title: "Fibonacci Number",
    description:
      "Given a non-negative integer n, return the nth Fibonacci number.\n\nThe Fibonacci sequence is defined as: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.",
    difficulty: "Easy",
    testCases: [
      {
        input: "n = 0",
        expected_output: "0",
        explanation: "F(0) = 0",
      },
      {
        input: "n = 1",
        expected_output: "1",
        explanation: "F(1) = 1",
      },
      {
        input: "n = 6",
        expected_output: "8",
        explanation: "F(6) = F(5) + F(4) = 5 + 3 = 8",
      },
    ],
    template: ` `,
  });

  // Problem 2: Palindrome Check
  await Problem.create({
    title: "Palindrome Check",
    description:
      "Given a string s, determine if it is a palindrome (reads the same forward and backward).\n\nConsider only alphanumeric characters and ignore cases.",
    difficulty: "Easy",
    testCases: [
      {
        input: 's = "racecar"',
        expected_output: "true",
        explanation: "The string reads the same forwards and backwards",
      },
      {
        input: 's = "A man a plan a canal Panama"',
        expected_output: "true",
        explanation: "Ignoring spaces and cases: amanaplanacanalpanama",
      },
      {
        input: 's = "hello"',
        expected_output: "false",
        explanation: "The string does not read the same backwards",
      },
    ],
    template: ` `,
  });

  // Problem 3: Prime Number Check
  await Problem.create({
    title: "Prime Number Check",
    description:
      "Given a positive integer n, determine if it is a prime number.\n\nA prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
    difficulty: "Easy",
    testCases: [
      {
        input: "n = 2",
        expected_output: "true",
        explanation: "2 is the smallest prime number",
      },
      {
        input: "n = 17",
        expected_output: "true",
        explanation: "17 has no divisors other than 1 and 17",
      },
      {
        input: "n = 15",
        expected_output: "false",
        explanation: "15 = 3 × 5, so it's not prime",
      },
    ],
    template: ` `,
  });

  // Problem 4: Two Sum
  await Problem.create({
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "Easy",
    testCases: [
      {
        input: "nums = [2,7,11,15], target = 9",
        expected_output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9",
      },
      {
        input: "nums = [3,2,4], target = 6",
        expected_output: "[1,2]",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6",
      },
      {
        input: "nums = [3,3], target = 6",
        expected_output: "[0,1]",
        explanation: "nums[0] + nums[1] = 3 + 3 = 6",
      },
    ],
    template: ` `,
  });

  // Problem 5: Binary Search
  await Problem.create({
    title: "Binary Search",
    description:
      "Given a sorted array of integers nums and a target value, return the index of target if it exists, otherwise return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    difficulty: "Easy",
    testCases: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        expected_output: "4",
        explanation: "9 exists in nums and its index is 4",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        expected_output: "-1",
        explanation: "2 does not exist in nums so return -1",
      },
      {
        input: "nums = [5], target = 5",
        expected_output: "0",
        explanation: "Single element array with matching target",
      },
    ],
    template: ` `,
  });

  // Problem 6: Reverse String
  await Problem.create({
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters s.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    difficulty: "Easy",
    testCases: [
      {
        input: 's = ["h","e","l","l","o"]',
        expected_output: '["o","l","l","e","h"]',
        explanation: "Reverse the array in-place",
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        expected_output: '["h","a","n","n","a","H"]',
        explanation: "Reverse the array in-place",
      },
      {
        input: 's = ["a"]',
        expected_output: '["a"]',
        explanation: "Single character remains the same",
      },
    ],
    template: ` `,
  });

  // Problem 7: Maximum Subarray
  await Problem.create({
    title: "Maximum Subarray",
    description:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\nThis is known as Kadane's algorithm problem.",
    difficulty: "Medium",
    testCases: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        expected_output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum = 6",
      },
      {
        input: "nums = [1]",
        expected_output: "1",
        explanation: "Single element array",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        expected_output: "23",
        explanation: "The entire array has the maximum sum",
      },
    ],
    template: ` `,
  });

  // Problem 8: Valid Parentheses
  await Problem.create({
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if: open brackets are closed by the same type of brackets and open brackets are closed in the correct order.",
    difficulty: "Easy",
    testCases: [
      {
        input: 's = "()"',
        expected_output: "true",
        explanation: "Valid parentheses pair",
      },
      {
        input: 's = "()[]{}"',
        expected_output: "true",
        explanation: "All brackets are properly matched",
      },
      {
        input: 's = "([)]"',
        expected_output: "false",
        explanation: "Brackets are not closed in correct order",
      },
    ],
    template: ` `,
  });

  // Problem 9: Merge Two Sorted Lists
  await Problem.create({
    title: "Merge Two Sorted Lists",
    description:
      "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.",
    difficulty: "Easy",
    testCases: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        expected_output: "[1,1,2,3,4,4]",
        explanation: "Merge both sorted lists into one sorted list",
      },
      {
        input: "list1 = [], list2 = []",
        expected_output: "[]",
        explanation: "Both lists are empty",
      },
      {
        input: "list1 = [], list2 = [0]",
        expected_output: "[0]",
        explanation: "One list is empty, return the other",
      },
    ],
    template: ` `,
  });

  // Problem 10: Climbing Stairs
  await Problem.create({
    title: "Climbing Stairs",
    description:
      "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "Easy",
    testCases: [
      {
        input: "n = 2",
        expected_output: "2",
        explanation: "There are two ways: 1. 1 step + 1 step, 2. 2 steps",
      },
      {
        input: "n = 3",
        expected_output: "3",
        explanation: "Three ways: 1+1+1, 1+2, 2+1",
      },
      {
        input: "n = 5",
        expected_output: "8",
        explanation: "Eight distinct ways to climb 5 steps",
      },
    ],
    template: ` `,
  });
})();
