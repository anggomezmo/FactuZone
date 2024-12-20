import React, { useState, useEffect } from "react";
import "./register.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import db, { auth } from "../../services/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    contraseña: "",
    fechaNacimiento: "",
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    flatpickr("#born-date", {
      dateFormat: "Y-m-d",
      onChange: (selectedDates, dateStr) => {
       
        setFormData((prevFormData) => ({
          ...prevFormData,
          fechaNacimiento: dateStr,
        }));
      },
    });
  }, []);

  const handleRegister = async () => {
    const { nombre, correo, telefono, contraseña, fechaNacimiento } = formData;

    
    if (!nombre || !correo || !telefono || !contraseña || !fechaNacimiento) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

   
    const loadingSwal = Swal.fire({
      title: "Cargando...",
      text: "Estamos registrando tu cuenta.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
      const user = userCredential.user;

      
      await setDoc(doc(db, "users", user.uid), {
        nombre,
        correo,
        telefono,
        fechaNacimiento,
      });

      
      loadingSwal.close();

      
      Swal.fire("Éxito", "Registro exitoso. Ahora puedes iniciar sesión.", "success").then(() => {
     
        setFormData({
          nombre: "",
          correo: "",
          telefono: "",
          contraseña: "",
          fechaNacimiento: "",
        });

      
        navigate("/login");
      });
    } catch (error) {

      loadingSwal.close();

    
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="real-main-container">
      <Header to="/" actualPage="register" />
      <section className="main-container">
        <div className="register-container">
          <div className="inputs">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              value={formData.nombre}
            />
          </div>
          <div className="inputs">
            <label htmlFor="user">Correo Electrónico</label>
            <input
              type="email"
              id="user"
              autoComplete="off"
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              value={formData.correo}
            />
          </div>
          <div className="inputs">
            <label htmlFor="number">Número Telefónico</label>
            <input
              type="tel"
              id="number"
              autoComplete="off"
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              value={formData.telefono}
            />
          </div>
          <div className="inputs">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
              value={formData.contraseña}
            />
          </div>
          <div className="inputs">
            <label htmlFor="born-date">Fecha de Nacimiento</label>
            <input
              type="text"
              id="born-date"
              autoComplete="off"
              placeholder="YYYY-MM-DD"
              value={formData.fechaNacimiento}
            />
          </div>
          <div className="button">
            <Button variant="login" onClick={handleRegister}>
              Registrarse
            </Button>
          </div>
          <div className="create-account">
            <p>¿Tienes una cuenta?</p>
            <Link to={"/login"}>Entrar</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
