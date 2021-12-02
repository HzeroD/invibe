import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    avatar: String,
    bio: String,
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}] ,
    favBars: [{type: mongoose.Schema.Types.ObjectId, ref: 'CocktailBar'}],
    favLocations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}]


  },
  {
    timestamps: true,
  }
  )

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}