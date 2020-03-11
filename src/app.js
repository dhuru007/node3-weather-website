const path = require('path')
const express= require('express')
const hbs=require('hbs')
const geocode=require('./utlis/geocode')
const forecast=require('./utlis/forecast')

const app = express()

//Define paths for Express Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Dhuruvan'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather Ap',
        name:'Dhuruvan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some helpful text',
        title:'Help me ',
        name:'Dhuruvan'
    })
})
// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })

// app.get('/About',(req,res)=>{
//     res.send('<h1>This is page about eswaragurudeva<h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'you must provide a search term'
        })        
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dhuru',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'DHURU',
        errorMessage: 'Page not found.'
    })
})
app.listen(3000,()=>{
    console.log('Server is on port 3000.')
})