import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './css/style2.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok === 'ok'){
                navigate('/admin');
            }
            else if (data.ok === 'ok2'){
                navigate('/student');
            }
            else {
                alert("Wrong Username or Password!");
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    return (
        <>
            <div className="body">
                <div class="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <p>Login to enter SMIT Hostel Facility Management System</p>
                        <div class="input-box">
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User Id" required/>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div class="input-box">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        <button type="submit" class="btn">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;