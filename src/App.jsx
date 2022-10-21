import {useState, useEffect} from 'react';

import Header from './componentes/Header.jsx';
import Formulario from './componentes/Formulario.jsx';
import ListadoPacientes from './componentes/ListadoPacientes.jsx';

function App() {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        const verificarStorage = () => {
            const citas = JSON.parse(localStorage.getItem('citas')) || [];
            setPacientes(citas);        
        }

        verificarStorage();
    }, []);

    useEffect(() => {
        const sincronizarStorage = () => {
            const citasString = JSON.stringify(pacientes);
            localStorage.setItem('citas', citasString);
        }

        sincronizarStorage();
    }, [pacientes]);

    const eliminarPaciente = (id) => {
        const pacientesActualizado = pacientes.filter(pacienteState => pacienteState.id !== id);

        setPacientes(pacientesActualizado);        
    }

    return (
        <div className="container mx-auto mt-20">
            <Header />

            <div className="mt-12 md:flex">
                <Formulario
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                />

                <ListadoPacientes
                    pacientes={pacientes}
                    setPaciente={setPaciente}
                    eliminarPaciente={eliminarPaciente}
                />
            </div>
        </div>
    )
}

export default App;
