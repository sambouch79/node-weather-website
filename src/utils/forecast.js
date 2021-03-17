const request = require('request')

const forecast=(long,lat,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=23d6152aff0a14ebe1cd24d20057896d&query='+lat+','+long
    request({url,json:true},(error,{body})=>{
      
       if(error){
            callback('unable to connect ',undefined)
       }else if(body.error){
        callback('unable to find  location',undefined)
       }else{
        const data=body.current
      //console.log(data.weather_icons)
          //console.log(data.current.weather_descriptions[0]) 
          callback(undefined,{
             description:data.weather_descriptions, 
             temperature:data.temperature, 
             feellike:data.feelslike,
             weather_icons:data.weather_icons[0],
             precip:data.precip,
             wind_speed:data.wind_speed,
             humidity:data.humidity,
             pressure:data.pressure,
             visibility:data.visibility})
       }

    })
}











module.exports = forecast