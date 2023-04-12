/** Enum of bug's color */
export const Color = {
  Red: 0,
  Black: 1,
};

/** Get color of your enemy
 * @param {number} color - your color
 * @returns {number} enemyColor - color of your enemy
 */
export function getEnemyColor(color) {
  if (!Number.isInteger(color)) {
    throw new TypeError(color + "is not color");
  }
  if (color != 0 && color != 1) {
    throw new TypeError(color + " is an invalid color");
  }
  return 1 - color;
}
