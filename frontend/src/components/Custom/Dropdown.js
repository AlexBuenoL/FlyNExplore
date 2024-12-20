import React, { useState } from "react";

export const Dropdown = ({ options, value, handleChange, styles }) => {
  return (
      <select
        id="dropdown"
        value={value}
        onChange={handleChange}
        style={{ ...styles }}
      >
        <option value="" disabled>
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
  );
};