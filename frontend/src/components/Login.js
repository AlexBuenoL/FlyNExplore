import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../SessionContext";

const path_API = process.env.REACT_APP_API

export const Login = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const { setUser } = useSession();
    const navigate = useNavigate();

    const handleSubnmit = async (e) => {
        e.preventDefault(); 

        const res = await fetch(`${path_API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                pwd
            })
        })
        
        if (res.ok) {
            const userData = await res.json();
            setUser({ name: userData.nameUser, email: email, pwd: pwd });
            navigate('/flightSearch');
        }
        else 
            alert('Ha habido un error al iniciar sesión');
    } 

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-4">
                <form onSubmit={handleSubnmit} className="card card-body">
                    <div className="form-group">
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                            className="form-control"
                            placeholder="Correo electrónico"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            onChange={e => setPwd(e.target.value)} 
                            value={pwd} 
                            className="form-control"
                            placeholder="Contraseña"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">Iniciar sesión</button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-2">¿Aún no tiene cuenta?</p>
                    <Link to="/register" className="btn btn-secondary btn-sm">
                        Registrarse
                    </Link>
                </div>
            </div>
        </div>
    )
}