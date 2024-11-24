import React, { useState, useEffect } from "react";
import Header from "../components/Header"; // Tu componente existente
import './RegistroFacturas.css'
import db from "../services/firebase.js"; // Asegúrate de tener configurada la base de datos
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [isViewingInvoices, setIsViewingInvoices] = useState(false);
  const [formData, setFormData] = useState({
    proveedor: "",
    monto: "",
    fecha: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Cargar las facturas al montar el componente
  useEffect(() => {
    const fetchFacturas = async () => {
      const facturasSnapshot = await getDocs(collection(db, "facturas"));
      const facturasData = facturasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFacturas(facturasData);
    };

    fetchFacturas();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Registrar una nueva factura o actualizar una existente
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Actualizar factura existente
      const facturaDoc = doc(db, "facturas", editingId);
      await updateDoc(facturaDoc, formData);
      setFacturas((prev) =>
        prev.map((factura) =>
          factura.id === editingId ? { id: editingId, ...formData } : factura
        )
      );
      setEditingId(null);
    } else {
      // Registrar nueva factura
      const newFactura = await addDoc(collection(db, "facturas"), formData);
      setFacturas([...facturas, { id: newFactura.id, ...formData }]);
    }

    // Limpiar formulario
    setFormData({ proveedor: "", monto: "", fecha: "" });
    setIsViewingInvoices(false); // Vuelve al formulario después de registrar/editar
  };

  // Manejar edición de factura
  const handleEdit = (factura) => {
    setFormData(factura);
    setEditingId(factura.id);
    setIsViewingInvoices(false); // Cambia al formulario para editar
  };

  // Manejar eliminación de factura
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "facturas", id));
    setFacturas((prev) => prev.filter((factura) => factura.id !== id));
  };

  return (
    <div>
      <Header />
      <div className="father"> 
        <div className="facturas-container">
          {!isViewingInvoices ? (
            <div>
              <h2>{editingId ? "Editar Factura" : "Registrar Factura"}</h2>
              <form onSubmit={handleSubmit} className="facturas-form">
                <div className="form-group">
                  <label htmlFor="proveedor">Proveedor</label>
                  <input
                    type="text"
                    id="proveedor"
                    name="proveedor"
                    value={formData.proveedor}
                    onChange={handleInputChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="monto">Monto</label>
                  <input
                    type="number"
                    id="monto"
                    name="monto"
                    value={formData.monto}
                    onChange={handleInputChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fecha">Fecha de vencimiento</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    autoComplete="off"
                    required
                  />
                </div>
                <button type="submit" className="submit-button">
                  {editingId ? "Actualizar Factura" : "Registrar Factura"}
                </button>
                <button
                type="button"
                className="toggle-button"
                onClick={() => setIsViewingInvoices(true)}
              >
                Ver Facturas
              </button>
              </form>
              
            </div>
          ) : (
            <div>
              <h2>Facturas Registradas</h2>
              {facturas.length === 0 ? (
                <div className="no-invoices">
                  <p>No tienes facturas registradas.</p>
                  <button
                    type="button"
                    className="toggle-button"
                    onClick={() => setIsViewingInvoices(false)}
                  >
                    Volver al Formulario
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="toggle-button"
                    onClick={() => setIsViewingInvoices(false)}
                  >
                    Volver al Formulario
                  </button>
                  <ul className="invoices-list">
                    {facturas.map((factura) => (
                      <li key={factura.id} className="invoice-item">
                        <div>
                          <strong>Proveedor:</strong> {factura.proveedor} |{" "}
                          <strong>Monto:</strong> {factura.monto} |{" "}
                          <strong>Fecha:</strong> {factura.fecha}
                        </div>
                        <div className="actions">
                          <button
                            onClick={() => handleEdit(factura)}
                            className="edit-button"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(factura.id)}
                            className="delete-button"
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Facturas;
