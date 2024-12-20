import React, {useEffect, useState} from 'react'
import { useSession } from "../SessionContext";
import { Link } from 'react-router-dom'
import { Range } from 'react-range'
import customStyles from '../styles/customStyles.css';
import { Dropdown } from './Custom/Dropdown';
import { FlightDropdown } from './Custom/FlightDropdown';

const styles = {
  title: {
    fontSize: "2rem",
    fontWeight: "bold", 
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: "2px", 
    marginBottom: "20px",
    fontFamily: "'Roboto', sans-serif", 
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
};

const path_API = process.env.REACT_APP_API

export const FlightSearch = () => {
    const { user, setUser } = useSession();

    const [availableCities, setAvailableCities] = useState([])
    const [departureCity, setDepartureCity] = useState("");
    const [destinationCity, setDestinationCity] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [priceRange, setPriceRange] = useState([0, 2000]);

    const [loading, setLoading] = useState(false);

    const [flightsInfo, setFlightsInfo] = useState(null);
  
    useEffect(() => {
      const fetchCities = async () => {
        try {
          const response = await fetch(`${path_API}/cities/available`);
          if (!response.ok) {
            throw new Error("API call failed");
          }
          const data = await response.json();
          setAvailableCities(data.cities);
        }
        catch (error) {
          alert("Could not fetch Cities from the API")
        }
      }
      fetchCities();
    }, []
    )

    if (!user) {
      return <div className="text-center mt-5">Debes iniciar sesión para ver esta página.</div>;
    } 
  
    const handleSearch = async (e) => {
      e.preventDefault();
      if (!departureCity || !destinationCity || !departureDate || !returnDate || !priceRange) {
        alert("All fields should be specified");
      }
      else {
        const url = `${path_API}/searchFlights?originCity=${departureCity}&destinationCity=${destinationCity}&departureDate=${departureDate}&returnDate=${returnDate}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
        setLoading(true);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Could not retrieve the flights");
          }
          else {
            const data = await response.json();
            setFlightsInfo(data);
          }
        }
        catch(error) {
          alert("Could not retrieve flights")
        }
        
        finally {
          setLoading(false);
        }
      }

    };

    const selectDepartureCity = (event) => {setDepartureCity(event.target.value)}
    const selectDestinationCity = (event) => {setDestinationCity(event.target.value)}

    return (
     <div style={{ display: "flex", height: "100vh"}}>
      {loading && (
        <div style={{ 
          position: "fixed",  // Fixed position to center it in the viewport
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",  // Centers it perfectly
          zIndex: 999,  // Ensures it appears above all other elements
          backgroundColor: "rgba(255, 255, 255, 0.8)",  // Light overlay effect
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
         }}>
          <div
              style={{
                  width: "40px",
                  height: "40px",
                  border: "5px solid #f3f3f3",
                  borderTop: "5px solid #007BFF",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "auto",
              }}
          ></div>
          <p style={{ marginTop: "10px" }}>Cargando vuelos...</p>
        </div>
      )}
      {/* Left Panel */}
      <div style={{ width: "40%", padding: "20px", backgroundColor: "#f4f4f4" }}>
        <h2 style={styles.title}>
          Buscar Vuelos
        </h2>
        <form>
            <div style={{ marginBottom: "15px" }}>
            <label>Ciudad Origen:</label>
            <Dropdown
                options={ availableCities }
                value={departureCity}
                handleChange={selectDepartureCity}
                styles={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            </div>
            <div style={{ marginBottom: "15px" }}>
            <label>Ciudad Destino:</label>
            <Dropdown
                options={ availableCities }
                value={destinationCity}
                handleChange={selectDestinationCity}
                styles={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            </div>
            <div style={{ marginBottom: "15px" }}>
            <label>Fecha de salida:</label>
            <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            </div>
            <div style={{ marginBottom: "15px" }}>
            <label>Fecha de retorno:</label>
            <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            </div>
            <div style={{ marginBottom: "15px" }}>
            <label>Rango de precios:</label>
            <Range
              step={5}
              min={0}
              max={2000}
              values={priceRange}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    marginTop: "20px",
                    height: "6px",
                    width: "100%",
                    backgroundColor: "#ccc",
                    position: "relative",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                {children}
                <div
                  style={{
                    position: "absolute",
                    height: "6px",
                    backgroundColor: "#007BFF",
                    borderRadius: "3px",
                    left: `${((priceRange[0]) / (2000)) * 100}%`,
                    right: `${100 - ((priceRange[1]) / (2000)) * 100}%`,
                  }}
                />
              </div>
            )}
            renderThumb={({ props, index }) => (
              <div
                {...props}
                style={{
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#007BFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontSize: "10px",
                  translate: index === 1 ? "-20px" : "0 px"
                }}
              >
              </div>
            )}
          />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <span>{priceRange[0]}€</span>
                <span>{priceRange[1]}€</span>
            </div>
            </div>
            <button
            onClick={handleSearch}
            style={{
                padding: "10px 15px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                cursor: "pointer",
            }}
            >
            Search
            </button>
        </form>
      </div>

      {/* Right Panel*/}
      <div style={{ flex: 1, padding: "20px" }}>
        <h3 style={{ textAlign: "center"}}>Resultados de búsqueda</h3>
        {flightsInfo && flightsInfo.length > 0 ? (
          <div
            style={{
              height: "80vh",
              overflowY: "auto",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            {flightsInfo.map((flight, index) => (
              <FlightDropdown key={index} flight={flight} index={index} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No se encontraron vuelos
          </p>
        )}
      </div>
    </div>
    )
}