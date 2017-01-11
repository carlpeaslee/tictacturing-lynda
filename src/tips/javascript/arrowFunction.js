
/* Arrow Function */

let long = getSomething(
  function (thing) {
    return thing
  }
)

let shorter = getSomething( (thing) => {
  return thing
})

let reallyShort = getSomething(thing => thing)
