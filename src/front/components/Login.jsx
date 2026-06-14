import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3001";
            const response = await fetch(backendUrl + "/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem("token", data.access_token);
                navigate("/private");
            } else {
                setError(data.message || "Credenciales inválidas");
            }
        } catch (err) {
            setError("Error de red");
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center text-warning" style={{ textShadow: "0 0 10px #ffe81f" }}>Iniciar Sesión</h2>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit} className="sw-form-container p-4 rounded">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <input 
                                type="email" 
                                className="form-control sw-input" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-bold">Contraseña</label>
                            <input 
                                type="password" 
                               className="form-control sw-input" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="sw-btn sw-btn-blue w-100">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
