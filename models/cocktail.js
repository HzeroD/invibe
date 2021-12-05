import mongoose from 'mongoose'

const cocktailSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    bio: String,
    barID: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}
})

const Cocktail = mongoose.model('Cocktail', cocktailSchema)

export {
    Cocktail
}