import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import Header from "../components/Header";
import db from "../services/firebase.js"; // Asegúrate de que el path sea correcto

const ControlGastos = () => {
    const [formData, setFormData] = useState({
        monto: "",
        categoria: "",
        fecha: ""
      });
  const [gastos, setGastos] = useState([]);
  const [isViewingGastos, setIsViewingGastos] = useState(false); // Asegúrate de que esta variable está correctamente definida
  const [editingId, setEditingId] = useState(null);

  // Obtener gastos desde Firebase
  useEffect(() => {
    const fetchGastos = async () => {
      const querySnapshot = await getDocs(collection(db, "gastos"));
      const gastosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGastos(gastosList);
    };

    fetchGastos();
  }, []);

  // Manejar el envío de formulario (agregar o editar gasto)
  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espere',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    if (editingId) {
      // Actualizar gasto existente
      const gastoDoc = doc(db, "gastos", editingId);
      await updateDoc(gastoDoc, formData);
      setGastos((prev) =>
        prev.map((gasto) =>
          gasto.id === editingId ? { id: editingId, ...formData } : gasto
        )
      );
      setEditingId(null);
    } else {
      // Registrar nuevo gasto
      const newGasto = await addDoc(collection(db, "gastos"), formData);
      setGastos([...gastos, { id: newGasto.id, ...formData }]);
    }

    // Limpiar formulario y ocultar el formulario
    setFormData({ categoria: "", monto: "", fecha: "" });


    Swal.fire({
      title: 'Operación Exitosa',
      text: 'El gasto fue registrado o actualizado con éxito',
      icon: 'success',
    });
  };

  // Manejar edición de gasto
  const handleEdit = (gasto) => {
    setFormData(gasto);
    setEditingId(gasto.id);
    setIsViewingGastos(false); // Muestra el formulario para editar
  };

  // Manejar eliminación de gasto
  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este gasto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "gastos", id));
        setGastos(gastos.filter((gasto) => gasto.id !== id));
        Swal.fire({
          title: 'Eliminado',
          text: 'El gasto fue eliminado con éxito.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div>
        <Header isAuth={true}/>
        <div className="father">
        {isViewingGastos ? (
            <div className="facturas-container">
            <h2>Lista de Gastos</h2>
            {gastos.length === 0 ? (
                <p>No hay gastos registrados</p>
            ) : (
                <ul className="invoices-list">
                {gastos.map((gasto) => (
                    <li key={gasto.id} className="invoice-item">
                    <div>{gasto.monto} - {gasto.categoria} - {gasto.fecha}</div>
                    <div className="actions">
                        <button onClick={() => handleEdit(gasto)} className="edit-button">Editar</button>
                        <button onClick={() => handleDelete(gasto.id)} className="delete-button">Eliminar</button>
                    </div>
                    </li>
                ))}
                </ul>
            )}
            <button onClick={() => setIsViewingGastos(false)} className="toggle-button">
                Volver al formulario
            </button>
            </div>
        ) : (
            <div className="facturas-container">
            <h2>{editingId ? "Editar Gasto" : "Registrar Gasto"}</h2>
            <form onSubmit={handleSubmit} className="facturas-form">
                <div className="form-group">
                <label htmlFor="monto">Monto</label>
                <input
                    type="number"
                    id="monto"
                    value={formData.monto}
                    onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="categoria">Categoría</label>
                <input
                    type="text"
                    id="categoria"
                    autoComplete="off"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="fecha">Fecha</label>
                <input
                    type="date"
                    id="fecha"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    required
                />
                </div>
                <button type="submit" className="submit-button">
                {editingId ? "Actualizar Gasto" : "Registrar Gasto"}
                </button>
                <button onClick={() => setIsViewingGastos(true)} className="toggle-button">
                Ver Gastos Registrados
            </button>
            </form>
            
            </div>
        )}
        </div>
    </div>
  );
};

export default ControlGastos;
