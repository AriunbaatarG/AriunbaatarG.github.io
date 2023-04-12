import { getEnemyColor, Color } from "./color.js";
import { Position } from "./position.js";

/** Cell class from specification document */
class Cell {
  /** @constructor from a `symbol`. Symbol should be correct symbol of a map */
  constructor(symbol) {
    /** mustn't be null */
    this.obstructed = symbol === "#";
    /** null if no bug on the cell */
    this.bug = null;
    /** null if cell couldn't handle food */
    this.food = "0" <= symbol && symbol <= "9" ? symbol - 0 : null;
    this.marker = {};

    if (symbol === "-") {
      this.base = Color.Black;
    } else if (symbol === "+") {
      this.base = Color.Red;
    } else {
      this.base = null;
    }
  }
  isObstructed() {
    return this.obstructed;
  }
  isOccupied() {
    return this.bug !== null;
  }
  setBug(bug) {
    this.bug = bug;
  }
  getBug() {
    return this.bug;
  }
  removeBug() {
    this.bug = null;
  }
  setFood(newFood) {
    if (this.food === null) {
      throw new Error("could set food, because cell can't store any food");
    }
    this.food = newFood;
  }
  isFriendlyBase(color) {
    return this.base === color;
  }
  isEnemyBase(color) {
    return this.base == getEnemyColor(color);
  }
  #ensureExistence(color) {
    if (this.marker[color] === undefined) {
      this.marker[color] = [false, false, false, false, false, false];
    }
  }
  setMarker(color, markerNum) {
    this.#ensureExistence(color);
    this.marker[color][markerNum] = true;
  }
  clearMarker(color, markerNum) {
    this.#ensureExistence(color);
    this.marker[color][markerNum] = false;
  }
  isFriendlyMarker(color, markerNum) {
    this.#ensureExistence(color);
    return this.marker[color][markerNum];
  }

  isEnemyMarker(color, markerNum) {
    this.#ensureExistence(getEnemyColor(color));
    return this.marker[getEnemyColor(color)][markerNum];
  }
  toString() {
    this.#checkCorrectState();
    if (this.obstructed) {
      return "#";
    }
    if (this.bug !== null) {
      if (this.bug.color === Color.Red) {
        return "r";
      }
      return "b";
    }
    if (this.base !== null) {
      if (this.base === Color.Red) {
        return "+";
      }
      return "-";
    }
    if (this.food !== null) {
      return this.food + "";
    }
    return ".";
  }
  /** check that cell is suitable for a one symbol */
  #checkCorrectState() {
    var cellColor = !this.obstructed || this.base === null;
    var cellFood = !this.obstructed || this.food === null;
    var cellBug = !this.obstructed || this.bug === null;
    if (cellColor && cellFood && cellBug) {
      return;
    }
    throw new Error("cell incorrect state");
  }
}
/** Map class from a specification */
export class BugMap {
  /**
   *
   * @param {Number} n number of rows
   * @param {Number} m number of columns
   * @param {Array} cells 2D dimensional symbol array of cells
   */
  constructor(n, m, cells) {
    checkMap(cells, n, m);
    this.x = n;
    this.y = m;
    this.map = Array(n).fill();
    for (let i = 0; i < n; i++) {
      this.map[i] = Array(m).fill();
      for (let j = 0; j < m; j++) {
        this.map[i][j] = new Cell(cells[i][j]);
      }
    }
  }

  cellAt(position) {
    console.log(position.x, position.y, this.x, this.y);
    return this.map[position.x][position.y];
  }

  static adjacent(position, dir) {
    if (!Number.isInteger(dir) || dir < 0 || dir > 5) {
      throw new TypeError("invalid dir");
    }
    const shifts = Array.of([0, 1], [1, 1], [1, 0], [0, -1], [0, -1], [-1, 1]);
    const sx = shifts[dir][0];
    const sy = shifts[dir][1];
    return new Position(position.x + sx, position.y + sy);
  }
  static turn(direction, turn) {
    return (direction + turn) % 6;
  }

  sensedCell(position, direction) {
    return undefined;
  }

  isObstructedAt(position) {
    return this.cellAt(position);
  }
  setBugAt(position, bug) {
    return this.cellAt(position).setBug(bug);
  }
  getBugAt(position) {
    return this.cellAt(position).getBug();
  }
  removeBugAt(position) {
    return this.cellAt(position).removeBug();
  }
  setFoodAt(position, newFood) {
    this.cellAt(position).setFood(newFood);
  }
  isFriendlyBaseAt(position, color) {
    return this.cellAt(position).isFriendlyBase(color);
  }
  isEnemyBaseAt(position, color) {
    return this.cellAt(position).isEnemyBase(color);
  }
  setMarkerAt(position, color, marker) {
    this.cellAt(position).setMarker(color, marker);
  }
  clearMarkerAt(position, color, marker) {
    this.cellAt(position).clearMarker(color, marker);
  }
  isFriendlyMarkerAt(position, color, marker) {
    return this.cellAt(position).isFriendlyMarker(color, marker);
  }
  isEnemyMarkerAt(position, color, marker) {
    return this.cellAt(position).isEnemyMarker(color, marker);
  }

  toString() {
    return this.map
      .map((row) => row.map((cell) => cell.toString()).join(""))
      .join("\n");
  }
  /**
   *
   * @param {String} text a plain text of map
   * @constructor
   */
  static fromText(text) {
    const row = text[0];
    const column = text[1];
    const line = text.slice(2).map((x) => x.split(" "));
    return new BugMap(row, column, line);
  }
}

const checkMap = (exam, row, column) => {
  let red = null,
    black = null;

  //checking if rows and columns match the field
  if (row != exam.length) {
    throw new Error(
      "row numbers(" +
        row +
        ") doesn't matches with actual rows number (" +
        exam.length +
        ")"
    );
  }
  for (let i = 0; i < row; i++) {
    if (column != exam[i].length) {
      throw new Error(
        "column numbers(" +
          column +
          ") doesn't matches with actual column number (" +
          exam[i].length +
          ")"
      );
    }
  }

  const redBaseCells = new Set();
  const blackBaseCells = new Set();
  // Deep first search for linkness check
  const traverse = (set, position, symbol) => {
    if (set.has(position.x * column + position.y)) {
      return;
    }
    set.add(position.x * column + position.y);
    for (let dir = 0; dir < 6; dir++) {
      try {
        const nextPosition = BugMap.adjacent(position, dir);
        if (
          nextPosition.x < row &&
          nextPosition.y < column &&
          exam[position.x][position.y] === symbol
        ) {
          traverse(set, nextPosition, symbol);
        }
      } catch (error) {
        if (error instanceof TypeError) {
        } else {
          throw error;
        }
      }
    }
  };

  //Checking if the borders exist
  //Also checking if each swarm color exists
  //Also check if an illegal character exists in the field
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (i === 0 || j === 0 || i === row - 1 || j === column - 1) {
        //if there is no border in the middle
        //i.e empty character
        if (exam[i][j] === null) {
          throw new Error("found empty symbol");
        }

        if (exam[i][j] !== "#") {
          throw new Error("borders should be filled with obstacles");
        }
      }

      //checking if an odd character exists
      if (
        !(
          exam[i][j] === "#" ||
          exam[i][j] === "." ||
          exam[i][j] === "+" ||
          exam[i][j] === "-" ||
          (exam[i][j] >= "0" && exam[i][j] <= "9")
        )
      ) {
        throw new Error("invalid symbol has been founded");
      }

      const position = new Position(i, j);

      //checking if red is present
      if (exam[i][j] === "+") {
        if (redBaseCells.has(position.x * column + position.y)) {
          continue;
        } else if (red !== null) {
          throw Error("unlinked red base");
        }
        red = new Position(i, j);
        traverse(redBaseCells, red, "+");
      }

      //checking if black is present

      if (exam[i][j] === "-") {
        if (blackBaseCells.has(position.x * column + position.y)) {
          continue;
        } else if (black !== null) {
          throw Error("unlinked black base");
        }
        black = new Position(i, j);
        traverse(blackBaseCells, black, "-");
      }
    }
  }
  if (red === null) {
    throw new Error("there isn't any red base");
  }
  if (black === null) {
    throw new Error("there isn't any black base");
  }
};
