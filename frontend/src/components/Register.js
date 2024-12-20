import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

const path_API = process.env.REACT_APP_API

export const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const navigate = useNavigate();

    const handleSubnmit = async (e) => {
        e.preventDefault(); 
        const res = await fetch(`${path_API}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                pwd
            })
        })
        
        if (res.ok) {
            alert('Registro exitoso');
            navigate('/login')
        }
        else 
            alert('Ha habido un error al registrarse');
    } 

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-4">
                <form onSubmit={handleSubnmit} className="card card-body">
                <div className="form-group">
                        <input 
                            type="text" 
                            onChange={e => setName(e.target.value)} 
                            value={name} 
                            className="form-control"
                            placeholder="Nombre"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                            className="form-control"
                            placeholder="Correo electrónico"
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
                    <button className="btn btn-primary btn-block">Registrarse</button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-2">¿Ya tiene cuenta?</p>
                    <Link to="/login" className="btn btn-secondary btn-sm">
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}