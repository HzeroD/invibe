import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom'

function CocktailReviews (props) {

   
    const [formData, setFormData] = useState({
        name: '',
        imageURL: '',
        bio: '',
        barID: props.barID,
        author: ''
    })
    const [reviews, setReviews] = useState([{
        name: '',
        imageURL: '',
        bio: '',
        barID: props.barID,
        author: ''
      }])
  
    const handleChange = e => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
    const handleSubmit = async e => {
      e.preventDefault()
      try {
        props.handleCocktailReview(formData)
      } catch (err) {
        console.log(err)
      }
    }
    const { title, content } = formData
    const { name, bio } = reviews
  
    const isFormInvalid = () => {
      return !(name && bio)
    }
  
    return (
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      > 
        <p>Title</p>
        <input
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <br />
        <p>Content</p>
        <textarea
          value={bio}
          name="bio"
          onChange={handleChange}
        />
        <br />
        <button disabled={isFormInvalid()}>Post</button>
        
      </form>
    );
}

export default CocktailReviews
