import React, { useState } from "react";

export const FlightDropdown = ({ flight, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Dropdown Header */}
      <div
        style={{
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={toggleDropdown}
      >
        <div>
          <h4 style={{ margin: 0 }}>
            Vuelo {index + 1} - {flight.price.total} {flight.price.currency}
          </h4>
          <p style={{ margin: 0, color: "#666" }}>
            Duración: {flight.itinerary.total_duration}
          </p>
        </div>
        <div style={{ fontSize: "1.5rem", color: "#007BFF" }}>
          {isOpen ? "▲" : "▼"}
        </div>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          style={{
            borderTop: "1px solid #ddd",
            padding: "15px",
          }}
        >
          <h5 style={{ marginBottom: "10px", color: "#007BFF" }}>Escalas:</h5>
          <div style={{ position: "relative" }}>
            {flight.itinerary.segments.map((segment, segIndex) => (
              <div key={segIndex} style={{ display: "flex" }}>
                {/* Vertical Line */}
                <div
                  style={{
                    width: "2px",
                    backgroundColor: "#007BFF",
                    marginRight: "15px",
                    marginLeft: "10px",
                    marginTop: "5px",
                    marginBottom: "15px",
                    position: "relative",
                  }}
                >
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "50%",
                        width: "2px",
                        height: "100%",
                        backgroundColor: "#007BFF",
                      }}
                    ></div>
                </div>

                {/* Segment Card */}
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#f4f8ff",
                    marginBottom: "15px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    flex: 1,
                  }}
                >
                  <p style={{ margin: "5px 0" }}>
                    <strong>Desde:</strong> {segment.origin} →{" "}
                    <strong>Hasta:</strong> {segment.destination}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Salida:</strong>{" "}
                    {new Date(segment.departure_time).toLocaleString()}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Llegada:</strong>{" "}
                    {new Date(segment.arrival_time).toLocaleString()}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Duración:</strong> {segment.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
