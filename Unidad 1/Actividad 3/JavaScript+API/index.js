function Leer() {
    const ciudad = document.getElementById("input").value;
    //obtain an apikey on this web
    //http://www.omdbapi.com/apikey.aspx
    const llave='437fda1a378e4de965b26c33814641ff';
    const url=`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${llave}&units=metric`
    buscar1(url);
}

function buscar1(url){

    fetch(url)
      .then(data => {
        return data.json()
      }).then(resultado=>{
            console.log(resultado);

        
            
            console.log(resultado.main)

        
            document.getElementById("lista").innerHTML=`<h1>Temp: ${resultado.main.temp}</h1> <h2>Temp min: ${resultado.main.temp_min}</h2> <h3>Temp max: ${resultado.main.temp_max}</h3>`;        
      });

}

