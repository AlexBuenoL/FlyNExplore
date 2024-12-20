import React, { useState } from "react";
import { useSession } from "../SessionContext";

const path_API = process.env.REACT_APP_API

export const ProfileMenu = () => {

    const { user, setUser } = useSession();

    const [newName, setNewName] = useState(user?.name || "");
    const [newEmail, setNewEmail] = useState(user?.email || "");
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd1, setNewPwd1] = useState('');
    const [newPwd2, setNewPwd2] = useState('');

    if (!user) {
        return <div className="text-center mt-5">Debes iniciar sesión para ver esta página.</div>;
    }

    const handleNameEmailChanges = async (e) => {
        e.preventDefault();
        const oldEmail = user.email;
        
        if (newName !== user.name || newEmail !== user.email) {
            
            const res = await fetch(`${path_API}/modifyUserInfo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldEmail,
                    newName,
                    newEmail,
                })
            })
            
            if (res.ok) {
                setUser({ name: newName, email: newEmail, pwd: user.pwd});
                alert('Modificación realizada correctamente');
            }
            else 
                alert('Ha habido un error al modificar los datos');
        }
        else
            alert('No hay cambios que guardar');
    };

    const handlePwdChanges = async (e) => {
        e.preventDefault();
        const oldEmail = user.email;
        
        if (newPwd1 || newPwd2) {
            if (oldPwd && (oldPwd === user.pwd)) {
                if (newPwd1 === newPwd2) {
                    if (newPwd1 === user.pwd) alert('No hay cambios que guardar');
                    else {
                        const res = await fetch(`${path_API}/modifyUserPwd`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                oldEmail,
                                newPwd1
                            })
                        })
                        
                        if (res.ok) {
                            setUser({ name: user.name, email: user.email, pwd: newPwd1 });
                            alert('Modificación realizada correctamente');
                        }
                        else 
                            alert('Ha habido un error al modificar los datos');
                    }
                }
                else 
                    alert('Las contraseñas no coinciden');
            }
            else
                alert('La contraseña es incorrecta');
        }
        else
            alert('No hay cambios que guardar');

        setOldPwd('');
        setNewPwd1('');
        setNewPwd2('');
    };

    return (
        <div className="d-flex justify-content-center align-items-start mt-5">
            <div className="col-md-4">
                <h2 className="text-center mb-4">Modificar perfil</h2> 
                <form onSubmit={handleNameEmailChanges} className="card card-body">
                    <div className="form-group mb-4">
                        <label className="fw-bold mb-2">NOMBRE</label>
                        <input 
                            type="text" 
                            onChange={e => setNewName(e.target.value)} 
                            value={newName} 
                            className="form-control"
                            autoFocus
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="fw-bold mb-2">CORREO ELECTRÓNICO</label>
                        <input 
                            type="email" 
                            onChange={e => setNewEmail(e.target.value)} 
                            value={newEmail} 
                            className="form-control"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">Guardar cambios</button>
                </form>
                <form onSubmit={handlePwdChanges} className="card card-body">
                    <div className="form-group mb-4">
                        <label className="fw-bold mb-2">CONTRASEÑA</label>
                        <input 
                            type="password" 
                            onChange={e => setOldPwd(e.target.value)} 
                            placeholder="Contraseña actual"
                            className="form-control mb-3"
                        />
                        <input 
                            type="password"
                            onChange={e => setNewPwd1(e.target.value)} 
                            placeholder="Nueva contraseña"
                            className="form-control mb-3"
                        />
                        <input 
                            type="password"
                            onChange={e => setNewPwd2(e.target.value)} 
                            placeholder="Repita la contraseña"
                            className="form-control"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">Modificar contraseña</button>
                </form>
            </div>
        </div>
    );
};