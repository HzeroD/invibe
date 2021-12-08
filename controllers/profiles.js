import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .populate([
    {
      path: 'name'
    },
    {
      path: 'email'
    },
    {
      path: 'avatar'
    },
    {
      path: 'bio'
    },
    {
      path: 'favLocations'
    },
    {
      path: 'favBars',
    }, 
    {
      path: 'followers',
    },
  ])
  .then(profiles => {
    res.json(profiles)
    })
  }


  function show(req, res) {
    Profile.findById(req.params.id)
    .populate("followers")
    .then(profiles => {
      res.json(profiles)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  }

  function addFollower(req, res) {
    Profile.findById(req.user.profile)
    .populate('followers')
    .then(profile => {
      console.log(profile)
      profile.followers.push(req.params.id)
      profile.save()
      .then(() => {
        console.log(profile.followers)
        res.json(profile)
      })
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
  }


function deleteFollower(req, res) {
  Profile.findByIdAndDelete(req.params.id)
  .then(profile => {
    res.json(profile)
  })
}





export {
  index,
  show,
  addFollower,
  deleteFollower as delete
}