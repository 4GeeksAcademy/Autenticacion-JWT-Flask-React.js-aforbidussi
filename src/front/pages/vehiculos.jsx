import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Vehiculos = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (store.vehiculos && store.vehiculos.length > 0) return;

        const fetchVehiculos = async () => {
            try {
                const response = await fetch("https://swapi.info/api/vehicles");
                if (!response.ok) throw new Error("Error cargando vehículos");
                const data = await response.json();

                const vehiculosAdaptados = data.map(v => {
                    const id = v.url.split("/").filter(Boolean).pop();
                    return { ...v, uid: id, type: "vehiculos" };
                });

                dispatch({
                    type: "SET_VEHICULOS",
                    payload: vehiculosAdaptados
                });
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchVehiculos();
    }, [store.vehiculos?.length, dispatch]);

    return (
        <div className="container mt-4">
            <h1 className="text-warning mb-4 text-center">Vehículos</h1>

            {!store.vehiculos || store.vehiculos.length === 0 ? (
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                    {store.vehiculos.map(item => {

                        const imageURL = `/img/vehiculos/${item.uid}.jpg`;
                        const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.category === "vehiculos");

                        return (
                            <div key={item.uid} className="col d-flex justify-content-center">
                                <div className="card bg-dark text-white border-secondary shadow-sm w-100" style={{ maxWidth: "18rem" }}>
                                    <img
                                        src={imageURL}
                                        className="card-img-top"
                                        alt={item.name}
                                        style={{ height: "300px", objectFit: "cover", objectPosition: "center" }}
                                        onError={(e) => {
                                            e.target.src = "https://placehold.co/400x600/212529/ffe81f?text=Imagen+No+Disponible";
                                        }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-warning">{item.name}</h5>
                                        <div className="mt-auto d-flex justify-content-between">
                                            <Link to={`/vehiculos/${item.uid}`} className="btn btn-sm btn-outline-light">
                                                Detalles
                                            </Link>
                                            <button
                                                className={`btn btn-sm ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                                                onClick={() => {
                                                    if (isFavorite) {
                                                        dispatch({
                                                            type: "REMOVE_FAVORITE",
                                                            payload: { uid: item.uid, category: "vehiculos" }
                                                        });
                                                    } else {
                                                        dispatch({
                                                            type: "ADD_FAVORITE",
                                                            payload: { ...item, category: "vehiculos" }
                                                        });
                                                    }
                                                }}
                                            >
                                                <i className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};