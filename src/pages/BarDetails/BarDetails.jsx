import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'
import CocktailForm from "../../components/CocktailForm/CocktailForm.jsx"
import EditCocktail from "../../components/EditCocktail/EditCocktail.jsx"
import {createCocktail, deleteCocktail} from "../../services/locationService"
import { getAllCocktails } from "../../services/locationService"
import * as cocktailServices from "../../services/cocktailService"
import styles from "./BarDetails.module.css"
import * as authService from '../../services/authService'



const BarDetails = (props) => {
  const location = useLocation() 
 
  const bar = location.state
  const user = authService.getUser()

  const [cocktails, setCocktails] = useState([])
  const [component, setComponent] = useState([])

  function handleCreateCocktail(formData) {
    createCocktail(formData)
    .then(newCocktail => setCocktails([...cocktails,newCocktail])) 
  }

  const handleDeleteCocktail = id => {
		deleteCocktail(id)
		.then(deletedCocktail => {
			setCocktails(cocktails.filter(cocktail => cocktail._id !== deletedCocktail._id))
      setComponent([])
		})
	}

  const handleEditCocktail = async (formData) => {
    cocktailServices.editCocktail(formData)
    .then( editedCocktail => {
       const newCocktailArray =  cocktails.map(cocktail=> cocktail._id === editedCocktail._id ? editedCocktail: cocktail)
			setCocktails(newCocktailArray)
      
      setComponent([])
    })
  }


  
  const addComponent = (id) => {
    setComponent((<EditCocktail cocktailID={id} resetComponent={setComponent} barID={bar.id} handleEditCocktail={handleEditCocktail}/>))
  }


  useEffect(() => {
    getAllCocktails(bar.id)
    .then(allCocktails => setCocktails(allCocktails))
  },[])

  useEffect(() => {
    getAllCocktails(bar.id)
    .then(allCocktails => setCocktails(allCocktails))
  },[component])

 

  

  return (
    <>
      <div className={styles.locationContainer}>
        <Link  to="/search">
          <button>Back to Results</button>
        </Link>
          <img className={styles.barImage} src={bar.image_url }alt={bar.name} />
          <h2 className={styles.barName}>{bar.name}</h2>
          <p className={styles.barLocation}>{bar.location.display_address}</p>
          {/* FIX MISSING SPACE IN ADDRESS */}
          <p className={styles.barPhone} >{bar.display_phone}</p>
          {bar.is_closed ? <p className={styles.barOPen} >We're currently closed</p> : <p className={styles.barOPen} >We're currently open</p>}
          <p className={styles.barRating} >Rating: {bar.rating}</p>
          <p className={styles.barPrice} >Price: {bar.price}</p>
          <a className={styles.barLink} href={`${bar.url}`}>Yelp Link</a>
        </div>
    
        {cocktails && cocktails.map(cocktail=> 
        <div>
          <p>Author: {cocktail.author.name}</p>
          <p>Cocktail Name: {cocktail.name}</p>
          <p>{cocktail.content}</p>
          <p>{cocktail.imageURL}</p>
          <>
            { (user.profile === cocktail.author._id)  && <button onClick={()=>handleDeleteCocktail(cocktail._id)}>DELETE</button> } 
            { (user.profile === cocktail.author._id)  && <button onClick={()=>addComponent(cocktail._id)}>EDIT</button>}
          </>
        </div>  
    )
  }  
      <CocktailForm handleCreateCocktail={handleCreateCocktail} barID={bar.id} /> 
      <div>
        {component}
      </div>
    </>
  );
}

export default BarDetails;