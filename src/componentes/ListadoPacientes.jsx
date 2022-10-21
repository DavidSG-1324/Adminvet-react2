// import {useEffect} from 'react';

import Paciente from './Paciente.jsx';

const ListadoPacientes = (props) => {
	const {pacientes, setPaciente, eliminarPaciente} = props;

	// useEffect(() => {
	// 	if(pacientes.length !== 0) {
	// 		console.log("Nuevo Paciente");
	// 	}
	// }, [pacientes]);

	return (
		<div className="mx-5 md:w-1/2 lg:w-3/5 md:h-screen md:overflow-y-scroll">
			{pacientes && pacientes.length ? (
				<>
					<h2 className="text-center font-black text-3xl">Pacientes registrados</h2>

					<p className="text-center text-xl mt-5 mb-10">
						Puedes administrar las <span className="text-indigo-600 font-bold">Citas</span> de los Pacientes
					</p>

					{
						// pacientes.map(paciente => {
						// 	return (
						// 		<Paciente />
						// 	)
						// })

						pacientes.map(paciente => (
							<Paciente 
								key={paciente.id}
								paciente={paciente}
								setPaciente={setPaciente}
								eliminarPaciente={eliminarPaciente}
							/>
						))
					}
				</>
			) : (
				<>
					<h2 className="text-center font-black text-3xl">Aún no hay Pacientes en el registro</h2>

					<p className="text-center text-xl mt-5 mb-10">
						Al agregar Pacientes aparecerán <span className="text-indigo-600 font-bold">aquí</span>
					</p>
				</>
			)}
		</div>
	)
}

export default ListadoPacientes;

