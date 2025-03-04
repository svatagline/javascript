;`
 International Standard Book Numbers
The International Standard Book Number (ISBN) is a unique identifying number given to each published book. ISBNs assigned after January 2007 are 13 digits long (ISBN-13), however books with 10-digit ISBNs are still in wide use.

An ISBN-10 is verified this way:

isbn10 = "0330301624"
Line up the digits with the numbers 10 to 1:

0	3	3	0	3	0	1	6	2	4
10	9	8	7	6	5	4	3	2	1
Multiply each digit with the number below it (the 10th digit in an ISBN can be an X. This last X simply means 10).

Sum up the products:

0 + 27 + 24 + 0 + 18 + 0 + 4 + 18 + 4 + 4 = 99
If the sum is divisible by 11, the ISBN-10 is valid.

An ISBN-13 is verified this way:

isbn13 = "9780316066525"
Line up the digits with alternating 1s and 3s:

9	7	8	0	3	1	6	0	6	6	5	2	5
1	3	1	3	1	3	1	3	1	3	1	3	1
Multiply each digit with the number below it and get the sum:

9 + 21 + 8 + 0 + 3 + 3 + 6 + 0 + 6 + 18 + 5 + 6 + 5 = 90
If the sum is divisible by 10, the ISBN-13 is valid.

Create a function that takes a string of numbers (possibly with an X at the end) and...

Return "Invalid" if it is not a valid ISBN-10 or ISBN-13.
Return "Valid" if it is a valid ISBN-13.
If it is a valid ISBN-10, convert it into an ISBN-13 and return the ISBN-13 number.
Convert a valid ISBN-10 to ISBN-13 by tacking 978 to the start, then changing the last digit (the check digit) so that the resulting number passes the ISBN-13 check.

Examples
isbn13("9780316066525") ➞ "Valid"

isbn13("0330301824") ➞ "Invalid"

isbn13("0316066524") ➞ "9780316066525"

9:25 : 30  : 10:53


 `
const isbn13 = (num) => {
  let validation = 'Invalid'
  const isValid10 = (n) => {
    const sum = `${n}`.split('').reduce((prev, next, index) => {
      return prev + parseInt(next === 'X' ? '10' : next) * (n.length - index)
    }, 0)
    return sum % 11 === 0
  }
  const isValid13 = (n, isConversion) => {
    const sum = `${n}`.split('').reduce((prev, next, index) => {
      return prev + parseInt(next) * ((index + 1) % 2 === 0 ? 3 : 1)
    }, 0)
    if (isConversion) {
      for (let index = 0; index < 10; index++) {
        if (isValid13(`${n.slice(0, 12)}${index}`)) {
          validation = `${n.slice(0, 12)}${index}`
        }
      }
    } else {
      return sum % 10 === 0
    }
  }
  if (num.length === 13) {
    isValid13(num) ? (validation = 'Valid') : (validation = 'Invalid')
  } else if (num.length === 10) {
    if (num[9] === 'X' && isValid10(num)) {
      isValid13('978' + num, true)
    } else {
      isValid10(num) ? isValid13('978' + num, true) : (validation = 'Invalid')
    }
  } else {
    validation = 'Invalid'
  }
  return validation
}
const assertEquals = (a, b) => console.log(a, b)
assertEquals(isbn13('9780316066525'), 'Valid')
assertEquals(isbn13('9783866155237'), 'Valid')
assertEquals(isbn13('9780345453747'), 'Valid')
assertEquals(isbn13('031606652X'), 'Invalid')
assertEquals(isbn13('9783876155237'), 'Invalid')
assertEquals(isbn13('0345453747'), 'Invalid')
assertEquals(isbn13('0316066524'), '9780316066525')
assertEquals(isbn13('3866155239'), '9783866155237')
assertEquals(isbn13('817450494X'), '9788174504944')
