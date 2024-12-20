import React from "react";
import { useSession } from "../SessionContext";

export const AboutUs = () => {

    const { user, setUser } = useSession();

    if (!user) {
        return <div className="text-center mt-5">Debes iniciar sesión para ver esta página.</div>;
    }

    return <h1>Sobre nosotros</h1>
}