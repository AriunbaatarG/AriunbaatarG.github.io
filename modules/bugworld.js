import { BugMap } from "./map.js";
import { Position } from "./position.js";

//getting elements with their ID
const fileinput = document.getElementById("input1");
const gamepage = document.getElementById("main-page");
const entry = document.getElementById("entry");
const btn = document.getElementById("but");
const option = document.getElementById("option");
const option_div = document.getElementById("options-div");
const back_btn = document.getElementById("back");
const quit_div = document.getElementById("quit-div");
const quit_btn = document.getElementById("quit-btn");
const no_btn = document.getElementById("quit-no");
const log = document.getElementById("log");

let final_matrix;

//file input for worldfile map
if (fileinput) {
  fileinput.addEventListener("change", (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const mat = reader.result.split("\n");
      let row = mat[0];
      let column = mat[1];
      //checking if error occured when uploading file
      try {
        final_matrix = new BugMap(
          mat[0],
          mat[1],
          mat.slice(2).map((x) => x.trim().split(" "))
        );
      } catch (error) {
        alert(error);
      }
    };
    reader.readAsText(file);
  });
} else {
  alert("Input file is NULL");
}


//hiding the setting page and displaying gamepage
btn.addEventListener("click", () => {
  if (!final_matrix) alert("Please insert the world map");
  else {
    entry.style.display = "none";

    gamepage.style.display = "block";

    draw(final_matrix);
    btn.style.display = "none";
  }
});

//hiding gamepage and displaying settings page
option.addEventListener("click", () => {
  gamepage.style.display = "none";
  option_div.style.display = "block";
});
//hiding settings and displaying gamepage
back_btn.addEventListener("click", () => {
  gamepage.style.display = "block";
  option_div.style.display = "none";
});
//hiding gamepage and displaying quit page
quit_btn.addEventListener("click", () => {
  gamepage.style.display = "none";
  quit_div.style.display = "block";
});

log.innerHTML = "Logs Will be here";

//hiding quit page and displaying gamepage
no_btn.addEventListener("click", () => {
  quit_div.style.display = "none";
  gamepage.style.display = "block";
});


//function for drawing matrix
const draw = (map) => {
  const row = map.x;
  const column = map.y;

  const canvas = document.getElementById("canvas");

  canvas.width = 1000;
  canvas.height = 450;

  const ctx = canvas.getContext("2d");

  const padding = 50; // Change the padding size as needed

  // Example images corresponding to each character
  const images = {
    "#": "./images/f.png",
    "+": "./images/download.jpg",
    "-": "./images/black.png",
  };
  //hex radius depending on dimensions
  let radius = 0;
  if (row < 5 && column < 5) {
    radius = 50;
  } else if (row < 20 && column < 20) {
    radius = 30;
  } else if (row < 40 && column < 40) {
    radius = 20;
  } else {
    radius = 10;
  }

  const xOffset = radius * 3;
  const yOffset = radius * Math.sqrt(3);
  ctx.translate(xOffset / 3.5, yOffset / 2);

  //function to draw hexagon
  function drawHexagon(x, y, fillColor = "#FFFFFF", strokeColor = "#000000") {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    for (let i = 1; i <= 6; i++) {
      const angle = (i * Math.PI) / 3;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  }
  //function to draw image in hex
  function drawHexImage(x, y, imageSrc) {
    const image = new Image();

    if (imageSrc && images.hasOwnProperty(imageSrc)) {
      image.src = images[imageSrc];
    }

    image.src = imageSrc;
    image.onload = function () {
      const width = 50;
      const height = 50;
      const imageX = x - width / 2;
      const imageY = y - height / 2;
      ctx.save(); // Save the current canvas state
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      for (let i = 1; i <= 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.clip(); // Clip to the hexagon shape
      ctx.drawImage(image, imageX, imageY, width, height);
      ctx.restore(); // Restore the saved canvas state
    };
  }
  //function to draw multiple hexagons
  function drawHexMatrix(map) {
    const numRows = map.x;
    const numCols = map.y;
    let x, y;
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols - 1; j++) {
        // if( == 0)continue
        x = j * xOffset + ((i % 2) * xOffset) / 2;
        y = (i * yOffset) / 2;
        drawHexagon(x, y);
      }
    }
  }
  //function to draw multiple images in respecitive hexagons
  function drawImageMatrix(map, images) {
    const numRows = map.x;
    const numCols = map.y;
    let x, y, imageSrc;

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols - 1; j++) {
        x = j * xOffset + ((i % 2) * xOffset) / 2;
        y = (i * yOffset) / 2;
        imageSrc =
          images[map.cellAt(new Position(i, j)).toString()] ||
          "./images/food.jpg";
        drawHexImage(x, y, imageSrc);
      }
    }
  }

  //calling the functions
  drawHexMatrix(map);
  drawImageMatrix(map, images);
};



//getting elements by their ID for statistics
const iter = document.getElementById("iterations");
const food_num = document.getElementById("food_num");
const red_remain = document.getElementById("red_remain");
const red_killed = document.getElementById("red_killed");
const food_red = document.getElementById("food_red");
const black_remain = document.getElementById("black_remain");
const black_killed = document.getElementById("black_killed");
const food_black = document.getElementById("food_black");

//setting values
iter.innerHTML = 13;
food_num.innerHTML = 10;
red_remain.innerHTML = 20;
red_killed.innerHTML = 30;
food_red.innerHTML = 20;
black_remain.innerHTML = 20;
black_killed.innerHTML = 30;
food_black.innerHTML = 20;
