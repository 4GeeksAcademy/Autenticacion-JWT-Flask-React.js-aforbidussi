import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
export const Planetas = () => {
    const { store, dispatch } = useGlobalReducer();
    useEffect(() => {
        if (store.planetas && store.planetas.length > 0) return;
        const fetchPlanetas = async () => {
            try {
                const response = await fetch("https://www.swapi.tech/api/planets?limit=100");
                if (!response.ok) throw new Error("Error cargando planetas");
                const data = await response.json();
                const planetasAdaptados = data.results ? data.results.map(item => ({
                    ...item,
                    type: "planetas"
                })) : [];
            
                dispatch({
                    type: "SET_PLANETAS",
                    payload: planetasAdaptados
                });
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchPlanetas();
    }, [store.planetas?.length, dispatch]);
    return (
        <div className="container mt-4">
            <h1 className="text-warning mb-4 text-center">Planetas</h1>
            {!store.planetas || store.planetas.length === 0 ? (
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border text-warning" role="status"></div>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                    {store.planetas.map(item => {
                        const uid = item.uid;
                        const imageUrl = `/img/planetas/${uid}.jpg`;
                        const isFavorite = store.favorites.some(fav => fav.uid === uid && fav.category === "planeta");
                        return (
                            <div key={uid} className="col d-flex justify-content-center">
                                <div className="card bg-dark text-white border-secondary shadow-sm w-100" style={{ maxWidth: "18rem" }}>
                                    <img
                                        src={imageUrl}
                                        className="card-img-top"
                                        alt={item.name}
                                        style={{ height: "350px", objectFit: "cover", objectPosition: "center" }}
                                        onError={(e) => { e.target.src = "https://placehold.co/400x400/212529/ffe81f?text=Imagen+No+Disponible"; }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-warning">{item.name}</h5>
                                        <div className="mt-auto d-flex justify-content-between">
                                            <Link to={`/planetas/${uid}`} className="btn btn-sm btn-outline-light">
                                                Detalles
                                            </Link>
                                            <button
                                                className={`btn btn-sm ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                                                onClick={() => {
                                                    if (isFavorite) {
                                                        dispatch({
                                                            type: "REMOVE_FAVORITE",
                                                            payload: { uid: uid, category: "planeta" }
                                                        });
                                                    } else {
                                                        dispatch({
                                                            type: "ADD_FAVORITE",
                                                            payload: { ...item, category: "planeta" }
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
