import React from 'react';
import './Login.css'; 

function Login() {
    async function sendData(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);

        const response = await fetch("http://localhost:4004/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        const res = await response.json();
        alert(res.message);
    }

    return (
        <div className="login-container">
            <h2>Login Here</h2>
            <form onSubmit={sendData} className="login-form">
                <label>Email:</label>
                <input type="email" name="email" required placeholder="Enter Email" />

                <label>Password:</label>
                <input type="password" name="password" required placeholder="Enter Password" />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
