import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import logoStarWars from "../assets/img/icons8-la-guerra-de-las-galaxias-480.png";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-dark bg-transparent px-3">
      <div className="container d-flex align-items-center">

        <div className="flex-grow-1 d-none d-lg-block" style={{ flexBasis: 0 }}></div>
        <Link className="navbar-brand mx-auto d-flex justify-content-center" to="/" style={{ flexBasis: 0, flexGrow: 1 }}>
          <img
            src={logoStarWars}
            alt="star wars"
            style={{ width: "250px", height: "auto" }}
          />
        </Link>
        <div className="d-flex justify-content-end flex-grow-1" style={{ flexBasis: 0 }}>
          <div className="dropdown">
            <button className="btn btn-warning dropdown-toggle fw-bold shadow" type="button" data-bs-toggle="dropdown">
              <i className="fa-solid fa-heart text-danger me-2"></i>
              Favoritos
              <span className="badge bg-dark text-white ms-2">
                {store.favorites.length}
              </span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end bg-dark border-warning p-2" style={{ minWidth: "250px" }}>
              {store.favorites.length === 0 ? (
                <li className="text-white text-center p-2">Tu lista está vacía</li>
              ) : (
                store.favorites.map(fav => (
                  <li key={fav.uid} className="d-flex justify-content-between align-items-center mb-2 border-bottom border-secondary pb-1">
                    <Link to={`/${fav.type}/${fav.uid}`} className="text-white text-decoration-none ms-2 small">
                      {fav.name}
                    </Link>
                    <i
                      className="fa-solid fa-trash text-danger me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch({ type: "REMOVE_FAVORITE", payload: fav.uid })}
                    ></i>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
};