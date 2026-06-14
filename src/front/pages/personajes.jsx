import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Personajes = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (store.personajes && store.personajes.length > 0) return;

        const fetchPersonajes = async () => {
            try {
                const response = await fetch("https://akabab.github.io/starwars-api/api/all.json");
                if (!response.ok) throw new Error("Error cargando personajes");
                const data = await response.json();

                const personajesAdaptados = data.map(item => ({
                    ...item,
                    uid: item.id.toString()
                }));

                dispatch({
                    type: "SET_PERSONAJES",
                    payload: personajesAdaptados
                });
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchPersonajes();
    }, [store.personajes?.length, dispatch]);

    return (
        <div className="container mt-4">
            <h1 className="text-warning mb-4 text-center">Personajes</h1>

            {!store.personajes || store.personajes.length === 0 ? (
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border text-warning" role="status"></div>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                    {store.personajes.map(item => {
                        const imageUrl = item.image;
                        const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.category === "personaje");
                        return (
                            <div key={item.uid} className="col d-flex justify-content-center">
                                <div className="card bg-dark text-white border-secondary shadow-sm w-100" style={{ maxWidth: "18rem" }}>
                                    <img
                                        src={imageUrl}
                                        className="card-img-top"
                                        alt={item.name}
                                        style={{ height: "350px", objectFit: "cover", objectPosition: "top" }}
                                        onError={(e) => { e.target.src = "https://placehold.co/400x600/212529/ffe81f?text=Imagen+No+Disponible"; }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-warning">{item.name}</h5>

                                        <div className="mt-auto d-flex justify-content-between">
                                            <Link to={`/personajes/${item.uid}`} className="btn btn-sm btn-outline-light">
                                                Detalles
                                            </Link>
                                            <button
                                                className={`btn btn-sm ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                                                onClick={() => {
                                                    if (isFavorite) {
                                                        dispatch({
                                                            type: "REMOVE_FAVORITE",
                                                            payload: { uid: item.uid, category: "personaje" }
                                                        });
                                                    } else {
                                                        dispatch({
                                                            type: "ADD_FAVORITE",
                                                            payload: { ...item, category: "personaje" }
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