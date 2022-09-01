import {eliminarCita, cargarEdicion } from '../funciones.js'

import { contenedorCitas, } from '../selectores.js'

class UI {


  
  imprimirAlerta(mensaje, tipo) {
    //crear el div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'd-block', 'col-12', 'font-weight-bold', 'text-white');

    //agregar clase en base al tipo de error
    if(tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }

     //mensaje de error
    divMensaje.textContent = mensaje;

    //agregar al DOM
    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
    
    //quitar la alerta
    setTimeout( () => {
      divMensaje.remove();
    }, 5000);
  
  }

  imprimirCitas({citas}) {

    this.limpiarHTML();

    citas.forEach( citas => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id} = citas;
    
      const divCita = document.createElement('div');
      divCita.classList.add('cita', 'p-3', 'text-center');
      divCita.dataset.id = id;

      //scripting de los elemntos de las cita
      const mascotaParrafo = document.createElement('h2');
      mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement('p');
      propietarioParrafo.innerHTML = `
        <span class="font-weiht-boler">Propietario:</span> ${propietario}
      `;

      const telefonoParrafo = document.createElement('p');
      telefonoParrafo.innerHTML = `
        <span class="font-weiht-boler">Telefono:</span> ${telefono}
      `;

      const fechaParrafo = document.createElement('p');
      fechaParrafo.innerHTML = `
        <span class="font-weiht-boler">Fecha:</span> ${fecha}
      `;

      const horaParrafo = document.createElement('p');
      horaParrafo.innerHTML = `
        <span class="font-weiht-boler">Hora:</span> ${hora}
      `;

      const sintomasParrafo = document.createElement('p');
      sintomasParrafo.innerHTML = `
        <span class="font-weiht-boler">Sintomas:</span> ${sintomas}
      `;

      //boton para eliminar esta cita
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
      btnEliminar.innerHTML = 'Eliminar';

      btnEliminar.onclick = () => eliminarCita(id);

      //boton para editar cita

      const btnEditar = document.createElement('button');
      btnEditar.classList.add('btn', 'btn-info', 'mr-2');
      btnEditar.innerHTML = 'Editar';
      btnEditar.onclick = () => cargarEdicion(citas);

      //agregar los parrafos al divcita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      //agregar las citas al html
      contenedorCitas.appendChild(divCita);


    } )
  }   

  limpiarHTML() {
    while(contenedorCitas.firstChild) {
      contenedorCitas.removeChild( contenedorCitas.firstChild )
    }
  }
}

export default UI;