const path=require('path')
const express=require('express')
const hbs = require('hbs');
const forecast=require('./utils/forecast')
const geocod=require('./utils/geocod')
//console.log(__dirname)
//console.log(path.join(__dirname ,'../public'))

const app=express()
const port=process.env.PORT||3000
//define paths for expressconfig
const  publicDirPath = path.join(__dirname ,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup handlebars angine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'The Weather page',
        name:'samira'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'The Help page',
        name:'max'
        
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        src:'/img/cat.jpg',
        name:'samira'
        
    })
})

/* app.get('',(req,res)=>{
res.send("<h1>hello express!!!!</h1>")
 }) */

 app.get('/help',(req,res)=>{
    res.sendFile(publicDirPath+'/help.html')
    
})

app.get('/about',(req,res)=>{
    res.sendFile(publicDirPath+'/about.html')
})
app.get('/weather',(req,res)=>{
    //res.sendFile(publicDirPath+'/weather.html')
   const address= req.query.address
   if(!address){
        return res.send({
           error:'You must provide address!!!'
       })
   }
   geocod(address,(error,{long,lat,localisation}={})=>{
       
    //console.log(lat,localisation)
    if(error){
        return res.send({
            error,
        })
    }
     forecast(long,lat,(error,forecastdata)=>{
        console.log(forecastdata.description[0])
        if(error){
            return res.send({
                error
            })
        }
        res.send({
            description:forecastdata.description[0],
            temperature:forecastdata.temperature,
            feelsLike:forecastdata.feellike,
            localisation:localisation,
            weather_icons:forecastdata.weather_icons,
            precip:forecastdata.precip,
            wind_speed:forecastdata.wind_speed,
            humidity:forecastdata.humidity,
            pressure:forecastdata.pressure,
            visibility:forecastdata.visibility
        })
     })
      
   })

})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        text:'The help article is not found',
        title:'not found',
        name:'sam'
    })
})

app.get('/*',(req,res)=>{
    res.render('error',{
        text:'Page not Found',
        title:'404 Not found',
        name:'sam'
    })
})
app.listen(port,()=>{
    console.log('server is runing on port '+ port)
})