import { Link } from "react-router-dom"; // Asegúrate de que `react-router-dom` está instalado
import Header from "../components/Header"; // Tu componente existente
import "./Dashboard.css"; // Archivo CSS para estilos

const Dashboard = () => {
  return (
      <div className="father">
      <Header actualPage='dashboard' isAuth={true}/>
      <div className="dashboard-container">
        <div className="dashboard-section">
          <Link to="/registro-facturas" className="dashboard-link">
            <div className="section-content">
              <h2 className="section-title">Registro de Facturas</h2>
            </div>
          </Link>
        </div>
        <div className="dashboard-section">
          <Link to="/control-gastos" className="dashboard-link">
            <div className="section-content">
              <h2 className="section-title">Control de Gastos</h2>
            </div>
          </Link>
        </div>
        <div className="dashboard-section">
          <Link to="/reportes-financieros" className="dashboard-link">
            <div className="section-content">
              <h2 className="section-title">Reportes Financieros</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
