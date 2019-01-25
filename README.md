# Lights Out

A 3x3 clone of the original game, written in JavaScript.

## To-do
- [x] Add favicons for all platforms
  - Unfortunately, I am definitely not a designer
- [ ] Add tutorial
  - Seriously. When you first open the site you have no idea what to do.
- [ ] Sound effects!
  - They add more to the experience than you might think
- [ ] Add more game modes?
  - Bigger boards
  - Smallest number of moves
    - ~~I would have to actually find a way to figure this out. It may be possible to attach the number upon generation of the map since map generation is now done "manually" (tiles are randomly pressed).~~ (*Update: I did exactly that.*)
  - Timed
    - Actually quite meaningless since you may get lucky with the starting position
- [ ] Add keyboard controls
  - Either certain keys being bound to tiles (QWE-ASD-ZXC) or
  - Single tile is selected at a time, and arrow keys or WASD can be used to move the selector. Perhaps Enter or Space will be used to press it.
- [ ] Add some metrics to further engage players
  - Counter for unlocked messages
  - Number of puzzles solved (use localstorage or cookies)
  - Timer and best time
  - Number of perfect runs (smallest number of moves)
    - Ratio relative to total
- [ ] Add social buttons
  - Probably on the same screen as the win message
  - Maybe just floating out there all the time
