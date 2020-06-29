const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 9000;

const app = express();

//paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

//template engine
app.set("view engine", "hbs");
app.set("views", viewsPath); //set the view dir to templates dir
hbs.registerPartials(partialsPath); //partial hbs html templates dir

//use static files
app.use(express.static(publicDirPath));

app.get("/", (req, res)=>{
    res.render("index",{  //looks in the view dir by default
        headerTitle: "Weather Jet"
    });
});

app.get("/about", (req, res)=>{
    res.render("about",{
        headerTitle: "About Weather Jet"
    }); 
});

app.get("/api", (req, res)=>{
    res.render("api",{
        headerTitle: "Weather Jet API"
    }); 
});

app.get("/weather", (req, res)=>{ //route for fetching weather

    (!req.query.address) ? 
    res.send("<h1>Error. You must provide and address!</h1>") 
    
    :

    geocode(req.query.address, (err, data)=>{
        if(err){
            return console.log(err);
        }
        
        forecast(data.lat, data.long, (err, forecastData, humidity, isDay)=>{
            if(err){
                return console.log(err);
            }
            
            res.send({ //create json data
                location: data.location,
                forecast: forecastData,
                address: req.query.address,
                humidity: humidity,
                isDay: isDay,
                lat: data.lat,
                long: data.long
            })
        });
    })
});


//404 pages 
app.get("/about/*", (req, res)=>{ //generic 404
    res.render("404",{  //looks in the view dir by default
        message: "no article found"
    });
});

app.get("*", (req, res)=>{ //generic 404
    res.render("404",{  //looks in the view dir by default
        message: "nothing found. 404!"
    });
});

app.listen(port, ()=>{
    console.log("server running on port" + port);
});