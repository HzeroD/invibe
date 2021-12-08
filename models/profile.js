import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    avatar: String,
    bio: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}] ,
    favBars: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bar'}],
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