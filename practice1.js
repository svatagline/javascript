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
// try 1
// const safePosition = (num, shoot) => {
//   let allPosition = new Array(num)
//   allPosition.fill('*')
//   let unsafePosition = allPosition.reduce((acc, item, index) => {
//     if (index == 0) {
//       return acc
//     } else if ((index + 1) % shoot == 0) {
//       return [...acc, index]
//     } else {
//       return acc
//     }
//   }, [])

//   let cloneAllPosition = allPosition.map((i, index) => index)
//   console.log({ unsafePosition }, cloneAllPosition.length)
//   let numi = 0
//   while (cloneAllPosition.length > 1) {
//     // console.log({ cloneAllPosition }, cloneAllPosition.length)
//     console.log(`Loop${numi + 1} remove index`, cloneAllPosition.join('_'))
//     numi++
//     // cloneAllPosition.forEach((i, index) => {
//     //   if (unsafePosition.includes(index)) {
//     cloneAllPosition = cloneAllPosition.filter(
//       (i, ind) => !unsafePosition.includes(ind),
//     )
//     //   }
//     // })
//   }

//   //   console.log(`cloneAllPosition after while loop`, cloneAllPosition)
// }

//try2
// let nextSafePosition = (cp, shoot, killedPositionList, num) => {
//   const assignedPosition = killedPositionList.filter(
//     (i) => i < cp + shoot && i > cp,
//   ).length

//   if (killedPositionList.includes(assignedPosition + shoot + cp)) {
//     return nextSafePosition(cp, shoot + 1, killedPositionList, num)
//   } else {
//     console.log(
//       `assignedPosition=>`,
//       `${cp}=>${num}=>${assignedPosition + shoot + cp}`,
//     )
//     return assignedPosition + shoot + cp
//   }
// }
// let loopNum = 25
// const safePosition = (num, shoot) => {
//   let totalPosition = new Object()
//   let number = []
//   let assignedNum = []
//   for (let index = 0; index < num; index++) {
//     totalPosition[index + 1] = '*'
//     number.push(index + 1)
//   }

//   let loop = 0
//   let currentPosition = shoot
//   while (loop < loopNum && Object.values(totalPosition).includes('*')) {
//     loop++
//     // console.log(`loop ${loop}====currentPosition`, currentPosition)
//     totalPosition[`${currentPosition}`] = number[0]
//     number.shift()
//     assignedNum.push(currentPosition)
//     if (currentPosition + shoot <= Object.keys(totalPosition).length) {
//       currentPosition = nextSafePosition(
//         currentPosition,
//         shoot,
//         assignedNum,
//         number[0],
//       )
//     } else {
//       console.log(
//         `assignedPosition==>`,
//         `${currentPosition}=>${number[0]}=>${
//           currentPosition + shoot - Object.keys(totalPosition).length
//         }`,
//         `length = ${Object.keys(totalPosition).length}`,
//         `currentPosition = ${currentPosition}`,
//       )
//       if (Object.keys(totalPosition).length == currentPosition) {
//         currentPosition = nextSafePosition(1, shoot, assignedNum, number[0])
//         console.log('currentPosition')
//       } else {
//         currentPosition =
//           currentPosition + shoot - Object.keys(totalPosition).length
//       }
//     }
//   }
//   console.log(totalPosition, currentPosition, assignedNum)
// }

//try3
// let nextPosition = (currentPosition, num) => {
//   if (currentPosition == num) {
//     return 1
//   }
//   return currentPosition + 1
// }
let safePosition = (num, interval) => {
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

  let totalSafePosition = Object.values(totalPosition).filter((i) => i == '*')

  let loop = 1

  let nextPosition = (currentPosition, num) => {
    if (currentPosition == num) {
      return 1
    }
    return currentPosition + 1
  }

  while (totalSafePosition.length > 1 && loop < 46) {
    console.log(
      `loop=${loop}, currentIndex=${currentIndex}, currentPosition=${currentPosition}`,
    )

    loop++
    if (
      currentIndex == interval &&
      currentPosition !== Object.keys(totalPosition).length
    ) {
      unsafePosition[currentPosition] = safeSpace[0]
      delete totalPosition[currentPosition]
      safeSpace.shift()
      currentIndex = 1
    } else {
      console.log('condition 2')
      currentIndex++
    }
    if (nextPosition(currentPosition, num) == 1) {
      currentIndex = 3
    }
    currentPosition = nextPosition(currentPosition, num)
  }

  // console.log(Object.keys(testPosition).join('-'))
  console.log(totalPosition)
  console.log(unsafePosition)
  return totalSafePosition
}
// safePosition(14, 2) //13
// safePosition(13, 2)
safePosition(41, 3) //31
