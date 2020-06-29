mapboxgl.accessToken = 'pk.eyJ1IjoidG9tY3J1emFuYSIsImEiOiJja2J2M2ZtYmQwMjh2Mndud3J1bHhyZXhlIn0.kL_JMbYdYmzX1T0D2WlJZg'; //public access token of mapbox
const waetherForm = document.querySelector("form");
const search = document.querySelector("input");
const place = document.querySelector(".place");
const forecast = document.querySelector(".forecast");
const humidity = document.querySelector(".humidity");
const isDayTime = document.querySelector(".isdaytime");

waetherForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    //init text values
    place.textContent = "Loading...";
    forecast.textContent = "";
    humidity.textContent = "";
    isDayTime.textContent ="";

    if(search.value === "" || search.value === null) { //update to regex
        alert("invalid")
        return -1;
    }
    await fetch(`/weather?address=${search.value}`) //fetch the local api route
    .then(r => r.json())
    .then(d => {
        if(d.err){alert(d.error);}
        place.textContent = d.location;
        forecast.textContent = d.forecast;
        humidity.textContent = d.humidity;
        isDayTime.textContent = (d.isDay === "yes") && "It's also day 🌞 time here" || "It's also night 🌚 time here "

        let map = new mapboxgl.Map({ //create a map
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [d.long, d.lat], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        let marker = new mapboxgl.Marker() //create a marker based on the coords
        .setLngLat([d.long, d.lat])
        .addTo(map);

        window.scrollTo(0,document.body.scrollHeight); //scroll to the bottom of the page
    })
    .catch(err => console.log(err))

    search.value = "";
})

