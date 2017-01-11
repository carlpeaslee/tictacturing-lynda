
/* Object Initializer Shorthand*/

let superPower = 'Laser eyes' //the object initializer shorthand
let weaknesses = ['puppies']    //allows us to more succinctly take a
let cape = false   //variable and turn it into a key value pair

const myHero = { // when I create a new object
  isGood: true, //  I can pass in my own key value pairs
  superPower,   //  or I can use this short hand to add
  weaknesses    //  varaibles I've already created
}

console.log('myHero = ', myHero)
/*
    myHero = {
      isGood: true,
      superPower: 'Laser eyes',
      weaknesses: ['puppies'],
    }

 */
