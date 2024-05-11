import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './css/style2.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [loggedIn, setLoggedIn] = useState(false);
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
                // setLoggedIn(true);
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

    // if (loggedIn){
    //     navigate('/admin');
    // }

    return (
        <>
            {/* <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div> */}
            <div className="body">
                <div class="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        {/* <p>Login to access your account.</p> */}
                        {/* <p>Welcome to SMIT hostel facility management system.</p> */}
                        <p>Login to enter SMIT Hostel Facility Management System</p>
                        <div class="input-box">
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User Id" required/>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div class="input-box">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        {/* <div class="remember-forgot">
                            <label><input type="checkbox"/>Remember Me</label>
                            <a href="#">Forgot Password?</a>
                        </div> */}
                        <button type="submit" class="btn">Login</button>
                        {/* <div class="register-link">
                            <p>Dont have an account? <a href="#">Register</a></p>
                        </div> */}
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;