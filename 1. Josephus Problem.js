;`

The Josephus Problem
This classic problem dates back to Roman times. There are 41 soldiers arranged in a circle. 
Every third soldier is to be killed by their captors, continuing around the circle until only one soldier remains. 
He is to be freed. Assuming you would like to stay alive, at what position in the circle would you stand?

Generalize this problem by creating a function that accepts the number of soldiers n and the interval at which they are killed i, 
and returns the position of the fortunate survivor.

Examples
josephus(41, 3) ➞ 31

josephus(35, 11) ➞ 18

josephus(11, 1) ➞ 11

josephus(2, 2) ➞ 1
Notes
Assume the positions are numbered 1 to n going clockwise around the circle.
If the interval is 3, the first soldiers to die are at positions 3, 6, and 9.
9:15 => 9:45

`

let safePosition = (n, i) => {
  let num = n
  let interval = i
  let testPosition = new Object()
  let totalPosition = new Object()
  let unsafePosition = new Object()
  let safeSpace = []
  for (let index = 1; index <= num; index++) {
    safeSpace.push(index)
    totalPosition[index] = '*'
    testPosition[index] = '*'
  }
  let currentIndex = 1
  let currentPosition = 1
  let loop = 1

  const modifiedPosition = (
    totalPosition,
    currentPosition,
    num,
    currentIndex,
    loop,
  ) => {
    if (totalPosition[currentPosition]) {
      return currentPosition
    } else {
      if (currentPosition == num) {
        return modifiedPosition(totalPosition, 1, num, currentIndex, loop)
      } else {
        return modifiedPosition(
          totalPosition,
          currentPosition + 1,
          num,
          currentIndex,
          loop,
        )
      }
    }
  }
  let nextPosition = (currentPosition, num, currentIndex, loop) => {
    if (currentPosition == num) {
      return 1
    }

    return currentPosition + 1
  }

  while (Object.keys(totalPosition).length > 1) {
    loop++
    if (currentIndex == interval) {
      unsafePosition[currentPosition] = safeSpace[0]
      delete totalPosition[currentPosition]
      safeSpace.shift()
      currentIndex = 1
    } else {
      currentIndex++
    }
    currentPosition = modifiedPosition(
      totalPosition,
      nextPosition(currentPosition, num, currentIndex, loop),
      num,
      currentIndex,
      loop,
    )
  }
  return Object.keys(totalPosition)[0]
}

// safePosition(14, 2) //13
// safePosition(2, 2) //13
// safePosition(13, 2)
// safePosition(41, 3) //31

safePosition(41, 3) //➞ 31

// safePosition(35, 11) //➞ 18

// safePosition(11, 1) //➞ 11

// safePosition(2, 2) //➞ 1
