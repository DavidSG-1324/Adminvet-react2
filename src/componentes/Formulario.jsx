import {useState, useEffect} from 'react';
import Aviso from './Aviso.jsx';

const Formulario = (props) => {
	const {pacientes, setPacientes, paciente, setPaciente} = props;

	const [nombre, setNombre] = useState('');
	const [propietario, setPropietario] = useState('');
	const [email, setEmail] = useState('');
	const [fecha, setFecha] = useState('');
	const [sintomas, setSintomas] = useState('');

	const [aviso, setAviso] = useState({});

	const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	useEffect(() => {
		if(Object.keys(paciente).length !== 0) {
			setNombre(paciente.nombre);
			setPropietario(paciente.propietario);
			setEmail(paciente.email);
			setFecha(paciente.fecha);
			setSintomas(paciente.sintomas);
		}
	}, [paciente]);

	useEffect(() => {
		const deshabilitarFechaAnterior = () => {
			const fechaActual = new Date();

			const year = fechaActual.getFullYear();
			const month = fechaActual.getMonth() + 1;
			const day = fechaActual.getDate() + 1;

			let fechaHabil;

			if(month < 10) {
				fechaHabil = `${year}-0${month}-${day}`;
			} else {
				fechaHabil = `${year}-${month}-${day}`;
			}

			const fechaInput = document.querySelector('#fecha');
			fechaInput.min = fechaHabil;
		}

		deshabilitarFechaAnterior();
	}, []);

	const generarId = () => {
		const fecha = Date.now().toString(36);
		const random = Math.random().toString(36).substring(2);

		return fecha + random;
	}

	const handleSubmit = evento => {
		evento.preventDefault();

		if([nombre, propietario, email, fecha, sintomas].includes('')) {
			setAviso({msg: 'Todos los campos son obligatorios', error: true});
			return;
		}

		if(!isNaN(propietario)) {
			setAviso({msg: 'Nombre de propietario no válido', error: true});
			return;
		}

		if(!regexEmail.test(email)) {
			setAviso({msg: 'El Email no es válido', error: true});
			return;
		}		

		setAviso({});

		const pacienteObj = {
			nombre,
			propietario,
			email,
			fecha,
			sintomas
		}

		if(!paciente.id) {
			pacienteObj.id = generarId();

			setPacientes([...pacientes, pacienteObj]);

			setAviso({msg:'Paciente agregado correctamente', error: false});

		} else {
			pacienteObj.id = paciente.id;

			const index = pacientes.findIndex(pacienteState => pacienteState.id === pacienteObj.id);

			if(index !== -1) {
				const pacientesActualizado = pacientes.map(pacienteState => pacienteState.id === pacienteObj.id ? pacienteObj : pacienteState);

				setPacientes(pacientesActualizado);

				setAviso({msg:'Paciente editado correctamente', error: false});

			} else {
				setAviso({msg:'Paciente no encontrado', error: true});
			}

			setPaciente({});
		}

		setNombre('');
		setPropietario('');
		setEmail('');
		setFecha('');
		setSintomas('');

		setTimeout(() => {
			setAviso({});
		}, 3000);
	}

	const {msg} = aviso;

	return (
		<div className="mx-5 md:w-1/2 lg:w-2/5">
			<h2 className="text-center font-black text-3xl">Formulario</h2>

			<p className="text-center text-xl mt-5 mb-10">
				Registra a tus <span className="text-indigo-600 font-bold">Pacientes</span>
			</p>

			<form onSubmit={handleSubmit} className="shadow-md rounded-md bg-white px-5 py-10 mb-10">
				{msg &&
					// <Aviso><p>Todos los campos son obligatorios</p></Aviso>
					<Aviso
						aviso={aviso}
					/>
				}

				<div className="mb-5">
					<label htmlFor="nombre" className="text-gray-700 font-bold uppercase block">
						Nombre
					</label>
					<input
						id="nombre"
						type="text"
						placeholder="Nombre de la Mascota"
						className="border-2 rounded-md bg-gray-50 w-full p-2 mt-2 placeholder-gray-400"
						value={nombre}
						onChange={evento => setNombre(evento.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="propietario" className="text-gray-700 font-bold uppercase block">
						Propietario
					</label>
					<input
						id="propietario"
						type="text"
						placeholder="Dueño de la Mascota"
						className="border-2 rounded-md bg-gray-50 w-full p-2 mt-2 placeholder-gray-400"
						value={propietario}
						onChange={evento => setPropietario(evento.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="email" className="text-gray-700 font-bold uppercase block">
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Correo Electrónico"
						className="border-2 rounded-md bg-gray-50 w-full p-2 mt-2 placeholder-gray-400"
						value={email}
						onChange={evento => setEmail(evento.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="fecha" className="text-gray-700 font-bold uppercase block">
						Fecha Cita
					</label>
					<input
						id="fecha"
						type="date"
						className="fecha border-2 rounded-md bg-gray-50 w-full p-2 mt-2 placeholder-gray-400"
						value={fecha}
						onChange={evento => setFecha(evento.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="sintomas" className="text-gray-700 font-bold uppercase block">
						Síntomas
					</label>
					<textarea
						id="sintomas"
						placeholder="Describe el estado del paciente"
						className="border-2 rounded-md bg-gray-50 w-full p-2 mt-2 placeholder-gray-400"
						value={sintomas}
						onChange={evento => setSintomas(evento.target.value)}
					/>
				</div>

				<input 
					type="submit"
					value={!paciente.id ? 'Crear Cita' : 'Guardar Cambios'}
					className="bg-indigo-600 w-full px-10 py-3 text-white font-bold uppercase mt-5 hover:cursor-pointer hover:bg-indigo-700 transition-colors"
				/>
			</form>
		</div>
	)
}

export default Formulario;

