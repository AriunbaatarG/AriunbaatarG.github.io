import { BugMap } from "../modules/map.js";
import { Position } from "../modules/position.js";
import { getEnemyColor } from "../modules/color.js";
import {
  no_black_swarm,
  no_outer,
  no_red_swarm,
  invalid_symbol,
  non_linked_black,
  invalid_dimensions,
  non_linked_red,
} from "./resources.js";
let assert = chai.assert;
let expect = chai.expect;

function split_lines(line) {
  return line
    .trim()
    .split("\n")
    .map((x) => x.trim());
}

describe("map", function () {
  it("After creation all dimensions should be correct", function () {
    console.error("here");
    const testData = { n: 5, m: 3, cells: ["###", "#+#", "#9#", "#-#", "###"] };
    let { n, m, cells } = testData;
    const map = new BugMap(n, m, cells);
    assert.equal(map.x, n);
    assert.equal(map.y, m);
  });
  it("After creation all cells has correct states", function () {
    const check = function (position, obs, food, str) {
      const cell = map.cellAt(position);
      assert.equal(cell.isObstructed(), obs);
      assert.equal(cell.isOccupied(), false);
      assert.equal(cell.getBug(), null);
      assert.equal(cell.food, food);
      for (let c = 0; c < 2; c++) {
        for (let marker = 0; marker < 6; marker++) {
          assert.equal(cell.isFriendlyMarker(c, marker), false);
          assert.equal(cell.isEnemyMarker(c, marker), false);
        }
      }
      assert.equal(cell.toString(), str);
    };
    const mapString = split_lines(`
            ############
            #0123456789#
            #+-........#
            ############
        `);
    let n = mapString.length;
    let m = mapString[0].length;
    const map = new BugMap(n, m, mapString);
    assert.equal(map.x, n);
    assert.equal(map.y, m);
    for (let i = 0; i < 10; i++) {
      let position = new Position(1, i + 1);
      check(position, false, i, "" + i);
      const cell = map.cellAt(position);
      for (let c = 0; c < 2; c++) {
        assert.equal(cell.isFriendlyBase(c), false);
      }
    }
    check(new Position(2, 0), true, null, "#");
    for (let c = 0; c < 2; c++) {
      let position = new Position(2, c + 1);
      const cell = map.cellAt(position);
      check(position, false, null, "+-".charAt(c));
      assert.equal(cell.isFriendlyBase(c), true);
      assert.equal(cell.isEnemyBase(c), false);
      let position2 = new Position(2, (c ^ 1) + 1);
      let enemyCell = map.cellAt(position2);
      assert.equal(enemyCell.isEnemyBase(c), true);
      assert.equal(enemyCell.isFriendlyBase(c), false);
    }
    for (let i = 3; i < 10; i++) {
      const position = new Position(2, i);
      check(position, false, null, ".");
      const cell = map.cellAt(position);
      for (let c = 0; c < 2; c++) {
        assert.equal(cell.isFriendlyBase(c), false);
        assert.equal(cell.isEnemyBase(c), false);
      }
    }
  });
  it("Marker sets correctly", function () {
    const map = new BugMap(3, 5, ["#####", "#.+-#", "#####"]);
    assert.equal(map.x, 3);
    assert.equal(map.y, 5);
    const position = new Position(1, 1);
    const getMarkers = function (color) {
      return Array(6)
        .fill()
        .map((_, i) => map.isFriendlyMarkerAt(position, color, i));
    };
    const getEnemyMarkers = function (color) {
      return getMarkers(getEnemyColor(color));
    };
    const arrayEquals = function (a, b) {
      for (let i = 0; i < 6; i++) {
        assert.equal(a[i], b[i]);
      }
    };
    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < 6; i++) {
        var expected = Array(6).fill(false);
        expected[i] = true;
        map.setMarkerAt(position, c, i);
        arrayEquals(getMarkers(c), expected);
        arrayEquals(getEnemyMarkers(c), Array(6).fill(false));
        map.clearMarkerAt(position, c, i);
        arrayEquals(getMarkers(c), Array(6).fill(false));
      }
    }
  });
  it("Two markers could stays", function () {
    const map = new BugMap(3, 5, ["#####", "#.+-#", "#####"]);
    assert.equal(map.x, 3);
    assert.equal(map.y, 5);
    const position = new Position(1, 1);
    const getMarkers = function (color) {
      return Array(6)
        .fill()
        .map((_, i) => map.isFriendlyMarkerAt(position, color, i));
    };
    const getEnemyMarkers = function (color) {
      return getMarkers(getEnemyColor(color));
    };
    const arrayEquals = function (a, b) {
      for (let i = 0; i < 6; i++) {
        assert.equal(a[i], b[i]);
      }
    };
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        let expected0 = Array(6).fill(false);
        expected0[i] = true;
        let expected1 = Array(6).fill(false);
        expected1[j] = true;
        map.setMarkerAt(position, 0, i);
        map.setMarkerAt(position, 1, j);
        arrayEquals(getMarkers(0), expected0);
        arrayEquals(getEnemyMarkers(0), expected1);
        arrayEquals(getMarkers(1), expected1);
        arrayEquals(getEnemyMarkers(1), expected0);
        map.clearMarkerAt(position, 0, i);
        map.clearMarkerAt(position, 0, i);
        map.clearMarkerAt(position, 1, j);
        map.clearMarkerAt(position, 1, j);
      }
    }
  });
  it("marker on two cells", function () {
    const map = new BugMap(3, 6, ["######", "#..+-#", "######"]);
    assert.equal(map.x, 3);
    assert.equal(map.y, 6);
    const getMarkers = function (position, color) {
      return Array(6)
        .fill()
        .map((_, i) => map.isFriendlyMarkerAt(position, color, i));
    };
    map.setMarkerAt(new Position(1, 1), 0, 0);
    const arrayEquals = function (a, b) {
      for (let i = 0; i < 6; i++) {
        assert.equal(a[i], b[i]);
      }
    };
    arrayEquals(getMarkers(new Position(1, 2), 0), Array(6).fill(false));
  });
  it("Food setting", function () {
    const map = new BugMap(5, 4, ["####", "#11#", "#+-#", "#..#", "####"]);
    assert.equal(map.x, 5);
    assert.equal(map.y, 4);
    assert.equal(map.cellAt(new Position(1, 1)).food, 1);
    assert.equal(map.cellAt(new Position(1, 2)).food, 1);
    map.setFoodAt(new Position(1, 1), 9);
    assert.equal(map.cellAt(new Position(1, 1)).food, 9);
    assert.equal(map.cellAt(new Position(1, 2)).food, 1);
    assert.throws(() => map.setFoodAt(new Position(1, 0), 1), Error);
    assert.throws(() => map.setFoodAt(new Position(2, 1), 1), Error);
    assert.throws(() => map.setFoodAt(new Position(2, 2), 1), Error);
    assert.throws(() => map.setFoodAt(new Position(3, 2), 1), Error);
  });
  describe("Invalid maps", function () {
    const testData = [
      { data: invalid_dimensions, name: "invalid_dimensions" },
      { data: no_red_swarm, name: "no_red_swarm" },
      { data: no_black_swarm, name: "no_black_swarm" },
      { data: no_outer, name: "no_outer" },
      { data: invalid_symbol, name: "invalid_symbol" },
      { data: non_linked_black, name: "non_linked_black" },
      { data: non_linked_red, name: "non_linked_red" },
    ];
    testData.forEach(({ data, name }) =>
      it("file: " + name, function (done) {
        assert.throws(() => BugMap.fromText(data.split("\n")), Error);
        done();
      })
    );
  });
});

describe("Position", function () {
  it("Correct creation", function () {
    function check(p, x, y) {
      assert.equal(p.x, x);
      assert.equal(p.y, y);
    }
    check(new Position(1, 1), 1, 1);
    check(new Position(1000, 239), 1000, 239);
    check(new Position(0, 4), 0, 4);
  });
  it("Invalid creation", function () {
    assert.throws(() => new Position("a", 0), TypeError);
    assert.throws(() => new Position(0, "a"), TypeError);
    assert.throws(() => new Position(0.5, 1), TypeError);
    assert.throws(() => new Position(1, 0.5), TypeError);
    assert.throws(() => new Position(-1, 1), TypeError);
    assert.throws(() => new Position(1, -1), TypeError);
  });
});
