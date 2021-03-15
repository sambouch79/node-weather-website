const request=require('request')

const geocod=(ville,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(ville)+'.json?access_token=pk.eyJ1Ijoic2FtYm91Y2g3OSIsImEiOiJja2x1eWd1dXcwOTYyMnBtdzg0aTNmcnZyIn0.2IG_Wd-Mn_1QguHkXDU16A'
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
 