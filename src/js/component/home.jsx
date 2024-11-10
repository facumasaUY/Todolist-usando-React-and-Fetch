import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component



const Home = () => {

	// let nuevoToDo = "";
   // variable, funcion para modificar variable
	const [nuevoToDo, setNuevoToDo] = useState("");
	const [toDo, setTodo] = useState(["Estudiar para el proyecto de 4geeks", "Terminar los ejercios con Fetch"])

	const handleClick = () => {
		if (nuevoToDo.trim() === ""){
			return window.alert("NO PUEDE AÑADIR UNA TAREA VACÍA. DEBE ESCRIBIR UNA NUEVA TAREA.")
		} 
			setTodo([...toDo,nuevoToDo])
			setNuevoToDo("")
		}
       

    const borrarToDo = (index) => {
		console.log(index);
		const listaNueva = toDo.filter((toDo, i) => i !== index)
        setTodo(listaNueva);
		}

	const handleChange = (event) => {
		setNuevoToDo(event.target.value);
	}
	
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">
				Todo List Usando React + Fetch
			</h1>

			<div>
			    <input type="text" value={nuevoToDo} onChange={handleChange}/>
			    <button className="btn" onClick={handleClick}>
			    	Agregar tarea
		    	</button>
			</div>	
			<p>Nueva tarea: {nuevoToDo}</p>
			<ul>
				{toDo.map((listaTareas, index) =>{
					return(
						<li key={index}>
							{listaTareas} <button className="btn" onClick={() => borrarToDo(index)}><i className="fa-regular fa-circle-xmark"></i></button>
						</li>
					) 
				})}
			</ul>

		</div>
	);
};

export default Home;
