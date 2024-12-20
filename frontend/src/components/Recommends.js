import React, {useState, useEffect} from "react";
import { useSession } from "../SessionContext";

const path_API = process.env.REACT_APP_API

export const Recommends = () => {
  const { user } = useSession();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`${path_API}/recommendations`);
        if (res.ok) {
          const data = await res.json();
          setRecommendations(data);
        } else {
          console.error("Error fetching recommendations");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchRecommendations();
  }, []);

  if (!user) {
    return <div className="text-center mt-5">Debes iniciar sesión para ver esta página.</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Recomendaciones de Ciudades</h1>
      <div className="row">
        {recommendations.map((city) => (
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={city.image}
                alt={city.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{city.name}</h5>
                <p className="card-text">{city.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
