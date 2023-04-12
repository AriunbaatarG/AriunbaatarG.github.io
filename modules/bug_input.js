import { check_instructions } from "./check_bug.js";

//getting elements by id
const fileinp = document.getElementById("input2");
const fileinp2 = document.getElementById("input3");
const next_btn = document.getElementById("but");

let line1 = [],
  line2 = [];


//file input for bug1
if (fileinp) {
  fileinp.addEventListener("change", (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
    const lines = reader.result.split("\n");
    let loop = true;

      for (let i = 0; i < lines.length; i++) {
        //removing space at the end

        line1[i] = lines[i].trim();
        //checking if input is valid

        if (line1[i] !== "") { try {
            check_instructions(line1[i]);
          } catch (error) {
            loop = false;
            alert(error);
          }
        }
        if(!loop){
          break;
        }
      }
    };

    reader.readAsText(file);
  });
}

//file input for bug2

if (fileinp2) {
  fileinp2.addEventListener("change", (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    let loop = true;
    reader.onload = (event) => {
      const lines = reader.result.split("\n");

      for (let i = 0; i < lines.length; i++) {
        //removing space at the end
        line2[i] = lines[i].trim();

        //checking if input is valid
        if (line2[i] !== "") {
          try {
            check_instructions(line2[i]);
          } catch (error) {
            loop = false;
            alert(error);
          }

        }
        //break from loop once error is caught
        if(!loop){
          break;
        }
      }
    };

    reader.readAsText(file);
  });
}
//alert if no file is submitted
next_btn.addEventListener("click", () => {
  if (!line1) {
    alert("Please inset assembler for bug1");
  }
  if (!line2) {
    alert("Please inset assembler for bug2");
  }
});
