

const waetherForm = document.querySelector("form");
const search = document.querySelector("input");
const place = document.querySelector(".place");
const forecast = document.querySelector(".forecast");

waetherForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    place.textContent = "Loading...";
    forecast.textContent = "";
    if(search.value === "") { //update to regex
        alert("invalid")
        return -1;
    }
    fetch(`http://localhost:9000/weather?address=${search.value}`)
    .then(r => r.json())
    .then(d => {
        place.textContent = d.location;
        forecast.textContent = d.forecast;
    })
    .catch(err => console.log(err))
})