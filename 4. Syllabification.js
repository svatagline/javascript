;`Syllabification
The syllabic structure of the Persian language is CV(C)(C). 
C stands for Consonants and V stands for Vowels. 
The CV(C)(C) means that there are three types of syllables in Persian:

CV
CVC
CVCC

Write a function that takes the phonetic transcription of a Persian word as an argument 
and returns the syllabified word based on the syllabic structure. In other words, put a period between syllables.

Examples
syllabification("kAr") ➞ "kAr"

syllabification("bArAn") ➞ "bA.rAn"

syllabification("tA") ➞ "tA"

syllabification("deraxt") ➞ "de.raxt"

syllabification("pust") ➞ "pust"

syllabification("lAjevard") ➞ "lA.je.vard"
Notes
Mono-syllabic words don't need syllabification.
Persian has six vowels: a, A, e, i, o, u
Persian has 23 consonants: p, b, t, d, k, g, G, ?, f, v, s, z, S, Z, x, h, c, j, m, n, r, l, y
Try to solve the problem by using RegEx.
Hint
Since each syllable has only one vowel, it's not necessary to know the consonants. Just knowing that there is only one consonant before the vowel and 0 to 2 consonants after the vowel is enough to solve the challenge.

11:20 11:30 30
`
// const syllabification = (word) => {
//   word = `${word}`.toLowerCase()
//   const vowel = 'aeiou'
//   let vowelIndex = []
//   ;`${word}`.split('').forEach((i, index) => {
//     vowel.includes(i) && vowelIndex.push(index)
//   })

//   let wordSyllabification = ''
//   if (vowelIndex.length === 1) {
//     wordSyllabification = `${word.slice(0, vowelIndex[0] + 1)}.${word.slice(
//       vowelIndex[0] + 1,
//     )}`
//   } else {
//     // comment
//     const parts = []
//     vowelIndex.forEach((prev, index) => {
//       console.log(vowelIndex)
//       // if (index === vowelIndex.length - 1) {
//       //   console.log(
//       //     '------------------------------------------------------>',
//       //     word.slice(0, vowelIndex[0] + 1),
//       //   )

//       //   parts.push(word.slice(vowelIndex[index]))
//       //   // console.log('last>', )
//       // } else {
//       parts.push(word.slice(0, vowelIndex[index] + 1))
//       word = word.slice(vowelIndex[index] + 1)
//       // console.log(
//       //   'before last>',
//       //   word.slice(vowelIndex[index], vowelIndex[index + 1]),
//       // )
//       // }
//     })

//     wordSyllabification = parts
//   }

//   return wordSyllabification
// }

const syllabification = (word) => {
  let lowerCase = (st) => `${st}`.toLowerCase()
  const vowel = `aeiou`
  let splitedChar = `${word}`
    .split('')
    .map((i, index) => (vowel.includes(lowerCase(i)) ? `${i}.` : i))
  let temp = []

  for (let index = 0; index < splitedChar.length; index++) {
    const element = splitedChar[index]
    if (
      element.length === 2 &&
      vowel.includes(lowerCase(element[0])) &&
      !vowel.includes(lowerCase(splitedChar[index + 1]?.[0])) &&
      !vowel.includes(lowerCase(splitedChar[index + 2]?.[0]))
    ) {
      temp.push(element[0])
      splitedChar = splitedChar.map((i, ind) =>
        i === splitedChar[index + 1]
          ? ind === splitedChar.length - 1
            ? i
            : `${i}.`
          : i,
      )
    } else {
      if (
        index === splitedChar.length - 1 &&
        `${temp[index - 1]}`.includes('.')
      ) {
        temp = temp.map((i, ind) =>
          i === temp[index - 1] ? `${i}`.replace('.', '') : i,
        )
        temp.push(element)
      } else {
        temp.push(element)
      }
    }
  }

  return temp.join('')
}

const assertEquals = (a, b) => console.log(a, b)

assertEquals(syllabification('kAr'), 'kAr', 'example #1')
assertEquals(syllabification('bArAn'), 'bA.rAn', 'example #2')
assertEquals(syllabification('tA'), 'tA', 'example #3')
assertEquals(syllabification('deraxt'), 'de.raxt', 'example #4')
assertEquals(syllabification('pust'), 'pust', 'example #5')
assertEquals(syllabification('lAjevard'), 'lA.je.vard', 'example #6')
assertEquals(syllabification('barAbar'), 'ba.rA.bar')
assertEquals(syllabification('panjare'), 'pan.ja.re')
assertEquals(syllabification('?eZdehA'), '?eZ.de.hA')
assertEquals(syllabification('?Aheste'), '?A.hes.te')
