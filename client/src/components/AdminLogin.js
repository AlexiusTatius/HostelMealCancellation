import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (e) => {
        e.preventDefault()

        const res = await fetch('/admin/signin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        })

        const data = await res.json();

        if (data.status === 422 || !data) {
            window.alert("Invalid Credentials");
            console.log("Invalid Credentials");
        } else {
            window.alert("Admin Login Successful");
            console.log("Admin Login Successful");
            navigate("/about");
        }
    }

    return (
        <>
            <div className="container">
                <h1>Admin Login</h1>
                <form method='POST'>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
                </form>
            </div>
        </>
    )
}

export default AdminLogin;