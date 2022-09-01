import Citas from './clases/Citas.js'
import UI from './clases/UI.js'

import {mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from './selectores.js'


const ui = new UI();
const administrarCitas = new Citas();

let editando;

const citaObj = {
  mascota:'',
  propietario:'',
  telefono:'',
  fecha:'',
  hora:'',
  sintomas:'',
}

export function datosCita(e) {

  citaObj[e.target.name] = e.target.value;

}

//valida y agrrega una nueva cita a la clase de citas
 export function nuevaCita(e) {
  e.preventDefault();

  //extraer la informacion del objeto de cita
  const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

  //validar
  if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
    ui.imprimirAlerta('todos los campos son obligatorios', 'error');
         
    return;
    
    }

    if (editando) {

      ui.imprimirAlerta('Editado Correctamente');

      //administrador de cita
      administrarCitas.editarCita({...citaObj});

      //regresar el boton a su estado original
      formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

      //quitando modo edicion
      editando = false;

    } else {

      citaObj.id = Date.now();

    //crear una nueva cita
      administrarCitas.agregarCita({...citaObj});

      //imprimir mensaje
      ui.imprimirAlerta('Se agregó correctamente');

    }
   

      //reiniciar objeto para validacion
    reiniciarObjeto();

    //reiniciar formulario
    formulario.reset();

    //mostrar HTML 
    ui.imprimirCitas(administrarCitas);
}


export function reiniciarObjeto() {
citaObj.mascota ='';
citaObj.propietario ='';
citaObj.telefono ='';
citaObj.fecha ='';
citaObj.hora ='';
citaObj.sintomas ='';
} 

export function eliminarCita(id) {

//eliminar la cita
administrarCitas.eliminarCita(id);

//muestre un mensaje
ui.imprimirAlerta('La cita se elimino correctamente');

//refresque
ui.imprimirCitas(administrarCitas);
}

//carga los datos y el modo edicion

export function cargarEdicion(cita) {
const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

//llenar los imputs

mascotaInput.value = mascota;
propietarioInput.value = propietario;
telefonoInput.value = telefono;
fechaInput.value = fecha;
horaInput.value = hora;
sintomasInput.value = sintomas;

//llena el objeto  

citaObj.mascota = mascota;  
citaObj.propietario = propietario;  
citaObj.telefono = telefono;  
citaObj.fecha = fecha;  
citaObj.hora = hora;  
citaObj.sintomas = sintomas;
citaObj.id = id;


//cambiar el texto del boton

formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

editando = true; 
}
