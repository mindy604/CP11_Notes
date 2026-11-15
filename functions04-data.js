window.CP11_FUNCTIONS04_DATA = {
  "model": "def double(number):\n    return number * 2\n\nanswer = double(5)\nprint(answer + 1)",
  "guided": "def rectangle_area(length, width):\n    return length * width\n\narea = rectangle_area(3, 4)\nprint(f\"Area: {area}\")",
  "blocks": [
    "def double(number):",
    "    return number * 2",
    "answer = double(5)",
    "next_value = answer + 1",
    "print(next_value)"
  ],
  "predictions": [
    {
      "id": "double",
      "code": "def double(number):\n    return number * 2\n\nanswer = double(5)\nprint(answer + 1)",
      "expected": "11",
      "why": "double(5) returns 10. The caller stores 10 in answer, then prints answer + 1. The return statement itself prints nothing.",
      "hint": "Find the returned value first, then follow what the caller does with it.",
      "requires": {
        "names": [
          "double"
        ],
        "arities": {
          "double": 1
        },
        "calls": {
          "double": 1
        },
        "returnFunctions": [
          "double"
        ],
        "quietReturns": [
          "double"
        ],
        "storeReturns": [
          "double"
        ]
      }
    },
    {
      "id": "calls",
      "code": "def add(x, y):\n    return x + y\n\ndef mult(x, y):\n    print(x * y)\n\nadd(1, 2)\nprint(add(2, 3))\nmult(3, 4)\nprint(mult(4, 5))",
      "expected": "5\n12\n20\nNone",
      "why": "add(1, 2) returns 3 without displaying it. print(add(2, 3)) displays 5. mult(3, 4) displays 12. In the last line, mult displays 20, then the outer print displays its return value, None.",
      "hint": "Count output from inside a function separately from output produced by an outer print.",
      "requires": {
        "names": [
          "add",
          "mult"
        ],
        "arities": {
          "add": 2,
          "mult": 2
        },
        "returnFunctions": [
          "add"
        ]
      }
    },
    {
      "id": "zero",
      "code": "def rectangle_area(length, width):\n    return length * width\n\nresult = rectangle_area(0, 4)\nprint(result + 2)",
      "expected": "2",
      "why": "The function returns 0. The caller stores it in result and prints 0 + 2. Zero is a usable returned value.",
      "hint": "Returning 0 does not prevent the caller from using that value.",
      "requires": {
        "names": [
          "rectangle_area"
        ],
        "arities": {
          "rectangle_area": 2
        },
        "calls": {
          "rectangle_area": 1
        },
        "returnFunctions": [
          "rectangle_area"
        ],
        "quietReturns": [
          "rectangle_area"
        ],
        "storeReturns": [
          "rectangle_area"
        ]
      }
    }
  ],
  "tasks": {
    "double": {
      "title": "Use the returned value",
      "goal": "Write double(number) so it returns twice the supplied number. Store double(5) in a variable, then print that stored value plus 1. Keep the calculation in the function and the print in the main program.",
      "starter": "# Purpose: calculate twice a number\n# Parameters: number, a number. Returns: twice the number.\n\n",
      "requires": {
        "names": [
          "double"
        ],
        "arities": {
          "double": 1
        },
        "calls": {
          "double": 1
        },
        "returnFunctions": [
          "double"
        ],
        "quietReturns": [
          "double"
        ],
        "storeReturns": [
          "double"
        ]
      },
      "cases": [
        {
          "name": "Return, store and use",
          "expected": "11",
          "inputs": [],
          "callArguments": {
            "double": [
              [
                5
              ]
            ]
          },
          "returnValues": {
            "double": [
              10
            ]
          }
        }
      ]
    },
    "guide": {
      "title": "Store a rectangle area",
      "goal": "Run the starter example. Next, change the call to rectangle_area(0, 4), store its result, and print that result plus 2. Choose the matching test below.",
      "starter": "def rectangle_area(length, width):\n    return length * width\n\narea = rectangle_area(3, 4)\nprint(f\"Area: {area}\")",
      "requires": {
        "names": [
          "rectangle_area"
        ],
        "arities": {
          "rectangle_area": 2
        },
        "calls": {
          "rectangle_area": 1
        },
        "returnFunctions": [
          "rectangle_area"
        ],
        "quietReturns": [
          "rectangle_area"
        ],
        "storeReturns": [
          "rectangle_area"
        ]
      },
      "variant": true,
      "cases": [
        {
          "name": "Original rectangle",
          "expected": "Area: 12",
          "inputs": [],
          "callArguments": {
            "rectangle_area": [
              [
                3,
                4
              ]
            ]
          },
          "returnValues": {
            "rectangle_area": [
              12
            ]
          }
        }
      ]
    },
    "repair": {
      "title": "Replace print with return",
      "goal": "This function prints the area but does not return it, so the variable area receives None. Change the function to return the calculation. Keep the storing assignment and labelled print in the main program.",
      "starter": "def rectangle_area(length, width):\n    print(length * width)\n\narea = rectangle_area(3, 4)\nprint(f\"Area: {area}\")",
      "requires": {
        "names": [
          "rectangle_area"
        ],
        "arities": {
          "rectangle_area": 2
        },
        "calls": {
          "rectangle_area": 1
        },
        "returnFunctions": [
          "rectangle_area"
        ],
        "quietReturns": [
          "rectangle_area"
        ],
        "storeReturns": [
          "rectangle_area"
        ]
      },
      "cases": [
        {
          "name": "Only the caller displays the result",
          "expected": "Area: 12",
          "inputs": [],
          "callArguments": {
            "rectangle_area": [
              [
                3,
                4
              ]
            ]
          },
          "returnValues": {
            "rectangle_area": [
              12
            ]
          }
        }
      ]
    },
    "rectangle": {
      "title": "Rectangle practice",
      "goal": "Write rectangle_area(length, width) so it returns the area. Store and print the results for (4, 3), (2, 5) and (0, 3). Compare this with a function that only prints: which version gives the caller a value it can store?",
      "starter": "# Purpose: calculate rectangle area\n# Parameters: length and width, numbers. Returns: the area.\n\n",
      "requires": {
        "names": [
          "rectangle_area"
        ],
        "arities": {
          "rectangle_area": 2
        },
        "calls": {
          "rectangle_area": 3
        },
        "returnFunctions": [
          "rectangle_area"
        ],
        "quietReturns": [
          "rectangle_area"
        ],
        "storeReturns": [
          "rectangle_area"
        ]
      },
      "flexible": true,
      "cases": [
        {
          "name": "Three stored areas",
          "expected": "12\n10\n0",
          "inputs": [],
          "callArguments": {
            "rectangle_area": [
              [
                4,
                3
              ],
              [
                2,
                5
              ],
              [
                0,
                3
              ]
            ]
          },
          "returnValues": {
            "rectangle_area": [
              12,
              10,
              0
            ]
          },
          "semantic": {
            "kind": "rectangle",
            "function": "rectangle_area",
            "values": [
              12,
              10,
              0
            ]
          }
        }
      ]
    },
    "discount": {
      "title": "Return and reuse a discount",
      "goal": "Write discount_amount(price) to return 20% of a non-negative price. Ask for a price in the main program, store the returned discount, then calculate price minus discount there. Display the discount and final price with labels.",
      "starter": "# Purpose: calculate a 20% discount\n# Parameters: price, a non-negative number. Returns: the discount amount.\n\n",
      "requires": {
        "names": [
          "discount_amount"
        ],
        "arities": {
          "discount_amount": 1
        },
        "calls": {
          "discount_amount": 1
        },
        "returnFunctions": [
          "discount_amount"
        ],
        "quietReturns": [
          "discount_amount"
        ],
        "storeReturns": [
          "discount_amount"
        ],
        "subtractStored": "discount_amount"
      },
      "flexible": true,
      "cases": [
        {
          "name": "A price of 10",
          "expected": "Discount: 2\nFinal price: 8",
          "inputs": [
            "10"
          ],
          "callArguments": {
            "discount_amount": [
              [
                10
              ]
            ]
          },
          "returnValues": {
            "discount_amount": [
              2
            ]
          },
          "semantic": {
            "kind": "discount",
            "function": "discount_amount",
            "values": [
              2
            ]
          }
        },
        {
          "name": "A zero price",
          "expected": "Discount: 0\nFinal price: 0",
          "inputs": [
            "0"
          ],
          "callArguments": {
            "discount_amount": [
              [
                0
              ]
            ]
          },
          "returnValues": {
            "discount_amount": [
              0
            ]
          },
          "semantic": {
            "kind": "discount",
            "function": "discount_amount",
            "values": [
              0
            ]
          }
        }
      ]
    }
  },
  "projects": {
    "triangle": {
      "title": "Triangle material area",
      "starter": "# Purpose: calculate triangle area\n# Parameters: base and height, non-negative numbers. Returns: base * height / 2.\n\n",
      "default": "one",
      "stages": [
        {
          "id": "one",
          "label": "1. One triangle",
          "goal": "Write triangle_area(base, height) to return base * height / 2. Ask for a base and vertical height as decimal numbers in the main program. Store the returned area once, then use that same stored value in two separately labelled outputs: an area label and a material area. Include square units in both.",
          "reflection": "Why can the caller use the returned area twice? What would happen if the function only printed it?",
          "requires": {
            "names": [
              "triangle_area"
            ],
            "arities": {
              "triangle_area": 2
            },
            "calls": {
              "triangle_area": 1
            },
            "returnFunctions": [
              "triangle_area"
            ],
            "quietReturns": [
              "triangle_area"
            ],
            "storeReturns": [
              "triangle_area"
            ],
            "printStoredCopies": {
              "triangle_area": 2
            },
            "noAreaOutside": "triangle_area"
          },
          "cases": [
            {
              "name": "Base 6, height 4",
              "expected": "Area label: 12.0 square units\nMaterial area: 12.0 square units",
              "inputs": [
                "6",
                "4"
              ],
              "callArguments": {
                "triangle_area": [
                  [
                    6,
                    4
                  ]
                ]
              },
              "returnValues": {
                "triangle_area": [
                  12
                ]
              },
              "semantic": {
                "kind": "triangle",
                "function": "triangle_area",
                "values": [
                  12
                ]
              }
            },
            {
              "name": "Zero base",
              "expected": "Area label: 0.0 square units\nMaterial area: 0.0 square units",
              "inputs": [
                "0",
                "4"
              ],
              "callArguments": {
                "triangle_area": [
                  [
                    0,
                    4
                  ]
                ]
              },
              "returnValues": {
                "triangle_area": [
                  0
                ]
              },
              "semantic": {
                "kind": "triangle",
                "function": "triangle_area",
                "values": [
                  0
                ]
              }
            }
          ]
        },
        {
          "id": "two",
          "label": "2. Extend to a material report",
          "goal": "Continue the same program. Ask for two separate triangles. For each one, store the returned area and use that stored value in both labelled outputs. Keep the area formula inside triangle_area; do not repeat it in the main program. Test the original dimensions, then change one height and retest.",
          "reflection": "What did the changed-height test show? Explain why a function that only prints cannot supply the stored result.",
          "requires": {
            "names": [
              "triangle_area"
            ],
            "arities": {
              "triangle_area": 2
            },
            "calls": {
              "triangle_area": 2
            },
            "returnFunctions": [
              "triangle_area"
            ],
            "quietReturns": [
              "triangle_area"
            ],
            "storeReturns": [
              "triangle_area"
            ],
            "printStoredCopies": {
              "triangle_area": 2
            },
            "noAreaOutside": "triangle_area"
          },
          "cases": [
            {
              "name": "Two separate triangles",
              "expected": "Area: 12 square units\nMaterial: 12 square units\nArea: 0 square units\nMaterial: 0 square units",
              "inputs": [
                "6",
                "4",
                "0",
                "4"
              ],
              "callArguments": {
                "triangle_area": [
                  [
                    6,
                    4
                  ],
                  [
                    0,
                    4
                  ]
                ]
              },
              "returnValues": {
                "triangle_area": [
                  12,
                  0
                ]
              },
              "semantic": {
                "kind": "triangle",
                "function": "triangle_area",
                "values": [
                  12,
                  0
                ]
              }
            },
            {
              "name": "Change the first height and retest",
              "expected": "Area: 6 square units\nMaterial: 6 square units\nArea: 0 square units\nMaterial: 0 square units",
              "inputs": [
                "6",
                "2",
                "0",
                "4"
              ],
              "callArguments": {
                "triangle_area": [
                  [
                    6,
                    2
                  ],
                  [
                    0,
                    4
                  ]
                ]
              },
              "returnValues": {
                "triangle_area": [
                  6,
                  0
                ]
              },
              "semantic": {
                "kind": "triangle",
                "function": "triangle_area",
                "values": [
                  6,
                  0
                ]
              }
            }
          ]
        }
      ]
    }
  },
  "challenges": [
    {
      "number": 1,
      "brief": "SALE: Return the price after a 10% discount and print a receipt."
    },
    {
      "number": 2,
      "brief": "TEMPERATURE: Return Fahrenheit from Celsius using C*9/5+32."
    },
    {
      "number": 3,
      "brief": "RECTANGLE: Return area; use it in a labelled material report."
    },
    {
      "number": 4,
      "brief": "SHOP: Return price*quantity; add a $2 delivery fee outside."
    },
    {
      "number": 5,
      "brief": "MINUTES: Return hours*60; add ten break minutes outside. Use the same function for two separate user cases; do not duplicate the function body."
    },
    {
      "number": 6,
      "brief": "SAVINGS: Return weekly_deposit*weeks and show the total. Include an if/else inside your function to give useful feedback for a boundary case you specify."
    },
    {
      "number": 7,
      "brief": "TRIANGLE: Return area from base/height; test zero base. Call your function from a loop for three user cases; ensure each case starts with fresh working values."
    },
    {
      "number": 8,
      "brief": "SPEED: Return distance/time for positive time; label km/h. Connect this function with a second already-taught calculation or display function; explain the call order."
    },
    {
      "number": 9,
      "brief": "RETURN AND REUSE: Write discounted_price(price) returning 90% of price. Use its returned value to calculate an order for three items and compare with budget. Test price 10/budget 30 -> total $27, $3 change."
    },
    {
      "number": 10,
      "brief": "COMPARE TRIPS: Write trip_cost(distance,rate) returning the product. Call it for two routes; outside the function announce cheaper route or tie and difference. Test 10*2 versus 15*1 -> second cheaper by $5."
    }
  ]
};
