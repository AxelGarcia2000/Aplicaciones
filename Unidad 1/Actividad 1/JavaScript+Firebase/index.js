var firebaseConfig = {
    apiKey: "AIzaSyAPiXdwwOe3de3b_qghM8qB74pgsiYitHA",
  authDomain: "rotet-4efa7.firebaseapp.com",
  databaseURL: "https://rotet-4efa7-default-rtdb.firebaseio.com",
  projectId: "rotet-4efa7",
  storageBucket: "rotet-4efa7.appspot.com",
  messagingSenderId: "1061932860135",
  appId: "1:1061932860135:web:bf040476b6798ca894d842",
  measurementId: "G-BX7SDHWEH9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='selecciona';
    
}
function createR() {
    document.getElementById("Input1").disabled = false;
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

        //console.log(alumno);

        firebase.database().ref('Bitacora/' + id).update(Bitacora).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Bitacora');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

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
    firebase.database().ref('Bitacora/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
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

    var ref = firebase.database().ref("Bitacora");
    ref.orderByChild("Marca").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

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