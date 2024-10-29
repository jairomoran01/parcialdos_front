import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Form.css';

function Form({ callback }) {
    const [email, setEmail] = useState('');  // Cambiado a email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const goTo = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),  // Cambiado a email
            });

            if (response.ok) {
                const data = await response.json();
                callback(data.role);

                if (data.role === 'user') {
                    goTo("/user");
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
            setError('Error al intentar iniciar sesión.');
        }
    };

    const goToCreateAccount = () => {
        goTo('/registro');
    };

    return (
        <form onSubmit={validateUser}>
            <h1>Bienvenido a la App de Premios</h1>
            <h4>Correo Electrónico</h4>  
            <input
                type="email"  // Cambiado a tipo email para validar correos electrónicos
                value={email}  // Cambiado a email
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
            <button type="submit" className="btn">Ingresar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="button" onClick={goToCreateAccount}>
                Registrarse
            </button>
        </form>
    );
}

export default Form;
