import { useState } from "react"; 
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store } = useGlobalReducer();
    const [busqueda, setBusqueda] = useState(""); 

    const personajesFiltrados = store.personajes?.filter(p => 
        p.name.toLowerCase().includes(busqueda.toLowerCase())
    ) || [];

    const planetasFiltrados = store.planetas?.filter(p => 
        p.name.toLowerCase().includes(busqueda.toLowerCase())
    ) || [];

    const vehiculosFiltrados = store.vehiculos?.filter(v => 
        v.name.toLowerCase().includes(busqueda.toLowerCase())
    ) || [];

    const hayResultados = personajesFiltrados.length > 0 || planetasFiltrados.length > 0 || vehiculosFiltrados.length > 0;

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center gap-3 mb-5">

                <div className="dropdown">
                    <button 
                        className="btn btn-secondary dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown"
                    >
                        Categorías
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/personajes">Personajes</Link></li>
                        <li><Link className="dropdown-item" to="/planetas">Planetas</Link></li>
                        <li><Link className="dropdown-item" to="/vehiculos">Vehículos</Link></li>
                    </ul>
                </div>

                <div className="d-flex w-50">
                    <input 
                        className="form-control me-2 border-warning" 
                        type="search" 
                        placeholder="Busca un personaje, planeta o vehículo..." 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)} // Actualiza el estado al escribir
                    />
                    <button className="btn btn-outline-warning">
                        <i className="fa-solid fa-magnifying-glass text-white"></i>
                    </button>
                </div>
            </div>

            {busqueda !== "" && (
                <div className="results-container">
                    <h3 className="text-white mb-4">Resultados para: "{busqueda}"</h3>
                    
                    {!hayResultados ? (
                        <p className="text-danger">No se encontró nada en los archivos imperiales.</p>
                    ) : (
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                            
                            {personajesFiltrados.map(p => (
                                <div key={p.uid} className="col">
                                    <div className="card bg-dark border-warning text-white h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <span className="badge bg-info text-dark">Personaje</span>
                                            <Link to={`/personajes/${p.uid}`} className="btn btn-sm btn-warning d-block mt-3">Ver detalle</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {planetasFiltrados.map(p => (
                                <div key={p.uid} className="col">
                                    <div className="card bg-dark border-info text-white h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <span className="badge bg-success">Planeta</span>
                                            <Link to={`/planetas/${p.uid}`} className="btn btn-sm btn-info d-block mt-3 text-white">Ver detalle</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {vehiculosFiltrados.map(v => (
                                <div key={v.uid} className="col">
                                    <div className="card bg-dark border-secondary text-white h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{v.name}</h5>
                                            <span className="badge bg-secondary">Vehículo</span>
                                            <Link to={`/vehiculos/${v.uid}`} className="btn btn-sm btn-outline-light d-block mt-3">Ver detalle</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}
                </div>
            )}
        </div>
    );
};