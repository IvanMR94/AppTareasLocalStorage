const formulario = document.querySelector('#formulario');
const inputTarea = document.querySelector('#tarea');
const mensajeError = document.querySelector('.alert-danger');
const contenedorTareas = document.querySelector('#contenedorTareas');
const templateTareas = document.querySelector('#templateTareas');

let tareas = []; // acá se guardan las tareas del usuario

formulario.addEventListener('submit', (e) => {
    mensajeError.classList.add('d-none');
    e.preventDefault(); // evita que la pagina se actualice al dar en el btn
    
    if(!inputTarea.value.trim()){
        mensajeError.classList.remove('d-none');
        return; // para cortar el flujo y volver al inicio
    };

    const tarea = inputTarea.value;
    agretarTarea (tarea);

});

const agretarTarea = (tarea) =>{
    const tareaObjeto = {
        tarea: tarea,
        id: Date.now(), // genera un numero identificador aleatorio (opuede haber conicidencias)
    };

    tareas.push(tareaObjeto); // agregamos la tarea como objeto al arreglo

    mostrarTareas();
};

const mostrarTareas =()=>{
    localStorage.setItem('tareas', JSON.stringify(tareas)); //guardo en localStorage, primero recibo llave y convierto el arreglo en json para poder guardarlo.


    contenedorTareas.textContent = ''; //vaciamos el contenedor previamente
    const fragment = document.createDocumentFragment(); // creamos el fragment
    tareas.forEach((item) =>{ // iteramos el areglo
        const clone = templateTareas.content.cloneNode(true); // clonamos el template
        clone.querySelector('.lead').textContent = item.tarea; // modificamos con datos agregados el clon del template
        clone.querySelector('.btn-danger').dataset.id = item.id; // agregamos al boton un dataset con el ide generado aleatoriamente para poder referirnos de forma indivicual al btn elegido
        fragment.appendChild(clone);//agregamos al fragment el clon
    });

    contenedorTareas.appendChild(fragment); //afuera, agregamos el fragmen al contenedor
};

document.addEventListener('click', (e)=>{
    if (e.target.matches('.btn-danger')){ //el selctor matches trabaja con selectores de css devolviendo true o false
        tareas = tareas.filter((item) =>{
            return item.id !== parseInt(e.target.dataset.id)
        });
        mostrarTareas();
    };
});

document.addEventListener('DOMContentLoaded', ()=>{ //ingresar al dom para que al eliminar tareas tmb se sobreescriba el localstorage con las eliminadas, es decir, si no hay nada, se actualice.
    if (localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'));//se vuelven al formato de dato original.
        mostrarTareas();
    };
});

