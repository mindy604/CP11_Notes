// Add or extend topics here. Keep each id unique and stable: it identifies saved notes.
// lesson: short student-facing notes; code: downloadable Python; question: one quick check.
window.CP11_TOPICS = [
  {
    id: 'basics', number: '01', title: 'Input, output & variables', short: 'The building blocks', icon: '>_', kind: 'core',
    description: 'Talk to your program, store information, and make something happen.', tags: ['print()', 'input()', 'variables'],
    goal: 'Ask for a name, store it, and print a personal greeting.',
    lesson: [
      { title: 'Output: let your program speak', text: 'print() displays a value. Put text inside quotation marks. You can print a variable to see the value it currently stores.' },
      { title: 'Variables: give a value a name', text: 'The = symbol assigns a value to a variable. Choose a name that explains the value, such as student_name. Python names are case-sensitive.' },
      { title: 'Input: listen to the user', text: 'input() asks a question and returns text. Store that text in a variable so you can use it later. When you need a whole number, convert suitable input with int().' }
    ],
    code: 'student_name = input("What is your name? ")\nprint("Hello,", student_name)\n\npoints = 5\npoints = points + 2\nprint("Points:", points)\n',
    sample: 'What is your name? Alex\nHello, Alex\nPoints: 7',
    question: { prompt: 'After the example runs, what value does points store?', choices: ['5', '7', '"points + 2"'], answer: 1, explanation: 'points begins at 5. Python calculates 5 + 2, then assigns 7 back to points.' },
    tryIt: 'Change the greeting. Add a second input for a favourite activity, then include it in a new output line.',
    reflection: 'What is the difference between printing "points" and printing points?'
  },
  {
    id: 'conditions', number: '02', title: 'Conditions', short: 'Make a decision', icon: '↗', kind: 'core',
    description: 'Compare values and choose what your program does next.', tags: ['if / elif / else', 'comparisons', 'Boolean logic'],
    goal: 'Use a condition to choose between two messages.',
    lesson: [
      { title: 'Ask a True or False question', text: 'A comparison such as score >= 10 produces True or False. Use == to compare equality. A single = assigns a value.' },
      { title: 'Choose a path', text: 'An if statement runs its indented block when its condition is True. Use else for the alternative. Use elif when you need another condition in the same decision.' },
      { title: 'Combine conditions', text: 'and requires both conditions to be True. or requires at least one to be True. not reverses a Boolean value. Check boundary values, such as exactly 10 in this example.' }
    ],
    code: 'score = 10\n\nif score >= 10:\n    print("Goal met")\nelse:\n    print("Keep practising")\n',
    sample: 'Goal met',
    question: { prompt: 'If score changes to 9, which message appears?', choices: ['Goal met', 'Keep practising', 'Both messages'], answer: 1, explanation: '9 >= 10 is False, so Python runs the else block.' },
    tryIt: 'Add an elif for scores of 5 or more. Choose its message, then test scores of 4, 5, 9, and 10.',
    reflection: 'Why is testing exactly at a boundary useful?'
  },
  {
    id: 'loops', number: '03', title: 'Loops', short: 'Repeat with purpose', icon: '↻', kind: 'core',
    description: 'Repeat steps with counters, conditions, and changing values.', tags: ['while', 'for / range()', 'start · check · update'],
    goal: 'Trace a loop and explain when it stops.',
    lesson: [
      { title: 'Start, check, update', text: 'A while loop checks a condition before each turn. Set the starting value before the loop. Update the value inside the loop so that the condition can eventually become False.' },
      { title: 'Trace one turn at a time', text: 'Write down the counter value and output on each turn. The indented statements repeat. The first statement after the indented block runs after the loop finishes.' },
      { title: 'Repeat a known number of times', text: 'A for loop with range() is useful for a known sequence. range(1, 4) gives 1, 2, 3: the stop value is excluded. A while loop may run zero times if its first check is False.' }
    ],
    code: 'count = 1\n\nwhile count <= 3:\n    print("Turn", count)\n    count = count + 1\n\nprint("Finished")\n',
    sample: 'Turn 1\nTurn 2\nTurn 3\nFinished',
    question: { prompt: 'What does count store just after the loop finishes?', choices: ['3', '4', '1'], answer: 1, explanation: 'The last turn prints 3, then updates count to 4. The next check, 4 <= 3, is False.' },
    tryIt: 'Change the loop to print turns 1 through 5. Then write a for loop with range() that prints the same output.',
    reflection: 'Which line makes this loop stop? What would happen without it?'
  },
  {
    id: 'functions', number: '04', title: 'Functions', short: 'Give a task a name', icon: 'f(x)', kind: 'core',
    description: 'Organize reusable steps with parameters and return values.', tags: ['def', 'parameters', 'return'],
    goal: 'Define a small function, call it, and use its returned value.',
    lesson: [
      { title: 'Define, then call', text: 'def creates a function. Its indented body describes a task. Defining a function does not run its body; a function call runs it.' },
      { title: 'Pass in information', text: 'A parameter is a name inside the function for information it receives. In double(4), the argument 4 becomes the value of the parameter number.' },
      { title: 'Return a result', text: 'return sends a value back to the caller. Store or print that value. Returning a value and displaying a value are different actions.' }
    ],
    code: 'def double(number):\n    result = number * 2\n    return result\n\nanswer = double(4)\nprint(answer)\n',
    sample: '8',
    question: { prompt: 'What value would double(6) return?', choices: ['6', '12', 'Nothing'], answer: 1, explanation: 'The argument 6 becomes number. The function calculates 6 * 2 and returns 12.' },
    tryIt: 'Create a triple(number) function. Call it twice with different arguments and print both results.',
    reflection: 'Why might returning a result be more useful than printing it inside a function?'
  },
  {
    id: 'lists', number: '05', title: 'Lists', short: 'Keep things together', icon: '[ ]', kind: 'core',
    description: 'Store a collection, access its items, and work through it.', tags: ['indexes', 'append()', 'iteration'],
    goal: 'Create a list, add an item, and print each item.',
    lesson: [
      { title: 'One name, several values', text: 'A list stores an ordered collection inside square brackets. Separate the items with commas. A list can grow or change while your program runs.' },
      { title: 'Start counting at zero', text: 'The first item has index 0, the second index 1, and so on. snacks[0] accesses the first item. An index outside the list causes an IndexError.' },
      { title: 'Add and visit items', text: 'append() adds one item to the end. len() gives the number of items. A for loop can visit each item directly, without using an index.' }
    ],
    code: 'snacks = ["apple", "crackers"]\nsnacks.append("yogurt")\n\nprint("First:", snacks[0])\nprint("Items:", len(snacks))\n\nfor snack in snacks:\n    print(snack)\n',
    sample: 'First: apple\nItems: 3\napple\ncrackers\nyogurt',
    question: { prompt: 'After append(), what is snacks[2]?', choices: ['apple', 'crackers', 'yogurt'], answer: 2, explanation: 'Indexes start at 0: apple is 0, crackers is 1, and yogurt is 2.' },
    tryIt: 'Make a list of three activities. Add a fourth using append(), then print the number of activities and each activity.',
    reflection: 'How is a list different from storing each item in a separate variable?'
  },
  {
    id: 'turtle', number: 'E1', title: 'Turtle drawing', short: 'Make code visible', icon: '✎', kind: 'extra',
    description: 'Explore movement, colour, and shapes on a drawing canvas.', tags: ['coordinates', 'movement', 'colour'],
    goal: 'Draw a triangle using standard Python Turtle commands.',
    lesson: [
      { title: 'Move a drawing cursor', text: 'import turtle makes the Turtle module available. turtle.forward() moves the cursor; turtle.left() turns it. A pen-down movement draws a line.' },
      { title: 'Think about the turn', text: 'To draw an equilateral triangle, turn 120 degrees at each corner. That is the outside turning angle, not the 60-degree inside angle.' },
      { title: 'Keep the drawing open', text: 'Place turtle.done() at the end so you can view the picture. Use a Python environment with Turtle graphics support, such as a school computer’s desktop Python editor.' }
    ],
    code: 'import turtle\n\nturtle.pencolor("seagreen")\nturtle.pensize(3)\n\nturtle.forward(100)\nturtle.left(120)\nturtle.forward(100)\nturtle.left(120)\nturtle.forward(100)\nturtle.left(120)\n\nturtle.done()\n',
    sample: 'A green triangle with three equal sides appears in the Turtle window.',
    question: { prompt: 'Which command turns the cursor without moving it forward?', choices: ['turtle.forward(100)', 'turtle.left(120)', 'turtle.pensize(3)'], answer: 1, explanation: 'left(120) changes the direction by 120 degrees. forward(100) moves the cursor.' },
    tryIt: 'Change the pen colour and side length. Draw a second triangle at a different position using penup(), goto(), and pendown().',
    reflection: 'How does turning the cursor differ from moving it to a coordinate?'
  },
  {
    id: 'pygame', number: 'E2', title: 'Pygame', short: 'Bring ideas to life', icon: '▦', kind: 'extra',
    description: 'Get started with a window, a game loop, and drawing to the screen.', tags: ['events', 'game loop', 'drawing'],
    goal: 'Understand a small Pygame window that closes when requested.',
    lesson: [
      { title: 'Set up the window', text: 'Pygame is an additional Python library. This example needs a desktop Python environment with pygame installed. pygame.init() starts its modules; set_mode() creates the display.' },
      { title: 'Listen each frame', text: 'The game loop processes events, updates the display, and repeats. A running flag controls when it stops. The QUIT event is generated when the user requests that the window close.' },
      { title: 'Draw, then display', text: 'fill() paints the background. draw.circle() draws a circle using its centre and radius. display.flip() shows the frame. Clock.tick(60) limits the loop to at most 60 frames per second.' }
    ],
    code: 'import pygame\n\npygame.init()\nscreen = pygame.display.set_mode((640, 480))\npygame.display.set_caption("My first window")\nclock = pygame.time.Clock()\nrunning = True\n\nwhile running:\n    for event in pygame.event.get():\n        if event.type == pygame.QUIT:\n            running = False\n\n    screen.fill((238, 244, 239))\n    pygame.draw.circle(screen, (34, 110, 85), (320, 240), 40)\n    pygame.display.flip()\n    clock.tick(60)\n\npygame.quit()\n',
    sample: 'A 640 × 480 window shows a green circle on a pale background. Closing the window ends the program.',
    question: { prompt: 'What makes the while loop stop after a close request?', choices: ['clock.tick(60)', 'screen.fill(...)', 'running = False'], answer: 2, explanation: 'The QUIT event sets running to False. The next while check is False, so the loop ends and pygame.quit() runs.' },
    tryIt: 'Change the circle’s colour, radius, and centre. Run the program after each change and explain what changed.',
    reflection: 'Why does the program need to check for events on every turn?'
  }
];
