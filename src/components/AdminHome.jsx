import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/AdminHome.css';

function AdminHome({ user }) {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(user?.role === 'admin');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: adminEmail, password: adminPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.role === 'admin') {
                setIsLoggedIn(true);
                alert("¡Inicio de sesión exitoso!");
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const handleCreateAdmin = () => {
        navigate('/crear-admin'); // Redirige al nuevo formulario de creación de administrador
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-container">
                <h2>Inicio de Sesión Admin</h2>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required style={{ color: 'black' }} />

                    <label>Contraseña:</label>
                    <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required style={{ color: 'black' }} />
                    
                    <button type="submit" className="btn">Entrar</button>
                    <button type="button" onClick={handleCreateAdmin}>Crear Administrador</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h2>Bienvenido, Admin</h2>
        </div>
    );
}

export default AdminHome;
