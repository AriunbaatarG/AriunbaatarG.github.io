/** Position class
 * that is used in Map as an argument
 */
export class Position {
  /** Construct from an actual position
   * @param {Number} x - row coordinate
   * @param {Number} y - column coordinate
   */
  constructor(x, y) {
    Position.#checkNumber(x);
    Position.#checkNumber(y);

    this.x = x;
    this.y = y;
  }
  /** Check if coordinate is a correct position
   * @param {Number} x - number
   * @throws {TypeError} if incorrect number
   */
  static #checkNumber(x) {
    if (!Number.isInteger(x)) {
      throw new TypeError(x + " is not a Integer");
    }
    if (x < 0) {
      throw new TypeError(x + " is less than 0");
    }
  }
}
