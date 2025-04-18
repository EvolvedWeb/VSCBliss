// // @ts-check

// import { assert } from 'assert';
// import { convertConcatenationToTemplateLiteral } from '../src/utils/convert';

// // Basic tests
// const tests = [
//   {
//     input: '"Hello, " + name + "!"',
//     expected: '`Hello, ${name}!`'
//   },
//   {
//     input: '"Sum: " + (a + b)',
//     expected: '`Sum: ${(a + b)}`'
//   },
//   {
//     input: '"Value: " + obj.value',
//     expected: '`Value: ${obj.value}`'
//   },
//   {
//     input: 'count + " items"',
//     expected: '`${count} items`' // Will come out like this due to split order
//   },
//   {
//     input: '"Name: " + first + " " + last',
//     expected: '`Name: ${first} ${last}`'
//   },
//   {
//     input: '42 + 8',
//     expected: '42 + 8' // Not a string concat — should return unchanged
//   }
// ];

// // Run tests
// for (const { input, expected } of tests) {
//   const result = convertConcatenationToTemplateLiteral(input);
//   assert.strictEqual(result, expected, `Failed on input: ${input}`);
// }
