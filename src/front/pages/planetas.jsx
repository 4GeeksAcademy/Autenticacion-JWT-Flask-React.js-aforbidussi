import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const PlanetaDetalle = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    const [detalles, setDetalles] = useState(null);

    const cleanUid = uid.trim();

    useEffect(() => {
        fetch(`https://swapi.info/api/planets/${cleanUid}`)
            .then(res => {
                if (!res.ok) throw new Error("Error en la red");
                return res.json();
            })
            .then(data => {
                setDetalles(data);
            })
            .catch(err => console.error(err));
    }, [cleanUid]);

    if (!detalles) return <p className="text-white text-center mt-5">Cargando coordenadas espaciales...</p>;

const imageURL = `/img/planetas/${cleanUid}.jpg`;

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <button
                    onClick={() => navigate("/planetas")}
                    className="btn btn-outline-warning"
                >
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Regresar
                </button>
            </div>

            <div className="row bg-dark p-4 rounded shadow-lg border border-secondary">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img
                        src={imageURL}
                        className="img-fluid rounded shadow"
                        alt={detalles.name}
                        style={{ maxHeight: "500px", objectFit: "cover" }}
                        onError={(e) => {
                            console.warn("Imagen no encontrada, aplicando fallback");
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400/212529/ffe81f?text=Not+Found";
                        }}
                    />
                </div>
                <div className="col-md-6 text-white p-4">
                    <h1 className="display-4 text-warning">{detalles.name}</h1>
                    <hr className="bg-warning" style={{ height: "2px" }} />

                    <div className="mt-4 fs-5">
                        <p className="mb-3"><strong>Clima:</strong> {detalles.climate}</p>
                        <p className="mb-3"><strong>Terreno:</strong> {detalles.terrain}</p>
                        <p className="mb-3"><strong>Población:</strong> {detalles.population}</p>
                        <p className="mb-3"><strong>Período Orbital:</strong> {detalles.orbital_period} días</p>
                    </div>

                    <div className="mt-5 p-3 bg-secondary bg-opacity-25 rounded">
                        <p className="fst-italic text-info">
                            "Datos topográficos y demográficos recopilados por sondas de reconocimiento."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};