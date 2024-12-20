import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "../SessionContext";

export const Navbar = () => {

    const { user, setUser } = useSession();

    const handleLogout = () => {
        setUser(null);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand ms-3">FlyNExplore</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/flightSearch">Buscar vuelos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/recommends">Recomendaciones</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/aboutUs">Sobre nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profileMenu">Perfil</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto text-center">
                        {user && (
                            <li className="nav-item">
                                <span style={{fontSize: "1.2rem", fontWeight: "bold"}}>
                                    {user.name}
                                </span>
                                <Link className="nav-link" to="/login" onClick={handleLogout}>
                                    Cerrar sesión
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};