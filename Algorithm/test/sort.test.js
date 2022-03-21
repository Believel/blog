import bubbleSort from '../code/Sort/01bubble'
import selectSort from '../code/Sort/02selectSort'

test('sort: [3, 4, 15, 26, 2, 27, 19, 50, 38]', () => {
  expect(bubbleSort([3, 4, 15, 26, 2, 27, 19, 50, 38])).toEqual([2, 3, 4, 15, 19, 26, 27, 38, 50])
})

test('selectSort: [2, 4, 1, 9, 20, 19, 34]', () => {
  expect(selectSort([2, 4, 1, 9, 20, 19, 34])).toEqual([1, 2, 4, 9, 19, 20, 34])
})