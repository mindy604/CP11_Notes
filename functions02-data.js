window.CP11_FUNCTIONS02_DATA = {
  "model": "def greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"Maya\")\ngreet(\"Sam\")",
  "guided": "def show_points(points):\n    print(f\"Points: {points}\")\n\nshow_points(3)\nshow_points(9)",
  "blocks": [
    "def show_points(points):",
    "    print(f\"Points: {points}\")",
    "show_points(3)",
    "show_points(9)",
    "show_points(0)"
  ],
  "predictions": [
    {
      "id": "greet",
      "code": "def greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"Maya\")\ngreet(\"Sam\")",
      "expected": "Hello, Maya!\nHello, Sam!",
      "why": "At the first call, name receives Maya. At the second call, name receives Sam. The same body uses each new value.",
      "hint": "Replace {name} with the argument at that particular call.",
      "requires": {
        "names": [
          "greet"
        ],
        "calls": {
          "greet": 2
        }
      }
    },
    {
      "id": "quoted",
      "code": "def greet(name):\n    print(\"Hello, name!\")\n\ngreet(\"Maya\")\ngreet(\"Sam\")",
      "expected": "Hello, name!\nHello, name!",
      "why": "The quoted word name is literal text. The supplied names are ignored. This runs, but gives the wrong greeting: a logic problem.",
      "hint": "There is no f before the string and no {name} placeholder. Read the exact text in quotes.",
      "requires": {
        "names": [
          "greet"
        ],
        "calls": {
          "greet": 2
        },
        "usesParameter": false
      }
    },
    {
      "id": "points",
      "code": "def show_points(points):\n    print(f\"Points: {points}\")\n\nshow_points(3)\nshow_points(9)\nshow_points(0)",
      "expected": "Points: 3\nPoints: 9\nPoints: 0",
      "why": "points receives 3, then 9, then 0. Zero is a valid supplied value; Python prints 0, not the word points.",
      "hint": "A call with 0 still runs the body once.",
      "requires": {
        "names": [
          "show_points"
        ],
        "calls": {
          "show_points": 3
        }
      }
    }
  ],
  "tasks": {
    "greet": {
      "title": "Now try a similar problem: two visitors",
      "goal": "Define greet(name) once. Call it with Ari, then Lee, to print the greetings below. Add comments describing its purpose, parameter and return.",
      "starter": "# Purpose: greet one visitor\n# Parameter: name, text. Returns: no explicit return.\n\n",
      "requires": {
        "names": [
          "greet"
        ],
        "calls": {
          "greet": 2
        }
      },
      "cases": [
        {
          "name": "Two different arguments",
          "expected": "Hello, Ari!\nHello, Lee!",
          "inputs": [],
          "callArguments": {
            "greet": [
              "Ari",
              "Lee"
            ]
          }
        }
      ]
    },
    "repair": {
      "title": "Repair the quoted parameter",
      "goal": "Repair the function body so the two calls display the supplied names. Keep the same one-parameter definition and both calls.",
      "starter": "def greet(name):\n    print(\"Hello, name!\")\n\ngreet(\"Maya\")\ngreet(\"Sam\")",
      "requires": {
        "names": [
          "greet"
        ],
        "calls": {
          "greet": 2
        }
      },
      "cases": [
        {
          "name": "The actual names must appear",
          "expected": "Hello, Maya!\nHello, Sam!",
          "inputs": [],
          "callArguments": {
            "greet": [
              "Maya",
              "Sam"
            ]
          }
        }
      ]
    },
    "points": {
      "title": "Guided coding: try zero",
      "goal": "Run the given 3 and 9 version. Then add show_points(0) and choose the three-call test. Predict before running.",
      "starter": "def show_points(points):\n    print(f\"Points: {points}\")\n\nshow_points(3)\nshow_points(9)",
      "requires": {
        "names": [
          "show_points"
        ],
        "calls": {
          "show_points": 2
        }
      },
      "cases": [
        {
          "name": "Two supplied values",
          "expected": "Points: 3\nPoints: 9",
          "inputs": [],
          "callArguments": {
            "show_points": [
              3,
              9
            ]
          }
        }
      ],
      "variant": true
    },
    "seat": {
      "title": "Now try a similar problem: seat labels",
      "goal": "Define show_seat(number). Call it with 1, then 12. Use the argument to display each seat label.",
      "starter": "# Purpose: display one seat label\n# Parameter: number, an integer. Returns: no explicit return.\n\n",
      "requires": {
        "names": [
          "show_seat"
        ],
        "calls": {
          "show_seat": 2
        }
      },
      "cases": [
        {
          "name": "Two seat numbers",
          "expected": "Seat: 1\nSeat: 12",
          "inputs": [],
          "callArguments": {
            "show_seat": [
              1,
              12
            ]
          }
        }
      ]
    },
    "welcome": {
      "title": "Your program: Club Member Welcome",
      "goal": "Ask for THREE member names using input() in the main program. Define welcome(member_name) once and call it with each entered name. Print one greeting containing that name each time.",
      "starter": "# Purpose: greet one club member\n# Parameter: member_name, text. Returns: no explicit return.\n\n",
      "requires": {
        "names": [
          "welcome"
        ],
        "calls": {
          "welcome": 3
        }
      },
      "plan": true,
      "cases": [
        {
          "name": "Three different members",
          "expected": "Welcome, Ari!\nWelcome, Lee!\nWelcome, Sam!",
          "inputs": [
            "Ari",
            "Lee",
            "Sam"
          ],
          "callArguments": {
            "welcome": [
              "Ari",
              "Lee",
              "Sam"
            ]
          }
        },
        {
          "name": "Same name twice",
          "expected": "Welcome, Ari!\nWelcome, Ari!\nWelcome, Sam!",
          "inputs": [
            "Ari",
            "Ari",
            "Sam"
          ],
          "callArguments": {
            "welcome": [
              "Ari",
              "Ari",
              "Sam"
            ]
          }
        }
      ]
    },
    "millilitres": {
      "title": "Additional work: Cups to millilitres",
      "goal": "Write show_millilitres(cups): calculate cups * 236.6 and display the result with mL. Call it with 1, 2 and 0.5. Label the parameter and an argument in your explanation.",
      "starter": "# Purpose: convert cups and display millilitres\n# Parameter: cups, a number. Returns: no explicit return.\n\n",
      "requires": {
        "names": [
          "show_millilitres"
        ],
        "calls": {
          "show_millilitres": 3
        }
      },
      "flexible": true,
      "cases": [
        {
          "name": "Whole and half cups",
          "expected": "236.6 mL\n473.2 mL\n118.3 mL",
          "inputs": [],
          "callArguments": {
            "show_millilitres": [
              1,
              2,
              0.5
            ]
          },
          "semantic": {
            "kind": "millilitres",
            "function": "show_millilitres",
            "values": [
              1,
              2,
              0.5
            ]
          }
        }
      ]
    },
    "temperature": {
      "title": "Practice: Three temperature messages",
      "goal": "Write show_temperature(value) to display the temperature and Cold when value < 10; otherwise display Mild. Ask for THREE numeric temperatures in the main program, then call the same function for each. Print results; do not explicitly return. Test 9, 10 and 11.",
      "starter": "# Purpose: display a temperature and its message\n# Parameter: value, a numeric temperature. Returns: no explicit return.\n\n",
      "requires": {
        "names": [
          "show_temperature"
        ],
        "calls": {
          "show_temperature": 3
        },
        "decision": true
      },
      "flexible": true,
      "cases": [
        {
          "name": "Below, at and above 10",
          "expected": "Temperature: 9\nCold\nTemperature: 10\nMild\nTemperature: 11\nMild",
          "inputs": [
            "9",
            "10",
            "11"
          ],
          "callArguments": {
            "show_temperature": [
              9,
              10,
              11
            ]
          },
          "semantic": {
            "kind": "temperature",
            "function": "show_temperature",
            "values": [
              9,
              10,
              11
            ]
          }
        }
      ]
    },
    "score": {
      "title": "Extended work: Club Score Report",
      "goal": "Define show_member(points) with ONE parameter. Display the supplied points; at 10 or more display Goal met, otherwise show how many points remain. In the main program ask for a name and a non-negative integer score for EACH of THREE members. Print each name, then call the function with that score. Assume valid non-negative integer input.",
      "starter": "# Purpose: report a score against a ten-point goal\n# Parameter: points, a non-negative integer. Returns: no explicit return.\n\n",
      "requires": {
        "names": [
          "show_member"
        ],
        "calls": {
          "show_member": 3
        },
        "decision": true
      },
      "plan": true,
      "flexible": true,
      "cases": [
        {
          "name": "Scores 9, 10 and 11",
          "expected": "Member: Ari\nPoints: 9\nRemaining: 1\nMember: Lee\nPoints: 10\nGoal met\nMember: Sam\nPoints: 11\nGoal met",
          "inputs": [
            "Ari",
            "9",
            "Lee",
            "10",
            "Sam",
            "11"
          ],
          "callArguments": {
            "show_member": [
              9,
              10,
              11
            ]
          },
          "semantic": {
            "kind": "score",
            "function": "show_member",
            "values": [
              9,
              10,
              11
            ],
            "members": [
              "Ari",
              "Lee",
              "Sam"
            ]
          }
        }
      ]
    }
  },
  "challenges": [
    {
      "number": 1,
      "brief": "GREETING: Write greet(name) and use it for two visitors."
    },
    {
      "number": 2,
      "brief": "TICKET: Write show_seat(number) that prints a seat label."
    },
    {
      "number": 3,
      "brief": "SCORE: Write show_score(points) and call it for three rounds."
    },
    {
      "number": 4,
      "brief": "LIBRARY: Write remind(title) that prints a return reminder."
    },
    {
      "number": 5,
      "brief": "SHOP: Write show_item(name) and call it for three products. Use the same function for two separate user cases; do not duplicate the function body."
    },
    {
      "number": 6,
      "brief": "STUDY: Write show_task(task) and call it for two subjects. Include an if/else inside your function to give useful feedback for a boundary case you specify."
    },
    {
      "number": 7,
      "brief": "EVENT: Write badge(name) that prints a two-line badge. Call your function from a loop for three user cases; ensure each case starts with fresh working values."
    },
    {
      "number": 8,
      "brief": "FITNESS: Write show_minutes(minutes) with a clear unit label. Connect this function with a second already-taught calculation or display function; explain the call order."
    },
    {
      "number": 9,
      "brief": "PRICE LABEL: Write show_price(price) to display original price and price after 10% off, both to .2f. Ask two user prices and call the function twice. Test 10 -> $9; 0 -> $0."
    },
    {
      "number": 10,
      "brief": "PROGRESS LABEL: Write show_progress(minutes) with a fixed 30-minute target. Print reached-target or minutes remaining. Call for 20,30,40; use a parameter, not a global input variable."
    }
  ]
};
