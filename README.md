For my project, I created a game like 2048. It is intended to teach basic lambda calculus in a fun and more enjoyable way. I have written a home page explaining lambda calculus and the instructions for the game. You will be taken to the game once you click play at the bottom of the instructions. It is set up in a four-by-four grid. It starts with two tiles colored tiles with the rest being blank. The colored tiles have either lambda expressions or values on them. The game's controls are the WASD or arrow keys. Pressing any of these buttons will move the tiles in that direction, and if the two tiles match, they combine, and a new lambda expression or value is created. To match two tiles, you will apply a value to a lambda expression that gives the next multiple of 2. 
The game works code-wise in that I have an array that keeps track of the tiles in the game. The tiles that are seen on the screen are stored as children of a div I have given the id "board." I have the logic for moving in each direction and that changes the array, and then I update the screen based on that array by removing all the children from the board div and replacing them with the updated ones based on which way the player moved. I also have two arrays for each multiple of two that store a list of different lambdas and the second list that stores a list of values. I do this so that the game has some form of randomness to it, so the player learns the lambda calculus instead of just memorizing what goes with what. The game also has a color mode where the tiles get colored based on what multiple of two they are. This makes it easier for someone to learn lambda calculus because they get the answers instead of having to guess to start.
