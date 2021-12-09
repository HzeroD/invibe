import { useState} from 'react'



function EditCocktail(props) {
    
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        content: '',
        author: '',
        barID: props.barID,
        id: props.cocktailID
    })
    console.log("TESTING PROPS REVIEWS",props)
    

    
    

    const handleChange = e => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            props.handleEditCocktail(formData)
            setFormData({content:'', name:'',author:'',barID: '',image:''})
            
        } catch (err) {
            console.log(err)
        }
    }


    

    const { name, image, content, author } = formData

    const isFormInvalid = () => {
        return !(name && content)
      }

    console.log("=====>",props)

    return (
        <>
        <form
        autoComplete="off"
        onSubmit={handleSubmit}
      > 
        <p>Cocktail Name Edit</p>
        <input
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <br />
        <p>Tell Us More Edit</p>
        <textarea
          value={content}
          name="content"
          onChange={handleChange}
        /> 
        
        <br />
        <button  disabled={isFormInvalid()}>EDIT</button>
        <button onClick={() => props.resetComponent([])}>CANCEL</button>
     
      </form>
      



</>

    )


}

export default EditCocktail