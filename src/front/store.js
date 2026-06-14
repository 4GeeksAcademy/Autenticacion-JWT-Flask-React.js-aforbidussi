export const initialStore = () => {
    return {
        personajes: [],
        planetas: [],
        vehiculos: [],
        favorites: []
    };
};

export default function storeReducer(state, action) {
    switch (action.type) {
        case "SET_PERSONAJES":
            return { ...state, personajes: action.payload };
        case "SET_PLANETAS":
            return { ...state, planetas: action.payload };
        case "SET_VEHICULOS":
            return { ...state, vehiculos: action.payload };
        case "ADD_FAVORITE":
            if (state.favorites.some(fav => fav.uid === action.payload.uid)) return state;
            return { ...state, favorites: [...state.favorites, action.payload] };
        case "REMOVE_FAVORITE":
            return { ...state, favorites: state.favorites.filter(fav => fav.uid !== action.payload) };
        default:
            return state;
    }
}