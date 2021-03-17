
const weatherSearch= document.querySelector('form')
const search=document.querySelector('input')
const messageWeather=document.querySelector('#messageWeater')
const messageWind=document.querySelector('#wind')
const messageHumidity=document.querySelector('#humidity')
const messagePressure=document.querySelector('#pressure')
const messageVisibility=document.querySelector('#visibility')
const messageLoc=document.querySelector('#messageLoc')
const messageError=document.querySelector('#messageError')
const iconWeather=document.querySelector('.iconWeather')

weatherSearch.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc=search.value
    
   fetch('http://localhost:3000/weather?address='+loc).then((response)=>{
   response.json().then((data)=>{
   
       if(data.error){
           //console.log(data.error)
           messageError.textContent=data.error
           messageWeather.textContent=''
           messageLoc.textContent=''
           messageWind.textContent=''
           messageHumidity.textContent=''
           messagePressure.textContent=''
           messageVisibility.textContent=''
           iconWeather.style.display="none"
           //document.querySelector('.iconWeather').style.display="none"
       }else{
       
        const messageWeath= 'Temperature is '+data.temperature+' °C and feels like '+data.feelsLike+' °C .'
       
        messageWeather.textContent=data.description +'\n'+messageWeath;
        messageWind.textContent='Wind speed :'+data.wind_speed
        messageHumidity.textContent='Humidity :'+data.humidity
        messagePressure.textContent='Pressure :'+data.pressure
        messageVisibility.textContent='Visibility :'+data.visibility
        messageLoc.textContent=data.localisation
        iconWeather.src=data.weather_icons
        messageError.textContent=''
       }
   }) 
})
})
/* var img = document.querySelector('.iconWeather');
img.onerror = function () { 
    this.style.display = "none"; */

//background animation
const particules=[];
function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    const particulesLenght=Math.floor(window.innerWidth/5);
    for(let i=0; i<particulesLenght;i++){
        particules.push(new Particule);
    }
}
function draw(){
 background(55,100,144);
 particules.forEach((p,index)=>{
    p.update();
    p.draw();
    p.checkParticules(particules.slice(index));
 })

}
class Particule{
    constructor(){
        //position
        this.pos=createVector(random(width),random(height));
        //velocity
        this.vel=createVector(random(-2,2),random(-2,2))
        //size
        this.size=3;
    }
//update mouvement by adding velocity
update(){
this.pos.add(this.vel)
this.edges();
}
//draw single particule
draw(){
 noStroke();
 fill('#FAFCFE');
 circle(this.pos.x,this.pos.y,this.size);
}
// detect border
edges(){
    if(this.pos.x<0||this.pos.x>width){
        this.vel.x*=-1;
    }
    if(this.pos.y<0||this.pos.y>height){
        this.vel.y*=-1;
    }
}
//connection particules
checkParticules(particules){
    particules.forEach(particule=>{
        const d=dist(this.pos.x,this.pos.y,particule.pos.x,particule.pos.y);
        if(d<120){
            stroke('rgba(255,255,255,0.05 )')
            line(this.pos.x,this.pos.y,particule.pos.x,particule.pos.y)
        }
    })
}

}