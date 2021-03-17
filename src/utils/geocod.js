const request=require('request')

const geocod=(ville,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(ville)+'.json?access_token=pk.eyJ1IjoiYXJpbWFzNzkiLCJhIjoiY2ttZGFlYWFnMDVoZTJ3cHAxdmJlNmtpMyJ9.6i0uCX-Bw7V9Gadf6Z_iFA'
    request({url,json:true},(err,{body})=>{
       const leght=Object.keys(body.features).length
        if(err){
            callback('unable to connect',undefined)
        } else if (leght===0){
            callback('unable to find location',undefined)
        } else {
           const long=body.features[0].center[0]
           const lat=body.features[0].center[1]
           const loc=body.features[0].place_name
           //console.log('la longitude de '+ res.body.features[0].text +' est '+long +' la latitude est '+lat)
           callback(undefined,{long:long,lat:lat,localisation:loc})
        }
  })
 }
 module.exports= geocod
 