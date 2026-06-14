import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Private = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        
        if (!token) {
            navigate("/login");
            return;
        }
        const verifyToken = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3001";
                const response = await fetch(backendUrl + "/api/private", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    sessionStorage.removeItem("token");
                    navigate("/login");
                }
            } catch (err) {
                setError("Error de red");
                sessionStorage.removeItem("token");
                navigate("/login");
            }
        };
        verifyToken();
    }, [navigate]);
    return (
        <div className="container mt-5 text-center">
            {error && <div className="alert alert-danger">{error}</div>}
            {user ? (
                <div>
                    <h2>Bienvenido a la vista Privada</h2>
                    <p className="lead">Solo los usuarios autenticados pueden ver esto.</p>
                    <p>Email del usuario: <strong>{user.email}</strong></p>
                </div>
            ) : (
                <p>Cargando información...</p>
            )}
        </div>
    );
};
