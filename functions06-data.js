window.CP11_FUNCTIONS06_DATA = {
  "model": "def show_total():\n    subtotal = 8\n    print(subtotal)\n\nshow_total()",
  "guided": "def calculate_area(length, width):\n    area = length * width\n    return area\n\nprint(calculate_area(2, 5))",
  "blocks": [
    "def calculate_area(length, width):",
    "    area = length * width",
    "    return area",
    "print(calculate_area(2, 5))",
    "print(calculate_area(0, 5))"
  ],
  "predictions": [
    {
      "id": "local",
      "code": "def show_total():\n    subtotal = 8\n    print(subtotal)\n\nshow_total()",
      "expected": "8",
      "why": "subtotal is created inside this call. The function displays 8; its name is not made available to the caller.",
      "hint": "Follow show_total() into the body. There is one print.",
      "requires": {
        "names": [
          "show_total"
        ],
        "arities": {
          "show_total": 0
        },
        "calls": {
          "show_total": 1
        },
        "isolatedFunctions": [
          "show_total"
        ],
        "localVariables": {
          "show_total": [
            "subtotal"
          ]
        }
      }
    },
    {
      "id": "scope",
      "code": "def calculate_area(length, width):\n    area = length * width\n    return area\n\narea = 99\nprint(calculate_area(2, 5))\nprint(area)",
      "expected": "10\n99",
      "why": "The function uses its local area to return 10. The separate outside area stays 99.",
      "hint": "The local area and the outside area are separate variables.",
      "requires": {
        "names": [
          "calculate_area"
        ],
        "arities": {
          "calculate_area": 2
        },
        "calls": {
          "calculate_area": 1
        },
        "isolatedFunctions": [
          "calculate_area"
        ],
        "returnFunctions": [
          "calculate_area"
        ],
        "quietReturns": [
          "calculate_area"
        ],
        "localVariables": {
          "calculate_area": [
            "area"
          ]
        }
      }
    },
    {
      "id": "trace",
      "code": "def total_numbers(a, b):\n    total = 0\n    for number in range(a, b):\n        total += number\n        print(number, total)  # temporary trace\n    return total\n\nprint(total_numbers(2, 4))",
      "expected": "2 2\n3 5\n5",
      "why": "range(2, 4) visits 2 and 3. The trace shows the local total changing, then the caller prints the returned 5. The endpoint 4 is missing.",
      "hint": "range stops before its second argument. The last print is outside the function.",
      "requires": {
        "names": [
          "total_numbers"
        ],
        "arities": {
          "total_numbers": 2
        },
        "calls": {
          "total_numbers": 1
        },
        "isolatedFunctions": [
          "total_numbers"
        ],
        "localVariables": {
          "total_numbers": [
            "total"
          ]
        }
      }
    }
  ],
  "tasks": {
    "local": {
      "title": "Try the local subtotal",
      "goal": "Write show_total() with no parameters. Create subtotal = 8 inside it and print that local value. Call the function once.",
      "starter": "# Purpose: display a local subtotal\n# Parameters: none. Returns: no explicit return.\n\n",
      "requires": {
        "names": [
          "show_total"
        ],
        "arities": {
          "show_total": 0
        },
        "calls": {
          "show_total": 1
        },
        "isolatedFunctions": [
          "show_total"
        ],
        "localVariables": {
          "show_total": [
            "subtotal"
          ]
        }
      },
      "cases": [
        {
          "name": "One local subtotal",
          "expected": "8",
          "inputs": [],
          "callArguments": {
            "show_total": [
              []
            ]
          }
        }
      ],
      "reflection": "Where is subtotal created? Could the caller use that name without defining its own subtotal?"
    },
    "guide": {
      "title": "Return the local area",
      "goal": "Run the starter with (2, 5). Then add a call with (0, 5) and choose the two-call version. Keep area inside the function and display the returned results outside it.",
      "starter": "def calculate_area(length, width):\n    area = length * width\n    return area\n\nprint(calculate_area(2, 5))",
      "requires": {
        "names": [
          "calculate_area"
        ],
        "arities": {
          "calculate_area": 2
        },
        "calls": {
          "calculate_area": 1
        },
        "isolatedFunctions": [
          "calculate_area"
        ],
        "returnFunctions": [
          "calculate_area"
        ],
        "quietReturns": [
          "calculate_area"
        ],
        "localVariables": {
          "calculate_area": [
            "area"
          ]
        }
      },
      "cases": [
        {
          "name": "First rectangle",
          "expected": "10",
          "inputs": [],
          "callArguments": {
            "calculate_area": [
              [
                2,
                5
              ]
            ]
          },
          "returnValues": {
            "calculate_area": [
              10
            ]
          }
        }
      ],
      "variant": true,
      "reflection": "Record the expected and actual results. Why can the caller display the result even though area is local?"
    },
    "repair": {
      "title": "Remove a hidden outside value",
      "goal": "This version uses outside_length instead of the length parameter. It runs, but gives 495 instead of 10. Repair the calculation so it uses only the two parameters. Keep area local.",
      "starter": "outside_length = 99\n\ndef calculate_area(length, width):\n    area = outside_length * width\n    return area\n\nprint(calculate_area(2, 5))",
      "requires": {
        "names": [
          "calculate_area"
        ],
        "arities": {
          "calculate_area": 2
        },
        "calls": {
          "calculate_area": 1
        },
        "isolatedFunctions": [
          "calculate_area"
        ],
        "returnFunctions": [
          "calculate_area"
        ],
        "quietReturns": [
          "calculate_area"
        ],
        "localVariables": {
          "calculate_area": [
            "area"
          ]
        }
      },
      "cases": [
        {
          "name": "Use the supplied length",
          "expected": "10",
          "inputs": [],
          "callArguments": {
            "calculate_area": [
              [
                2,
                5
              ]
            ]
          },
          "returnValues": {
            "calculate_area": [
              10
            ]
          }
        }
      ],
      "reflection": "Was the original problem a syntax, runtime or logic error? Which test exposed it?"
    },
    "energy": {
      "title": "Apply the idea: kinetic energy",
      "goal": "Write kinetic_energy(mass, velocity), returning 0.5 * mass * velocity * velocity. Mass is in kilograms, velocity in metres per second, and the result is in joules. Test (2, 3), (4, 0), and (1, -2), in that order. Display each result outside the function.",
      "starter": "# Purpose: calculate kinetic energy\n# Parameters: mass in kg and velocity in m/s. Returns: energy in joules.\n\n",
      "requires": {
        "names": [
          "kinetic_energy"
        ],
        "arities": {
          "kinetic_energy": 2
        },
        "calls": {
          "kinetic_energy": 3
        },
        "isolatedFunctions": [
          "kinetic_energy"
        ],
        "returnFunctions": [
          "kinetic_energy"
        ],
        "quietReturns": [
          "kinetic_energy"
        ]
      },
      "cases": [
        {
          "name": "Three energy tests",
          "expected": "9.0\n0.0\n2.0",
          "inputs": [],
          "callArguments": {
            "kinetic_energy": [
              [
                2,
                3
              ],
              [
                4,
                0
              ],
              [
                1,
                -2
              ]
            ]
          },
          "returnValues": {
            "kinetic_energy": [
              9,
              0,
              2
            ]
          },
          "semantic": {
            "kind": "numericResults",
            "values": [
              9,
              0,
              2
            ]
          }
        }
      ],
      "flexible": true,
      "reflection": "Record the expected and actual values. Which names are local to a call, and why does a negative velocity still give positive energy?"
    }
  },
  "projects": {
    "sale": {
      "title": "Your program: a self-contained sale function",
      "starter": "# Purpose: calculate a price after a 20% discount\n# Parameter: price, a number. Returns: the sale price.\n\n# Write sale_price(price), then add your test calls.\n",
      "note": "Use fixed argument values. Write your own function and display original and sale prices to two decimal places.",
      "default": "prices",
      "stages": [
        {
          "id": "prices",
          "label": "1. Test two sale prices",
          "goal": "Define sale_price(price). Create a local discount equal to 20% of the supplied price, then return price minus discount. Call it with 10 and 0. Display a labelled original/sale row for each.",
          "requires": {
            "names": [
              "sale_price"
            ],
            "arities": {
              "sale_price": 1
            },
            "calls": {
              "sale_price": 2
            },
            "isolatedFunctions": [
              "sale_price"
            ],
            "returnFunctions": [
              "sale_price"
            ],
            "quietReturns": [
              "sale_price"
            ],
            "localVariables": {
              "sale_price": [
                "discount"
              ]
            }
          },
          "cases": [
            {
              "name": "Two prices",
              "expected": "Original: $10.00 | Sale: $8.00\nOriginal: $0.00 | Sale: $0.00",
              "inputs": [],
              "callArguments": {
                "sale_price": [
                  [
                    10
                  ],
                  [
                    0
                  ]
                ]
              },
              "returnValues": {
                "sale_price": [
                  8,
                  0
                ]
              },
              "semantic": {
                "kind": "saleRows",
                "original": [
                  10,
                  0
                ],
                "values": [
                  8,
                  0
                ]
              }
            }
          ],
          "reflection": "What are the local names? How does the returned value reach the caller?"
        },
        {
          "id": "outside",
          "label": "2. Change an outside price",
          "goal": "Keep your first two tests. Give an outside variable named price a value different from 10, then change that outside value before a third call with 10. The third sale price must still be $8.00. Your function must use its parameter. Keep three test rows in the order 10, 0, 10.",
          "requires": {
            "names": [
              "sale_price"
            ],
            "arities": {
              "sale_price": 1
            },
            "calls": {
              "sale_price": 3
            },
            "isolatedFunctions": [
              "sale_price"
            ],
            "returnFunctions": [
              "sale_price"
            ],
            "quietReturns": [
              "sale_price"
            ],
            "localVariables": {
              "sale_price": [
                "discount"
              ]
            },
            "changedOutside": "price"
          },
          "cases": [
            {
              "name": "An outside change must not affect the argument",
              "expected": "Original: $10.00 | Sale: $8.00\nOriginal: $0.00 | Sale: $0.00\nOriginal: $10.00 | Sale: $8.00",
              "inputs": [],
              "callArguments": {
                "sale_price": [
                  [
                    10
                  ],
                  [
                    0
                  ],
                  [
                    10
                  ]
                ]
              },
              "returnValues": {
                "sale_price": [
                  8,
                  0,
                  8
                ]
              },
              "semantic": {
                "kind": "saleRows",
                "original": [
                  10,
                  0,
                  10
                ],
                "values": [
                  8,
                  0,
                  8
                ]
              }
            }
          ],
          "reflection": "Record your two outside price values. Which test would reveal a function that depends on a hidden outside price?"
        }
      ]
    },
    "orders": {
      "title": "Independent orders: keep the unit price local",
      "starter": "# Add purpose / parameter / return comments.\n# Define order_total(quantity), then write the outside code.\n",
      "note": "This work also satisfies Challenge 9. Keep this one program and its test records; do not write another copy.",
      "default": "forward",
      "stages": [
        {
          "id": "forward",
          "label": "1. Quantities 2, 5, 0",
          "goal": "Write order_total(quantity) with a local unit_price of 3, returning the total. Outside the function, set unit_price to 99. Call the function for quantities 2, 5 and 0, then display the outside unit_price. You may print the three totals on one line or on separate lines.",
          "requires": {
            "names": [
              "order_total"
            ],
            "arities": {
              "order_total": 1
            },
            "calls": {
              "order_total": 3
            },
            "isolatedFunctions": [
              "order_total"
            ],
            "returnFunctions": [
              "order_total"
            ],
            "quietReturns": [
              "order_total"
            ],
            "localVariables": {
              "order_total": [
                "unit_price"
              ]
            },
            "localConstants": {
              "order_total": {
                "unit_price": 3
              }
            },
            "globalsUnchanged": {
              "unit_price": 99
            }
          },
          "cases": [
            {
              "name": "Separate local and outside prices",
              "expected": "6 15 0\nOutside price: 99",
              "inputs": [],
              "callArguments": {
                "order_total": [
                  [
                    2
                  ],
                  [
                    5
                  ],
                  [
                    0
                  ]
                ]
              },
              "returnValues": {
                "order_total": [
                  6,
                  15,
                  0
                ]
              },
              "semantic": {
                "kind": "numericResults",
                "values": [
                  6,
                  15,
                  0,
                  99
                ]
              }
            }
          ],
          "reflection": "Why does each call use 3 while the outside unit_price remains 99?"
        },
        {
          "id": "reverse",
          "label": "2. Reverse the calls",
          "goal": "Keep the same function. Reverse the call order to quantities 0, 5 and 2, then display the outside unit_price again. Compare each quantity\u2019s result with the first run.",
          "requires": {
            "names": [
              "order_total"
            ],
            "arities": {
              "order_total": 1
            },
            "calls": {
              "order_total": 3
            },
            "isolatedFunctions": [
              "order_total"
            ],
            "returnFunctions": [
              "order_total"
            ],
            "quietReturns": [
              "order_total"
            ],
            "localVariables": {
              "order_total": [
                "unit_price"
              ]
            },
            "localConstants": {
              "order_total": {
                "unit_price": 3
              }
            },
            "globalsUnchanged": {
              "unit_price": 99
            }
          },
          "cases": [
            {
              "name": "Same results in reverse order",
              "expected": "0 15 6\nOutside price: 99",
              "inputs": [],
              "callArguments": {
                "order_total": [
                  [
                    0
                  ],
                  [
                    5
                  ],
                  [
                    2
                  ]
                ]
              },
              "returnValues": {
                "order_total": [
                  0,
                  15,
                  6
                ]
              },
              "semantic": {
                "kind": "numericResults",
                "values": [
                  0,
                  15,
                  6,
                  99
                ]
              }
            }
          ],
          "reflection": "Record both call orders. What evidence shows that one order did not change the next call?"
        }
      ]
    },
    "debug": {
      "title": "Further practice: odd totals and debugging",
      "starter": "def total_numbers(a, b):\n    total = 0\n    for number in range(a, b):\n        total += number\n        print(number, total)  # temporary trace\n    return total\n\nprint(total_numbers(2, 4))",
      "note": "Use remaining time on this activity or the challenges. You do not need to finish both. Keep the local running total inside each call.",
      "default": "trace",
      "stages": [
        {
          "id": "trace",
          "label": "1. Trace the missing endpoint",
          "goal": "Start with the simpler total_numbers(a, b) program. Predict its trace for (2, 4), run it, and identify the missing endpoint. The final total is 5, but adding all numbers from 2 through 4 should give 9.",
          "requires": {
            "names": [
              "total_numbers"
            ],
            "arities": {
              "total_numbers": 2
            },
            "calls": {
              "total_numbers": 1
            },
            "isolatedFunctions": [
              "total_numbers"
            ],
            "localVariables": {
              "total_numbers": [
                "total"
              ]
            }
          },
          "cases": [
            {
              "name": "Original trace",
              "expected": "2 2\n3 5\n5",
              "inputs": [],
              "callArguments": {
                "total_numbers": [
                  [
                    2,
                    4
                  ]
                ]
              },
              "returnValues": {
                "total_numbers": [
                  5
                ]
              }
            }
          ],
          "reflection": "Which endpoint is missing, and why?"
        },
        {
          "id": "endpoint",
          "label": "2. Include both endpoints",
          "goal": "Change range(a, b) to range(a, b + 1). Keep the trace while you test. The final returned total for (2, 4) should now be 9.",
          "requires": {
            "names": [
              "total_numbers"
            ],
            "arities": {
              "total_numbers": 2
            },
            "calls": {
              "total_numbers": 1
            },
            "isolatedFunctions": [
              "total_numbers"
            ],
            "localVariables": {
              "total_numbers": [
                "total"
              ]
            }
          },
          "cases": [
            {
              "name": "Inclusive trace",
              "expected": "2 2\n3 5\n4 9\n9",
              "inputs": [],
              "callArguments": {
                "total_numbers": [
                  [
                    2,
                    4
                  ]
                ]
              },
              "returnValues": {
                "total_numbers": [
                  9
                ]
              }
            }
          ],
          "reflection": "Explain the endpoint repair before adding the odd-number condition."
        },
        {
          "id": "odd",
          "label": "3. Return only the odd total",
          "goal": "Rename the function sum_odd(a, b). Add if number % 2 == 1 before the total update, and indent that update under the if. Once it works, remove or comment out the temporary trace. Test (2, 4), (2, 7), (4, 4), (5, 5), in that order. Assume integers a <= b.",
          "requires": {
            "names": [
              "sum_odd"
            ],
            "arities": {
              "sum_odd": 2
            },
            "calls": {
              "sum_odd": 4
            },
            "isolatedFunctions": [
              "sum_odd"
            ],
            "returnFunctions": [
              "sum_odd"
            ],
            "quietReturns": [
              "sum_odd"
            ],
            "decision": true,
            "loopInFunction": "sum_odd"
          },
          "cases": [
            {
              "name": "Four inclusive odd totals",
              "expected": "3\n15\n0\n5",
              "inputs": [],
              "callArguments": {
                "sum_odd": [
                  [
                    2,
                    4
                  ],
                  [
                    2,
                    7
                  ],
                  [
                    4,
                    4
                  ],
                  [
                    5,
                    5
                  ]
                ]
              },
              "returnValues": {
                "sum_odd": [
                  3,
                  15,
                  0,
                  5
                ]
              },
              "semantic": {
                "kind": "numericResults",
                "values": [
                  3,
                  15,
                  0,
                  5
                ]
              }
            }
          ],
          "reflection": "Record expected and actual totals. Explain the endpoint fix and why the local total starts at zero for each call."
        }
      ]
    }
  },
  "challenges": [
    {
      "number": 1,
      "brief": "SHOP: Return a subtotal using parameters instead of outside variables."
    },
    {
      "number": 2,
      "brief": "AREA: Calculate a local area and return it for a receipt."
    },
    {
      "number": 3,
      "brief": "TIME: Calculate local minutes from hours and return the number."
    },
    {
      "number": 4,
      "brief": "TICKET: Use a local ticket_price inside a function and return it."
    },
    {
      "number": 5,
      "brief": "DELIVERY: Return subtotal+local_fee for two order values. Use the same function for two separate user cases; do not duplicate the function body."
    },
    {
      "number": 6,
      "brief": "SAVINGS: Return deposit*weeks without changing an outside total. Include an if/else inside your function to give useful feedback for a boundary case you specify."
    },
    {
      "number": 7,
      "brief": "TEMP: Use a local converted value and return it. Call your function from a loop for three user cases; ensure each case starts with fresh working values."
    },
    {
      "number": 8,
      "brief": "PAIRING: Return pairs and display them outside the function. Connect this function with a second already-taught calculation or display function; explain the call order."
    },
    {
      "number": 9,
      "brief": "INDEPENDENT ORDERS: Write order_total(quantity) using local unit_price=3. Call with 2 and 5; display $6 and $15 while an outside unit_price=99 stays unchanged. Explain which variable each calculation used."
    },
    {
      "number": 10,
      "brief": "TWO SAVINGS GOALS: Write remaining(saved,target) returning zero if the target is met. Call it for two goals without storing shared global totals. Test 20/50 ->30 and 60/50 ->0; reverse call order and compare."
    }
  ]
};
