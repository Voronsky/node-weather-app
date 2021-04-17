const express = require('express')
const path  = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

// Define paths for express config
const publicDir = path.join(__dirname,'../public') //with string manipulation we can go up a folder
const viewsPath = path.join(__dirname, '../templates/views')

// These are 'partial' inserts into templates that we can have in all hbs files
// They have a special note of {{>Name}}
const partialsPath = path.join(__dirname, '../templates/partials') // advanced templating for hbs

const app = express()


// Setup handle bars engine and views location
app.set('view engine', 'hbs')

// Express's Hbs uses a 'views' folder but you can customize what that folder actually is
app.set('views',viewsPath) // How to use a custom path with the hbs package in Express
hbs.registerPartials(partialsPath)

// Static directory to serve (../../../public/) 
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Ivan Diaz',
    })
})

app.get('/about', (req,res)=>{
    // First param is name of the hbs file
    res.render('about', {
       title: 'About Me',
       name: 'Ivan Diaz' 
    })
})

app.get('/help', (req,res)=>{

    // First param is name of the hbs file
    res.render('help', {
        title: 'Help',
        name: 'Ivan Diaz',
        message: 'Returns forecast information about any given city',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })

    
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: [],
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Ivan Diaz',
        error: 'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Ivan Diaz',
        error: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up running on port 3000')
})