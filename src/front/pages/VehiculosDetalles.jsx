import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const VehiculoDetalle = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    const [detalles, setDetalles] = useState(null);
    const cleanUid = uid.trim();

    useEffect(() => {
        fetch(`https://swapi.info/api/vehicles/${cleanUid}`)
            .then(res => {
                if (!res.ok) throw new Error("Error en la API");
                return res.json();
            })
            .then(data => setDetalles(data))
            .catch(err => console.error("Error cargando detalles:", err));
    }, [cleanUid]);

    if (!detalles) return <p className="text-white text-center mt-5">Escaneando motores...</p>;

    const imageURL = `/img/vehiculos/${cleanUid}.jpg`;

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <button onClick={() => navigate("/vehiculos")} className="btn btn-outline-warning">
                    <i className="fa-solid fa-arrow-left me-2"></i> Regresar
                </button>
            </div>

            <div className="row bg-dark p-4 rounded shadow-lg border border-secondary">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img
                        src={imageURL}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "400px", width: "auto" }}
                        onError={(e) => {
                            console.warn(`Imagen para el vehículo ${cleanUid} no encontrada. Usando repuesto.`);
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400/212529/ffe81f?text=Imagen+No+Disponible";
                        }}
                        alt={detalles.name}
                    />
                </div>
                <div className="col-md-6 text-white p-4">
                    <h1 className="display-4 text-warning">{detalles.name}</h1>
                    <hr className="bg-warning" />
                    <div className="mt-4 fs-5">
                        <p><strong>Modelo:</strong> {detalles.model}</p>
                        <p><strong>Clase:</strong> {detalles.vehicle_class}</p>
                        <p><strong>Pasajeros:</strong> {detalles.passengers}</p>
                        <p><strong>Costo:</strong> <span className="text-info">{detalles.cost_in_credits}</span> créditos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};