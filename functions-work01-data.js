window.CP11_FUNCTIONS_WORK01_DATA = {
  "bank": [
    {
      "id": 1,
      "name": "double_number",
      "parameters": [
        "number"
      ],
      "arity": 1,
      "level": 1,
      "rule": "Any number; return twice its value.",
      "hint": "Multiply the parameter by 2.",
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
      "inputType": "float",
      "domain": "",
      "avoid": []
    },
    {
      "id": 2,
      "name": "add",
      "parameters": [
        "a",
        "b"
      ],
      "arity": 2,
      "level": 1,
      "rule": "Two numbers; return their sum.",
      "hint": "Use one addition expression.",
      "tests": [
        [
          3,
          4
        ],
        [
          0,
          0
        ],
        [
          -2,
          5
        ]
      ],
      "values": [
        7,
        0,
        3
      ],
      "inputType": "float",
      "domain": "",
      "avoid": []
    },
    {
      "id": 3,
      "name": "subtract",
      "parameters": [
        "a",
        "b"
      ],
      "arity": 2,
      "level": 1,
      "rule": "Two numbers; return a minus b.",
      "hint": "Argument order matters.",
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
          0,
          0
        ]
      ],
      "values": [
        5,
        -5,
        0
      ],
      "inputType": "float",
      "domain": "",
      "avoid": []
    },
    {
      "id": 4,
      "name": "multiply",
      "parameters": [
        "a",
        "b"
      ],
      "arity": 2,
      "level": 1,
      "rule": "Two numbers; return their product.",
      "hint": "Use multiplication, not repeated input.",
      "tests": [
        [
          3,
          4
        ],
        [
          0,
          5
        ],
        [
          -2,
          3
        ]
      ],
      "values": [
        12,
        0,
        -6
      ],
      "inputType": "float",
      "domain": "",
      "avoid": []
    },
    {
      "id": 5,
      "name": "square",
      "parameters": [
        "number"
      ],
      "arity": 1,
      "level": 1,
      "rule": "Any number; return the number multiplied by itself.",
      "hint": "A negative value squared is positive.",
      "tests": [
        [
          3
        ],
        [
          0
        ],
        [
          -3
        ]
      ],
      "values": [
        9,
        0,
        9
      ],
      "inputType": "float",
      "domain": "",
      "avoid": []
    },
    {
      "id": 6,
      "name": "half",
      "parameters": [
        "number"
      ],
      "arity": 1,
      "level": 1,
      "rule": "Any number; return half its value.",
      "hint": "Use / so odd inputs can give a decimal.",
      "tests": [
        [
          8
        ],
        [
          5
        ],
        [
          -3
        ]
      ],
      "values": [
        4,
        2.5,
        -1.5
      ],
      "inputType": "float",
      "domain": "",
      "avoid": []
    },
    {
      "id": 7,
      "name": "sum_three",
      "parameters": [
        "a",
        "b",
        "c"
      ],
      "arity": 3,
      "level": 1,
      "rule": "Three numbers; return their sum.",
      "hint": "Use all three parameters.",
      "tests": [
        [
          1,
          2,
          3
        ],
        [
          0,
          0,
          0
        ],
        [
          -1,
          2,
          -3
        ]
      ],
      "values": [
        6,
        0,
        -2
      ],
      "inputType": "float",
      "domain": "",
      "avoid": []
    },
    {
      "id": 8,
      "name": "average_two",
      "parameters": [
        "a",
        "b"
      ],
      "arity": 2,
      "level": 1,
      "rule": "Two numbers; return their average.",
      "hint": "Add first, then divide by 2; use parentheses.",
      "tests": [
        [
          4,
          8
        ],
        [
          1,
          2
        ],
        [
          -2,
          2
        ]
      ],
      "values": [
        6,
        1.5,
        0
      ],
      "inputType": "float",
      "domain": "",
      "avoid": []
    },
    {
      "id": 9,
      "name": "largest_three",
      "parameters": [
        "a",
        "b",
        "c"
      ],
      "arity": 3,
      "level": 2,
      "rule": "Three numbers; return the largest VALUE, including ties.",
      "hint": "Compare/update a local candidate; do not use max().",
      "tests": [
        [
          3,
          8,
          5
        ],
        [
          7,
          7,
          2
        ],
        [
          -5,
          -2,
          -9
        ]
      ],
      "values": [
        8,
        7,
        -2
      ],
      "inputType": "float",
      "domain": "",
      "avoid": [
        "max"
      ]
    },
    {
      "id": 10,
      "name": "smallest_three",
      "parameters": [
        "a",
        "b",
        "c"
      ],
      "arity": 3,
      "level": 2,
      "rule": "Three numbers; return the smallest VALUE, including ties.",
      "hint": "Compare/update a local candidate; do not use min().",
      "tests": [
        [
          3,
          8,
          5
        ],
        [
          7,
          7,
          2
        ],
        [
          -5,
          -2,
          -9
        ]
      ],
      "values": [
        3,
        2,
        -9
      ],
      "inputType": "float",
      "domain": "",
      "avoid": [
        "min"
      ]
    },
    {
      "id": 11,
      "name": "sum_between",
      "parameters": [
        "a",
        "b"
      ],
      "arity": 2,
      "level": 2,
      "rule": "Integers with a <= b; return their inclusive sum.",
      "hint": "range excludes its stop; start total at 0.",
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
      "inputType": "int",
      "domain": "range",
      "avoid": []
    },
    {
      "id": 12,
      "name": "sum_odds_between",
      "parameters": [
        "a",
        "b"
      ],
      "arity": 2,
      "level": 2,
      "rule": "Integers with a <= b; return the sum of odd integers, inclusive.",
      "hint": "Use % 2 to select odd values before adding.",
      "tests": [
        [
          2,
          7
        ],
        [
          4,
          4
        ],
        [
          -3,
          1
        ]
      ],
      "values": [
        15,
        0,
        -3
      ],
      "inputType": "int",
      "domain": "range",
      "avoid": []
    },
    {
      "id": 13,
      "name": "count_even_between",
      "parameters": [
        "a",
        "b"
      ],
      "arity": 2,
      "level": 2,
      "rule": "Integers with a <= b; return how many are even, inclusive.",
      "hint": "Count matches, not their sum. Zero is even.",
      "tests": [
        [
          1,
          6
        ],
        [
          3,
          3
        ],
        [
          -2,
          2
        ]
      ],
      "values": [
        3,
        0,
        3
      ],
      "inputType": "int",
      "domain": "range",
      "avoid": []
    },
    {
      "id": 14,
      "name": "count_factors",
      "parameters": [
        "number"
      ],
      "arity": 1,
      "level": 2,
      "rule": "A positive integer; return its count of positive factors.",
      "hint": "Try 1 through number inclusive; a factor has remainder 0.",
      "tests": [
        [
          1
        ],
        [
          7
        ],
        [
          9
        ]
      ],
      "values": [
        1,
        2,
        3
      ],
      "inputType": "int",
      "domain": "positive",
      "avoid": []
    },
    {
      "id": 15,
      "name": "is_prime",
      "parameters": [
        "number"
      ],
      "arity": 1,
      "level": 3,
      "rule": "Any integer; return True for prime, otherwise False.",
      "hint": "A prime is >1 with exactly two positive factors: 1 and itself. Below 2 is False. Try divisors 2 through number-1 using %. Start a flag True; any factor makes it False. Never reset it True in a later loop turn; return AFTER the loop. Subtraction alone does not test primality.",
      "tests": [
        [
          1
        ],
        [
          2
        ],
        [
          9
        ]
      ],
      "values": [
        false,
        true,
        false
      ],
      "inputType": "int",
      "domain": "",
      "avoid": []
    },
    {
      "id": 16,
      "name": "factorial",
      "parameters": [
        "number"
      ],
      "arity": 1,
      "level": 3,
      "rule": "A non-negative integer; return its factorial.",
      "hint": "5! = 1*2*3*4*5 = 120. Both 0! and 1! equal 1. Start product at 1, multiply integers 1 through number, then return. Do not use math.factorial().",
      "tests": [
        [
          0
        ],
        [
          1
        ],
        [
          5
        ]
      ],
      "values": [
        1,
        1,
        120
      ],
      "inputType": "int",
      "domain": "nonnegative",
      "avoid": []
    },
    {
      "id": 17,
      "name": "hcf",
      "parameters": [
        "a",
        "b"
      ],
      "arity": 2,
      "level": 3,
      "rule": "Two positive integers; return their highest common factor.",
      "hint": "HCF is the largest positive integer dividing BOTH inputs exactly. For 12 and 18 it is 6. Try divisors from 1 through the smaller input; when both remainders are 0, remember that divisor. Return the largest remembered factor.",
      "tests": [
        [
          12,
          18
        ],
        [
          7,
          7
        ],
        [
          1,
          9
        ]
      ],
      "values": [
        6,
        7,
        1
      ],
      "inputType": "int",
      "domain": "positive_both",
      "avoid": []
    },
    {
      "id": 18,
      "name": "lcm",
      "parameters": [
        "a",
        "b"
      ],
      "arity": 2,
      "level": 3,
      "rule": "Two positive integers; return their lowest common multiple.",
      "hint": "LCM is the smallest positive integer divisible by BOTH inputs. For 12 and 18 it is 36. Start with a, then add a each turn until the candidate is divisible by b. Positive inputs guarantee a common multiple by a*b. Do not use math.lcm().",
      "tests": [
        [
          12,
          18
        ],
        [
          4,
          6
        ],
        [
          1,
          9
        ]
      ],
      "values": [
        36,
        12,
        9
      ],
      "inputType": "int",
      "domain": "positive_both",
      "avoid": []
    }
  ],
  "legacyNames": [
    "double_number",
    "is_even",
    "larger_number",
    "sum_between",
    "factorial",
    "is_prime"
  ],
  "starter": "# NUMBER TOOLS — Days 49 and 50\n# Name:\n# Choose 3 Level 1, 2 Level 2 and 1 Level 3 functions.\n# Keep your design, code and test records together in this file.\n\n# Use “Add a comment guide” for the function you are working on.\n# Write your own function and direct print(...) test calls below its comments.\n"
};
