import * as tokenService from '../services/tokenService'

function getFollowers(id) {
    return fetch(`/profile/${id}`,{
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${tokenService.getToken()}`, 
          'Content-Type': 'application/json'}
        
      })
      .then(res => res.json())
}

export {
    getFollowers
}