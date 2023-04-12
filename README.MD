## Getting Started

You can access the game hosted on http://clabsql.clamv.jacobs-university.de/~bgudissa/.

## Prerequiestes

A browser to run the game. Apart from that cloning the repository and opening the index.html will work.

## Libraries and Frameworks used

    * Bootstrap: Mostly used for the styling of buttons
    * Mocha.js & Chai.js: Testting frameworks

## Introduction

    * The game currently functions in the following way:

        * Start page prompting users to start playing with the button called Start.
        * After user presses start the game takes it to another page where the user is asked to upload the worldmap file as well as assembler code for the two bugs.
        * Then the page checks for the validity of the inserted worldmap file as well assembler bug world files.
        * If valid the game displays the world map file on a canvas element.
        * On the right hand side there are two buttons and statitics about the game:
            * Options page where users can users can edit the settings of the game including the color of the bugs as well as the number of iterations and ticks.
            * A quit option that asks users if they are sure they want to quit. If yes it takes them to the startpage of the game and if no continues the game

## Running Tests
To run test just go to the `/test/`(`http://clabsql.clamv.jacobs-university.de/~bgudissa/test`) and see tests status.



## File inputs
* The user can input files for both the world map and bug assembler freely. However, we have provided 2 accepted and 2 rejected files for both the world map file as well as the  bug files inside inputfiles. Therefore we have:
        * accepted_bug.txt
        * accepted_bug2.txt 
        * accepted_world.txt 
        * accepted_world2.txt
        * rejected_bug.txt
        * rejected_bug2.txt
        * rejected_world.txt
        * rejected_world2.txt
      
    
 inside inputfiles directory.

## Sprint 1 Implementation

    * Start page prompting users to start playing with the button called Start

    * A settings page where the user is asked to upload the worldmap file as well as assembler code for the    two bugs, and setting to toggle the log output as well as adjust number of iterations.

    * Valdity checker for the world map file.

    * Validity checker for the bug assemebler code.

    * Game page where the game starts based on the input from user

        * A GUI that accepts world map files and displays the world accordignly on a canvas element.

        * A div to showcase the game statistics, handled with JS code. Currently, the statistics are set to arbitrary numbers.

        * A div to showcase output.

        * An options button takes to an option page where users can change color of bugs as well as set the number of iterations and adjust time.

        *  A quit button that takes to a quit page asking users if they are sure they want to quit the game and if so takes users to the start page, if not returns back to the gamepage.

    * Class for cell is constructed along with all the methods needed implemmented with the correct game logic.

    * Class BugMap is constructed along with all the methods needed implemmented with the correct game logic.

    * Position class to construct actual position.

## Modules and their Functionality

    * bug_input.js:

        *Accepts input for the two bug assembler codes.
        * Checks validy by calling check_instructions from 'check_bug.js'.

    * bugworld.js :

        * Accepts input for the world map file.
        * Creates a new BugMap impelemented in map.js.
            * Here also checking is done for the validation of the world map file.
        * If input fields are valid when user presses next this module hides the settings pages and displays the game page.
        * When options button is clicked this module hides the gamepage and displays the settings page.
        * When back to game button is pressed this module hides the options page and displays the game page.
        * When quit button is pressed this module hides the gamepage and displays the quit page.
        * When no is pressed on quit page this module hides the quit page and displays the game page.

        * Implementes a draw function that accepts a matrix map as input and implements the GUI on a canvas element.
            * Implements drawHexagon function to draw a hexagon with given parameters.
            * Implements drawHexImage function to draw an image inside of a hexagon
            * Implementes drawHexMatrix function to draw the multiple hexagons based on dimensions.
                * This calls the drawHeagon function.
            * Implements drawImageMatrix to draw the mutliple images in their respecitve cells.
        * Sets the innerHTML values for the gamestatistics arbitrary values.

    * Check_bug.js:
        * Implements a check_instructions function that accepts lines and checks if they are valid assembler code for the bugs.
        * Throws errors if not.
        * Define function for the types of assembler lines in the bug assembler code
            * Here the functions are not impelmented. values are just logged to the console.

    * color.js:
        * Implements getEnemeyColor function to determine color of enemy.
            * Error handling is considered here.
        * Creates an object for color with red key to be 0 and black key to be 1.

    * map.js:

        * Impelemnts class cell with a constructor and defines and implements the following methods:

            *isObstructed()
            *isOccupied()
            *setBug(bug)
            *getBug()
            *removeBug()
            *setFood(newFood)
            *isFriendlyBase(color)
            *isEnemyBase(color)
            * #ensureExistence(color)
            *setMarker(color, markerNum)
            *clearMarker(color, markerNum)
            *isEnemyMarker(color, markerNum)
            *toString()
            * #checkCorrectState()

        * Impelemnts class BugMap with a constructor and defines and implements the following methods:
            * cellAt(position)
            *adjacent(position, dir)
            *turn(direction, turn)
            *sensedCell(position, direction)
            *isObstructedAt(position)
            *setBugAt(position, bug)
            *getBugAt(position)
            *removeBugAt(position)
            * setFoodAt(position, newFood)
            *isFriendlyBaseAt(position, color)
            *isEnemyBaseAt(position, color)
            *setMarkerAt(position, color, marker)
            *clearMarkerAt(position, color, marker)
            *isFriendlyMarkerAt(position, color, marker)
            * isEnemyMarkerAt(position, color, marker)
            *toString()
            *fromText(text)

        * Implements checkMap function to deal with the validity of the input for the world map file.
            * Error is thrown for different types of erros.


    * position.js:
        * Defines and implements a position class used in Map as an argument. It also implements the follwing method:
            * #checkNumber(x)

## HTML pages

    *index.html:
        * Start page where users are prompted to click start to start the game.

    *start.html
        * Has multiple divs with the following uses:
            *entry: The settings page asking users to input files and adjust settings.
            *main-page: Holds the main game where user can see the game as well as statistics. Users can also press options and quit here.
            * options-div: Holds the option page is users adjsut option in between games
            * quit-div: Prompts user if they want to quit or not

## Styling

    * Mostly done by css in style.css
    * Bootstrap is also used to style the buttons.

## Sprint 2 Implementation

