
/* Array.map()*/

const cats = [
  {
    breed: 'sphynx',
    hairLength: 'none'
  },
  {
    breed: 'persian',
    hairLength: 'long'
  }
]

//We use the map function to create a new array
//based on the contents of an existing array
//in this example we set 'breeds' equal to new array
let breeds = cats.map( //map expects a function as an argument
  (cat, index) => {  // thaat function takes two more arguments
    return cat.breed //the first is the element in the array
  }
)

console.log('breeds = ', breeds)
/*
    breeds = ['sphynx', 'persian']

 */
