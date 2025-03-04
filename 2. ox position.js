;`
O's and X's
Given an array containing three strings, representing the rows of an O's and X's board from top to bottom, return the row and column position of the winning move for X's. Return false if the game cannot be won.

Examples
XAndO([" | | ", " |X| ", "X| | "]) ➞  [1, 3]

// Board becomes:
//    |   |
//    |X |
// X |   |

XAndO(["X|X|O", "O|X| ", "X|O| "]) ➞ [3, 3]

// Board becomes:
// X|X|O
// O|X|
// X|O|

10:30|30
`
const XAndO = (arr) => {
  try {
    let xPosition = []
    let blankPosition = []

    for (let index = 0; index < arr.length; index++) {
      const element = arr[index]
      const position = element.split('|')
      position.forEach((element, ind) => {
        if (element === 'X') {
          xPosition.push([index + 1, ind + 1])
        } else if (element === ' ') {
          blankPosition.push([index + 1, ind + 1, 'blank'])
        }
      })
    }
    let category_x = {}
    let category_y = {}
    let category_xy = []
    let category_xy_sum = []
    ;[...xPosition, ...blankPosition].forEach((i, indic) => {
      category_x[i[0]]
        ? (category_x[i[0]] = [...category_x[i[0]], i.join('')])
        : (category_x[i[0]] = [i.join('')])
      category_y[i[1]]
        ? (category_y[i[1]] = [...category_y[i[1]], i.join('')])
        : (category_y[i[1]] = [i.join('')])
      if (i[0] === i[1]) {
        category_xy.push(i.join(''))
      }
      if (i[0] + i[1] === 4) {
        category_xy_sum.push(i.join(''))
      }
    })

    const blankLength = (arr) => {
      return arr?.filter((i) => i.includes('blank')).length === 1
    }
    let correctPair = [
      ...Object.values(category_x),
      ...Object.values(category_y),
      category_xy,
      category_xy_sum,
    ].filter((i) => i.length === 3 && blankLength(i))[0]

    let correctPosition = `${correctPair.find((i, index) =>
      `${i}`.includes('blank'),
    )}`.replace('blank', '')
    return correctPosition
  } catch (error) {
    return false
  }
}

// console.log(XAndO(['X|X|O', 'O|X| ', 'X|O| ']))

const Test = {
  assertSimilar: (a, b) => console.log([a, b]),
}

Test.assertSimilar(XAndO([' | | ', ' |X| ', 'X| | ']), [1, 3])

Test.assertSimilar(XAndO(['X|X|O', 'O|X| ', 'X|O| ']), [3, 3])

Test.assertSimilar(XAndO(['X|X|O', 'O|O| ', 'X|O| ']), false)

Test.assertSimilar(XAndO(['X|X| ', 'O|O| ', 'X|O| ']), [1, 3])

Test.assertSimilar(XAndO(['X| | ', 'O|O| ', 'X|O|X']), false)

Test.assertSimilar(XAndO(['X|X|O', ' |O| ', 'X|O| ']), [2, 1])

Test.assertSimilar(XAndO([' | |X', 'O| | ', 'X|O| ']), [2, 2])

Test.assertSimilar(XAndO([' | |X', 'O|X| ', ' |O| ']), [3, 1])

Test.assertSimilar(XAndO([' | |X', 'O|O| ', 'X|O|X']), [2, 3])
