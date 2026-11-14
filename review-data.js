/* Original CP11 review activities. Expected output is deliberate and teacher-reviewable. */
window.CP11_REVIEW_DATA=[
 {
  id:'for',number:'1',title:'For loop',outcome:'I can use range() to control repeated values, predict the output, and write a for loop that matches a stated result.',
  reminder:'range(start, stop, step) includes the start and excludes the stop. The indented body repeats; the first line after it runs once when the loop is finished.',
  concept:[
   {question:'How many turns does for number in range(1, 5): make?',choices:['5 turns','4 turns','0 turns'],answer:1,why:'The values are 1, 2, 3 and 4. The stop value 5 is excluded.',hint:'Write the values beginning at 1 and stop before 5.'},
   {question:'What happens to the loop body with range(5, 1), using the default positive step?',choices:['It counts down from 5 to 1.','It runs once.','It runs zero times.'],answer:2,why:'A positive step cannot move from 5 toward the smaller stop value 1, so this range is empty.',hint:'The default step moves upward. Does it take 5 toward 1?'}
  ],
  predict:[
   {id:'for-output',code:'for number in range(2, 8, 2):\n    print(number)\nprint("Done")',expected:'2\n4\n6\nDone',hint:'Start at 2, add 2 each time, and stop before 8. The final print is outside the loop.',explain:'The loop visits 2, 4 and 6. It excludes 8, then prints Done once.'},
   {id:'for-zero',code:'for number in range(5, 2):\n    print(number)\nprint("End")',expected:'End',hint:'Does a positive step produce any values from 5 up to, but not including, 2?',explain:'The loop has zero turns. End is outside the loop, so it still prints.'}
  ],
  blocks:{id:'for-blocks',goal:'Print Starting once, then Step 1 through Step 3, each on its own line. Print Finished once after the loop.',expected:'Starting\nStep 1\nStep 2\nStep 3\nFinished',lines:['print("Starting")','for number in range(1, 4):','    print("Step", number)','print("Finished")'],hint:'Put the opening message first. The indented print belongs after the for header. The final message stays outside the loop.',explain:'The range supplies 1, 2 and 3. Only the indented print repeats. Both unindented messages run once.'},
  practices:[
   {id:'for-concept-code',requires:'for',title:'Apply the counting rule',goal:'Use a for loop to print 1 through 4, one number per line, then print Ready once.',starter:'# Write your for loop here.\n# Print Ready after the loop.\n',cases:[{name:'Four numbers, then one message',inputs:[],expected:'1\n2\n3\n4\nReady'}]},
   {id:'for-predict-code',requires:'for',title:'Change the start and step',goal:'Use a for loop to print 3, 6, 9 and 12 on separate lines, then print Complete once. Do not print 15.',starter:'# Choose the start, stop and step.\n',cases:[{name:'Multiples of three',inputs:[],expected:'3\n6\n9\n12\nComplete'}]},
   {id:'for-block-code',requires:'for',title:'Write your own countdown',goal:'Use a for loop to print 5 down to 1, then Blastoff! once. Do not print 0.',starter:'# Use a negative step in range().\n',cases:[{name:'Countdown and final message',inputs:[],expected:'5\n4\n3\n2\n1\nBlastoff!'}]}
  ]
 },
 {
  id:'while',number:'2',title:'While loop',outcome:'I can identify the start, check and update, trace each turn, and explain why my while loop stops.',
  reminder:'Set the starting value before the loop. while checks its condition before every turn. Update the controlling value inside the loop so the condition can become False.',
  concept:[
   {question:'A while loop’s condition is False at its first check. How many times does its body run?',choices:['Once, before checking.','Zero times.','Until the user stops it.'],answer:1,why:'while checks before entering the body. A False first check means zero turns.',hint:'The check happens before the first turn.'},
   {question:'A counter-controlled while loop is repeating the same value. What should you inspect first?',choices:['Whether its counter update is reached inside the loop.','Whether the variable has a shorter name.','Whether the final print is outside the loop.'],answer:0,why:'If the controlling counter never changes, the condition may stay True. Inspect and repair the update before running again.',hint:'Which line is supposed to change the value used in the condition?'}
  ],
  predict:[
   {id:'while-output',code:'count = 3\nwhile count > 0:\n    count = count - 1\n    print(count)\nprint("Stopped")',expected:'2\n1\n0\nStopped',hint:'The update happens before print. Trace count after subtracting, not before.',explain:'Each turn subtracts first, so the outputs are 2, 1 and 0. The next check, 0 > 0, is False.'},
   {id:'while-zero',code:'count = 0\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint("Finished")',expected:'Finished',hint:'Check count > 0 using the starting value before entering the body.',explain:'0 > 0 is False at the first check. The loop is skipped, then Finished prints.'}
  ],
  blocks:{id:'while-blocks',goal:'Count from 4 down to 1, printing before the update. Print Finished once after the loop. Do not print 0.',expected:'4\n3\n2\n1\nFinished',lines:['count = 4','while count > 0:','    print(count)','    count = count - 1','print("Finished")'],hint:'Start before the loop. Check before the body. Print before subtracting. Keep the update inside and the final message outside.',explain:'The loop prints the current counter before subtracting. After printing 1, it changes to 0, and the next check is False.'},
  practices:[
   {id:'while-concept-code',requires:'while',title:'Build start, check and update',goal:'Use a while loop to print 1, 2 and 3 on separate lines, then Done once.',starter:'count = 1\n# Write the while loop and update.\n',cases:[{name:'Count up and stop',inputs:[],expected:'1\n2\n3\nDone'}]},
   {id:'while-predict-code',requires:'while',title:'Choose the print/update order',goal:'Use a while loop to print 4, 3, 2 and 1, then Finished. Your output must not contain 0.',starter:'count = 4\n# Decide where to print and where to update.\n',cases:[{name:'Print before updating',inputs:[],expected:'4\n3\n2\n1\nFinished'}]},
   {id:'while-block-code',requires:'while',title:'Change direction and step',goal:'Use a while loop to print 2, 4, 6 and 8 on separate lines, then Finished once.',starter:'count = 2\n# Choose a condition and a useful update.\n',cases:[{name:'Count up by two',inputs:[],expected:'2\n4\n6\n8\nFinished'}]}
  ]
 },
 {
  id:'logic',number:'3',title:'AND/OR with while loops',outcome:'I can choose between AND and OR in a while condition, explain when another turn is allowed, and test the stopping boundaries.',
  reminder:'and needs both comparisons to be True. or needs at least one comparison to be True. Write a complete comparison on each side. Use and/or in lowercase in Python.',
  concept:[
   {question:'A game should repeat only while the answer is wrong AND chances remain. Which condition fits?',choices:['guess != secret or guesses_used < 5','guess != secret and guesses_used < 5','guesses_used <= 5'],answer:1,why:'Both requirements must allow another turn. A correct answer or exhausted chances must end the loop.',hint:'If either requirement stops allowing a turn, should the game ask again?'},
   {question:'Which condition is True when number is outside 1–5, including both boundaries as valid?',choices:['number < 1 and number > 5','number >= 1 or number <= 5','number < 1 or number > 5'],answer:2,why:'An invalid number can be below 1 OR above 5. It cannot be on both sides at once.',hint:'Try number = 0, then number = 8, then number = 3.'}
  ],
  truth:true,
  predict:[
   {id:'logic-output',code:'number = int(input("Choose 1 to 5: "))\nwhile number < 1 or number > 5:\n    print("Try again")\n    number = int(input("Choose 1 to 5: "))\nprint("Accepted")',inputs:['0','8','3'],expected:'Try again\nTry again\nAccepted',hint:'Trace the supplied inputs in order. 0 is below the range, 8 is above it, and 3 is inside.',explain:'For 0, the left comparison is True. For 8, the right is True. For 3, both are False, so the retry loop ends.'},
   {id:'logic-boundary',code:'number = int(input("Choose 1 to 5: "))\nwhile number < 1 or number > 5:\n    print("Try again")\n    number = int(input("Choose 1 to 5: "))\nprint("Accepted")',inputs:['1'],expected:'Accepted',hint:'Is exactly 1 below 1 or above 5?',explain:'Both comparisons are False for 1. The lower boundary is accepted without a retry.'}
  ],
  blocks:{id:'logic-blocks',goal:'Ask for a whole number. Retry while it is outside 1–5. For inputs 0, 8, then 3, print Try again twice and Accepted once. Keep the new input inside the loop.',inputs:['0','8','3'],expected:'Try again\nTry again\nAccepted',lines:['number = int(input("Choose 1 to 5: "))','while number < 1 or number > 5:','    print("Try again")','    number = int(input("Choose 1 to 5: "))','print("Accepted")'],hint:'Read once before the first check. The retry message and new read belong inside the loop. Accept only after both invalid-range checks are False.',explain:'The first read gives a value to check. Each invalid entry produces a message and an updated value. A valid entry makes both comparisons False.'},
  practices:[
   {id:'logic-concept-code',requires:'and',title:'Require both limits to allow a turn',goal:'Start count at 1. Use while with and to repeat only while count is at most 5 AND at most 3. Print count on each turn, add 1, then print Done after the loop.',starter:'count = 1\n# Combine two complete comparisons with and.\n',cases:[{name:'Both limits must allow a turn',inputs:[],expected:'1\n2\n3\nDone'}]},
   {id:'logic-predict-code',requires:'or',title:'Write a retry loop for a new range',goal:'Read whole numbers with input(). Use while with or to reject numbers outside 2–6. Print Try again for each rejected number. Print Accepted once when a value is valid. Both 2 and 6 must be accepted.',starter:'# Read the first number.\n# Repeat for values outside 2–6.\n',cases:[{name:'Below, above, then lower boundary',inputs:['1','7','2'],expected:'Try again\nTry again\nAccepted'},{name:'Upper boundary first',inputs:['6'],expected:'Accepted'},{name:'Middle value first',inputs:['4'],expected:'Accepted'}]},
   {id:'logic-block-code',requires:'and',title:'Stop on success or when chances run out',goal:'Make a small fixed-secret review game: secret is 7, at most three guesses. Use and in the while condition. Count the first guess. After the loop, print Win if correct; otherwise print Out of chances. Then print the number of guesses used on its own line. Do not ask again after winning.',starter:'secret = 7\nguess = 0\nguesses_used = 0\n# Write your loop, update and final decision.\n',cases:[{name:'Win on first guess',inputs:['7'],expected:'Win\n1'},{name:'Win on final chance',inputs:['1','2','7'],expected:'Win\n3'},{name:'Three wrong guesses',inputs:['1','2','3'],expected:'Out of chances\n3'}]}
  ]
 }
];
