
/* Spread Operator */

const condiments = {    //the object we will spread
  peanutButter: 'crunchy',
  jelly: 'strawberry'  //it has two key-value pairs
}

const sandwich = {  //we are going to add the properties
  breadSlices: 2,   // of condiments to this new object
  ...condiments    //by using an elipsis
}

console.log('sandwich = ', sandwich)
/*
    sandwich = {
      breadSlices: 2,
      peanutButter: 'crunchy',
      jelly: 'strawberry'
    }

 */
