// const Aviso = ({children}) => {	
const Aviso = ({aviso}) => {
	return (
		<div className={`${aviso.error ? 'bg-red-600' : 'bg-indigo-600'} rounded-md text-white text-center font-bold uppercase text-sm p-3 mb-10`}>
			{/*{children}*/}
			<p>{aviso.msg}</p>
		</div>
	)
}

export default Aviso;

