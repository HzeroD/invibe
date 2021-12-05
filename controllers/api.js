import axios from "axios"
import { Bar } from "../models/bar.js"
import { Cocktail } from "../models/cocktail.js"


function index(req, res){
    res.send("INDEX PAGE FOR API RESOURCES")
}

function showBars(req, res) {
    axios.get(`https://api.yelp.com/v3/businesses/search?categories="drinks"&term=cocktail-bars&location=${req.params.location}`, {headers: {Authorization: `Bearer ${process.env.API_KEY}`}})

    .then(apiResponse => {
        res.json(apiResponse.data)
    })
}

function show(req, res) {
    axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`, {headers: {Authorization: `Bearer ${process.env.API_KEY}`}})
    .then(apiResponse => {
        Bar.findById(req.params.id)
        .populate("cocktails")
        .then(bar => 
        res.json({"details": apiResponse.data, "cocktails": bar.cocktails})
        )
    })
}

function barExists(req, res) {
    
    Bar.findOne({id: req.params.id}) 
    .then(bar => {
        console.log("-------------->>>>",bar)
        if(bar) {res.json(bar)}
        else {
            Bar.create(req.body)
            .then(newBar => {
             newBar.populate('cocktails')
             res.json(newBar)
    }) }
    
   
   })
   
}

function createCocktailReview(req, res) {
    Cocktail.create(req.body)
    .then(cocktail => {
        cocktail.barID = req.params.id
        Bar.findById(req.params.id)
        .then(bar => {
            bar.cocktails.push = cocktail
        })
    })

}




export {
    index, 
    showBars,
    show,
    barExists,
    createCocktailReview
}