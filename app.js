const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express() //initializion

app.use(bodyParser.urlencoded({urlencoded:true}))

app.get('/',function(req,res) {
    res.sendFile(__dirname+"/index.html")

})

app.post('/',function(req,res){
    const query = req.body.query;
    const appid = 'd882c9df93cac2f7f68c9dea19fa4cb0'
    const unit = 'metric'
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit
    https.get(url, function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            res.write("<h1>La temperatura a "+ query +" e' di" + weatherDescription+"</h1>")
            res.write("<img src=http://openweathermap.org/img/wn/"+icon+"@2x.png>")
            res.send()
           
        })
    })
      
})

app.listen(process.env.PORT || 8000,function(){
    console.log("porta aperta")
})