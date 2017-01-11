
/* Destructuring Assignment */

const feast = {    //the object we will destructure
  appetizer: 'Spring Rolls',
  entree: 'Enchiladas',
  dessert: 'Apple Pie'
}

let {         //to destructure an object we declare a
  appetizer,  //new variable and then choose any number
  dessert     //of keys to create into stand alone variables
} = feasts    //we also specify the object we're destructuring

console.log('appetizer = ', appetizer)
//appetizer = 'Spring Rolls'
console.log('dessert = ', dessert)
//dessert = 'Apple Pie'
