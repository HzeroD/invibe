import * as tokenService from '../services/tokenService'
function getLocation(location) {  
  return fetch(`/api/resources/${location}`)
  .then(res => res.json())
}

function getBarDetails(id) {  // cocktails-route(Merkis) branch; this function gets us an individual bar's details
  return fetch(`/api/resources/${id}`)
  .then(res => res.json())
}


function barExistsServicesFunction(barData) {
  return fetch(`/cocktails/${barData.id}`,{
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(barData)
  })
  .then(res => res.json())
}

function createCocktail() {
  
}


export {
  getLocation,
  getBarDetails,
  barExistsServicesFunction,
  createCocktail
}

// comment 
// `https://api.yelp.com/v3/businesses/search?categories="drinks"&term=cocktail-bars&location=${location}`