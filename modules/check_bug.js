export const check_instructions = (lines) => {
  //used to ignore what comes after the semicolon
  let sentence = lines.split(";");
  let sentence2 = sentence.shift();

  //removing the space before the semicolon
  let instruction = sentence2.slice(0, sentence2.length - 1);

  //spilitng the line into words to further process them
  let words = [];
  words = instruction.split(" ");


  //throwing errors if parameters are not correct
  //if correct calling the functions
  if (words[0] === "mark") {
    if (words.length === 3) {
      mark(words[1], words[2]);
    } else {
      throw "Incorrect use of command/missing token";
    }
  } else if (words[0] === "unmark") {
    if (words.length === 3) {
      unmark(words[1], words[2]);
    } else {
      throw "Incorrect use of command/missing token";
    }
  } else if (words[0] === "pickup") {
    if (words.length === 3) {
      pickup(words[1], words[2]);
    } else {
      throw "Incorrect use of command/missing token";
    }
  } else if (words[0] === "drop") {
    if (words.length === 2) {
      drop(words[1], words[2]);
    } else {
      throw "Incorrect use of command/missing token";
    }
  } else if (words[0] === "turn") {
    if (words.length === 3) {
      turn(words[1], words[2]);
    } else {
      throw "Incorrect use of command/missing token";
    }
  } else if (words[0] === "move") {
    if (words.length === 3) {
      move(words[1], words[2]);
    } else {
      throw "Incorrect use of command/missing token";
    }
  } else if (words[0] === "flip") {
    if (words.length === 4) {
      flip(words[1], words[2], words[3]);
    } else {
      throw "Incorrect use of command/missing token";
    }
  } else if (words[0] == "sense") {
    if (words.length === 5) {
      sense(words[1], words[2], words[3], words[4]);
    } 
    
    else {
      throw "Incorrect use of command/missing token";
    }

    let correct = false;

    const directions = ["ahead", "left", "right", "below"];

    for (let i = 0; i < directions.length; i++) {
      if (words[1] === directions[i]) {
        correct = true;
      }
    }
    if (!correct) {
      throw "typos/non-existent tokens";
    }
  } else if(!isNaN(words[0])){
      throw "typos/non-existent tokens";

    }else {
      console.log(words[0]);

    throw"typos/non-existent tokens";
    
  }
};


//defining the functions but not implementing them
const mark = (a, b) => {
  console.log("1mark is called with correct parameter");
};

const unmark = (a, b) => {
  console.log("unmark is called with correct parameter");
};

const pickup = (a, b) => {
  console.log("pickup is called with correct parameter");
};

const drop = (a) => {
  console.log("drop is called with correct parameter");
};

const turn = (a, b) => {
  console.log("turn is called with correct parameter");
};
const move = (a, b) => {
  console.log("move is called with correct parameter");
};
const flip = (a, b, c) => {
  console.log("flip is called with correct parameter");
};
const sense = (sensedir, a, b) => {
  console.log("sense is called with correct parameter");
};
