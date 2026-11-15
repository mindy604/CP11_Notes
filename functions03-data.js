window.CP11_FUNCTIONS03_DATA = {
  "model": "def show_cost(quantity, unit_price):\n    print(quantity * unit_price)\n\nshow_cost(3, 2.0)",
  "guided": "def show_rectangle(length, width):\n    print(length * width)\n\nshow_rectangle(4, 5)",
  "blocks": [
    "def show_rectangle(length, width):",
    "    print(length * width)",
    "show_rectangle(4, 5)",
    "show_rectangle(0, 5)",
    "show_rectangle(2, 5)"
  ],
  "predictions": [
    {
      "id": "cost",
      "code": "def show_cost(quantity, unit_price):\n    print(quantity * unit_price)\n\nshow_cost(3, 2.0)",
      "expected": "6.0",
      "why": "The first argument, 3, goes to quantity. The second, 2.0, goes to unit_price. Their product is 6.0.",
      "hint": "Match the arguments to the parameter positions, then multiply.",
      "requires": {
        "names": [
          "show_cost"
        ],
        "calls": {
          "show_cost": 1
        }
      }
    },
    {
      "id": "swapped",
      "code": "def show_pair(length, width):\n    print(\"Length:\", length)\n    print(\"Width:\", width)\n\nlength = 4\nwidth = 3\nshow_pair(width, length)",
      "expected": "Length: 3\nWidth: 4",
      "why": "Python uses position, not the variable names in the call. width supplies 3 to the first parameter, length; length supplies 4 to the second, width. The call runs, but the labels are reversed.",
      "hint": "Read show_pair(width, length) from left to right. What value does width hold before the call?",
      "requires": {
        "names": [
          "show_pair"
        ],
        "calls": {
          "show_pair": 1
        }
      }
    },
    {
      "id": "zero",
      "code": "def show_rectangle(length, width):\n    print(length * width)\n\nshow_rectangle(4, 5)\nshow_rectangle(0, 5)",
      "expected": "20\n0",
      "why": "The first call multiplies 4 by 5. In the second call, length is 0 and width is 5, so the area is 0. Both calls run.",
      "hint": "There are two calls. Work out the area for each pair separately.",
      "requires": {
        "names": [
          "show_rectangle"
        ],
        "calls": {
          "show_rectangle": 2
        }
      }
    }
  ],
  "tasks": {
    "cost": {
      "title": "Try it: two order totals",
      "goal": "Write show_cost(quantity, unit_price). Print the product inside the function. Use these calls: show_cost(2, 3.0) and show_cost(0, 4.0).",
      "starter": "# Purpose: display the cost of one order\n# Parameters: quantity and unit_price, numbers. Returns: no explicit return.\n\n",
      "requires": {
        "names": [
          "show_cost"
        ],
        "calls": {
          "show_cost": 2
        }
      },
      "cases": [
        {
          "name": "Two orders",
          "expected": "6.0\n0.0",
          "inputs": [],
          "callArguments": {
            "show_cost": [
              [
                2,
                3.0
              ],
              [
                0,
                4.0
              ]
            ]
          }
        }
      ]
    },
    "repair": {
      "title": "Fix the argument order",
      "goal": "The measurements are length 4 and width 3. Change the call so each value reaches the right parameter. Leave the function body as it is.",
      "starter": "def show_pair(length, width):\n    print(\"Length:\", length)\n    print(\"Width:\", width)\n\nlength = 4\nwidth = 3\nshow_pair(width, length)",
      "requires": {
        "names": [
          "show_pair"
        ],
        "calls": {
          "show_pair": 1
        }
      },
      "cases": [
        {
          "name": "The labels must match the measurements",
          "expected": "Length: 4\nWidth: 3",
          "inputs": [],
          "callArguments": {
            "show_pair": [
              [
                4,
                3
              ]
            ]
          }
        }
      ]
    },
    "guide": {
      "title": "Change the call, then check it",
      "goal": "Run the given rectangle example. Next, add show_rectangle(0, 5) and choose the two-call test below. Explain which argument supplies the width.",
      "starter": "def show_rectangle(length, width):\n    print(length * width)\n\nshow_rectangle(4, 5)",
      "requires": {
        "names": [
          "show_rectangle"
        ],
        "calls": {
          "show_rectangle": 1
        }
      },
      "variant": true,
      "cases": [
        {
          "name": "One rectangle",
          "expected": "20",
          "inputs": [],
          "callArguments": {
            "show_rectangle": [
              [
                4,
                5
              ]
            ]
          }
        }
      ]
    },
    "badge": {
      "title": "Try it: two member badges",
      "goal": "Write show_badge(name, club). Display both values with clear labels. Use show_badge(\"Ari\", \"Chess\") and show_badge(\"Lee\", \"Robotics\"). Keep each name paired with the correct club. Use the target layout for this short check.",
      "starter": "# Purpose: display a member name and club\n# Parameters: name and club, text. Returns: no explicit return.\n\n",
      "requires": {
        "names": [
          "show_badge"
        ],
        "calls": {
          "show_badge": 2
        }
      },
      "cases": [
        {
          "name": "Keep the pairs together",
          "expected": "Name: Ari | Club: Chess\nName: Lee | Club: Robotics",
          "inputs": [],
          "callArguments": {
            "show_badge": [
              [
                "Ari",
                "Chess"
              ],
              [
                "Lee",
                "Robotics"
              ]
            ]
          }
        }
      ]
    }
  },
  "projects": {
    "bake": {
      "title": "Bake-sale orders",
      "starter": "# Purpose: display the quantity, unit price and total for one order\n# Parameters: quantity and unit_price, non-negative numbers. Returns: no explicit return.\n\n",
      "default": "two",
      "stages": [
        {
          "id": "two",
          "label": "1. Two orders",
          "goal": "Define show_total(quantity, unit_price) once. In the main program, ask for the quantity and unit price of two orders. Call the function once for each order. Calculate the total inside it, and display the quantity, unit price and total. Show both money amounts to two decimal places.",
          "requires": {
            "names": [
              "show_total"
            ],
            "calls": {
              "show_total": 2
            }
          },
          "cases": [
            {
              "name": "Two orders, including zero quantity",
              "expected": "4 items at $1.25 each cost $5.00.\n0 items at $1.25 each cost $0.00.",
              "inputs": [
                "4",
                "1.25",
                "0",
                "1.25"
              ],
              "callArguments": {
                "show_total": [
                  [
                    4,
                    1.25
                  ],
                  [
                    0,
                    1.25
                  ]
                ]
              },
              "semantic": {
                "kind": "bake",
                "function": "show_total",
                "values": [
                  [
                    4,
                    1.25
                  ],
                  [
                    0,
                    1.25
                  ]
                ]
              }
            }
          ],
          "reflection": "What did the zero-quantity test show? Identify the quantity and unit price arguments in one call."
        },
        {
          "id": "four",
          "label": "2. Extend to four orders",
          "goal": "Keep your existing show_total function. Extend the main program to read four orders instead of two. The first two tested orders still count; add the two new ones shown below. Each order needs its own quantity, unit price and function call.",
          "requires": {
            "names": [
              "show_total"
            ],
            "calls": {
              "show_total": 4
            }
          },
          "cases": [
            {
              "name": "Four independent orders",
              "expected": "4 items at $1.25 each cost $5.00.\n0 items at $1.25 each cost $0.00.\n2 items at $3.00 each cost $6.00.\n1 item at $0.00 each cost $0.00.",
              "inputs": [
                "4",
                "1.25",
                "0",
                "1.25",
                "2",
                "3",
                "1",
                "0"
              ],
              "callArguments": {
                "show_total": [
                  [
                    4,
                    1.25
                  ],
                  [
                    0,
                    1.25
                  ],
                  [
                    2,
                    3
                  ],
                  [
                    1,
                    0
                  ]
                ]
              },
              "semantic": {
                "kind": "bake",
                "function": "show_total",
                "values": [
                  [
                    4,
                    1.25
                  ],
                  [
                    0,
                    1.25
                  ],
                  [
                    2,
                    3
                  ],
                  [
                    1,
                    0
                  ]
                ]
              }
            }
          ],
          "reflection": "What did the four-order and swapped-argument checks show? Explain why matching totals are not enough."
        }
      ],
      "scratch": {
        "requires": {
          "names": [
            "show_total"
          ],
          "calls": {
            "show_total": 1
          }
        },
        "cases": [
          {
            "name": "Swapped arguments: show_total(1.25, 4)",
            "expected": "1.25 items at $4.00 each cost $5.00.",
            "inputs": [],
            "callArguments": {
              "show_total": [
                [
                  1.25,
                  4
                ]
              ]
            },
            "semantic": {
              "kind": "bake",
              "function": "show_total",
              "values": [
                [
                  1.25,
                  4
                ]
              ]
            },
            "probe": {
              "function": "show_total",
              "arguments": [
                1.25,
                4
              ]
            }
          }
        ]
      }
    },
    "rectangle": {
      "title": "Rectangle areas and shipping labels",
      "starter": "# Purpose: display the area of a rectangle\n# Parameters: length and width, non-negative numbers. Returns: no explicit return.\n\n",
      "default": "area",
      "stages": [
        {
          "id": "area",
          "label": "1. Display the areas",
          "goal": "Write show_rectangle_area(length, width) to display length * width. Use show_rectangle_area(4, 3), show_rectangle_area(2, 5) and show_rectangle_area(0, 3). Check that the areas are 12, 10 and 0.",
          "requires": {
            "names": [
              "show_rectangle_area"
            ],
            "calls": {
              "show_rectangle_area": 3
            }
          },
          "cases": [
            {
              "name": "Three different rectangles",
              "expected": "12\n10\n0",
              "inputs": [],
              "callArguments": {
                "show_rectangle_area": [
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
              "semantic": {
                "kind": "area",
                "function": "show_rectangle_area",
                "values": [
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
              }
            }
          ],
          "reflection": "How did one function handle all three rectangles? Identify the length and width arguments in one call."
        },
        {
          "id": "labels",
          "label": "2. Add shipping labels",
          "goal": "Keep the same function and add labels for length, width and area. Replace the three fixed calls with a main program that asks for two length/width pairs and calls the function for each pair. Use measurements that are zero or greater. Then test the swapped measurements too: the area stays 12, but the length and width labels must change.",
          "requires": {
            "names": [
              "show_rectangle_area"
            ],
            "calls": {
              "show_rectangle_area": 2
            }
          },
          "cases": [
            {
              "name": "A rectangle and a zero-length case",
              "expected": "Length: 4 Width: 3\nArea: 12\nLength: 0 Width: 5\nArea: 0",
              "inputs": [
                "4",
                "3",
                "0",
                "5"
              ],
              "callArguments": {
                "show_rectangle_area": [
                  [
                    4,
                    3
                  ],
                  [
                    0,
                    5
                  ]
                ]
              },
              "semantic": {
                "kind": "labels",
                "function": "show_rectangle_area",
                "values": [
                  [
                    4,
                    3
                  ],
                  [
                    0,
                    5
                  ]
                ]
              }
            },
            {
              "name": "Swap the first pair: labels change, area stays the same",
              "expected": "Length: 3 Width: 4\nArea: 12\nLength: 0 Width: 5\nArea: 0",
              "inputs": [
                "3",
                "4",
                "0",
                "5"
              ],
              "callArguments": {
                "show_rectangle_area": [
                  [
                    3,
                    4
                  ],
                  [
                    0,
                    5
                  ]
                ]
              },
              "semantic": {
                "kind": "labels",
                "function": "show_rectangle_area",
                "values": [
                  [
                    3,
                    4
                  ],
                  [
                    0,
                    5
                  ]
                ]
              }
            }
          ],
          "reflection": "What changed when you swapped length and width? Why should you check the labels as well as the area?"
        }
      ]
    }
  },
  "challenges": [
    {
      "number": 1,
      "brief": "RECTANGLE: Write show_area(length,width) and use two shapes.",
      "instructions": "Write show_area(length, width) to display a rectangle’s area. Use the same function for two different rectangles."
    },
    {
      "number": 2,
      "brief": "SHOP: Write show_cost(quantity,price) for two items.",
      "instructions": "Write show_cost(quantity, price) for two items. For each item, pass its quantity and price to the same function and display the cost."
    },
    {
      "number": 3,
      "brief": "TRAVEL: Write show_distance(speed,hours) with km output.",
      "instructions": "Write show_distance(speed, hours) to display the distance travelled. Include km in the output."
    },
    {
      "number": 4,
      "brief": "BADGE: Write show_badge(name,club) for two members.",
      "instructions": "Write show_badge(name, club) for two members. Display each member’s name with the correct club."
    },
    {
      "number": 5,
      "brief": "SCORE: Write show_points(name,points) for two players. Use the same function for two separate user cases; do not duplicate the function body.",
      "instructions": "Write show_points(name, points) for two players. Use one function body for both players, and call it with each player’s name and score."
    },
    {
      "number": 6,
      "brief": "TICKET: Write show_ticket(event,seat) for two tickets. Include an if/else inside your function to give useful feedback for a boundary case you specify.",
      "instructions": "Write show_ticket(event, seat) for two tickets. Include an if/else inside the function to check a boundary you choose. State your rule, then test the boundary and a nearby value."
    },
    {
      "number": 7,
      "brief": "READING: Write show_progress(pages,days) displaying pages per day. Call your function from a loop for three user cases; ensure each case starts with fresh working values.",
      "instructions": "Write show_progress(pages, days) to display pages per day. Use a loop to call it for three separate cases. Make sure each case uses a fresh pair of values."
    },
    {
      "number": 8,
      "brief": "PAINT: Write show_wall(width,height) displaying wall area. Connect this function with a second already-taught calculation or display function; explain the call order.",
      "instructions": "Write show_wall(width, height) to display a wall’s area. Use it with a second calculation or display function you already know. Explain which function runs first and why."
    },
    {
      "number": 9,
      "brief": "BUDGET HELPER: Write show_budget(cost,budget) that prints change or shortage. Call with two different orders, including exact budget. Test 8/10 -> $2 change; 12/10 -> $2 short.",
      "instructions": "Write show_budget(cost, budget) to display change or a shortage. Test a cost of 8 with a budget of 10 ($2 change), a cost of 12 with a budget of 10 ($2 short), and an order that uses the exact budget. An exact budget leaves $0 change."
    },
    {
      "number": 10,
      "brief": "PACKING HELPER: Write show_packs(items,pack_size); reject non- positive pack sizes before division. Display full packs, leftovers and total containers needed. Test 13/6 -> 3 containers; 13/0 -> error message.",
      "instructions": "Write show_packs(items, pack_size). Reject zero and negative pack sizes before doing any division. For a valid pack size, display the number of full packs, the leftovers, and the total containers needed. Test 13 items with a pack size of 6: 2 full packs, 1 leftover item and 3 containers. A pack size of 0 must produce an error message."
    }
  ]
};
