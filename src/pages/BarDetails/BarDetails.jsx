import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'
import { getLocation } from '../../services/locationService';
import { barExistsServicesFunction } from '../../services/locationService';
import CocktailReviews  from "../../components/CocktailReviews/CocktailReviews";
import { createCocktail } from '../../services/locationService'
d 


const BarDetails = (props) => {
  const location = useLocation()
  const bar = location.state
  const [reviews, setReviews] = useState([])

  const [barData, setBarData] = useState({
    id: bar.id,
    name: bar.name,
    address: bar.location.city,
    imageURL: bar.image_url,
  })
  //if bar is in our database, return it here
  //create a function in our services directory that goes to the backend and fishes out bar with this id(bar.id)
  //how to do this?


  useEffect(()=> {
		barExistsServicesFunction(barData)
		.then(newBar => 
      setReviews(newBar.cocktails))
	}, [])

  useEffect(()=> {
		barExistsServicesFunction(barData)
		.then(newBar => 
      setBarData(newBar)
  )}, [{}])

  function handleCocktailReview(someData){
    createCocktail(someData)
    .this(newReview => setReviews([...reviews, newReview]))
  }



  console.log(barData)



  //if not in our database, create it
  
  return (
    <>
      <img src={bar.image_url }alt={bar.name} />
      <h2>{barData.name}</h2>
      <p>{barData.address}</p>
      {/* FIX MISSING SPACE IN ADDRESS */}
      <p>{bar.display_phone}</p>
      {bar.is_closed ? <p>We're currently closed</p> : <p>We're currently open</p>}
      <p>Rating: {bar.rating}</p>
      <p>Price: {bar.price}</p>
      <a href={`${bar.url}`}>Yelp Link</a>

      <CocktailReviews barID={bar.id} handleCocktailReview = {handleCocktailReview} /> 
    </>
  );
}

export default BarDetails;