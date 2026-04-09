# Snake-Game
A classic Snake game built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies, just a single self-contained file that runs in any browser.
The game logic uses a simple array to represent the snake's body, updating position on each tick by prepending a new head and popping the tail (unless food is eaten). Collision detection checks grid boundaries and self-intersection on every frame. Food spawns at a random empty cell, and a setInterval loop drives the game loop with the interval duration shortening as the player levels up.
The rendering is done entirely on an HTML5 <canvas> element using the 2D context API, with rounded rectangles drawn manually using arcTo for a clean look. The UI is styled in pure CSS with dark mode as the default aesthetic.


How to play:
Guide your snake across the grid, gobbling up food to grow longer and rack up points. Every bite brings a new challenge — the longer you get, the harder it is to avoid your own tail. As your score climbs, the snake speeds up, pushing your reflexes to the limit. How long can you survive?
Features:

Arrow key controls (+ on-screen d-pad for mobile)
Progressive difficulty — speed increases every 100 points
Score multiplier tied to your current level
High score tracking across rounds

Simple to pick up, hard to put down.
