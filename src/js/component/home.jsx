import React, { useEffect, useState } from "react";

//create your first component

const Home = () => {

	// let nuevoToDo = "";
	// variable, funcion para modificar variable
	const initialToDo = {
		label: "",
		is_done: false,
	}

	const urlBase = "https://playground.4geeks.com/todo"

	const [nuevoToDo, setNuevoToDo] = useState(initialToDo);

	const [toDo, setTodo] = useState([])

	const handleClick = () => {
		if (nuevoToDo.label.trim() === "") {
			return window.alert("NO PUEDE AÑADIR UNA TAREA VACÍA. DEBE ESCRIBIR UNA NUEVA TAREA.")
		}
		//setTodo([...toDo, nuevoToDo])
		agregarTarea()
		setNuevoToDo(initialToDo)
	}

	const agregarTarea = async () =>{
		const res = await fetch(`${urlBase}/todos/facundo`, {
			method: "POST",
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify({
				label: nuevoToDo.label,
		        is_done: false,
			})
		})
		console.log(res.status)
			if (res.status == 201) {
				gotAllToDo()
				return
			}
	}



	const handleEnter = (event) => {
		if (event.key == "Enter") {
			if (nuevoToDo.label.trim() === "") {
				return window.alert("NO PUEDE AÑADIR UNA TAREA VACÍA. DEBE ESCRIBIR UNA NUEVA TAREA.")
			} else {
				//setTodo([...toDo, nuevoToDo]) 
				agregarTarea()
				setNuevoToDo(initialToDo)
			}
		}
	};

	const borrarToDo = async (index) => {
		console.log(index);
		//const listaNueva = toDo.filter((toDo, i) => i !== index)
		//setTodo(listaNueva);
		const res = await fetch(`${urlBase}/todos/${index}`, {
			method: "DELETE",
			headers: {"Content-Type":"application/json"},
		})
		console.log(res.status)
			if (res.status == 204) {
				gotAllToDo()
				return
			}
	}

	const handleChange = (event) => {
		setNuevoToDo({
			...nuevoToDo,
			[event.target.name]: event.target.value
		});
	}

	const gotAllToDo = async () => {
		try {
			const res = await fetch(`${urlBase}/users/facundo`)
			const data = await res.json()
            if (res.status == 404) {
				creatNewUser()
				return
			} 
			if (res.ok) {
				setTodo(data.todos)
			} else {
				creatNewUser()
			}
		} catch (error) {
			console.log(error)
		}
	}


	const creatNewUser = async () => {
		try {
			const res = await fetch(`${urlBase}/users/facundo`, { method: "POST" })
			if (res.status == 201) {
				gotAllToDo()
				return
			}
		}
		catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		gotAllToDo();
	}, [])

	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">
				Todo List Usando React + Fetch
			</h1>

			<div className="d-flex justify-content-center">
				<input type="text" value={nuevoToDo.label} onChange={handleChange} onKeyDown={handleEnter} name="label" />
				<button className="btn btn-success ms-3" onClick={handleClick} >
					Agregar tarea
				</button>
			</div>
			<div className="d-flex justify-content-center mt-4">
				<ul className="list-group">
					{toDo.length <= 0 ? <div>No hay tareas</div> :
						toDo.map((listaTareas, index) => {
							return (
								<li className="list-group-item" key={index}>
									{listaTareas.label} <button className="btn btn-danger btn-sm" onClick={() => borrarToDo(listaTareas.id)}><i className="fa-regular fa-circle-xmark"></i></button>
								</li>
							)
						})}
				</ul>
			</div>
		</div>
	);
};

export default Home;
