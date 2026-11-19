window.CP11_FUNCTIONS_WORK01_DATA = {
  "contracts": [
    {
      "name": "double_number",
      "parameters": "number: a number",
      "arity": 1,
      "rule": "Return twice the supplied number.",
      "tests": [
        [
          5
        ],
        [
          0
        ],
        [
          -3
        ]
      ],
      "values": [
        10,
        0,
        -6
      ],
      "hint": "Reuse your earlier double function if it meets this contract. Keep input and print outside.",
      "explain": "Label one parameter in the definition and one argument in a test call."
    },
    {
      "name": "is_even",
      "parameters": "number: an integer",
      "arity": 1,
      "rule": "Return True for an even integer and False otherwise. Zero is even.",
      "tests": [
        [
          4
        ],
        [
          7
        ],
        [
          0
        ]
      ],
      "values": [
        true,
        false,
        true
      ],
      "hint": "Use % to check the remainder. Return Boolean values, not strings such as \"True\".",
      "explain": "Explain why the zero test should return True."
    },
    {
      "name": "larger_number",
      "parameters": "a and b: numbers",
      "arity": 2,
      "rule": "Return the larger value. If the inputs are equal, return that value.",
      "tests": [
        [
          8,
          3
        ],
        [
          3,
          8
        ],
        [
          5,
          5
        ]
      ],
      "values": [
        8,
        8,
        5
      ],
      "hint": "Check both input orders and a tie. Return the value rather than the words \"a\" or \"b\".",
      "explain": "What do the reversed inputs and tie test show?"
    },
    {
      "name": "sum_between",
      "parameters": "a and b: integers, with a <= b",
      "arity": 2,
      "rule": "Return the sum of all integers from a through b, including both endpoints.",
      "tests": [
        [
          2,
          4
        ],
        [
          5,
          5
        ],
        [
          -2,
          2
        ]
      ],
      "values": [
        9,
        5,
        0
      ],
      "hint": "Keep the running total local. range excludes its stop, so think carefully about the endpoint.",
      "explain": "Explain the initial total and how your range includes b."
    },
    {
      "name": "factorial",
      "parameters": "number: a non-negative integer",
      "arity": 1,
      "rule": "Use a loop to return the factorial. 5! is 1 \u00d7 2 \u00d7 3 \u00d7 4 \u00d7 5. Both 0! and 1! are 1.",
      "tests": [
        [
          5
        ],
        [
          1
        ],
        [
          0
        ]
      ],
      "values": [
        120,
        1,
        1
      ],
      "hint": "Start the local product at 1. Do not use a math library. Negative inputs are outside this function\u2019s contract.",
      "explain": "Why does starting the product at 1 give the correct zero case?"
    },
    {
      "name": "is_prime",
      "parameters": "number: an integer",
      "arity": 1,
      "rule": "Return True for a prime number and False otherwise. A prime is greater than 1 and has only two positive factors: 1 and itself. Numbers below 2 are not prime.",
      "tests": [
        [
          -3
        ],
        [
          0
        ],
        [
          1
        ],
        [
          2
        ],
        [
          17
        ],
        [
          9
        ]
      ],
      "values": [
        false,
        false,
        false,
        true,
        true,
        false
      ],
      "hint": "Check divisors from 2 up to, but excluding, number. Use % and a local Boolean flag. A found factor makes it False; a later divisor must not reset it to True. Return after the divisor loop.",
      "explain": "Why is 9 a useful test even though it is odd? Why does 2 stay prime when its divisor loop has no turns?"
    }
  ],
  "sessions": [
    {
      "id": "double",
      "name": "1 / 5 / 0 \u2014 double and quit",
      "inputs": [
        "1",
        "5",
        "0"
      ],
      "items": [
        {
          "kind": "number",
          "label": "Double",
          "value": 10,
          "text": "Double: 10"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "double_number": 1
      },
      "callArguments": {
        "double_number": [
          [
            5
          ]
        ]
      },
      "returnValues": {
        "double_number": [
          10
        ]
      },
      "menuChoices": 2,
      "expected": "Double: 10\nGoodbye"
    },
    {
      "id": "odd",
      "name": "2 / 7 / 0 \u2014 odd",
      "inputs": [
        "2",
        "7",
        "0"
      ],
      "items": [
        {
          "kind": "odd",
          "text": "7 is odd"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "is_even": 1
      },
      "callArguments": {
        "is_even": [
          [
            7
          ]
        ]
      },
      "returnValues": {
        "is_even": [
          false
        ]
      },
      "menuChoices": 2,
      "expected": "7 is odd\nGoodbye"
    },
    {
      "id": "larger",
      "name": "3 / 3 / 8 / 0 \u2014 larger value",
      "inputs": [
        "3",
        "3",
        "8",
        "0"
      ],
      "items": [
        {
          "kind": "number",
          "label": "Larger",
          "value": 8,
          "text": "Larger: 8"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "larger_number": 1
      },
      "callArguments": {
        "larger_number": [
          [
            3,
            8
          ]
        ]
      },
      "returnValues": {
        "larger_number": [
          8
        ]
      },
      "menuChoices": 2,
      "expected": "Larger: 8\nGoodbye"
    },
    {
      "id": "sum",
      "name": "4 / 2 / 4 / 0 \u2014 inclusive sum",
      "inputs": [
        "4",
        "2",
        "4",
        "0"
      ],
      "items": [
        {
          "kind": "number",
          "label": "Sum",
          "value": 9,
          "text": "Sum: 9"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "sum_between": 1
      },
      "callArguments": {
        "sum_between": [
          [
            2,
            4
          ]
        ]
      },
      "returnValues": {
        "sum_between": [
          9
        ]
      },
      "menuChoices": 2,
      "expected": "Sum: 9\nGoodbye"
    },
    {
      "id": "factorial",
      "name": "5 / 0 / 0 \u2014 zero factorial",
      "inputs": [
        "5",
        "0",
        "0"
      ],
      "items": [
        {
          "kind": "number",
          "label": "Factorial",
          "value": 1,
          "text": "Factorial: 1"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "factorial": 1
      },
      "callArguments": {
        "factorial": [
          [
            0
          ]
        ]
      },
      "returnValues": {
        "factorial": [
          1
        ]
      },
      "menuChoices": 2,
      "expected": "Factorial: 1\nGoodbye"
    },
    {
      "id": "prime",
      "name": "6 / 2 / 0 \u2014 prime",
      "inputs": [
        "6",
        "2",
        "0"
      ],
      "items": [
        {
          "kind": "prime",
          "text": "2 is prime"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "is_prime": 1
      },
      "callArguments": {
        "is_prime": [
          [
            2
          ]
        ]
      },
      "returnValues": {
        "is_prime": [
          true
        ]
      },
      "menuChoices": 2,
      "expected": "2 is prime\nGoodbye"
    },
    {
      "id": "composite",
      "name": "6 / 9 / 0 \u2014 odd composite",
      "inputs": [
        "6",
        "9",
        "0"
      ],
      "items": [
        {
          "kind": "notprime",
          "text": "9 is not prime"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "is_prime": 1
      },
      "callArguments": {
        "is_prime": [
          [
            9
          ]
        ]
      },
      "returnValues": {
        "is_prime": [
          false
        ]
      },
      "menuChoices": 2,
      "expected": "9 is not prime\nGoodbye"
    },
    {
      "id": "negative",
      "name": "5 / -1 / 0 \u2014 reject before calculating",
      "inputs": [
        "5",
        "-1",
        "0"
      ],
      "items": [
        {
          "kind": "negative",
          "text": "Factorial needs a non-negative integer"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {},
      "callArguments": {},
      "returnValues": {},
      "menuChoices": 2,
      "expected": "Factorial needs a non-negative integer\nGoodbye"
    },
    {
      "id": "reversed",
      "name": "4 / 5 / 2 / 0 \u2014 reject reversed endpoints",
      "inputs": [
        "4",
        "5",
        "2",
        "0"
      ],
      "items": [
        {
          "kind": "range",
          "text": "Start must be at most end"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {},
      "callArguments": {},
      "returnValues": {},
      "menuChoices": 2,
      "expected": "Start must be at most end\nGoodbye"
    },
    {
      "id": "invalid",
      "name": "9 / 0 \u2014 invalid choice, no number",
      "inputs": [
        "9",
        "0"
      ],
      "items": [
        {
          "kind": "invalid",
          "text": "Invalid choice"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {},
      "callArguments": {},
      "returnValues": {},
      "menuChoices": 2,
      "expected": "Invalid choice\nGoodbye"
    },
    {
      "id": "quit",
      "name": "0 \u2014 quit immediately",
      "inputs": [
        "0"
      ],
      "items": [
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {},
      "callArguments": {},
      "returnValues": {},
      "menuChoices": 1,
      "expected": "Goodbye"
    },
    {
      "id": "mixed",
      "name": "Repeat a tool, then choose a different one",
      "inputs": [
        "1",
        "5",
        "1",
        "-3",
        "6",
        "17",
        "0"
      ],
      "items": [
        {
          "kind": "number",
          "label": "Double",
          "value": 10,
          "text": "Double: 10"
        },
        {
          "kind": "number",
          "label": "Double",
          "value": -6,
          "text": "Double: -6"
        },
        {
          "kind": "prime",
          "text": "17 is prime"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "double_number": 2,
        "is_prime": 1
      },
      "callArguments": {
        "double_number": [
          [
            5
          ],
          [
            -3
          ]
        ],
        "is_prime": [
          [
            17
          ]
        ]
      },
      "returnValues": {
        "double_number": [
          10,
          -6
        ],
        "is_prime": [
          true
        ]
      },
      "menuChoices": 4,
      "expected": "Double: 10\nDouble: -6\n17 is prime\nGoodbye"
    }
  ],
  "extras": [
    {
      "id": "double-zero",
      "name": "Double zero",
      "inputs": [
        "1",
        "0",
        "0"
      ],
      "items": [
        {
          "kind": "number",
          "label": "Double",
          "value": 0,
          "text": "Double: 0"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "double_number": 1
      },
      "callArguments": {
        "double_number": [
          [
            0
          ]
        ]
      },
      "returnValues": {
        "double_number": [
          0
        ]
      },
      "menuChoices": 2,
      "expected": "Double: 0\nGoodbye"
    },
    {
      "id": "even-zero",
      "name": "Zero is even",
      "inputs": [
        "2",
        "0",
        "0"
      ],
      "items": [
        {
          "kind": "even",
          "text": "0 is even"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "is_even": 1
      },
      "callArguments": {
        "is_even": [
          [
            0
          ]
        ]
      },
      "returnValues": {
        "is_even": [
          true
        ]
      },
      "menuChoices": 2,
      "expected": "0 is even\nGoodbye"
    },
    {
      "id": "negative-tie",
      "name": "Equal negative values",
      "inputs": [
        "3",
        "-2",
        "-2",
        "0"
      ],
      "items": [
        {
          "kind": "number",
          "label": "Larger",
          "value": -2,
          "text": "Larger: -2"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "larger_number": 1
      },
      "callArguments": {
        "larger_number": [
          [
            -2,
            -2
          ]
        ]
      },
      "returnValues": {
        "larger_number": [
          -2
        ]
      },
      "menuChoices": 2,
      "expected": "Larger: -2\nGoodbye"
    },
    {
      "id": "single",
      "name": "Equal sum endpoints",
      "inputs": [
        "4",
        "5",
        "5",
        "0"
      ],
      "items": [
        {
          "kind": "number",
          "label": "Sum",
          "value": 5,
          "text": "Sum: 5"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "sum_between": 1
      },
      "callArguments": {
        "sum_between": [
          [
            5,
            5
          ]
        ]
      },
      "returnValues": {
        "sum_between": [
          5
        ]
      },
      "menuChoices": 2,
      "expected": "Sum: 5\nGoodbye"
    },
    {
      "id": "factorial-repair",
      "name": "Reject a negative, then calculate",
      "inputs": [
        "5",
        "-1",
        "5",
        "5",
        "0"
      ],
      "items": [
        {
          "kind": "negative",
          "text": "Factorial needs a non-negative integer"
        },
        {
          "kind": "number",
          "label": "Factorial",
          "value": 120,
          "text": "Factorial: 120"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "factorial": 1
      },
      "callArguments": {
        "factorial": [
          [
            5
          ]
        ]
      },
      "returnValues": {
        "factorial": [
          120
        ]
      },
      "menuChoices": 3,
      "expected": "Factorial needs a non-negative integer\nFactorial: 120\nGoodbye"
    },
    {
      "id": "range-repair",
      "name": "Reject a range, then calculate",
      "inputs": [
        "4",
        "5",
        "2",
        "4",
        "2",
        "4",
        "0"
      ],
      "items": [
        {
          "kind": "range",
          "text": "Start must be at most end"
        },
        {
          "kind": "number",
          "label": "Sum",
          "value": 9,
          "text": "Sum: 9"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "sum_between": 1
      },
      "callArguments": {
        "sum_between": [
          [
            2,
            4
          ]
        ]
      },
      "returnValues": {
        "sum_between": [
          9
        ]
      },
      "menuChoices": 3,
      "expected": "Start must be at most end\nSum: 9\nGoodbye"
    },
    {
      "id": "text",
      "name": "Blank and unknown-letter choices",
      "inputs": [
        "",
        "x",
        "0"
      ],
      "items": [
        {
          "kind": "invalid",
          "text": "Invalid choice"
        },
        {
          "kind": "invalid",
          "text": "Invalid choice"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {},
      "callArguments": {},
      "returnValues": {},
      "menuChoices": 3,
      "expected": "Invalid choice\nInvalid choice\nGoodbye"
    },
    {
      "id": "prime-boundaries",
      "name": "Prime boundaries in one session",
      "inputs": [
        "6",
        "1",
        "6",
        "2",
        "6",
        "9",
        "0"
      ],
      "items": [
        {
          "kind": "notprime",
          "text": "1 is not prime"
        },
        {
          "kind": "prime",
          "text": "2 is prime"
        },
        {
          "kind": "notprime",
          "text": "9 is not prime"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "is_prime": 3
      },
      "callArguments": {
        "is_prime": [
          [
            1
          ],
          [
            2
          ],
          [
            9
          ]
        ]
      },
      "returnValues": {
        "is_prime": [
          false,
          true,
          false
        ]
      },
      "menuChoices": 4,
      "expected": "1 is not prime\n2 is prime\n9 is not prime\nGoodbye"
    },
    {
      "id": "fresh",
      "name": "Three tools, then repeat the first",
      "inputs": [
        "1",
        "5",
        "2",
        "7",
        "3",
        "3",
        "8",
        "1",
        "-3",
        "0"
      ],
      "items": [
        {
          "kind": "number",
          "label": "Double",
          "value": 10,
          "text": "Double: 10"
        },
        {
          "kind": "odd",
          "text": "7 is odd"
        },
        {
          "kind": "number",
          "label": "Larger",
          "value": 8,
          "text": "Larger: 8"
        },
        {
          "kind": "number",
          "label": "Double",
          "value": -6,
          "text": "Double: -6"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "double_number": 2,
        "is_even": 1,
        "larger_number": 1
      },
      "callArguments": {
        "double_number": [
          [
            5
          ],
          [
            -3
          ]
        ],
        "is_even": [
          [
            7
          ]
        ],
        "larger_number": [
          [
            3,
            8
          ]
        ]
      },
      "returnValues": {
        "double_number": [
          10,
          -6
        ],
        "is_even": [
          false
        ],
        "larger_number": [
          8
        ]
      },
      "menuChoices": 5,
      "expected": "Double: 10\n7 is odd\nLarger: 8\nDouble: -6\nGoodbye"
    },
    {
      "id": "regression",
      "name": "All six tools in one session",
      "inputs": [
        "1",
        "5",
        "2",
        "7",
        "3",
        "3",
        "8",
        "4",
        "2",
        "4",
        "5",
        "0",
        "6",
        "9",
        "0"
      ],
      "items": [
        {
          "kind": "number",
          "label": "Double",
          "value": 10,
          "text": "Double: 10"
        },
        {
          "kind": "odd",
          "text": "7 is odd"
        },
        {
          "kind": "number",
          "label": "Larger",
          "value": 8,
          "text": "Larger: 8"
        },
        {
          "kind": "number",
          "label": "Sum",
          "value": 9,
          "text": "Sum: 9"
        },
        {
          "kind": "number",
          "label": "Factorial",
          "value": 1,
          "text": "Factorial: 1"
        },
        {
          "kind": "notprime",
          "text": "9 is not prime"
        },
        {
          "kind": "goodbye",
          "text": "Goodbye"
        }
      ],
      "calls": {
        "double_number": 1,
        "is_even": 1,
        "larger_number": 1,
        "sum_between": 1,
        "factorial": 1,
        "is_prime": 1
      },
      "callArguments": {
        "double_number": [
          [
            5
          ]
        ],
        "is_even": [
          [
            7
          ]
        ],
        "larger_number": [
          [
            3,
            8
          ]
        ],
        "sum_between": [
          [
            2,
            4
          ]
        ],
        "factorial": [
          [
            0
          ]
        ],
        "is_prime": [
          [
            9
          ]
        ]
      },
      "returnValues": {
        "double_number": [
          10
        ],
        "is_even": [
          false
        ],
        "larger_number": [
          8
        ],
        "sum_between": [
          9
        ],
        "factorial": [
          1
        ],
        "is_prime": [
          false
        ]
      },
      "menuChoices": 7,
      "expected": "Double: 10\n7 is odd\nLarger: 8\nSum: 9\nFactorial: 1\n9 is not prime\nGoodbye"
    }
  ],
  "challenges": {
    "50": [
      {
        "number": 1,
        "brief": "SQUARE: Return a number squared. Test -3 and 0."
      },
      {
        "number": 2,
        "brief": "NEGATIVE: Return whether a number is negative. Test -1 and 0."
      },
      {
        "number": 3,
        "brief": "SMALLER: Return the smaller of two numbers, including a tie. Test (3,8) and (5,5)."
      },
      {
        "number": 4,
        "brief": "DIFFERENCE: Return a - b. Test (8,3) and (3,8); explain order."
      },
      {
        "number": 5,
        "brief": "DIVISIBILITY: Return whether number is divisible by a positive integer divisor. Test (12,3) and (12,5)."
      },
      {
        "number": 6,
        "brief": "ODD SUM: Return the odd-integer total from a through b (a <= b). Test (2,7) and (4,4). Reuse earlier work."
      },
      {
        "number": 7,
        "brief": "FACTORS: Return the count of positive factors of a positive integer. Test 1, 7, 9."
      },
      {
        "number": 8,
        "brief": "SQUARE TOTAL: Return 1 squared + ... + n squared for non-negative integer n. Test 3 and 0."
      },
      {
        "number": 9,
        "brief": "CUSTOM POWER: Return base raised to a non-negative integer exponent without ** or pow. Test (2,5), (5,0), (-2,3)."
      },
      {
        "number": 10,
        "brief": "REVERSE INTEGER: Use // and % to return the digits of a non-negative integer in reverse. Test 123, 120, 0."
      }
    ],
    "51": [
      {
        "number": 1,
        "brief": "Comment out old direct-test calls; KEEP the six definitions."
      },
      {
        "number": 2,
        "brief": "Write show_menu(), which only displays choices. No parameters or explicit return. Choices: 1 Double, 2 Even/odd, 3 Larger, 4 Inclusive sum, 5 Factorial, 6 Prime, 0 Quit."
      },
      {
        "number": 3,
        "brief": "Read a choice BEFORE the while loop. Repeat while choice != \"0\". Use if/elif/else, and read a NEW choice at the end of every turn."
      },
      {
        "number": 4,
        "brief": "Ask only for the selected tool's inputs. Call its function; display the return with a label. Boolean results should become friendly even/odd or prime/not-prime sentences. Do not repeat formulas in the menu."
      },
      {
        "number": 5,
        "brief": "Reject a negative factorial input and a reversed sum range (a > b) BEFORE calling the calculation. Show a message, then return to the menu."
      },
      {
        "number": 6,
        "brief": "Unknown choices display Invalid choice and ask for NO numeric input."
      },
      {
        "number": 7,
        "brief": "Choice 0 prints Goodbye and ends immediately without another value prompt. SAMPLE: Choice 1 / Number 5 / Double 10; Choice 6 / Integer 9 / 9 is not prime; Choice 0 / Goodbye. CHECKPOINT: First test choices 1 and 0. Add other branches one at a time. Rerun one old case after each change; use fresh values for each menu turn. REQUIRED TEST RECORD \u2014 predict, run, compare and repair Choice/input Expected Actual 1 / 5 Double 10 ______ 2 / 7 odd ______ 3 / 3 / 8 Larger 8 ______ 4 / 2 / 4 Sum 9 ______ 5 / 0 Factorial 1 ______ 6 / 2 prime ______ 6 / 9 not prime ______ 5 / -1 message, no calculation ______ 4 / 5 / 2 message, no calculation ______ 9 Invalid choice, no number ______ 0 as first choice Goodbye, no calculation ______ 1/5, then 1/-3, then 6/17, then 0 10, -6, prime, Goodbye ______ PARTNER CHECK Ask a partner to select two different tools, an invalid choice, then quit. Record inputs/results, one improvement and its retest. If no bug is found, improve a prompt/label and recheck calculations. Observation / improvement / retest: _________________________________ Explain how a returned Boolean controls a message: ___________________ Which input changes the loop condition? ______________________________ DAILY CHALLENGE CHOICES \u2014 use remaining time; ten are not a quota. Reuse a completed function/menu; add tests or changes rather than copies."
      },
      {
        "number": 8,
        "brief": "PRIME BOUNDARIES: Test 1, 2 and an odd composite in one menu session."
      },
      {
        "number": 9,
        "brief": "FRESH VALUES: Use three different tools and then repeat the first with a different value. Record the full session."
      },
      {
        "number": 10,
        "brief": "REGRESSION: After one menu repair or prompt improvement, run all six tools in one session and record expected/actual results."
      }
    ]
  },
  "starter": "# NUMBER TOOLS \u2014 keep one program for both stages\n# For each function: purpose / parameters / return comments.\n\n# 1. double_number(number)\n\n# 2. is_even(number)\n\n# 3. larger_number(a, b)\n\n# 4. sum_between(a, b)\n\n# 5. factorial(number)\n\n# 6. is_prime(number)\n\n# Day 50: add direct print(...) test calls after each function.\n# Day 51: comment out those test calls; keep the definitions.\n# Then add show_menu() and the main menu program below.\n",
  "blocks": [
    "Display the menu and read the first choice.",
    "Repeat while the choice is not \"0\".",
    "Inside the loop: handle the selected tool, or show Invalid choice.",
    "At the end of the turn: display the menu and read a new choice.",
    "After the loop: display Goodbye."
  ]
};
