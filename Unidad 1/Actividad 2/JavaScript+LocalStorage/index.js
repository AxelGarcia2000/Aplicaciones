function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='selecciona'
}

function createR() {
    
   //Guardo los datos capturados usando el id de cada control
   var id = document.getElementById("Input1").value;
   var Propetario = document.getElementById("Input2").value;
   var Año = document.getElementById("Input3").value;
   var correo = document.getElementById("Input4").value;
   var Marca = document.getElementById("Input5").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Bitacora = {
            id, //matricula:id
            Propetario ,
            Año,
            correo,
            Marca, 
        }

        var lista=JSON.parse(localStorage.getItem("Propetarios"));

        if(lista==null)
        { 
            var lista = [];
        }
        
        const existe = lista.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista=lista.filter(Bitacora=>Bitacora.id!=id);

            }
                
            lista.push(Bitacora);
            var temporal = lista.sort((a,b) => a.id-b.id);
            localStorage.setItem("Propetarios", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de alumno","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista = JSON.parse(localStorage.getItem("Propetarios"));
    
     
    if(lista)
    {
        lista.forEach((Bitacora)=>printRow(Bitacora));
    }
}


function printRow(Bitacora){
    
    if(Bitacora!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Bitacora.id;
        cell2.innerHTML = Bitacora.Propetario; 
        cell3.innerHTML = Bitacora.Año; 
        cell4.innerHTML = Bitacora.correo;
        cell5.innerHTML = Bitacora.Marca; 
        cell6.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Bitacora.id})">Eliminar</button>`;
        cell7.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Bitacora.id+')">Modificar</button>';
        
    }
}

function deleteR(id){
    const lista = JSON.parse(localStorage.getItem("Propetarios"));
    var temporal=lista.filter(Bitacora=>Bitacora.id!=id);
    localStorage.setItem("Propetarios", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Propetarios");
    }
  
    read();
    
}


function seekR(id){
    var ref = firebase.database().ref('Bitacora/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Bitacora){
    if(Bitacora!=null)
    {
        document.getElementById("Input1").value=Bitacora.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Bitacora.Propetario;
        document.getElementById("Input3").value=Bitacora.Año;
        document.getElementById("Input4").value=Bitacora.correo;
        document.getElementById("Input5").value=Bitacora.Marca;
        
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    const lista = JSON.parse(localStorage.getItem("Propetarios"));
    var BitacoraC=lista.filter(Bitacora=>Bitacora.Marca==c);
    if(BitacoraC)
    {
        BitacoraC.forEach((Bitacora)=>printRowQ(Bitacora));
    }
    //console.log(alumnosC)

}
function printRowQ(Bitacora){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell7 = row.insertCell(4);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Bitacora.id;
    cell2.innerHTML = Bitacora.Propetario; 
    cell3.innerHTML = Bitacora.Año;
    cell4.innerHTML = Bitacora.correo;
    cell5.innerHTML = Bitacora.Marca; 
   
   
}