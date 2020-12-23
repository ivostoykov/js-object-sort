// var assert = require("assert");
var sorter = require("../src/index").sortObject;
// var chai = require("chai");
var assert = require("chai").assert;
// var expect = chai.expect;
// var should = chai.should();

describe("sortObject", function () {
  describe("Primitives", function () {
    it("String should be unchanged", function () {
      let o = 'A';
      let res = sorter(o);
      assert.equal(res, o, `${o} == ${res}: Values must be unchanged.`);
    });

    it("Number should be unchanged", function () {
      let o = 1;
      let res = sorter(o);
      assert.equal(res, o, `${o} == ${res}: Values must be unchanged.`);
    });

    it("BigInt should be unchanged", function () {
      let o = 2n ** 53n;
      let res = sorter(o);
      assert.equal(res, o, `${o} == ${res}: Values must be unchanged.`);
    });

    it("Symbol should be unchanged", function () {
      let o = Symbol("o symbol");
      let res = sorter(o);
      assert.equal(res.toString(), o.toString(), `${o.toString()} == ${res.toString()}: Values must be unchanged.`);
    });

    it("Boolean should be unchanged", function () {
      let o = true;
      let res = sorter(o);
      assert.equal(res, o, `${o} == ${res}: Values must be unchanged.`);
    });

    it("Undefined should be unchanged", function () {
      let o = undefined;
      let res = sorter(o);
      assert.equal(res, o, `${o} == ${res}: Values must be unchanged.`);
    });

    it("Null should be unchanged", function () {
      let o = null;
      let res = sorter(o);
      assert.equal(res, o, `${o} == ${res}: Values must be unchanged.`);
    });

    it("Date should be unchanged", function () {
      let o = Date.now();
      let res = sorter(o);
      assert.equal(res, o, `${o} == ${res}: Values must be unchanged.`);
    });
  });

  describe("Function", function () {
    it("Function should be unchanged", function () {
      let o = function(){};
      let res = sorter(o);
      assert.equal(res.toString(), o.toString(), `Values must be the same.`);
    });
  });

  describe("Array", function () {
    it("Array should be the same", function () {
      let o = [1,2,3];
      let res = sorter(o);
      assert.strictEqual(res.length, o.length, `${JSON.stringify(res)} == ${JSON.stringify(o)}: Values must be the same in same order.`);
      assert.sameMembers(res, o, 'expect same members');
      assert.sameOrderedMembers(res, o, 'Array should stay in the same order.')
    });

    it("Array should be sorted", function () {
      let o = [3,2,[8,6,1]];
      let res = [...o];
      res = sorter(res);
      console.log(JSON.stringify(res));
      assert.strictEqual(res.length, o.length, `${JSON.stringify(res)} == ${JSON.stringify(o)}: Values must be the same in same order.`);
      assert.sameDeepMembers(res, o, `expect same members\r\ninput:  ${JSON.stringify(o)}\r\noutput: ${JSON.stringify(res)}`);
    });
  });

  describe("Object", function () {
    it("Sort simple Object", function () {
      let o = {'c':1, 'b': 2, 'a': 3};
      let res = sorter(o);
      assert.strictEqual(Object.keys(res).length, Object.keys(o).length, `${Object.keys(res).length} == ${Object.keys(o).length}: Values must be the same in same number.`);
      assert.hasAllKeys(res, o, 'Expected the same properties');
      assert.equal(res[(Object.keys(res)[0])], 3, '1st key is expected to be "3"');
      assert.notEqual(res[(Object.keys(res)[0])], o[(Object.keys(o)[0])], 'both 1st keys are expected to deffer.');
      assert.equal(Object.keys(res)[0], 'a', '1st key is expected to be "a"');
    });

    it("Sort nested Object", function () {
      let o = {'c':[1, 2, 3], 'b': {'c': 3, 'b': 2, 'a': 1}, 'a': {'c': [1,2], 'b':'x', 'a': 1}};
      let res = sorter(o);
      assert.strictEqual(Object.keys(res).length, Object.keys(o).length, `${Object.keys(res).length} == ${Object.keys(o).length}: Values must be the same in same number.`);
      assert.hasAllKeys(res, o, `Expected the same properties\r\ninput: ${JSON.stringify(o)}\r\noutput: ${JSON.stringify(res)}`);
      assert.notEqual(res[(Object.keys(res)[0])], o[(Object.keys(o)[0])], `both 1st keys are expected to deffer.\r\ninput: ${JSON.stringify(o[(Object.keys(o)[0])])}\r\noutput: ${JSON.stringify(res[(Object.keys(res)[0])])}`);
      assert.equal(Object.keys(res)[0], 'a', `1st key is expected to be "a"\r\noutput: ${JSON.stringify(Object.keys(res)[0])}`);
    });

    it("Sort complex Object 1", function () {
      let o = [
        {
          "battle": true,
          "spirit": 113325757,
          "most": "till"
        },
        [
          [
            "practical",
            -867377627.8545899,
            false,
            {
              "arr": [
                1,
                "test",
                false
              ]
            }
          ],
          false,
          {
            "operation": {
              "map": 117513543.67814493,
              "combination": true,
              "summer": [
                -363164836.10298634,
                "amount",
                "food"
              ]
            },
            "birth": "poetry",
            "felt": true
          }
        ],
        1676885078,
        "Tue Dec 22 2020 09:14:35 GMT+0000 (Greenwich Mean Time)"
      ];
      let res = [...o];
      res = sorter(res);
      assert.strictEqual(Object.keys(res).length, Object.keys(o).length, `${JSON.stringify(Object.keys(res))} == ${JSON.stringify(Object.keys(o))}: Values must be the same in same order.`);
      assert.hasAllKeys(res, Object.keys(o), `Expected the same properties\r\ninput: ${JSON.stringify(Object.keys(o))}\r\noutput: ${JSON.stringify(res)}`);
      assert.notEqual((Object.keys(res)[0], Object.keys(o)[0], `both 1st keys are expected to deffer.\r\ninput: ${JSON.stringify(Object.keys(o)[0])}\r\noutput: ${JSON.stringify(Object.keys(res)[0])}`));
      assert.notInclude([Array, Object], Object.values(res), `1st key is expected not to be Array or Object\r\noutput: ${Object.keys(res)[0]}`);
    });

    it('Sort complex Object 2', function(){
      let o = {
        "current": true,
        "noon": false,
        "far": "screen",
        "light": [
          "folks",
          [
            true,
            -1694565173.836296,
            true,
            true,
            [
              true,
              1015989548.4983425,
              {
                "avoid": false,
                "hay": -1128437460,
                "century": "shot",
                "declared": {
                  "mistake": true,
                  "into": -908093064.5995889,
                  "meet": -200861086.92012215,
                  "join": "discover",
                  "aloud": true
                },
                "ring": 1555504937
              },
              [
                "feed",
                1981122951.3650475,
                {
                  "ever": -1922396582,
                  "keep": 753117993.4458222,
                  "available": true,
                  "ice": false,
                  "pony": "sight"
                },
                false,
                {
                  "visitor": 820205002,
                  "has": [
                    "diagram",
                    [
                      55725663.1373744,
                      -1527440139.1381292,
                      false,
                      "not",
                      "enemy"
                    ],
                    "no",
                    1011353670.6886253,
                    false
                  ],
                  "needle": true,
                  "sister": "win",
                  "smooth": -394677844
                }
              ],
              "broken"
            ]
          ],
          false,
          "trick",
          "chicken"
        ],
        "final": true
      };
      let res = {...o};
      res = sorter(res);
      assert.strictEqual(Object.keys(res).length, Object.keys(o).length, `${JSON.stringify(Object.keys(res))} == ${JSON.stringify(Object.keys(o))}: Values must be the same in same order.`);
      assert.hasAllKeys(res, Object.keys(o), `Expected the same properties\r\ninput: ${JSON.stringify(Object.keys(o))}\r\noutput: ${JSON.stringify(res)}`);
      assert.notEqual((Object.keys(res)[0], Object.keys(o)[0], `both 1st keys are expected to deffer.\r\ninput: ${JSON.stringify(Object.keys(o)[0])}\r\noutput: ${JSON.stringify(Object.keys(res)[0])}`));
      assert.notInclude([Array, Object], Object.values(res), `1st key is expected not to be Array or Object\r\noutput: ${Object.keys(res)[0]}`);
    });
  });
});

