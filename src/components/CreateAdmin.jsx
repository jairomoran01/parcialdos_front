import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CreateAdmin.css';

function CreateAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const createAdmin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/createAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role: 'admin' }), // role: 'admin'
            });

            if (response.ok) {
                setSuccess('Administrador creado exitosamente');
                setError('');
                navigate("/admin"); // Redirige a la vista de administración
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                setSuccess('');
            }
        } catch (error) {
            console.error('Error al crear administrador:', error);
            setError('Error al intentar crear el administrador.');
            setSuccess('');
        }
    };

    return (
        <form onSubmit={createAdmin}>
            <h1>Crear Administrador</h1>
            <h4>Email</h4>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br />
            <h4>Contraseña</h4>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />
            <button type="submit" className="btn">Crear Administrador</button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default CreateAdmin;
