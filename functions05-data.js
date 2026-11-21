window.CP11_FUNCTIONS05_DATA = {
  "model": "def add_tax(price):\n    return price * 1.05\n\nprint(f\"{add_tax(20):.2f}\")",
  "guided": "def celsius_to_fahrenheit(celsius):\n    return celsius * 9 / 5 + 32\n\nprint(celsius_to_fahrenheit(0))\nprint(celsius_to_fahrenheit(100))",
  "blocks": [
    "def add_tax(price):",
    "    return price * 1.05",
    "expected = 21",
    "actual = add_tax(20)",
    "print(actual == expected)"
  ],
  "predictions": [
    {
      "id": "tax",
      "code": "def add_tax(price):\n    return price * 1.05\n\nprint(f\"{add_tax(20):.2f}\")",
      "expected": "21.00",
      "why": "The expected total for 20 with 5% tax is 21. The function returns 21.0, and .2f displays it as 21.00.",
      "hint": "Calculate the expected total before tracing the function. Then check the two-decimal format.",
      "requires": {
        "names": [
          "add_tax"
        ],
        "arities": {
          "add_tax": 1
        },
        "calls": {
          "add_tax": 1
        },
        "returnFunctions": [
          "add_tax"
        ],
        "quietReturns": [
          "add_tax"
        ]
      }
    },
    {
      "id": "fault",
      "code": "def metres_to_centimetres(metres):\n    return metres * 10\n\nprint(metres_to_centimetres(0))\nprint(metres_to_centimetres(1))",
      "expected": "0\n10",
      "why": "This scratch version deliberately uses 10 instead of 100. The zero test still gives 0, but 1 metre incorrectly gives 10 centimetres. A zero test alone would miss the fault.",
      "hint": "Predict what the faulty code actually returns, not the correct conversion you wanted.",
      "requires": {
        "names": [
          "metres_to_centimetres"
        ],
        "arities": {
          "metres_to_centimetres": 1
        },
        "calls": {
          "metres_to_centimetres": 2
        },
        "returnFunctions": [
          "metres_to_centimetres"
        ],
        "quietReturns": [
          "metres_to_centimetres"
        ]
      }
    },
    {
      "id": "temperature",
      "code": "def celsius_to_fahrenheit(celsius):\n    return celsius * 9 / 5 + 32\n\nprint(celsius_to_fahrenheit(0))\nprint(celsius_to_fahrenheit(100))\nprint(celsius_to_fahrenheit(-40))",
      "expected": "32.0\n212.0\n-40.0",
      "why": "The three expected values are 32, 212 and -40. The division in the formula makes these returned numbers display with .0. Compare each actual result with its expectation.",
      "hint": "Use C * 9 / 5 + 32 for each of 0, 100 and -40.",
      "requires": {
        "names": [
          "celsius_to_fahrenheit"
        ],
        "arities": {
          "celsius_to_fahrenheit": 1
        },
        "calls": {
          "celsius_to_fahrenheit": 3
        },
        "returnFunctions": [
          "celsius_to_fahrenheit"
        ],
        "quietReturns": [
          "celsius_to_fahrenheit"
        ]
      }
    }
  ],
  "tasks": {
    "tax": {
      "title": "Check the tax result",
      "goal": "Write add_tax(price) to return price * 1.05. Use a call with 20 and display the returned total to two decimal places. Your expected output is 21.00.",
      "starter": "# Purpose: calculate a total including 5% tax\n# Parameters: price, a number. Returns: the total including tax.\n\n",
      "requires": {
        "names": [
          "add_tax"
        ],
        "arities": {
          "add_tax": 1
        },
        "calls": {
          "add_tax": 1
        },
        "returnFunctions": [
          "add_tax"
        ],
        "quietReturns": [
          "add_tax"
        ]
      },
      "cases": [
        {
          "name": "Known price and expected total",
          "expected": "21.00",
          "inputs": [],
          "callArguments": {
            "add_tax": [
              [
                20
              ]
            ]
          },
          "returnValues": {
            "add_tax": [
              21
            ]
          }
        }
      ]
    },
    "guide": {
      "title": "Compare the conversion results",
      "goal": "Run the starter and compare its results with 32 and 212. Then add a call with -40 and choose the three-test version below. Its expected result is -40; Python displays -40.0. Here, -40 is a valid special case, not a minimum accepted temperature.",
      "starter": "def celsius_to_fahrenheit(celsius):\n    return celsius * 9 / 5 + 32\n\nprint(celsius_to_fahrenheit(0))\nprint(celsius_to_fahrenheit(100))",
      "variant": true,
      "requires": {
        "names": [
          "celsius_to_fahrenheit"
        ],
        "arities": {
          "celsius_to_fahrenheit": 1
        },
        "calls": {
          "celsius_to_fahrenheit": 2
        },
        "returnFunctions": [
          "celsius_to_fahrenheit"
        ],
        "quietReturns": [
          "celsius_to_fahrenheit"
        ]
      },
      "cases": [
        {
          "name": "Two known temperature tests",
          "expected": "32.0\n212.0",
          "inputs": [],
          "callArguments": {
            "celsius_to_fahrenheit": [
              [
                0
              ],
              [
                100
              ]
            ]
          },
          "returnValues": {
            "celsius_to_fahrenheit": [
              32,
              212
            ]
          }
        }
      ]
    },
    "repair": {
      "title": "Return the value to the test",
      "goal": "The function currently prints a correct-looking total, but actual receives None. Replace that print with return so the test can receive the number. Keep the assignment and labelled print in the main program.",
      "starter": "def add_tax(price):\n    print(price * 1.05)\n\nactual = add_tax(20)\nprint(\"Actual:\", actual)",
      "requires": {
        "names": [
          "add_tax"
        ],
        "arities": {
          "add_tax": 1
        },
        "calls": {
          "add_tax": 1
        },
        "returnFunctions": [
          "add_tax"
        ],
        "quietReturns": [
          "add_tax"
        ],
        "storeReturns": [
          "add_tax"
        ]
      },
      "reflection": "Why did the original version store None even though it displayed a number? Is this a syntax, runtime or logic problem? Explain your choice.",
      "cases": [
        {
          "name": "The test receives the returned value",
          "expected": "Actual: 21.0",
          "inputs": [],
          "callArguments": {
            "add_tax": [
              [
                20
              ]
            ]
          },
          "returnValues": {
            "add_tax": [
              21
            ]
          }
        }
      ]
    },
    "boolean": {
      "title": "Test Boolean functions",
      "goal": "Write is_even(i) with if/else so it returns True or False. Test 4 and 7. Write div_by(n, d) for positive integers and test (10, 3) and (195, 13). Print the actual results in that order, or print labelled expected/actual rows. Record the expected and actual result of every case in your notes below. Both parameters of div_by must be positive integers. A zero divisor is outside this contract: identify it as invalid in your notes, without calling it or inventing a False result.",
      "starter": "# Purpose: return whether a positive integer is even\n# Parameters: i, a positive integer. Returns: True or False.\n\n# Write div_by(n, d) below, with its own purpose/parameters/return comments.\n",
      "requires": {
        "names": [
          "is_even",
          "div_by"
        ],
        "arities": {
          "is_even": 1,
          "div_by": 2
        },
        "calls": {
          "is_even": 2,
          "div_by": 2
        },
        "returnFunctions": [
          "is_even",
          "div_by"
        ],
        "quietReturns": [
          "is_even",
          "div_by"
        ],
        "ifElseFunctions": [
          "is_even"
        ]
      },
      "flexible": true,
      "reflection": "Record expected and actual results for 4, 7, (10, 3) and (195, 13). Explain one comparison.",
      "cases": [
        {
          "name": "Four Boolean results",
          "inputs": [],
          "expected": "True\nFalse\nFalse\nTrue",
          "callArguments": {
            "is_even": [
              [
                4
              ],
              [
                7
              ]
            ],
            "div_by": [
              [
                10,
                3
              ],
              [
                195,
                13
              ]
            ]
          },
          "returnValues": {
            "is_even": [
              true,
              false
            ],
            "div_by": [
              false,
              true
            ]
          },
          "semantic": {
            "kind": "booleanRows",
            "values": [
              true,
              false,
              false,
              true
            ]
          }
        }
      ]
    }
  },
  "projects": {
    "converter": {
      "title": "Check a metre-to-centimetre converter",
      "starter": "# Purpose: convert metres to centimetres\n# Parameter: metres, a number. Returns: centimetres.\n\n# 1. Write your function here.\n\n# 2. Build one test for 1 metre. See the worked test above.\n",
      "default": "one",
      "note": "Get one complete test working first. Then use the five-case step. Changing the step keeps your code.",
      "stages": [
        {
          "id": "one",
          "label": "1. Get one complete test working",
          "goal": "Start with 1 metre and an independently expected result of 100 centimetres. Store the function’s return in actual, compare actual with expected, and let if/else choose PASS or FAIL. Use the worked test above to see how the pieces fit together.",
          "reflection": "Which value did you predict before the call? Which value came back from the function? How does the comparison choose PASS or FAIL?",
          "requires": {
            "names": [
              "metres_to_centimetres"
            ],
            "arities": {
              "metres_to_centimetres": 1
            },
            "calls": {
              "metres_to_centimetres": 1
            },
            "returnFunctions": [
              "metres_to_centimetres"
            ],
            "quietReturns": [
              "metres_to_centimetres"
            ],
            "comparesReturned": "metres_to_centimetres"
          },
          "cases": []
        },
        {
          "id": "five",
          "label": "2. Extend the working test to all five cases",
          "goal": "Keep the same testing pattern and extend it to 0, 1, 2.5, -1 and your chosen input. For each case, write the expected value independently, store the actual return, and compare them. Print labelled Input, Expected and Actual values with PASS or FAIL. You can use one line or several lines for each test. The five tests can run in any order.",
          "reflection": "What does each test check? Does your chosen input add different evidence or repeat another case? Explain why more tests are not automatically better, and why this function must return its result.",
          "requires": {
            "names": [
              "metres_to_centimetres"
            ],
            "arities": {
              "metres_to_centimetres": 1
            },
            "calls": {
              "metres_to_centimetres": 5
            },
            "returnFunctions": [
              "metres_to_centimetres"
            ],
            "quietReturns": [
              "metres_to_centimetres"
            ],
            "comparesReturned": "metres_to_centimetres"
          },
          "cases": []
        }
      ]
    },
    "scratch": {
      "title": "Scratch copy: find and repair the fault",
      "starter": "# Copy your five-test converter program here.\n# Keep the working version in the editor above.\n# Change its multiplier to 10 for the fault test.\n",
      "default": "broken",
      "note": "Copy your working five-test program into this separate editor. Keep the original converter above. Keep every input and prediction unchanged.",
      "stages": [
        {
          "id": "broken",
          "label": "2. Broken scratch copy · multiplier 10",
          "goal": "Change only the converter’s multiplier from 100 to 10. Predict which rows will still pass, then run all five tests. A FAIL is useful evidence here: it shows a test caught the fault.",
          "reflection": "Which tests exposed the wrong multiplier? Why does a zero test miss it? Keep your five inputs and predictions unchanged.",
          "requires": {
            "names": [
              "metres_to_centimetres"
            ],
            "arities": {
              "metres_to_centimetres": 1
            },
            "calls": {
              "metres_to_centimetres": 5
            },
            "returnFunctions": [
              "metres_to_centimetres"
            ],
            "quietReturns": [
              "metres_to_centimetres"
            ],
            "comparesReturned": "metres_to_centimetres"
          },
          "cases": []
        },
        {
          "id": "restored",
          "label": "3. Repaired scratch copy · multiplier 100",
          "goal": "Restore the multiplier to 100 and rerun the same five tests. Compare the repaired results with your original expectations. This checks that the repair has preserved earlier correct behaviour.",
          "reflection": "Explain what you repaired, what the five retests showed, and what the function returns. Why could a passing zero test alone not prove the conversion was correct?",
          "requires": {
            "names": [
              "metres_to_centimetres"
            ],
            "arities": {
              "metres_to_centimetres": 1
            },
            "calls": {
              "metres_to_centimetres": 5
            },
            "returnFunctions": [
              "metres_to_centimetres"
            ],
            "quietReturns": [
              "metres_to_centimetres"
            ],
            "comparesReturned": "metres_to_centimetres"
          },
          "cases": []
        }
      ]
    }
  },
  "challenges": [
    {
      "number": 1,
      "brief": "AREA: Test rectangle_area(3,4)=12 and rectangle_area(0,4)=0."
    },
    {
      "number": 2,
      "brief": "SALE: Test a 20%-off function with $10->$8 and $0->$0."
    },
    {
      "number": 3,
      "brief": "TEMP: Test Celsius conversion at 0->32 and 100->212."
    },
    {
      "number": 4,
      "brief": "TICKET: Test ages 12 and 13 where the price changes."
    },
    {
      "number": 5,
      "brief": "TIME: Test hours_to_minutes(0)=0 and (2.5)=150. Use the same function for two separate user cases; do not duplicate the function body."
    },
    {
      "number": 6,
      "brief": "PAIRS: Test complete_pairs(8)=4 and (9)=4. Include an if/else inside your function to give useful feedback for a boundary case you specify."
    },
    {
      "number": 7,
      "brief": "LEFTOVERS: Test leftover(8)=0 and leftover(9)=1 for pairs. Call your function from a loop for three user cases; ensure each case starts with fresh working values."
    },
    {
      "number": 8,
      "brief": "DELIVERY: Test free-delivery threshold at $29.99 and $30. Connect this function with a second already-taught calculation or display function; explain the call order."
    },
    {
      "number": 9,
      "brief": "BOUNDARY FUNCTION: Write shipping_fee(subtotal): below $30 returns 5, otherwise 0. Test 29.99,30,30.01. Deliberately break the comparison in a scratch copy and prove the boundary test catches it."
    },
    {
      "number": 10,
      "brief": "ROUND-UP FUNCTION: Write containers_needed(items,capacity) for non- negative items and positive capacity using // and %. Test 0/6 ->0; 6/6 ->1; 7/6 ->2. Use results in a $2-per-container quote."
    }
  ]
};
