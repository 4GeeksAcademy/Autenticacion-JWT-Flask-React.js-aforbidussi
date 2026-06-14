import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const PersonajeDetalle = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    const [detalles, setDetalles] = useState(null);

    const cleanUid = uid.trim();

    useEffect(() => {
        fetch(`https://akabab.github.io/starwars-api/api/id/${cleanUid}.json`)
            .then(res => res.json())
            .then(data => {
                setDetalles(data);
            })
            .catch(err => console.error("Error cargando detalles:", err));
    }, [cleanUid]);

    if (!detalles) return <p className="text-white text-center mt-5">Cargando detalles del héroe...</p>;

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <button
                    onClick={() => navigate("/personajes")}
                    className="btn btn-outline-warning"
                >
                    <i className="fa-solid fa-arrow-left me-2"></i> Regresar
                </button>
            </div>

            <div className="row bg-dark p-4 rounded shadow-lg border border-secondary">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img
                        src={detalles.image}
                        className="img-fluid rounded shadow"
                        alt={detalles.name}
                        style={{ maxHeight: "500px", objectFit: "cover" }}
                        onError={(e) => {
                            e.target.src = "https://placehold.co/400x600/212529/ffe81f?text=Imagen+No+Disponible";
                        }}
                    />
                </div>
                <div className="col-md-6 text-white p-4">
                    <h1 className="display-4 text-warning">{detalles.name}</h1>
                    <hr className="bg-warning" style={{ height: "2px" }} />

                    <div className="mt-4 fs-5">
                        <p className="mb-3"><strong>Especie:</strong> <span className="text-capitalize">{detalles.species}</span></p>
                        <p className="mb-3"><strong>Altura:</strong> {detalles.height} m</p>
                        <p className="mb-3"><strong>Color de cabello:</strong> <span className="text-capitalize">{detalles.hairColor || "No tiene"}</span></p>
                        <p className="mb-3"><strong>Planeta de origen:</strong> <span className="text-capitalize">{detalles.homeworld}</span></p>
                    </div>

                    <div className="mt-5 p-3 bg-secondary bg-opacity-25 rounded">
                        <p className="fst-italic text-info">
                            "Los datos mostrados han sido extraídos directamente de los Archivos de la Antigua República."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};