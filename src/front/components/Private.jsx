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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {user ? (
                        <div className="sw-private-container p-5 text-center">
                            {/* Hologram Lock SVG Icon */}
                            <svg className="mb-4" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.8))" }}>
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                <circle cx="12" cy="16" r="1"></circle>
                            </svg>
                            
                            <h2 className="sw-private-title mb-3">Acceso Autorizado</h2>
                            <p className="lead text-info mb-4" style={{ letterSpacing: "0.5px" }}>
                                Has ingresado con éxito al archivo de datos privado.
                            </p>
                            
                            <div className="d-flex flex-column align-items-center mb-4">
                                <span className="text-secondary small mb-2 text-uppercase" style={{ letterSpacing: "1.5px" }}>
                                    Identidad del Usuario
                                </span>
                                <div className="sw-private-email">
                                    {user.email}
                                </div>
                            </div>
                            
                            <div className="text-muted small" style={{ fontFamily: "monospace" }}>
                                Transmisión segura cifrada • Terminal #SW-4G
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-info p-5">
                            <div className="spinner-border text-info mb-3" role="status">
                                <span className="visually-hidden">Estableciendo canal...</span>
                            </div>
                            <p className="lead" style={{ fontFamily: "monospace" }}>Descifrando señal de seguridad...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};