
/* localStorage*/

//the browser lets us save small bits
//of information to a clients local memory

localStorage.setItem('rainbowsEnd', 'pot of gold')

//localStorage now contains {rainbowsEnd: 'pot of gold'}

let treasure = localStorage.getItem('rainbowsEnd')

// treasure = 'pot of gold'

localStorage.removeItem('rainbowsEnd')

//localStorage no longer holds {rainbowsEnd: 'pot of gold'}
