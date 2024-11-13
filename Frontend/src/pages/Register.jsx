import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Styles/Register.css'; 

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Ya existe un usuario con este email'}`);
        } else {
            const data = await response.json();
            console.log(data);
        }
    };

    return (
        <div className="register-container">
            <h1>Registro</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
            <p>¿Ya tienes una cuenta? <Link to="/login" className="nav-link">Inicia sesión aquí</Link></p>
        </div>
    );
};

export default Register;
