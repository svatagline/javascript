// 12:15 => 2:45 2hrs
let isSameObject = (obj1, obj2) => {
    // ===================================Validation part===========================================================
    const typeOf = (value) => {
      if ([null, undefined].includes(value)) {
        return `string`
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) return 'array'
        return `${typeof value}`
      } else {
        return `${typeof value}`
      }
    }
    const isObjects = (...rest) => rest.every((i) => typeOf(i) === 'object')
    const isArrays = (...rest) => rest.every((i) => typeOf(i) === 'array')
    const validArray = (arr) => {
      try {
        return (
          Array.isArray(arr) &&
          arr?.map((i) => (i === undefined ? 'undefined' : i))
        )
      } catch (error) {
        console.log(error)
        return false
      }
    }
    const validObject = (obj) => {
      try {
        let newObj = {}
        Object.keys(obj).forEach((i) =>
          obj[i] === undefined ? (newObj[i] = 'undefined') : (newObj[i] = obj[i]),
        )
  
        return newObj
      } catch (error) {
        console.log(error)
        return false
      }
    }
    const isSameString = (s1, s2) => s1 === s2
    // ======================================Comparison part========================================================
  
    let compareObject = (obj1, obj2, giveEntryToArray = false) => {
      let isSame = true
      if (giveEntryToArray ? !isArrays(obj1, obj2) : !isObjects(obj1, obj2)) {
        // console.log('case 1', obj1, obj2)
        isSame = false
      } else {
        isSame = Object.keys(obj1).every((i, index) => {
          // console.log('case 2')
          const valueType = typeOf(obj1[i])
  
          switch (valueType) {
            case 'number':
            case 'string':
              return isSameString(obj1[i], obj2[i])
            case 'object':
              return compareObject(validObject(obj1[i]), validObject(obj2[i]))
            case 'array':
              return compareObject(validArray(obj1[i]), validArray(obj2[i]), true)
            default:
              console.log('different case', valueType)
              break
          }
        })
      }
  
      return isSame
    }
  
    let isArray = isArrays(obj1, obj2)
  
    if (isArray) {
      return compareObject(obj1, obj2, true) && compareObject(obj2, obj1, true)
    } else {
      return compareObject(obj1, obj2) && compareObject(obj2, obj1)
    }
  }
  
  // case 1 false
  // const a = [['React', undefined]]
  // const a1 = [['React', undefined, 'sas']]
  
  // case 2 false
  // const a = [['React', undefined, 'sas']]
  // const a1 = [['React', undefined]]
  
  // case 3 false
  // const a = [['React', { a: undefined }]]
  // const a1 = [['React', {}]]
  
  // case 4 false
  // const a = {
  //   a: { a: null, d: { e: 45, f: { l: 9 } }, h: [6, 8, 9], r: 90 },
  //   z: {
  //     a: { a: null, d: { e: 45, f: { l: 9 } }, h: [[6, 8, 9, undefined]], r: 90 },
  //     b: 38,
  //     c: { a: null, d: { e: 45, f: { l: 9 } }, h: [6, 8, 9], r: 90 },
  //     q: undefined,
  //   },
  //   q: undefined,
  // }
  
  // const a1 = {
  //   a: { a: null, d: { e: 45, f: { l: 9 } }, h: [6, 8, 9], r: 90 },
  //   z: {
  //     a: { a: null, d: { e: 45, f: { l: 9 } }, h: [6, 8, 9], r: 90 },
  //     c: { a: null, d: { e: 45, f: { l: 9 } }, h: [6, 8, 9], r: 90 },
  //     b: 38,
  //     q: undefined,
  //   },
  //   q: undefined,
  // }
  
  // case 5 false
  // const a = null
  // const a1 = { a: 34, b: 556 }
  
  // case 5 false
  // const a = [20, { a: 34, c: [54, [[{ s: 20, f: 67 }]]] }, 65, 76]
  // const a1 = [20, { a: 34, c: [54, [{ s: 20, f: 67 }]] }, 65, 76]
  
  // case 6 false
  // const a = [['test']]
  // const a1 = [['test', undefined]]
  
  // case 7 false
  // const a = {
  //   z: {
  //     a: null,
  //     b: 38,
  //   },
  // }
  // const a1 = {
  //   z: {
  //     a: null,
  //     b: 38,
  //   },
  //   [null]: 45,
  // }
  
  // case 8 false
  // const a = {
  //   name: 'TechCorp',
  //   location: {
  //     country: 'USA',
  //     state: 'California',
  //     city: 'San Francisco',
  //     address: {
  //       street: '123 Tech St',
  //       zip: '94105',
  //       building: {
  //         name: 'Alpha Tower',
  //         floors: [
  //           { level: 1, departments: ['HR', 'Finance'] },
  //           { level: 2, departments: ['Engineering', 'Design'] },
  //           {
  //             level: 3,
  //             departments: [{ name: 'Research', teams: ['AI', 'Robotics'] }],
  //           },
  //         ],
  //       },
  //     },
  //   },
  //   employees: [
  //     {
  //       id: 1,
  //       name: 'Alice',
  //       roles: [
  //         'Developer',
  //         {
  //           specialization: 'Frontend',
  //           skills: ['React', 'JavaScript', ['CSS', 'HTML2']],
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: 'Bob',
  //       roles: [
  //         'Manager',
  //         {
  //           specialization: 'Project Management',
  //           teams: [
  //             { name: 'Team A', members: ['Alice', 'Charlie'] },
  //             {
  //               name: 'Team B',
  //               members: ['Dave', { name: 'Eve', role: 'Analyst' }],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // }
  // const a1 = {
  //   name: 'TechCorp',
  //   location: {
  //     country: 'USA',
  //     state: 'California',
  //     city: 'San Francisco',
  //     address: {
  //       street: '123 Tech St',
  //       zip: '94105',
  //       building: {
  //         name: 'Alpha Tower',
  //         floors: [
  //           { level: 1, departments: ['HR', 'Finance1'] },
  //           { level: 2, departments: ['Engineering', 'Design'] },
  //           {
  //             level: 3,
  //             departments: [{ name: 'Research', teams: ['AI', 'Robotics'] }],
  //           },
  //         ],
  //       },
  //     },
  //   },
  //   employees: [
  //     {
  //       id: 1,
  //       name: 'Alice',
  //       roles: [
  //         'Developer',
  //         {
  //           specialization: 'Frontend',
  //           skills: ['React', 'JavaScript', ['CSS', 'HTML2']],
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: 'Bob',
  //       roles: [
  //         'Manager',
  //         {
  //           specialization: 'Project Management',
  //           teams: [
  //             { name: 'Team A', members: ['Alice', 'Charlie'] },
  //             {
  //               name: 'Team B',
  //               members: ['Dave', { name: 'Eve', role: 'Analyst' }],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // }
  
  console.log(isSameObject(a, a1))
  