import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import db from "../services/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import './ReportesFinancieros.css';
import Header from "../components/Header.jsx";

const ReportesFinancieros = () => {
  const [facturas, setFacturas] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [ingresos, setIngresos] = useState(""); // Estado para el ingreso

  useEffect(() => {
    const fetchFacturas = async () => {
      const querySnapshot = await getDocs(collection(db, "facturas"));
      const fetchedFacturas = [];
      querySnapshot.forEach((doc) =>
        fetchedFacturas.push({ id: doc.id, ...doc.data() })
      );
      setFacturas(fetchedFacturas);
    };

    const fetchGastos = async () => {
      const querySnapshot = await getDocs(collection(db, "gastos"));
      const fetchedGastos = [];
      querySnapshot.forEach((doc) =>
        fetchedGastos.push({ id: doc.id, ...doc.data() })
      );
      setGastos(fetchedGastos);
    };

    Promise.all([fetchFacturas(), fetchGastos()]);
  }, []);

  // Calcular reportes
  const generateReport = () => {
    const ingresoValue = parseFloat(ingresos); // Valor del ingreso ingresado por el usuario
    const egresos = gastos.reduce((total, gasto) => total + parseFloat(gasto.monto || 0), 0);
    const ganancias = ingresoValue - egresos;

    const report = [
      { concepto: "Ingresos", monto: ingresoValue },
      { concepto: "Egresos", monto: egresos },
      { concepto: "Ganancias", monto: ganancias },
    ];

    setReportData(report);

    Swal.fire({
      title: "Reporte Generado",
      text: "El reporte financiero ha sido generado con éxito.",
      icon: "success",
    });
  };
  const getFacturasProximas = () => {
    const hoy = new Date();
    return facturas.filter((factura) => {
      if (!factura.fecha) return false; // Aseguramos que exista el campo "fecha"
      const fechaVencimiento = new Date(factura.fecha);
      const diferenciaDias = (fechaVencimiento - hoy) / (1000 * 60 * 60 * 24);
      return diferenciaDias <= 7 && diferenciaDias >= 0;
    });
  };

  const getFacturasVencidas = () => {
    const hoy = new Date();
    return facturas.filter((factura) => {
      if (!factura.fecha) return false; // Asegurarse de que exista el campo "fecha"
      const fechaVencimiento = new Date(factura.fecha);
      return fechaVencimiento < hoy; // Facturas con fecha pasada
    });
  };

  const exportToExcel = () => {
    const groupedGastos = groupByCategory(); // Agrupar los gastos por categoría
    const report = []; // Aquí almacenaremos los datos del reporte
  
    // Primero, tenemos que mapear los proveedores de las facturas
    const proveedoresMap = facturas.reduce((acc, factura) => {
      acc[factura.id] = factura.proveedor; // Asumimos que factura.id es el identificador único
      return acc;
    }, {});
  
    let totalEgresos = 0; // Variable para almacenar el total de egresos
    let totalGeneral = 0; // Variable para almacenar el total general
  
    // Recorremos las categorías agrupadas de los gastos
    for (const categoria in groupedGastos) {
      let categoriaTotal = 0; // Variable para almacenar el total de cada categoría
  
      // Recorremos los gastos de la categoría
      groupedGastos[categoria].forEach((gasto) => {
        const monto = Number(gasto.monto); // Convertimos a número explícitamente
        categoriaTotal += isNaN(monto) ? 0 : monto; // Si el monto no es un número, lo sumamos como 0
      });
  
      // Agregamos los totales por categoría al reporte
      report.push({
        categoria: categoria,
        total: categoriaTotal.toFixed(2), // Aseguramos que el total tenga 2 decimales
      });
  
      // Agregamos los detalles de cada gasto en esa categoría
      groupedGastos[categoria].forEach((gasto) => {
        const monto = Number(gasto.monto); // Convertimos a número explícitamente
  
        report.push({
          categoria: `${categoria} - Detalles`,
          monto: isNaN(monto) ? "0.00" : monto.toFixed(2), // Aseguramos que monto es un número válido
          fecha: gasto.fecha,
        });
  
        // Actualizamos el total de egresos y el total general
        totalEgresos += isNaN(monto) ? 0 : monto;
        totalGeneral += isNaN(monto) ? 0 : monto;
      });
    }
  
    // Calcular las ganancias: Ganancias = Ingresos - Egresos
    const ganancias = ingresos - totalEgresos;
  

    report.push({
        categoria: "Total General",
        total: totalGeneral.toFixed(2), // Total general con 2 decimales
      });
    // Agregamos el balance de ganancias al reporte
    report.push({
      categoria: "Ganancias",
      total: ganancias.toFixed(2), // Aseguramos que las ganancias tengan 2 decimales
    });
  
    // Agregamos una fila final con el total general
    
  
    // Creamos la hoja de Excel con los datos del reporte
    const worksheet = XLSX.utils.json_to_sheet(report);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Gastos y Ganancias");
    
    // Generamos el archivo Excel
    XLSX.writeFile(workbook, "reporte_financiero_con_ganancias.xlsx");
  };
  // Exportar a PDF
  const groupByCategory = () => {
    return gastos.reduce((acc, gasto) => {
      if (gasto.categoria) {
        if (!acc[gasto.categoria]) {
          acc[gasto.categoria] = [];
        }
        acc[gasto.categoria].push(gasto);
      }
      return acc;
    }, {});
  };

  // Exportar a Excel
  
  // Facturas próximas a vencer
 
  

  return (

    <div>
        <Header isAuth={true}/>
        <div className="father">
        <div className="reportes-container">
        <h2>Reportes Financieros</h2>

        
        <div className="ingresos-input">
            <label htmlFor="ingresos">Ingresos:</label>
            <input
            type="number"
            id="ingresos"
            value={ingresos}
            onChange={(e) => setIngresos(e.target.value)}
            placeholder="Ingrese sus ingresos"
            required // Se usa "required" para hacer que este campo sea obligatorio
            />
        </div>

        {/* Botones de acciones */}
        <div className="reportes-buttons">
            <button 
            className="button3" 
            onClick={generateReport} 
            disabled={ingresos === "" || isNaN(parseFloat(ingresos)) || parseFloat(ingresos) <= 0}>
            Generar Reporte
            </button>
            <button 
            className="button2" 
            onClick={exportToExcel} 
            disabled={ingresos === "" || isNaN(parseFloat(ingresos)) || parseFloat(ingresos) <= 0}>
            Exportar a Excel
            </button>
        </div>

        {/* Tabla de reportes */}
        {reportData.length > 0 && (
            <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Concepto</th>
                    <th>Monto</th>
                </tr>
                </thead>
                <tbody>
                {reportData.map((item, index) => (
                    <tr key={index}>
                    <td>{item.concepto}</td>
                    <td>${item.monto.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}

        {/* Facturas próximas a vencer */}
        <h3>Facturas Próximas a Vencer</h3>
        <ul>
            {getFacturasProximas().length > 0 ? (
            getFacturasProximas().map((factura) => (
                <li key={factura.id}>
                {factura.proveedor} - {factura.fecha}
                </li>
            ))
            ) : (
            <p>No hay facturas próximas a vencer.</p>
            )}
        </ul>
        <h3>Facturas Vencidas</h3>
            <ul>
            {getFacturasVencidas().length > 0 ? (
                getFacturasVencidas().map((factura) => (
                <li key={factura.id}>
                    <strong>Proveedor:</strong> {factura.proveedor}
                    <br /> 
                    <strong>Fecha de vencimiento:</strong> {factura.fecha}
                </li>
                ))
            ) : (
                <p>No hay facturas vencidas.</p>
            )}
            </ul>
        </div>
        </div>
    </div>
  );
};


export default ReportesFinancieros;
