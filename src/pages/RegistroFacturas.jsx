import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button"; // Asegúrate de que la ruta sea la correcta
import "./RegistroFacturas.css"; // Asegúrate de que la ruta sea la correcta

const Register = () => {
    const [monto, setMonto] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [fecha, setFecha] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes manejar el envío del formulario y la lógica de registro
      console.log({ monto, proveedor, fecha });
    };
  
    return (
      <div className="father">
        <div className="register-container">
          <h2>Registro de Facturas</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="monto">Monto</label>
              <input
                type="number"
                id="monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Ingresa el monto"
                required
              />
            </div>
  
            <div>
              <label htmlFor="proveedor">Proveedor</label>
              <input
                type="text"
                id="proveedor"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
                placeholder="Nombre del proveedor"
                required
              />
            </div>
  
            <div>
              <label htmlFor="fecha">Fecha</label>
              <input
                type="date"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
  
            <button type="submit">Registrar Factura</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Register;