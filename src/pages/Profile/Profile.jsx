import React, { useState, useEffect } from 'react';
import * as userService from '../../services/userService'
import Users from '../Users/Users';
import { useLocation } from 'react-router';

import { getFollowers, deleteFollowers, getProfile } from '../../services/profileService';


const Profile = (props) => {
  const location = useLocation()
  const user = location.state 

  const [profile, setProfile] = useState({followers:[{}]})

  

// follow a user button DONE!!
// the button should only show on other profiles page, not on your page DONE!!

  // follow a user
  // this shows as a list on the profile page
  // once youve followed someone, it needs to conditionally render the button to say "unfollow"


  console.log("USER ID", user.profile)

  

    const handleGetFollowers = e => {
      e.preventDefault()
      try {
        getFollowers(user.profile._id)
        .then(profile => setProfile(profile))
        
    } catch (err) {
        console.log(err)
    }
    }

    

    
    // useEffect(() => {
    //   getProfile()
    //   .then(profile => setProfile(profile))
    //   // console.log(profile)
    // }, [])
    
    
  // const handleGetProfiles


    // const getFollower = async e => {
    //   e.preventDefault()
    //   try{
    //     profileService.getFollower(user._id)
    //     .then(followers=> {
    //       setFollowers(followers)
    //     })
        
    //   }
    //   catch(err) {
    //     console.log(err)
    //   }}
      
            useEffect(() => {

            },[profile])
            console.log("PROFILE",profile)

      
  return (
    <>
      <h1>Name: {profile.name}</h1>
      <h1>Email: {profile.email}</h1>
      <h2>Followers: </h2>

    {(props.user.name !== user.name) &&  <button onClick={handleGetFollowers} > Follow </button>}
      {console.log("PROFILE.FOLLOWERS", profile.followers)}
    
    { profile.followers.map(follower => {
      <>
      <div>
      <h1>FOLLOWER NAME: {follower}</h1> 
      {/* <h1>FOLLOWER EMAIL: {follower.email}</h1>
      {console.log("FOLLOWER",follower.name)} */}
      </div>
      </>
    })}

    
</>
    
  );
}




export default Profile;